"use client";

import { CATEGORIES } from "@/lib/articles";
import { Reveal } from "@/components/ui/Reveal";

const CATEGORY_ICONS: Record<string, string> = {
  "Havacılık Haberleri": "◉",
  "Pilot Adayları": "◎",
  "Uçak Teknolojileri": "◈",
  "Emniyet & Kaza Analizleri": "◇",
  "Hava Yolları": "▣",
  Simülasyon: "▦",
  Kariyer: "▹",
  Eğitim: "✦",
};

export default function Categories() {
  return (
    <section id="kategoriler" className="section-shell bg-[#05070A]">
      <div className="section-divider" />
      <div className="ambient-glow right-0 top-8 h-64 w-64 bg-[#56D7FF]/14" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <Reveal>
          <p className="section-label mb-3">Keşfet</p>
          <h2 className="font-heading text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
            Kategoriler
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.name} delay={0.03 * i}>
              <a
                href={cat.href}
                className="cockpit-panel group flex items-center gap-3.5 px-4 py-3.5 sm:py-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#56D7FF]/18 bg-[#081A33]/80 text-[13px] text-[#56D7FF]/85">
                  {CATEGORY_ICONS[cat.name] ?? "○"}
                </span>

                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-[#56D7FF]/65">
                    {cat.count} içerik
                  </span>
                  <span className="mt-1 block truncate font-heading text-[14px] font-medium text-[#F2F7FF] transition-colors group-hover:text-[#56D7FF] sm:text-[15px]">
                    {cat.name}
                  </span>
                </div>

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#56D7FF]/2 text-[12px] text-[#56D7FF]/80 transition-all group-hover:translate-x-0.5 group-hover:border-[#56D7FF]/45 group-hover:bg-[#56D7FF]/10">
                  ›
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
