"use client";

import { PILOT_GUIDES } from "@/lib/articles";
import { Reveal } from "@/components/ui/Reveal";

export default function PilotGuides() {
  return (
    <section id="egitim" className="section-shell bg-[#05070A]">
      <div className="section-divider" />
      <div className="ambient-glow -right-8 bottom-6 h-72 w-72 bg-[#3DA5FF]/16" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <Reveal>
          <p className="section-label mb-3">Hazırlık Serisi</p>
          <h2 className="font-heading max-w-2xl text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium tracking-[-0.03em] text-[#F2F7FF]">
            Pilot Adayları İçin
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[rgba(242,247,255,0.7)]">
            CRM, teknik mülakat, İngilizce, simülatör ve Class 1 Medical süreçlerine hazırlık rehberleri.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-5">
          {PILOT_GUIDES.map((guide, i) => (
            <Reveal key={guide.title} delay={0.04 * i}>
              <a href={guide.href} className="cockpit-panel group flex h-full flex-col px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#56D7FF]/7">
                    0{i + 1}
                  </span>
                  <span className="text-[12px] text-[#56D7FF]/55 transition-transform group-hover:translate-x-0.5">
                    ›
                  </span>
                </div>
                <h3 className="font-heading mt-3 text-[1rem] font-medium leading-snug text-[#F2F7FF] transition-colors group-hover:text-[#56D7FF]">
                  {guide.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-[rgba(242,247,255,0.68)]">
                  {guide.text}
                </p>
                <span className="mt-3.5 text-[10px] uppercase tracking-[0.15em] text-[#3DA5FF]">
                  Rehberi Aç
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
