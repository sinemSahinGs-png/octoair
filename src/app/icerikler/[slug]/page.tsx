import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getArticles,
  getRelatedArticles,
} from "@/lib/store";
import { getArticleBody, TYPE_LABELS } from "@/lib/articles";
import { ArticleCard } from "@/components/ui/ArticleCard";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "İçerik bulunamadı — Octo Air" };

  return {
    title: `${article.title} — Octo Air`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const all = await getArticles();
  const related = getRelatedArticles(all, article, 3);
  const body = getArticleBody(article);

  return (
    <main className="min-h-screen bg-[#05070A] text-[#F2F7FF]">
      <header className="border-b border-white/10 bg-[rgba(6,19,38,0.72)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[920px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href="/"
            lang="en"
            className="font-heading text-[15px] font-semibold tracking-[0.18em] text-[#F2F7FF] transition-colors hover:text-[#56D7FF]"
          >
            OCTO AIR
          </Link>
          <Link
            href="/#son-icerikler"
            className="text-[12px] uppercase tracking-[0.16em] text-[rgba(242,247,255,0.55)] transition-colors hover:text-[#56D7FF]"
          >
            ← İçeriklere dön
          </Link>
        </div>
      </header>

      <article className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[320px] opacity-70"
          style={{
            background: article.imageUrl
              ? undefined
              : article.imageGradient,
          }}
          aria-hidden
        />
        {article.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt=""
            className="pointer-events-none absolute inset-x-0 top-0 h-[320px] w-full object-cover opacity-45"
          />
        )}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-[#05070A]/20 via-[#05070A]/75 to-[#05070A]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-[920px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
          <p className="section-label mb-4">
            {TYPE_LABELS[article.type] || article.category}
          </p>

          <h1 className="font-heading text-[clamp(1.85rem,4.2vw,3rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[#F2F7FF]">
            {article.title}
          </h1>

          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[rgba(242,247,255,0.72)] sm:text-[17px]">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] tracking-wide text-[rgba(242,247,255,0.48)]">
            <span>{article.date}</span>
            <span className="text-[#56D7FF]/35">•</span>
            <span>{article.readingTime}</span>
            <span className="text-[#56D7FF]/35">•</span>
            <span className="capitalize">{article.difficulty}</span>
            <span className="text-[#56D7FF]/35">•</span>
            <span>{article.category}</span>
          </div>

          <div className="mt-10 space-y-5 border-t border-white/10 pt-10 text-[15px] leading-[1.75] text-[rgba(242,247,255,0.78)] sm:text-[16px]">
            {body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          {article.sourceUrl && (
            <p className="mt-8 text-[13px] text-[rgba(242,247,255,0.45)]">
              Kaynak:{" "}
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#56D7FF] underline-offset-2 hover:underline"
              >
                {article.sourceUrl}
              </a>
            </p>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-shell border-t border-white/10 bg-[#061326]">
          <div className="relative z-[1] mx-auto max-w-[1200px]">
            <p className="section-label mb-3">İlgili İçerikler</p>
            <h2 className="font-heading text-[clamp(1.35rem,2.6vw,2rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
              Devamını keşfedin
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} article={item} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
