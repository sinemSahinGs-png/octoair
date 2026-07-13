import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { deleteUploadFile, ensureUploadsDir } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function unauthorized() {
  return NextResponse.json({ error: "Yetkisiz. Tekrar giriş yapın." }, { status: 401 });
}

function extFromNameOrMime(name: string, mime: string) {
  const fromName = path.extname(name || "").toLowerCase();
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
}

async function writeImageBuffer(bytes: Buffer, filenameHint: string, mime: string) {
  await ensureUploadsDir();
  const safeExt = extFromNameOrMime(filenameHint, mime);
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${safeExt}`;
  const fullPath = path.join(UPLOADS_DIR, filename);
  await fs.writeFile(fullPath, bytes);
  return `/uploads/${filename}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
      return unauthorized();
    }

    const contentType = request.headers.get("content-type") || "";

    // Preferred: JSON base64 (avoids FormData/File instanceof issues)
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as {
        filename?: string;
        mime?: string;
        data?: string;
      };

      if (!body.data) {
        return NextResponse.json({ error: "Görsel verisi eksik." }, { status: 400 });
      }

      const raw = body.data.includes(",") ? body.data.split(",")[1] : body.data;
      const bytes = Buffer.from(raw, "base64");
      if (!bytes.length) {
        return NextResponse.json({ error: "Görsel boş." }, { status: 400 });
      }
      if (bytes.length > 12 * 1024 * 1024) {
        return NextResponse.json({ error: "Görsel 12MB’dan küçük olmalı." }, { status: 400 });
      }

      const mime = body.mime || "image/jpeg";
      if (!mime.startsWith("image/") && !/\.(jpe?g|png|webp|gif|avif)$/i.test(body.filename || "")) {
        return NextResponse.json({ error: "Sadece görsel yükleyebilirsiniz." }, { status: 400 });
      }

      const url = await writeImageBuffer(bytes, body.filename || "image.jpg", mime);
      return NextResponse.json({ url, ok: true });
    }

    // Fallback: multipart FormData
    const form = await request.formData();
    const entry = form.get("file");
    if (!entry || typeof entry === "string") {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    const blob = entry as Blob;
    const bytes = Buffer.from(await blob.arrayBuffer());
    if (!bytes.length) {
      return NextResponse.json({ error: "Dosya boş." }, { status: 400 });
    }
    if (bytes.length > 12 * 1024 * 1024) {
      return NextResponse.json({ error: "Görsel 12MB’dan küçük olmalı." }, { status: 400 });
    }

    const filename =
      "name" in entry && typeof (entry as File).name === "string"
        ? (entry as File).name
        : "image.jpg";
    const mime = blob.type || "image/jpeg";
    const url = await writeImageBuffer(bytes, filename, mime);
    return NextResponse.json({ url, ok: true });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Yükleme hatası: ${error.message}`
            : "Görsel yüklenemedi.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
      return unauthorized();
    }

    const body = (await request.json()) as { url?: string };
    if (!body.url) {
      return NextResponse.json({ error: "URL gerekli." }, { status: 400 });
    }

    await deleteUploadFile(body.url);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[upload-delete]", error);
    return NextResponse.json({ error: "Görsel silinemedi." }, { status: 500 });
  }
}
