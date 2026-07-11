import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { deleteArticle, updateArticle } from "@/lib/store";

type Params = { params: Promise<{ id: string }> };

function unauthorized() {
  return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
}

function requireAdmin(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!requireAdmin(request)) return unauthorized();
  const { id } = await params;
  const body = await request.json();

  const article = await updateArticle(id, {
    title: body.title !== undefined ? String(body.title).trim() : undefined,
    excerpt: body.excerpt !== undefined ? String(body.excerpt).trim() : undefined,
    category: body.category !== undefined ? String(body.category).trim() : undefined,
    date: body.date !== undefined ? String(body.date) : undefined,
    readTime: body.readTime !== undefined ? String(body.readTime) : undefined,
    href: body.href !== undefined ? String(body.href) : undefined,
    imageGradient: body.imageGradient !== undefined ? String(body.imageGradient) : undefined,
    imageUrl: body.imageUrl === undefined ? undefined : body.imageUrl,
    featured: body.featured === undefined ? undefined : Boolean(body.featured),
    showInLatest: body.showInLatest === undefined ? undefined : Boolean(body.showInLatest),
  });

  if (!article) {
    return NextResponse.json({ error: "Haber bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!requireAdmin(request)) return unauthorized();
  const { id } = await params;
  const ok = await deleteArticle(id);
  if (!ok) {
    return NextResponse.json({ error: "Haber bulunamadı." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
