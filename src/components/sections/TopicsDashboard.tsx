"use client";

import Link from "next/link";
import type { Article } from "@/lib/store";
import { articleHref } from "@/lib/articles";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

type TopicsDashboardProps = {
  cockpit: Article[];
  safety: Article[];
  cases: Article[];
};

function Meta({ article }: { article: Article }) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[rgba(242,247,255,0.4)]">
      <span>{article.readingTime}</span>
      <span className="text-[#56D7FF]/35">•</span>
      <span>{article.difficulty}</span>
    </div>
  );
}

export default function TopicsDashboard({
  cockpit,
  safety,
  cases,
}: TopicsDashboardProps) {
  if (!cockpit.length && !safety.length && !cases.length) return null;

  return (
    <section id="konular" className="section-shell bg-[#061326]">
      <div className="section-divider" />
      <div className="ambient-glow left-1/4 top-0 h-72 w-72 bg-[#3DA5FF]/14" />

      <div className="relative z-[1] mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Kokpit */}
        <Reveal className="topic-panel neon-glow-sync">
          <div className="topic-panel-inner">
            <p className="section-label mb-4">Kokpit ve Sistemler</p>
            <Stagger className="grid auto-rows-fr grid-cols-1 gap-2.5 sm:grid-cols-2">
              {cockpit.slice(0, 6).map((article) => (
                <StaggerItem key={article.id} className="h-full min-h-[4.75rem]">
                  <Link
                    href={articleHref(article)}
                    aria-label={`${article.title} — içeriği aç`}
                    className="topic-tile group flex h-full cursor-pointer items-start gap-3"
                  >
                    <span className="topic-icon topic-icon-radar mt-0.5" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="font-heading block line-clamp-2 min-h-[2.4em] text-[13px] font-medium leading-snug text-[#F2F7FF] transition-colors group-hover:text-[#C9F0FF]">
                        {article.title}
                      </span>
                      <Meta article={article} />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>

        {/* Emniyet */}
        <Reveal delay={0.08} className="topic-panel neon-glow-sync">
          <div className="topic-panel-inner">
            <p className="section-label mb-4">Emniyet ve İnsan Faktörü</p>
            <Stagger className="flex flex-col gap-2.5">
              {safety.slice(0, 5).map((article) => (
                <StaggerItem key={article.id}>
                  <Link
                    href={articleHref(article)}
                    aria-label={`${article.title} — içeriği aç`}
                    className="topic-tile group flex cursor-pointer items-center gap-3"
                  >
                    <span className="topic-icon topic-icon-check" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="font-heading block line-clamp-2 text-[13px] font-medium leading-snug text-[#F2F7FF] transition-colors group-hover:text-[#C9F0FF]">
                        {article.title}
                      </span>
                      <Meta article={article} />
                    </span>
                    <span className="shrink-0 text-[12px] text-[#56D7FF]/70 transition-transform group-hover:translate-x-0.5">
                      ››
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>

        {/* Vaka */}
        <Reveal delay={0.14} className="topic-panel neon-glow-sync">
          <div className="topic-panel-inner">
            <p className="section-label mb-4">Vaka Analizleri</p>
            <Stagger className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {cases.slice(0, 4).map((article) => (
                <StaggerItem key={article.id}>
                  <Link
                    href={articleHref(article)}
                    aria-label={`${article.title} — içeriği aç`}
                    className="topic-tile group flex h-full cursor-pointer flex-col gap-2"
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-heading line-clamp-2 text-[13px] font-medium leading-snug text-[#F2F7FF] transition-colors group-hover:text-[#C9F0FF]">
                        {article.title}
                      </span>
                      <span className="topic-icon topic-icon-alert shrink-0" aria-hidden />
                    </span>
                    <Meta article={article} />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>

      {/* Anchor targets for nav links */}
      <div id="kokpit" className="sr-only" />
      <div id="emniyet" className="sr-only" />
      <div id="vaka" className="sr-only" />
    </section>
  );
}
