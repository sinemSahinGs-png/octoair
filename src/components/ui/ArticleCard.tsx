import Link from "next/link";
import type { Article } from "@/lib/store";
import { articleHref, TYPE_LABELS } from "@/lib/articles";
import { WindowNeonRing } from "@/components/ui/WindowNeonRing";

type ArticleCardProps = {
  article: Article;
  compact?: boolean;
};

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const href = articleHref(article);

  return (
    <Link
      href={href}
      aria-label={`${article.title} — içeriği aç`}
      className="window-card-shell group block h-full cursor-pointer"
    >
      <WindowNeonRing intensity="soft" />
      <div className="window-card-body flex h-full flex-col">
        <div className="card-shine" aria-hidden />
        <div
          className={`relative shrink-0 overflow-hidden ${
            compact ? "h-[88px] sm:h-[96px]" : "h-[110px] sm:h-[120px]"
          }`}
          style={{
            background: article.imageUrl ? undefined : article.imageGradient,
          }}
        >
          {article.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
            />
          )}
          {!article.imageUrl && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,215,255,0.22),transparent_55%)] transition-transform duration-700 group-hover:scale-[1.07]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061326]/90 via-[#061326]/20 to-transparent" />
          <span className="absolute left-4 top-3 rounded-full border border-[#56D7FF]/28 bg-[#061326]/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#56D7FF] backdrop-blur-sm sm:left-5">
            {TYPE_LABELS[article.type] || article.category}
          </span>
        </div>

        <div className="window-card-content flex min-h-0 flex-1 flex-col">
          <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] tracking-wide text-[rgba(242,247,255,0.42)]">
            <span>{article.readingTime}</span>
            <span className="text-[#56D7FF]/35">•</span>
            <span className="uppercase tracking-[0.06em]">{article.difficulty}</span>
          </div>

          <h3 className="font-heading line-clamp-2 text-[0.95rem] font-medium leading-[1.3] tracking-[-0.02em] text-[#F2F7FF] transition-colors duration-300 group-hover:text-[#C9F0FF] sm:text-[1rem]">
            {article.title}
          </h3>

          <p
            className={`mt-1.5 text-[12.5px] leading-[1.5] text-[rgba(242,247,255,0.65)] ${
              compact ? "line-clamp-2" : "line-clamp-2"
            }`}
          >
            {article.excerpt}
          </p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#3DA5FF] transition-colors group-hover:text-[#56D7FF]">
            İçeriği Oku
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
