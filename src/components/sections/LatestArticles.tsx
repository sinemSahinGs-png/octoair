"use client";

import type { Article } from "@/lib/store";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";

export default function LatestArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section id="son-yazilar" className="section-shell bg-[#081A33]">
      <div className="section-divider" />
      <div className="ambient-glow left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-[#3DA5FF]/14" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-label mb-3">Güncel Yayın</p>
              <h2 className="font-heading text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
                Son Yazılar
              </h2>
            </div>
            <a
              href="#blog"
              className="text-[11px] uppercase tracking-[0.16em] text-[#56D7FF] transition-colors hover:text-[#F2F7FF]"
            >
              Tümünü Gör →
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.id} delay={0.04 * (i % 3)}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
