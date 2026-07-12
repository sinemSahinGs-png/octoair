"use client";

import Link from "next/link";
import type { Article } from "@/lib/store";
import { articleHref } from "@/lib/articles";
import { WindowNeonRing } from "@/components/ui/WindowNeonRing";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function NewsDigest({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section id="gundem" className="section-shell bg-[#05070A]">
      <div className="section-divider" />
      <div className="ambient-glow right-10 top-10 h-56 w-56 bg-[#56D7FF]/1" />

      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <Reveal variant="label">
          <p className="section-label mb-3">İkincil Seçki</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading text-[clamp(1.4rem,2.8vw,2.2rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
            Havacılık Gündemi
          </h2>
        </Reveal>
        <Reveal delay={0.12} variant="soft">
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[rgba(242,247,255,0.65)]">
            Ana odağımız öğrenme ve analiz. Burada yalnızca seçilmiş, kısa gündem özetleri yer alır.
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.08}>
          {articles.map((article) => (
            <StaggerItem key={article.id} className="h-full min-h-[220px]">
              <Link
                href={articleHref(article)}
                aria-label={`${article.title} — içeriği aç`}
                className="window-card-shell group block h-full cursor-pointer"
              >
                <WindowNeonRing intensity="soft" />
                <div className="window-card-body flex h-full flex-col">
                  <div className="card-shine" aria-hidden />

                  {article.imageUrl && (
                    <div className="relative h-[96px] shrink-0 overflow-hidden sm:h-[108px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.imageUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061326] via-[#061326]/25 to-transparent" />
                    </div>
                  )}

                  <div
                    className={`window-card-content flex flex-1 flex-col ${
                      article.imageUrl ? "justify-start" : "justify-center"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-[#56D7FF]/75">
                      <span>Gündem</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-heading mt-2.5 line-clamp-2 text-[1.05rem] font-medium leading-snug text-[#F2F7FF] transition-colors duration-300 group-hover:text-[#C9F0FF]">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[rgba(242,247,255,0.62)]">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
