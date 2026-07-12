"use client";

import Link from "next/link";
import { LEARNING_CATEGORIES } from "@/lib/articles";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const CATEGORY_ICONS: Record<string, string> = {
  "Uçuş Prensipleri": "△",
  "Kokpit ve Sistemler": "◈",
  "Emniyet & İnsan Faktörü": "◇",
  Navigasyon: "◎",
  Meteoroloji: "☁",
  "Vaka Analizleri": "▣",
  "Havayolu Operasyonları": "▹",
  "Havacılık Sözlüğü": "✦",
};

export default function Categories() {
  return (
    <section id="ogren" className="section-shell bg-[#061326]">
      <div className="section-divider" />
      <div className="ambient-glow right-0 top-8 h-64 w-64 bg-[#56D7FF]/14" />

      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <Reveal variant="label">
          <p className="section-label mb-3">Öğrenme Alanları</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading text-[clamp(1.55rem,3.2vw,2.6rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
            Havacılığı Öğren
          </h2>
        </Reveal>

        <Stagger className="mt-8 grid grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-2 lg:grid-cols-4" delay={0.08}>
          {LEARNING_CATEGORIES.map((cat) => (
            <StaggerItem key={cat.name}>
              <Link
                href={cat.href}
                aria-label={`${cat.name} bölümüne git`}
                className="topic-tile neon-glow-sync group flex h-full cursor-pointer items-center gap-3.5 px-4 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#56D7FF]/25 bg-[#081A33]/80 text-[13px] text-[#56D7FF] transition-colors group-hover:border-[#56D7FF]/5 group-hover:text-[#7ee3ff]">
                  {CATEGORY_ICONS[cat.name] ?? "○"}
                </span>

                <div className="min-w-0 flex-1">
                  <span className="block font-heading text-[14px] font-medium text-[#F2F7FF] transition-colors duration-300 group-hover:text-[#C9F0FF] sm:text-[15px]">
                    {cat.name}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-[rgba(242,247,255,0.55)]">
                    {cat.description}
                  </span>
                </div>

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#56D7FF]/25 text-[12px] text-[#56D7FF] transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-[#56D7FF]/5 group-hover:bg-[#56D7FF]/10">
                  ›
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
