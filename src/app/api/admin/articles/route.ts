import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createArticle, getArticles, type ContentType, type Difficulty } from "@/lib/store";
import { hasBlobToken, isServerless, materializeImageUrl } from "@/lib/persistence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function unauthorized() {
  return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
}

function requireAdmin(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json({
      articles,
      storage: {
        ready: hasBlobToken() || !isServerless(),
        mode: hasBlobToken() ? "blob" : isServerless() ? "none" : "local",
      },
    });
  } catch (error) {
    console.error("[articles-get]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "İçerikler okunamadı." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!requireAdmin(request)) return unauthorized();

    if (isServerless() && !hasBlobToken()) {
      return NextResponse.json(
        {
          error:
            "Vercel'de haber kaydı için Blob Storage gerekli. Dashboard → Storage → Blob oluşturun; BLOB_READ_WRITE_TOKEN env eklenip redeploy edin.",
        },
        { status: 503 },
      );
    }

    const body = await request.json();
    if (!body?.title?.trim() || !body?.category?.trim()) {
      return NextResponse.json(
        { error: "Başlık ve kategori zorunludur." },
        { status: 400 },
      );
    }

    const content =
      body.content != null && String(body.content).trim()
        ? String(body.content).trim()
        : null;
    const excerptRaw = body.excerpt != null ? String(body.excerpt).trim() : "";
    const excerpt =
      excerptRaw ||
      (content
        ? content.split(/\n+/).map((p: string) => p.trim()).find(Boolean)?.slice(0, 180) ||
          content.slice(0, 180)
        : "");

    if (!excerpt) {
      return NextResponse.json(
        { error: "Haber metni veya kısa açıklama gerekli." },
        { status: 400 },
      );
    }

    let imageUrl =
      body.imageUrl === undefined || body.imageUrl === null
        ? null
        : String(body.imageUrl);
    if (imageUrl?.startsWith("data:")) {
      imageUrl = await materializeImageUrl(imageUrl, "article-image.jpg");
    }

    const article = await createArticle({
      title: String(body.title).trim(),
      excerpt,
      category: String(body.category).trim(),
      type: (body.type as ContentType) || "news",
      difficulty: (body.difficulty as Difficulty) || "başlangıç",
      date: body.date ? String(body.date) : "",
      readingTime: body.readingTime
        ? String(body.readingTime)
        : body.readTime
          ? String(body.readTime)
          : "3 dk",
      sourceUrl: body.sourceUrl ? String(body.sourceUrl) : null,
      slug: body.slug ? String(body.slug) : undefined,
      href: body.href ? String(body.href) : undefined,
      imageGradient: body.imageGradient || "",
      imageUrl,
      content,
      featured: Boolean(body.featured),
      showInLatest: body.showInLatest !== false,
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error("[articles-post]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Kayıt başarısız.",
      },
      { status: 500 },
    );
  }
}
