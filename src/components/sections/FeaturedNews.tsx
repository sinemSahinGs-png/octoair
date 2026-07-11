"use client";

import type { Article } from "@/lib/store";
import { FeaturedArticleCard } from "@/components/ui/FeaturedArticleCard";
import { Reveal } from "@/components/ui/Reveal";

export default function FeaturedNews({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;
  const [main, ...side] = articles;

  return (
    <section id="haberler" className="section-shell bg-[#061326]">
      <div className="section-divider" />
      <div className="ambient-glow -left-16 top-1/4 h-72 w-72 bg-[#3DA5FF]/22" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <Reveal>
          <p className="section-label mb-3">Editoryal Seçki</p>
          <h2 className="font-heading text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
            Öne Çıkan Haberler
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <FeaturedArticleCard article={main} size="large" />
          </Reveal>

          {side.length > 0 && (
            <div className="grid gap-3 sm:gap-4">
              {side.map((article, i) => (
                <Reveal key={article.id} delay={0.08 * (i + 1)}>
                  <FeaturedArticleCard article={article} size="small" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
