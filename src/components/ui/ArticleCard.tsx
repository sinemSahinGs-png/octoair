import type { Article } from "@/lib/store";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a href={article.href} className="card-surface window-card-l2 group block h-full">
      <div className="card-surface-inner flex h-full flex-col">
        <div
          className="relative h-[120px] overflow-hidden sm:h-[132px]"
          style={{
            background: article.imageUrl ? undefined : article.imageGradient,
          }}
        >
          {article.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          )}
          {!article.imageUrl && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,215,255,0.2),transparent_55%)] transition-transform duration-500 group-hover:scale-[1.06]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A]/85 via-[#05070A]/15 to-transparent" />
          <span className="absolute left-3.5 top-3.5 rounded-full border border-[#56D7FF]/22 bg-[#061326]/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#56D7FF] backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5 sm:pt-4">
          <div className="mb-2 flex items-center gap-2 text-[11px] tracking-wide text-[rgba(242,247,255,0.42)]">
            <span>{article.date}</span>
            <span className="text-[#56D7FF]/35">•</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="font-heading line-clamp-2 text-[1.05rem] font-medium leading-[1.3] tracking-[-0.02em] text-[#F2F7FF] transition-colors group-hover:text-[#56D7FF] sm:text-[1.12rem]">
            {article.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-[rgba(242,247,255,0.68)] sm:line-clamp-3">
            {article.excerpt}
          </p>

          <span className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#3DA5FF] sm:mt-4">
            Yazıyı Oku
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}
