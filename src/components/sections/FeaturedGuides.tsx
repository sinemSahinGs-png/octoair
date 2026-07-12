"use client";

import type { Article } from "@/lib/store";
import { FeaturedArticleCard } from "@/components/ui/FeaturedArticleCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function FeaturedGuides({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section id="rehberler" className="section-shell bg-[#05070A]">
      <div className="section-divider" />
      <div className="ambient-glow -left-16 top-1/4 h-72 w-72 bg-[#3DA5FF]/22" />

      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <Reveal variant="label">
          <p className="section-label mb-2">Seçki</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading text-[clamp(1.35rem,2.8vw,2rem)] font-medium uppercase tracking-[0.18em] text-[#56D7FF]">
            Öne Çıkan Rehberler
          </h2>
        </Reveal>

        <Stagger
          className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          delay={0.1}
        >
          {articles.slice(0, 4).map((article) => (
            <StaggerItem key={article.id}>
              <FeaturedArticleCard article={article} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
