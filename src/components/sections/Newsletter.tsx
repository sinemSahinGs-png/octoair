"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { GlowButton } from "@/components/ui/GlowButton";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="abone" className="section-shell bg-[#061326]">
      <div className="section-divider" />
      <div className="ambient-glow left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-[#3DA5FF]/16" />

      <div className="relative z-[1] mx-auto max-w-[720px] text-center">
        <Reveal variant="label">
          <p className="section-label mb-3">Bülten</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-heading text-[clamp(1.55rem,3.4vw,2.7rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[#F2F7FF]">
            Octo Air bültenine katıl.
          </h2>
        </Reveal>
        <Reveal delay={0.14} variant="soft">
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[rgba(242,247,255,0.7)]">
            Yeni rehberler, kavram açıklamaları ve seçilmiş havacılık gündemi haftada bir e-postana gelsin.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          {submitted ? (
            <div className="cockpit-panel mx-auto mt-8 max-w-md px-5 py-6">
              <p className="font-heading text-base text-[#F2F7FF]">Kaydınız alındı.</p>
              <p className="mt-1.5 text-sm text-[rgba(242,247,255,0.68)]">
                İlk bülten yakında gelen kutunuzda olacak.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-xl flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3"
            >
              <input
                required
                type="email"
                placeholder="ornek@eposta.com"
                className="min-w-0 flex-1 rounded-full border border-[#56D7FF]/22 bg-[rgba(6,19,38,0.75)] px-5 py-3 text-sm text-[#F2F7FF] outline-none backdrop-blur-sm placeholder:text-[rgba(242,247,255,0.35)] focus:border-[#56D7FF]/5"
              />
              <GlowButton type="submit" variant="primary">
                Abone Ol
              </GlowButton>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
