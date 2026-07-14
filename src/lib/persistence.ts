import { put, list, del, get } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const ARTICLES_BLOB = "octo-air/articles.json";
const DATA_PATH = path.join(process.cwd(), "data", "articles.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const MEDIA_PREFIX = "/api/media/";

export function isServerless() {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

export function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Private stores (Vercel default) need access:"private". Public stores: set BLOB_ACCESS=public */
export function blobAccess(): "public" | "private" {
  return process.env.BLOB_ACCESS === "public" ? "public" : "private";
}

export function toMediaProxyPath(pathname: string) {
  return `${MEDIA_PREFIX}${pathname.replace(/^\/+/, "")}`;
}

export function fromMediaProxyPath(url: string): string | null {
  if (!url.startsWith(MEDIA_PREFIX)) return null;
  return url.slice(MEDIA_PREFIX.length).replace(/^\/+/, "");
}

async function readLocalArticlesRaw(): Promise<string | null> {
  try {
    return await fs.readFile(DATA_PATH, "utf8");
  } catch {
    return null;
  }
}

async function writeLocalArticlesRaw(raw: string) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, raw, "utf8");
}

async function streamToText(stream: ReadableStream<Uint8Array>) {
  return new Response(stream).text();
}

async function readBlobArticlesRaw(): Promise<string | null> {
  if (!hasBlobToken()) return null;
  try {
    const access = blobAccess();
    const result = await get(ARTICLES_BLOB, { access, useCache: false });
    if (result?.statusCode === 200 && result.stream) {
      return await streamToText(result.stream);
    }

    // Fallback for older public blobs listed by URL
    const listed = await list({ prefix: ARTICLES_BLOB, limit: 10 });
    const match = listed.blobs.find((b) => b.pathname === ARTICLES_BLOB);
    if (!match) return null;

    if (access === "private") {
      const viaUrl = await get(match.url, { access, useCache: false });
      if (viaUrl?.statusCode === 200 && viaUrl.stream) {
        return await streamToText(viaUrl.stream);
      }
      return null;
    }

    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.text();
  } catch (error) {
    console.error("[blob-read-articles]", error);
    return null;
  }
}

