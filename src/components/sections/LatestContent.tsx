"use client";

import type { Article } from "@/lib/store";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function LatestContent({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section id="son-icerikler" className="section-shell bg-[#081A33]">
      <div className="section-divider" />
      <div className="ambient-glow left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-[#3DA5FF]/14" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Reveal variant="label">
              <p className="section-label mb-3">Kütüphane</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-heading text-[clamp(1.55rem,3.2vw,2.6rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
                Son Eklenen İçerikler
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} variant="soft">
            <a
              href="#ogren"
              className="text-[11px] uppercase tracking-[0.16em] text-[#56D7FF] transition-all duration-300 hover:translate-x-0.5 hover:text-[#7ee3ff]"
            >
              Tüm alanlar →
            </a>
          </Reveal>
        </div>

        <Stagger className="mt-8 grid grid-cols-1 gap-5 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3" delay={0.08}>
          {articles.map((article) => (
            <StaggerItem key={article.id} className="h-full min-h-[280px] sm:min-h-[300px]">
              <ArticleCard article={article} compact />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
