"use client";

import { Reveal } from "@/components/ui/Reveal";

export default function WeeklyAnalysis() {
  return (
    <section className="section-shell bg-[#061326]">
      <div className="section-divider" />
      <div className="ambient-glow left-1/4 top-1/2 h-80 w-80 -translate-y-1/2 bg-[#56D7FF]/12" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <Reveal>
          <p className="section-label mb-3">Derin Okuma</p>
          <h2 className="font-heading mb-8 text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium tracking-[-0.03em] text-[#F2F7FF] sm:mb-10">
            Haftanın Analizi
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <a
            href="#blog"
            className="card-surface window-card-wide group relative block min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]"
          >
            <div
              className="card-surface-inner absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 78% 32%, rgba(61,165,255,0.24), transparent 42%), linear-gradient(135deg, #0D223F 0%, #061326 42%, #05070A 100%)",
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.9)_0%,rgba(5,7,10,0.55)_48%,rgba(5,7,10,0.12)_100%)]" />
              <div className="absolute inset-0 opacity-30 mix-blend-screen [background-image:linear-gradient(rgba(86,215,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(86,215,255,0.07)_1px,transparent_1px)] [background-size:44px_44px]" />

              <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end p-6 sm:p-9 md:p-12">
                <span className="mb-3 inline-flex w-fit rounded-full border border-[#56D7FF]/28 bg-[#061326]/6 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#56D7FF] backdrop-blur-sm">
                  Emniyet Analizi · 12 dk
                </span>
                <h3 className="font-heading line-clamp-3 text-[clamp(1.35rem,2.8vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[#F2F7FF] transition-colors group-hover:text-[#56D7FF]">
                  AF447’den Bugüne: Otomasyon, İnsan Faktörü ve Kokpit Farkındalığı
                </h3>
                <p className="mt-3 line-clamp-3 max-w-xl text-[14px] leading-relaxed text-[rgba(242,247,255,0.7)] sm:mt-4">
                  Otomasyon çağında pilotun rolü nasıl dönüştü? Stall tanıma, mode awareness ve CRM
                  disiplinleri üzerinden güncel bir okuma.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#3DA5FF] sm:mt-7">
                  Analizi Oku
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
