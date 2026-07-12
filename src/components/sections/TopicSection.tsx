"use client";

import type { Article } from "@/lib/store";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

type TopicSectionProps = {
  id: string;
  label: string;
  title: string;
  description?: string;
  articles: Article[];
  tone?: "dark" | "navy";
};

export default function TopicSection({
  id,
  label,
  title,
  description,
  articles,
  tone = "dark",
}: TopicSectionProps) {
  if (!articles.length) return null;

  return (
    <section
      id={id}
      className={`section-shell ${tone === "navy" ? "bg-[#061326]" : "bg-[#05070A]"}`}
    >
      <div className="section-divider" />
      <div className="ambient-glow left-1/3 top-0 h-64 w-64 bg-[#3DA5FF]/12" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <Reveal variant="label">
          <p className="section-label mb-3">{label}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading text-[clamp(1.55rem,3.2vw,2.6rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.12} variant="soft">
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[rgba(242,247,255,0.68)] sm:text-[15px]">
              {description}
            </p>
          </Reveal>
        )}

        <Stagger className="mt-8 grid grid-cols-1 gap-3.5 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3" delay={0.08}>
          {articles.map((article) => (
            <StaggerItem key={article.id}>
              <ArticleCard article={article} compact />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
