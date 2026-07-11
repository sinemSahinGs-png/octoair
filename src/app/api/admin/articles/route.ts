import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createArticle, getArticles } from "@/lib/store";

function unauthorized() {
  return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
}

function requireAdmin(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) return unauthorized();

  const body = await request.json();
  if (!body?.title?.trim() || !body?.excerpt?.trim() || !body?.category?.trim()) {
    return NextResponse.json(
      { error: "Başlık, özet ve kategori zorunludur." },
      { status: 400 },
    );
  }

  const article = await createArticle({
    title: String(body.title).trim(),
    excerpt: String(body.excerpt).trim(),
    category: String(body.category).trim(),
    date: body.date ? String(body.date) : "",
    readTime: body.readTime ? String(body.readTime) : "5 dk",
    href: body.href ? String(body.href) : "#son-yazilar",
    imageGradient: body.imageGradient || "",
    imageUrl: body.imageUrl ?? null,
    featured: Boolean(body.featured),
    showInLatest: body.showInLatest !== false,
  });

  return NextResponse.json({ article }, { status: 201 });
}
