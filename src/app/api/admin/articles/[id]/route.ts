import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  deleteArticle,
  updateArticle,
  type ContentType,
  type Difficulty,
} from "@/lib/store";
import { hasBlobToken, isServerless, materializeImageUrl } from "@/lib/persistence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type Params = { params: Promise<{ id: string }> };

function unauthorized() {
  return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
}

function requireAdmin(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function PUT(request: NextRequest, { params }: Params) {
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

    const { id } = await params;
    const body = await request.json();

    let imageUrl = body.imageUrl;
    if (typeof imageUrl === "string" && imageUrl.startsWith("data:")) {
      imageUrl = await materializeImageUrl(imageUrl, "article-image.jpg");
    }

    const patch: Parameters<typeof updateArticle>[1] = {
      title: body.title !== undefined ? String(body.title).trim() : undefined,
      category: body.category !== undefined ? String(body.category).trim() : undefined,
      type: body.type !== undefined ? (body.type as ContentType) : undefined,
      difficulty:
        body.difficulty !== undefined ? (body.difficulty as Difficulty) : undefined,
      date: body.date !== undefined ? String(body.date) : undefined,
      readingTime:
        body.readingTime !== undefined
          ? String(body.readingTime)
          : body.readTime !== undefined
            ? String(body.readTime)
            : undefined,
      sourceUrl:
        body.sourceUrl === undefined
          ? undefined
          : body.sourceUrl
            ? String(body.sourceUrl)
            : null,
      slug: body.slug !== undefined ? String(body.slug) : undefined,
      href: body.href !== undefined ? String(body.href) : undefined,
      imageGradient:
        body.imageGradient !== undefined ? String(body.imageGradient) : undefined,
      imageUrl: imageUrl === undefined ? undefined : imageUrl,
      featured: body.featured === undefined ? undefined : Boolean(body.featured),
      showInLatest:
        body.showInLatest === undefined ? undefined : Boolean(body.showInLatest),
    };

    if (body.content !== undefined) {
      patch.content = body.content ? String(body.content) : null;
    }

    if (body.excerpt !== undefined) {
      const excerpt = String(body.excerpt).trim();
      if (excerpt) {
        patch.excerpt = excerpt;
      } else if (patch.content) {
        patch.excerpt =
          patch.content.split(/\n+/).map((p) => p.trim()).find(Boolean)?.slice(0, 180) ||
          patch.content.slice(0, 180);
      } else {
        patch.excerpt = excerpt;
      }
    }

    const article = await updateArticle(id, patch);

    if (!article) {
      return NextResponse.json({ error: "İçerik bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error("[articles-put]", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Güncelleme başarısız.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    if (!requireAdmin(request)) return unauthorized();

    if (isServerless() && !hasBlobToken()) {
      return NextResponse.json(
        {
          error:
            "Vercel'de silme için Blob Storage gerekli. Dashboard → Storage → Blob oluşturun.",
        },
        { status: 503 },
      );
    }

    const { id } = await params;
    const ok = await deleteArticle(id);
    if (!ok) {
      return NextResponse.json({ error: "İçerik bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[articles-delete]", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Silme başarısız.",
      },
      { status: 500 },
    );
  }
}
