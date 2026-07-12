import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createArticle, getArticles, type ContentType, type Difficulty } from "@/lib/store";

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
    type: (body.type as ContentType) || "guide",
    difficulty: (body.difficulty as Difficulty) || "başlangıç",
    date: body.date ? String(body.date) : "",
    readingTime: body.readingTime
      ? String(body.readingTime)
      : body.readTime
        ? String(body.readTime)
        : "5 dk",
    sourceUrl: body.sourceUrl ? String(body.sourceUrl) : null,
    slug: body.slug ? String(body.slug) : undefined,
    href: body.href ? String(body.href) : undefined,
    imageGradient: body.imageGradient || "",
    imageUrl: body.imageUrl ?? null,
    featured: Boolean(body.featured),
    showInLatest: body.showInLatest !== false,
  });

  return NextResponse.json({ article }, { status: 201 });
}