async function writeBlobArticlesRaw(raw: string) {
  if (!hasBlobToken()) {
    throw new Error(
      "Vercel üzerinde kayıt için BLOB_READ_WRITE_TOKEN gerekli. Vercel Dashboard → Storage → Blob ile token ekleyin.",
    );
  }
  await put(ARTICLES_BLOB, raw, {
    access: blobAccess(),
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Load articles JSON text (blob on Vercel, local file in dev). */
export async function loadArticlesRaw(): Promise<string> {
  if (hasBlobToken()) {
    const fromBlob = await readBlobArticlesRaw();
    if (fromBlob) return fromBlob;
    // Seed blob from bundled local data if present
    const local = await readLocalArticlesRaw();
    if (local) {
      try {
        await writeBlobArticlesRaw(local);
      } catch {
        // ignore seed failure
      }
      return local;
    }
    return "[]";
  }

  if (isServerless()) {
    // Read-only bundle: can still READ local data shipped in deployment
    const local = await readLocalArticlesRaw();
    return local || "[]";
  }

  const local = await readLocalArticlesRaw();
  if (local) return local;
  await writeLocalArticlesRaw("[]");
  return "[]";
}

/** Persist articles JSON. */
export async function persistArticlesRaw(raw: string) {
  if (hasBlobToken()) {
    await writeBlobArticlesRaw(raw);
    // Best-effort local mirror in non-serverless
    if (!isServerless()) {
      try {
        await writeLocalArticlesRaw(raw);
      } catch {
        // ignore
      }
    }
    return;
  }

  if (isServerless()) {
    throw new Error(
      "Vercel'de haber kaydı için Blob Storage gerekli. Vercel → Storage → Create Blob → BLOB_READ_WRITE_TOKEN env ekleyin.",
    );
  }

  await writeLocalArticlesRaw(raw);
}

export async function persistImageBuffer(
  bytes: Buffer,
  filenameHint: string,
  mime: string,
): Promise<string> {
  const ext = (() => {
    const fromName = path.extname(filenameHint || "").toLowerCase();
    if (fromName === ".jpeg") return ".jpg";
    if ([".jpg", ".png", ".webp", ".gif", ".avif"].includes(fromName)) return fromName;
    const map: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/jpg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/gif": ".gif",
      "image/avif": ".avif",
    };
    return map[mime] || ".jpg";
  })();

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const pathname = `octo-air/uploads/${filename}`;

  if (hasBlobToken()) {
    const access = blobAccess();
    const blob = await put(pathname, bytes, {
      access,
      contentType: mime.startsWith("image/") ? mime : "image/jpeg",
      addRandomSuffix: false,
    });
    // Private store URLs are not browser-readable — proxy through Next
    if (access === "private") {
      return toMediaProxyPath(pathname);
    }
    return blob.url;
  }

  if (isServerless()) {
    // No writable public/ on Vercel — embed as data URL (keep under ~1.5MB preferred)
    if (bytes.length > 1.8 * 1024 * 1024) {
      throw new Error(
        "Vercel'de kalıcı görsel için Blob Storage gerekli (büyük dosya). Vercel → Storage → Blob kurun veya 1.5MB altı görsel kullanın.",
      );
    }
    const b64 = bytes.toString("base64");
    const safeMime = mime.startsWith("image/") ? mime : "image/jpeg";
    return `data:${safeMime};base64,${b64}`;
  }

  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const fullPath = path.join(UPLOADS_DIR, filename);
  await fs.writeFile(fullPath, bytes);
  return `/uploads/${filename}`;
}

/** Turn a data: URL into a durable public URL (blob/local) before saving articles. */
export async function materializeImageUrl(imageUrl: string, filenameHint = "image.jpg") {
  if (!imageUrl.startsWith("data:")) return imageUrl;

  const comma = imageUrl.indexOf(",");
  const header = comma >= 0 ? imageUrl.slice(0, comma) : "";
  const raw = comma >= 0 ? imageUrl.slice(comma + 1) : "";
  const mimeMatch = /^data:([^;]+);base64$/i.exec(header);
  if (!mimeMatch || !raw) {
    throw new Error("Geçersiz görsel verisi.");
  }

  const mime = mimeMatch[1] || "image/jpeg";
  const bytes = Buffer.from(raw, "base64");
  if (!bytes.length) throw new Error("Görsel boş.");
  if (bytes.length > 12 * 1024 * 1024) {
    throw new Error("Görsel 12MB’dan küçük olmalı.");
  }

  // Prefer durable storage; avoid embedding megabase64 into articles.json
  if (!hasBlobToken() && isServerless()) {
    throw new Error(
      "Vercel’de görselli haber için Blob Storage gerekli. Dashboard → Storage → Blob kurun.",
    );
  }

  return persistImageBuffer(bytes, filenameHint, mime);
}

export async function removeStoredImage(publicPath: string) {
  if (!publicPath) return;

  if (publicPath.startsWith("data:")) return;

  const viaProxy = fromMediaProxyPath(publicPath);
  if (viaProxy) {
    if (!hasBlobToken()) return;
    try {
      await del(viaProxy);
    } catch {
      // ignore
    }
    return;
  }

  if (publicPath.includes("blob.vercel-storage.com") || publicPath.startsWith("https://")) {
    if (!hasBlobToken()) return;
    try {
      await del(publicPath);
    } catch {
      // ignore
    }
    return;
  }

  if (!publicPath.startsWith("/uploads/")) return;
  const fullPath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  try {
    await fs.unlink(fullPath);
  } catch {
    // ignore
  }
}
