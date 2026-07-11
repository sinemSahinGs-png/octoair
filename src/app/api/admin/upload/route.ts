import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { deleteUploadFile, saveUploadFile } from "@/lib/store";

function unauthorized() {
  return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
}

export async function POST(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return unauthorized();
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Sadece görsel yükleyebilirsiniz." }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Görsel 8MB’dan küçük olmalı." }, { status: 400 });
  }

  const url = await saveUploadFile(file);
  return NextResponse.json({ url });
}

export async function DELETE(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return unauthorized();
  }

  const body = (await request.json()) as { url?: string };
  if (!body.url) {
    return NextResponse.json({ error: "URL gerekli." }, { status: 400 });
  }

  await deleteUploadFile(body.url);
  return NextResponse.json({ ok: true });
}
