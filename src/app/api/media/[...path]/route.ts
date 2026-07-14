import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { blobAccess, hasBlobToken } from "@/lib/persistence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ path: string[] }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    if (!hasBlobToken()) {
      return NextResponse.json({ error: "Blob yapılandırılmadı." }, { status: 503 });
    }

    const segments = (await params).path || [];
    const pathname = segments.map(decodeURIComponent).join("/");

    if (!pathname.startsWith("octo-air/uploads/") || pathname.includes("..")) {
      return NextResponse.json({ error: "Geçersiz yol." }, { status: 400 });
    }

    const result = await get(pathname, {
      access: blobAccess(),
      useCache: true,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("[media]", error);
    return NextResponse.json({ error: "Görsel okunamadı." }, { status: 500 });
  }
}
