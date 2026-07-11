"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { drawFrameCover } from "@/lib/drawFrame";
import { SEQUENCES, buildSequencePaths } from "@/lib/sequences";

const HERO_PATHS = buildSequencePaths(SEQUENCES.hero);

const NAV_ITEMS = [
  { label: "Anasayfa", href: "#hero" },
  { label: "Blog", href: "#blog" },
  { label: "Kategoriler", href: "#kategoriler" },
  { label: "Eğitim", href: "#egitim" },
  { label: "Havacılık Haberleri", href: "#haberler" },
  { label: "İletişim", href: "#iletisim" },
] as const;

export default function HeroScroll() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const { images, progress: loadProgress, isReady } = useImagePreloader(HERO_PATHS);
  const [menuOpen, setMenuOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(-1);

  const frameIndex = useMemo(() => {
    if (!images.length) return 0;
    return Math.min(images.length - 1, Math.floor(progress * images.length));
  }, [images.length, progress]);

  const copyOpacity = Math.max(0, 1 - progress / 0.45);
  const copyTranslate = progress * -48;
  const headerOpacity = progress < 0.35 ? 1 : Math.max(0, 1 - (progress - 0.35) / 0.25);
  const scrollHintOpacity = Math.max(0, 1 - progress / 0.2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastFrameRef.current = -1;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!isReady || !images.length) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    if (frameIndex === lastFrameRef.current) return;
    lastFrameRef.current = frameIndex;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const img = images[frameIndex];
      if (!img) return;
      drawFrameCover(ctx, img, window.innerWidth, window.innerHeight);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [frameIndex, images, isReady]);

  useEffect(() => {
    if (progress > 0.1) setMenuOpen(false);
  }, [progress]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[400vh] bg-[#05070A]"
      aria-label="Octo Air hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 block h-full w-full" />

        {/* Left-to-center readability gradient — keeps window visible on the right */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,7,10,0.88) 0%, rgba(5,7,10,0.62) 32%, rgba(5,7,10,0.18) 62%, rgba(5,7,10,0.02) 100%)",
          }}
        />

        {/* Glass header */}
        <header
          className="pointer-events-auto absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 md:px-8"
          style={{
            opacity: headerOpacity,
            transition: "opacity 120ms linear",
          }}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[rgba(6,19,38,0.45)] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md sm:px-5">
            <a
              href="#hero"
              className="font-heading shrink-0 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#F2F7FF]"
            >
              Octo Air
            </a>

            <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[12px] uppercase tracking-[0.16em] text-[rgba(242,247,255,0.68)] transition-colors hover:text-[#56D7FF]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#abone"
                className="hidden rounded-full border border-[#56D7FF]/45 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F2F7FF] transition-colors hover:border-[#56D7FF] hover:bg-[#56D7FF]/10 sm:inline-flex"
              >
                Abone Ol
              </a>

              <button
                type="button"
                aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#F2F7FF] lg:hidden"
              >
                <span className="sr-only">Menu</span>
                <span className="flex w-4 flex-col gap-1">
                  <span
                    className={`h-px w-full bg-current transition-transform ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`}
                  />
                  <span className={`h-px w-full bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                  <span
                    className={`h-px w-full bg-current transition-transform ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
                  />
                </span>
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="mt-2 rounded-2xl border border-white/10 bg-[rgba(6,19,38,0.92)] p-4 backdrop-blur-md lg:hidden">
              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[12px] uppercase tracking-[0.16em] text-[rgba(242,247,255,0.8)]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#abone"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex w-fit rounded-full border border-[#56D7FF]/45 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#F2F7FF]"
                >
                  Abone Ol
                </a>
              </nav>
            </div>
          )}
        </header>

        {/* Editorial copy block — left aligned, window stays dominant */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            opacity: copyOpacity,
            transform: `translate3d(0, ${copyTranslate}px, 0)`,
            willChange: "opacity, transform",
          }}
        >
          <div className="absolute left-6 top-[22vh] max-w-[760px] pr-6 sm:left-[5vw] sm:top-[28vh] sm:pr-0 md:left-[5vw]">
            <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.28em] text-[#56D7FF]">
              Havacılığa dair her şey
            </p>

            <h1 className="font-heading max-w-[18ch] text-[clamp(48px,7vw,112px)] font-medium leading-[0.92] tracking-[-0.055em] text-[#F2F7FF]">
              Havacılığı farklı bir pencereden keşfet.
            </h1>

            <p className="mt-6 max-w-[34rem] text-[clamp(16px,1.35vw,22px)] leading-[1.6] text-[rgba(255,255,255,0.72)]">
              Haberler, analizler, eğitim içerikleri ve ilham veren havacılık hikâyeleri tek bir premium
              platformda.
            </p>

            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#blog"
                className="inline-flex items-center justify-center rounded-full border border-[#3DA5FF]/50 bg-[linear-gradient(135deg,#081A33_0%,#0B2A52_45%,#123A6B_100%)] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#F2F7FF] shadow-[0_0_24px_rgba(61,165,255,0.22)] transition-transform hover:scale-[1.02]"
              >
                İçerikleri Keşfet
              </a>
              <a
                href="#son-yazilar"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[rgba(242,247,255,0.78)] backdrop-blur-sm transition-colors hover:border-white/35 hover:text-[#F2F7FF]"
              >
                Son Yazılar
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[rgba(242,247,255,0.55)]">
            SCROLL
          </span>
          <div className="relative h-10 w-px overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#56D7FF] via-[#56D7FF]/40 to-transparent shadow-[0_0_12px_rgba(86,215,255,0.55)]" />
          </div>
        </div>

        {/* Preload overlay — same bg as hero to avoid layout/color jump */}
        {!isReady && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#05070A]">
            <span className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#56D7FF]/80">
              Octo Air
            </span>
            <div className="h-px w-44 overflow-hidden bg-white/10">
              <div
                className="h-full bg-[#56D7FF]/80 transition-[width] duration-150"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <span className="mt-3 text-[10px] tracking-widest text-white/35">
              {Math.round(loadProgress * 100)}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
