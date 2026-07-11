"use client";

import { INTRO_FEATURES } from "@/lib/articles";
import { Reveal } from "@/components/ui/Reveal";

export default function EditorialIntro() {
  return (
    <section id="blog" className="section-shell bg-[#05070A]">
      <div className="section-divider" />
      <div className="ambient-glow left-[-8%] top-8 h-64 w-64 bg-[#3DA5FF]/30" />
      <div className="ambient-glow right-[-4%] bottom-0 h-56 w-56 bg-[#56D7FF]/18" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <Reveal>
          <p className="section-label mb-4">Octo Air Journal</p>
          <h2 className="font-heading max-w-3xl text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[#F2F7FF]">
            Havacılığı haberlerden fazlası olarak anlatıyoruz.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[rgba(242,247,255,0.7)] sm:mt-5 sm:text-[16px]">
            Haberler, analizler, eğitim içerikleri ve pilot adayları için rehberler tek bir premium platformda.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3">
          {INTRO_FEATURES.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * (i + 1)}>
              <div className="cockpit-panel h-full px-5 py-5 sm:px-6 sm:py-6">
                <div className="mb-3 h-px w-9 bg-gradient-to-r from-[#56D7FF] to-transparent" />
                <h3 className="font-heading text-[1.05rem] font-medium text-[#F2F7FF]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[rgba(242,247,255,0.68)] sm:text-[14px]">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
