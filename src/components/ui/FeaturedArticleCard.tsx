import type { Article } from "@/lib/store";

type FeaturedArticleCardProps = {
  article: Article;
  size?: "large" | "small";
};

export function FeaturedArticleCard({
  article,
  size = "large",
}: FeaturedArticleCardProps) {
  const isLarge = size === "large";

  return (
    <a
      href={article.href}
      className={`card-surface window-card-l1 group block h-full ${
        isLarge ? "min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]" : "min-h-[168px] sm:min-h-[190px]"
      }`}
    >
      <div className="card-surface-inner relative flex h-full flex-col">
        <div
          className="absolute inset-0"
          style={{
            background: article.imageUrl ? undefined : article.imageGradient,
          }}
        />
        {article.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        {!article.imageUrl && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(61,165,255,0.22),transparent_48%)] transition-transform duration-700 group-hover:scale-[1.04]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(5,7,10,0.45)_55%,rgba(5,7,10,0.92)_100%)]" />

        <div
          className={`relative z-10 mt-auto ${isLarge ? "p-5 sm:p-7 lg:p-8" : "p-4 sm:p-5"}`}
        >
          <span className="mb-2.5 inline-flex rounded-full border border-[#56D7FF]/28 bg-[#061326]/65 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#56D7FF] backdrop-blur-sm">
            {article.category}
          </span>

          <h3
            className={`font-heading line-clamp-2 font-medium leading-[1.2] tracking-[-0.03em] text-[#F2F7FF] transition-colors group-hover:text-[#56D7FF] ${
              isLarge
                ? "text-[clamp(1.25rem,2.2vw,2rem)]"
                : "text-[0.98rem] sm:text-[1.05rem]"
            }`}
          >
            {article.title}
          </h3>

          {isLarge && (
            <p className="mt-2.5 line-clamp-2 max-w-xl text-[13px] leading-[1.55] text-[rgba(242,247,255,0.7)] sm:mt-3 sm:line-clamp-3 sm:text-[14px]">
              {article.excerpt}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2 text-[11px] text-[rgba(242,247,255,0.42)]">
            <span>{article.date}</span>
            <span className="text-[#56D7FF]/35">•</span>
            <span>{article.readTime} okuma</span>
          </div>
        </div>
      </div>
    </a>
  );
}
