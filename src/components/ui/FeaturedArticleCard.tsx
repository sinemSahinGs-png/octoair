import Link from "next/link";
import type { Article } from "@/lib/store";
import { articleHref, TYPE_LABELS } from "@/lib/articles";
import { WindowNeonRing } from "@/components/ui/WindowNeonRing";

type FeaturedArticleCardProps = {
  article: Article;
};

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  const href = articleHref(article);

  return (
    <Link
      href={href}
      aria-label={`${article.title} — içeriği aç`}
      className="window-card-shell group block h-full min-h-[280px] cursor-pointer sm:min-h-[320px]"
    >
      <WindowNeonRing intensity="strong" />
      <div className="window-card-body flex h-full flex-col">
        <div className="card-shine" aria-hidden />
        <div
          className="relative h-[48%] min-h-[120px] overflow-hidden"
          style={{
            background: article.imageUrl ? undefined : article.imageGradient,
          }}
        >
          {article.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          )}
          {!article.imageUrl && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(61,165,255,0.28),transparent_48%)] transition-transform duration-700 group-hover:scale-[1.05]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061326] via-[#061326]/20 to-transparent" />
          <span className="absolute left-5 top-3.5 rounded-full border border-[#56D7FF]/35 bg-[#061326]/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#56D7FF] backdrop-blur-sm">
            {TYPE_LABELS[article.type] || article.category}
          </span>
        </div>

        <div className="window-card-content relative z-10 flex flex-1 flex-col">
          <h3 className="font-heading line-clamp-2 text-[1.05rem] font-medium leading-[1.25] tracking-[-0.02em] text-[#F2F7FF] transition-colors duration-300 group-hover:text-[#C9F0FF] sm:text-[1.15rem]">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-[12.5px] leading-[1.5] text-[rgba(242,247,255,0.62)]">
            {article.excerpt}
          </p>
          <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-[rgba(242,247,255,0.45)]">
            <div className="flex flex-wrap items-center gap-2">
              <span>{article.readingTime}</span>
              <span className="text-[#56D7FF]/35">•</span>
              <span className="uppercase tracking-[0.08em]">{article.difficulty}</span>
            </div>
            <span className="text-[#56D7FF] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
