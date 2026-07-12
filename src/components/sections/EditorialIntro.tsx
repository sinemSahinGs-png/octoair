"use client";

import { motion, useReducedMotion } from "framer-motion";
import { INTRO_FEATURES } from "@/lib/articles";
import { premiumEase } from "@/lib/motion";

const HEADING_CHUNKS = [
  "Havacılığı sade,",
  "derinlikli ve anlaşılır",
  "şekilde anlatıyoruz.",
] as const;

const PARAGRAPH_CHUNKS = [
  "Uçuş prensiplerinden kokpit sistemlerine,",
  "CRM’den vaka analizlerine kadar",
  "havacılığı merak eden herkes için premium içerikler.",
] as const;

const viewport = { once: true, amount: 0.3 } as const;

const phrase = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.82, ease: premiumEase },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: premiumEase },
  },
};

export default function EditorialIntro() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section id="platform" className="section-shell bg-[#05070A]">
        <div className="section-divider" />
        <div className="relative z-[1] mx-auto max-w-[1200px]">
          <p className="section-label mb-4" lang="en">
            OCTO AIR
          </p>
          <h2 className="font-heading max-w-3xl text-[clamp(1.7rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[#F2F7FF]">
            Havacılığı sade, derinlikli ve anlaşılır şekilde anlatıyoruz.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[rgba(242,247,255,0.7)] sm:mt-5 sm:text-[16px]">
            Uçuş prensiplerinden kokpit sistemlerine, CRM’den vaka analizlerine kadar havacılığı merak eden
            herkes için premium içerikler.
          </p>
          <div className="mt-9 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
            {INTRO_FEATURES.map((item) => (
              <div key={item.title} className="cockpit-panel h-full px-5 py-5">
                <div className="mb-3 h-px w-9 bg-gradient-to-r from-[#56D7FF] to-transparent" />
                <h3 className="font-heading text-[1.02rem] font-medium text-[#F2F7FF]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[rgba(242,247,255,0.68)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const headingVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.82, delay: 0.16 + i * 0.22, ease: premiumEase },
    }),
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.78, delay: 0.9 + i * 0.16, ease: premiumEase },
    }),
  };

  return (
    <section id="platform" className="section-shell bg-[#05070A]">
      <div className="section-divider" />
      <div className="ambient-glow left-[-8%] top-8 h-64 w-64 bg-[#3DA5FF]/30" />
      <div className="ambient-glow right-[-4%] bottom-0 h-56 w-56 bg-[#56D7FF]/18" />

      <motion.div
        className="relative z-[1] mx-auto max-w-[1200px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.p
          lang="en"
          className="section-label mb-4"
          variants={phrase}
        >
          OCTO AIR
        </motion.p>

        <h2 className="font-heading max-w-3xl text-[clamp(1.7rem,4vw,3.2rem)] font-medium leading-[1.18] tracking-[-0.04em] text-[#F2F7FF]">
          {HEADING_CHUNKS.map((chunk, index) => (
            <motion.span
              key={chunk}
              className="intro-phrase mr-[0.28em] inline-block last:mr-0"
              custom={index}
              variants={headingVariants}
            >
              {chunk}
            </motion.span>
          ))}
        </h2>

        <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-[rgba(242,247,255,0.7)] sm:mt-5 sm:text-[16px]">
          {PARAGRAPH_CHUNKS.map((chunk, index) => (
            <motion.span
              key={chunk}
              className="intro-phrase mr-[0.28em] inline-block last:mr-0"
              custom={index}
              variants={paragraphVariants}
            >
              {chunk}
            </motion.span>
          ))}
        </p>

        <motion.div
          className="mt-9 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 1.45,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {INTRO_FEATURES.map((item) => (
            <motion.div
              key={item.title}
              className="cockpit-panel intro-card h-full px-5 py-5"
              variants={cardItem}
            >
              <div className="mb-3 h-px w-9 bg-gradient-to-r from-[#56D7FF] to-transparent" />
              <h3 className="font-heading text-[1.02rem] font-medium text-[#F2F7FF]">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[rgba(242,247,255,0.68)]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
