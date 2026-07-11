# Jesko Jets Clone — Implementation Blueprint

> **Purpose:** This document is a build-ready prompt for a coding agent. It translates the Jesko Jets cinematic landing experience into a Next.js application using canvas scrollytelling, Framer Motion, Lenis smooth scroll, and the pre-generated assets in `/public`.

---

## 0. Reference Analysis (Visual & Interaction)

> **Note:** No screen recording was present in the workspace at plan time. This blueprint is derived from the live [Jesko Jets](https://www.jeskojets.com/) site structure, interaction patterns, and the asset requirements provided.

### Experience Summary

| Zone | Visual | Interaction |
|------|--------|-------------|
| **Hero** | Full-viewport dark luxury canvas; clouds animate through an airplane window motif; oversized editorial typography | Scroll-driven frame sequence (`sequence-1`); sticky viewport; headline reveals with letter-spacing animation |
| **About / Narrative** | Sky gradients, soft cloud overlays, long-form copy blocks | Parallax fade/slide on scroll; section cross-fades |
| **Fleet / Plane Morph** | Top-down jet silhouette morphs across scroll; G650ER specs + blueprint | Scroll-driven frame sequence (`sequence-2`); sticky canvas; spec rows stagger in |
| **Advantages** | Four benefit cards (Pets, 24/7, Onboard, Efficient) | Horizontal snap or vertical stagger reveal |
| **Global / Globe** | Rotating globe with city pins; "Fly anywhere" marquee | Looping `globe-loop.mp4` as ambient background; city names animate on scroll |
| **Contact / Footer** | Minimal form, phone/email CTAs, legal links | Form submit state; footer pinned over globe |

### Motion Principles

1. **Scroll is the director** — canvas frame index maps 1:1 to scroll progress.
2. **Luxury pacing** — Lenis smooth scroll with `lerp: 0.08–0.12`; no snappy easing.
3. **Typography leads** — wide tracking (`0.2em–0.4em`), light weights, high contrast white on `#050505`.
4. **Depth via layering** — canvas (z-0) → gradient overlays (z-10) → copy/UI (z-20).
5. **Performance first** — preload all sequence frames before enabling scroll scrubbing.

---

## 1. Technology Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js 14+ App Router** | Current repo uses Next 16; APIs are compatible. Use App Router (`src/app/`). |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS v4** | `@import "tailwindcss"` in `globals.css` |
| Animation (UI) | **Framer Motion** | Text reveals, section entrances, form states |
| Smooth Scroll | **Lenis** (`@studio-freight/lenis`) | Wrap app in `SmoothScrollProvider` |
| Canvas | **Native Canvas 2D** | No WebGL required for JPEG sequences |
| Fonts | **Geist Sans** (primary) or **Inter** | Already configured via `next/font` |

### Install Dependencies

```bash
npm install framer-motion @studio-freight/lenis
npm install -D @types/node
```

---

## 2. Asset Inventory (Use Exactly As Specified)

### Expected `/public` Structure

```text
public/
├── sequence-1/          # Hero cloud animation (JPEG sequence)
│   ├── 0001.jpg         # (or frame_0001.jpg — detect at runtime)
│   ├── 0002.jpg
│   └── ...
├── sequence-2/          # Plane morph animation (JPEG sequence)
│   ├── 0001.jpg
│   └── ...
└── globe-loop.mp4       # Looping globe background video
```

### Asset Rules

| Asset | Path | Usage |
|-------|------|-------|
| Hero clouds | `/sequence-1/*.jpg` | `HeroScroll.tsx` canvas frames |
| Plane morph | `/sequence-2/*.jpg` | `PlaneMorph.tsx` canvas frames |
| Globe | `/globe-loop.mp4` | `Globe.tsx` HTML5 `<video>` background |

### Frame Naming Convention

Implement a utility `getSequencePaths(folder, count)` that supports:

- Zero-padded: `0001.jpg`, `0002.jpg`, … `0150.jpg`
- Prefixed: `frame_0001.jpg`

**Discovery strategy:** At build time, document expected frame count in `src/lib/sequences.ts`:

```ts
export const SEQUENCES = {
  hero: { folder: "/sequence-1", frameCount: 120, ext: "jpg" },
  plane: { folder: "/sequence-2", frameCount: 90, ext: "jpg" },
} as const;
```

> **Agent action:** Count actual files in each folder on first run and update `frameCount` to match.

---

## 3. Design System

### Color Palette

```css
:root {
  --bg-primary: #050505;
  --bg-elevated: #0a0a0a;
  --text-primary: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.55);
  --text-subtle: rgba(255, 255, 255, 0.35);
  --accent-gold: #c5b49e;
  --border-subtle: rgba(255, 255, 255, 0.08);
}
```

### Typography

| Role | Font | Size (mobile → desktop) | Weight | Tracking |
|------|------|-------------------------|--------|----------|
| Display | Geist Sans | `clamp(2.5rem, 8vw, 5.5rem)` | 300 | `0.15em` |
| H2 | Geist Sans | `clamp(1.5rem, 4vw, 3rem)` | 300 | `0.12em` |
| Eyebrow | Geist Sans | `10px` | 600 | `0.35em` uppercase |
| Body | Geist Sans | `14–16px` | 300 | `0.02em` |
| Stat | Geist Sans | `40px` | 300 | normal |

### Layout Tokens

- Max content width: `1200px`
- Section horizontal padding: `px-6 md:px-12 lg:px-16`
- Sticky scroll sections: `h-[400vh]` outer, `h-screen sticky top-0` inner
- Z-index scale: canvas `0`, overlay `10`, content `20`, nav `50`

---

## 4. Full Code Structure

```text
src/
├── app/
│   ├── layout.tsx                 # Fonts, metadata, SmoothScrollProvider
│   ├── page.tsx                   # Composes all sections in order
│   └── globals.css                # Tailwind + design tokens
├── components/
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx
│   ├── canvas/
│   │   ├── ScrollCanvas.tsx       # Shared canvas scrollytelling engine
│   │   ├── HeroScroll.tsx         # sequence-1 wrapper
│   │   └── PlaneMorph.tsx         # sequence-2 wrapper
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── About.tsx
│   │   ├── FleetSpecs.tsx
│   │   ├── Advantages.tsx
│   │   ├── Globe.tsx              # globe-loop.mp4 + city marquee
│   │   └── Contact.tsx
│   └── ui/
│       ├── RevealText.tsx         # Framer Motion letter/word reveal
│       ├── SectionEyebrow.tsx
│       ├── StatBlock.tsx
│       └── MagneticButton.tsx
├── hooks/
│   ├── useImagePreloader.ts
│   ├── useScrollProgress.ts
│   └── useLenis.ts
└── lib/
    ├── sequences.ts               # Frame paths + counts
    ├── drawFrame.ts               # Canvas draw helper (cover/contain)
    └── content.ts                 # All luxury copy (single source of truth)
```

---

## 5. Core Hooks

### 5.1 `useImagePreloader`

**Purpose:** Load and cache all JPEG frames before scroll scrubbing begins.

```ts
// src/hooks/useImagePreloader.ts
"use client";

import { useEffect, useState } from "react";

type PreloadState = {
  images: HTMLImageElement[];
  progress: number;   // 0–1
  isReady: boolean;
};

export function useImagePreloader(paths: string[]): PreloadState {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!paths.length) return;

    let loaded = 0;
    const imgs: HTMLImageElement[] = [];
    let cancelled = false;

    paths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        loaded++;
        imgs[i] = img;
        setProgress(loaded / paths.length);
        if (loaded === paths.length) {
          setImages([...imgs]);
          setIsReady(true);
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load frame: ${src}`);
      };
    });

    return () => { cancelled = true; };
  }, [paths]);

  return { images, progress, isReady };
}
```

### 5.2 `useScrollProgress`

**Purpose:** Map an element's scroll position to normalized progress `0–1`.

```ts
// src/hooks/useScrollProgress.ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / scrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { ref, progress };
}
```

---

## 6. Canvas Scrollytelling Engine

### 6.1 Shared `ScrollCanvas.tsx`

Reusable sticky canvas section used by both `HeroScroll` and `PlaneMorph`.

**Behavior:**

1. Outer wrapper: `relative h-[400vh]` (scroll distance).
2. Inner sticky: `sticky top-0 h-screen w-full overflow-hidden`.
3. `<canvas>` fills viewport (`w-full h-full`).
4. On `progress` change → `frameIndex = Math.floor(progress * (frameCount - 1))`.
5. Draw frame with `object-fit: cover` logic (center-crop to canvas).
6. Show loading overlay until `useImagePreloader.isReady`.

```ts
// src/lib/drawFrame.ts
export function drawFrameCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvasW / canvasH;
  let drawW, drawH, offsetX, offsetY;

  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = img.width * (canvasH / img.height);
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = canvasW;
    drawH = img.height * (canvasW / img.width);
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}
```

### 6.2 `HeroScroll.tsx`

```tsx
// src/components/canvas/HeroScroll.tsx
"use client";

import ScrollCanvas from "./ScrollCanvas";
import { SEQUENCES, buildSequencePaths } from "@/lib/sequences";
import { RevealText } from "@/components/ui/RevealText";
import { HERO_COPY } from "@/lib/content";

const paths = buildSequencePaths(SEQUENCES.hero);

export default function HeroScroll() {
  return (
    <section id="hero" className="relative bg-[#050505]">
      <ScrollCanvas
        paths={paths}
        scrollHeight="400vh"
        overlay={
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
            <header className="flex justify-between items-center pointer-events-auto">
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-semibold">
                Jesko Jets
              </span>
              <nav className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase text-white/50">
                <a href="#about">About</a>
                <a href="#fleet">Our Fleet</a>
                <a href="#advantages">Advantages</a>
                <a href="#global">Global</a>
              </nav>
            </header>

            <div className="flex-1 flex flex-col justify-center">
              <RevealText
                text={HERO_COPY.headline1}
                className="text-[clamp(2.5rem,8vw,5.5rem)] font-light tracking-[0.15em] text-white"
              />
              <RevealText
                text={HERO_COPY.headline2}
                className="text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[0.12em] text-white/60 mt-4"
                delay={0.3}
              />
            </div>

            <div className="flex flex-col items-center text-white/40">
              <span className="text-[8px] tracking-[0.25em] uppercase mb-2">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
          </div>
        }
      />
    </section>
  );
}
```

### 6.3 `PlaneMorph.tsx`

Same `ScrollCanvas` engine, different sequence + copy overlay.

```tsx
// src/components/canvas/PlaneMorph.tsx
"use client";

import ScrollCanvas from "./ScrollCanvas";
import { SEQUENCES, buildSequencePaths } from "@/lib/sequences";
import { FLEET_COPY } from "@/lib/content";
import { motion, useTransform } from "framer-motion";

const paths = buildSequencePaths(SEQUENCES.plane);

export default function PlaneMorph() {
  return (
    <section id="fleet" className="relative bg-[#050505]">
      <ScrollCanvas
        paths={paths}
        scrollHeight="400vh"
        overlay={
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12 pb-24">
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-4">
              {FLEET_COPY.eyebrow}
            </p>
            <h2 className="text-[clamp(2rem,6vw,4rem)] font-light tracking-[0.1em] text-white">
              {FLEET_COPY.title}
            </h2>
            <p className="text-white/50 max-w-md mt-4 text-sm leading-relaxed">
              {FLEET_COPY.description}
            </p>
          </div>
        }
      />
      {/* FleetSpecs.tsx renders below the sticky section */}
    </section>
  );
}
```

---

## 7. Globe Footer (`Globe.tsx`)

### Requirements

- HTML5 `<video>` with `src="/globe-loop.mp4"`
- Attributes: `autoPlay`, `loop`, `muted`, `playsInline`
- CSS: `object-cover`, full viewport width, positioned as background (`z-0`)
- Foreground: city marquee, stats, contact form (`z-20`)

```tsx
// src/components/sections/Globe.tsx
"use client";

import { GLOBAL_COPY, CITIES } from "@/lib/content";
import { motion } from "framer-motion";

export default function Globe() {
  return (
    <section id="global" className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        src="/globe-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        playsInline
        aria-hidden="true"
      />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-20 px-6 md:px-12 py-24 max-w-[1200px] mx-auto">
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-6">
          {GLOBAL_COPY.eyebrow}
        </p>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light tracking-[0.1em] text-white mb-12">
          {GLOBAL_COPY.title}
        </h2>

        {/* City marquee */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-16">
          {CITIES.map((city) => (
            <motion.span
              key={city}
              className="text-sm text-white/40 tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {city}
            </motion.span>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
          <div>
            <span className="block text-4xl font-light text-white">5K+</span>
            <span className="text-[9px] tracking-widest uppercase text-white/50 mt-1">
              Flights arranged
            </span>
          </div>
          <div>
            <span className="block text-4xl font-light text-white">174</span>
            <span className="text-[9px] tracking-widest uppercase text-white/50 mt-1">
              Countries supported
            </span>
          </div>
          <div>
            <span className="block text-4xl font-light text-white">24/7</span>
            <span className="text-[9px] tracking-widest uppercase text-white/50 mt-1">
              Global operations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 8. Lenis Smooth Scroll Provider

```tsx
// src/components/providers/SmoothScrollProvider.tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

Wire in `src/app/layout.tsx`:

```tsx
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="bg-[#050505] text-white min-h-full">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
```

---

## 9. Page Composition (`src/app/page.tsx`)

```tsx
import HeroScroll from "@/components/canvas/HeroScroll";
import About from "@/components/sections/About";
import PlaneMorph from "@/components/canvas/PlaneMorph";
import FleetSpecs from "@/components/sections/FleetSpecs";
import Advantages from "@/components/sections/Advantages";
import Globe from "@/components/sections/Globe";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-[#050505]">
      <HeroScroll />
      <About />
      <PlaneMorph />
      <FleetSpecs />
      <Advantages />
      <Globe />
      <Contact />
    </main>
  );
}
```

---

## 10. Luxury Content (`src/lib/content.ts`)

Single source of truth for all copy. Agent must use this file — do not hardcode strings in components.

```ts
export const HERO_COPY = {
  headline1: "We are movement",
  headline2: "We are distinction",
  subhead:
    "Your freedom to enjoy life. Every flight is designed around your comfort, time, and ambitions.",
  cta: "To start the journey",
};

export const ABOUT_COPY = {
  eyebrow: "About",
  title: "Global private aviation",
  body: `Jesko Jets® is a private aviation operator with over 5,000 missions completed across 150+ countries. From international executives to global industries, our clients trust us to deliver on time, every time.`,
  pillars: [
    {
      title: "Direct Access to Private Travel",
      body: "Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, personalized travel experiences — from the first call to landing.",
    },
    {
      title: "Your Freedom to Enjoy Life",
      body: "We value your time above all. Jesko Jets gives you the freedom to live, work, and relax wherever life takes you — without compromise.",
    },
    {
      title: "Precision and Excellence",
      body: "Each detail of your flight — from route planning to in-flight service — reflects our dedication to perfection.",
    },
    {
      title: "Global Reach, Personal Touch",
      body: "With access to destinations in over 150 countries, Jesko Jets brings the world closer to you.",
    },
  ],
};

export const FLEET_COPY = {
  eyebrow: "Our Fleet",
  title: "Fly in Luxury",
  aircraft: "Gulfstream 650ER",
  tagline: "Luxury that moves with you",
  description:
    "Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.",
  specs: [
    { label: "Maximum operating range", value: "11,263 km" },
    { label: "Speed", value: "480 knots" },
    { label: "Passenger capacity", value: "Up to 12 seats (+1 cabin server)" },
    { label: "Endurance", value: "14 hrs" },
    { label: "Baggage capacity", value: "5.52 m³" },
    { label: "Cruising altitude", value: "15,544 m" },
    { label: "Cabin length", value: "14.05 m" },
    { label: "Cabin width", value: "2.49 m" },
    { label: "Cabin height", value: "1.92 m" },
  ],
};

export const ADVANTAGES_COPY = {
  eyebrow: "Advantages",
  title: "A Better Way to Fly",
  items: [
    {
      title: "Pets",
      body: "Traveling with pets on a private jet means comfort and peace of mind. Our dedicated team ensures seamless arrangements from documentation to onboard care.",
    },
    {
      title: "24/7 Availability",
      body: "Our team is available around the clock to handle any request, no matter the time zone or urgency.",
    },
    {
      title: "Onboard Services",
      body: "Every flight is tailored with personalized onboard services — from fine dining to seamless connectivity.",
    },
    {
      title: "Efficient",
      body: "Efficiency is at the core of every flight. Optimized routes, quick boarding, and smooth ground handling.",
    },
  ],
};

export const GLOBAL_COPY = {
  eyebrow: "Global",
  title: "Fly anywhere",
  subtitle: "Fly anywhere with total comfort and control",
};

export const CITIES = [
  "Nice", "Cairo", "Paris", "Singapore", "Marrakech", "Geneva",
  "Berlin", "Dubai", "Shanghai", "Riyadh", "Lagos", "Sydney",
  "Los Angeles", "Zurich", "Cape Town", "Doha", "São Paulo",
  "Mykonos", "Seoul", "Bangkok", "New York", "Hong Kong",
  "Mexico City", "London", "Melbourne", "Toronto", "Milan",
  "Abu Dhabi", "Tel Aviv", "Tokyo", "Miami",
];

export const CONTACT_COPY = {
  eyebrow: "Contact",
  title: "Book the flight",
  email: "info@jeskojets.com",
  phone: "+971 54 432 5050",
  legal:
    "© 2026 Jesko Jets. All rights reserved. All charter operations are executed by FAA-certified Part 135 air carriers.",
};
```

---

## 11. Performance Optimization Checklist

| Technique | Implementation |
|-----------|----------------|
| **Image preloading** | `useImagePreloader` loads all frames before enabling scroll scrub |
| **Canvas resize** | Debounce `resize` listener; set `canvas.width/height` to `devicePixelRatio` scaled dimensions |
| **RequestAnimationFrame** | Batch canvas redraws inside `requestAnimationFrame` — do not draw on every scroll event |
| **Frame index clamping** | `Math.min(frameCount - 1, Math.floor(progress * frameCount))` |
| **Video optimization** | `preload="metadata"` on globe video; serve compressed H.264 |
| **Lazy sections** | `dynamic(() => import(...), { ssr: false })` for canvas components |
| **Font subsetting** | Use `next/font` with `subsets: ["latin"]` only |
| **Loading state** | Show branded loader with `progress` % from preloader until `isReady` |

### Canvas RAF Pattern

```ts
const rafRef = useRef<number>(0);
const pendingFrame = useRef<number>(0);

useEffect(() => {
  pendingFrame.current = Math.floor(progress * (images.length - 1));
  cancelAnimationFrame(rafRef.current);
  rafRef.current = requestAnimationFrame(() => {
    const img = images[pendingFrame.current];
    if (img && ctx) drawFrameCover(ctx, img, canvasW, canvasH);
  });
}, [progress, images]);
```

---

## 12. Framer Motion Patterns

### `RevealText.tsx` — Staggered Word Reveal

```tsx
"use client";
import { motion } from "framer-motion";

export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.h1
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

### Section Entrance

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
```

---

## 13. `globals.css` Baseline

```css
@import "tailwindcss";

:root {
  --background: #050505;
  --foreground: #ffffff;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
}

*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: auto; } /* Lenis handles smooth scroll */

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: rgba(197, 180, 158, 0.3);
  color: #fff;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
```

---

## 14. Implementation Phases (Agent Task List)

### Phase 1 — Foundation
- [ ] Install `framer-motion`, `@studio-freight/lenis`
- [ ] Create `src/lib/sequences.ts`, `src/lib/content.ts`, `src/lib/drawFrame.ts`
- [ ] Update `globals.css` with design tokens
- [ ] Add `SmoothScrollProvider` to `layout.tsx`
- [ ] Verify assets exist: `/public/sequence-1/`, `/public/sequence-2/`, `/public/globe-loop.mp4`

### Phase 2 — Canvas Engine
- [ ] Implement `useImagePreloader` hook
- [ ] Implement `useScrollProgress` hook
- [ ] Build `ScrollCanvas.tsx` (shared engine)
- [ ] Build `HeroScroll.tsx` wired to `sequence-1`
- [ ] Build `PlaneMorph.tsx` wired to `sequence-2`
- [ ] Add loading overlay with preload progress bar

### Phase 3 — Content Sections
- [ ] Build `About.tsx` with pillar cards + Framer Motion reveals
- [ ] Build `FleetSpecs.tsx` spec table below plane morph
- [ ] Build `Advantages.tsx` four-column benefit grid
- [ ] Build `Globe.tsx` with `globe-loop.mp4` background
- [ ] Build `Contact.tsx` form with submit/success states

### Phase 4 — Polish
- [ ] Add `Navbar.tsx` (fixed, blur backdrop, scroll-aware hide/show)
- [ ] Responsive breakpoints (mobile: stack layout, reduce canvas scroll height to `300vh`)
- [ ] Accessibility: `prefers-reduced-motion` → skip canvas scrub, show first frame + static fallback
- [ ] SEO metadata in `layout.tsx`
- [ ] Lighthouse pass: LCP < 2.5s, no layout shift on canvas load

### Phase 5 — QA
- [ ] Test scroll scrubbing on Chrome, Safari, Firefox
- [ ] Test mobile Safari (`playsInline` on video)
- [ ] Verify all 3 assets load with zero 404s
- [ ] Test form validation and success state

---

## 15. Accessibility & Fallbacks

```tsx
// In ScrollCanvas.tsx
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  // Show first frame only, disable scroll scrubbing
  drawFrameCover(ctx, images[0], canvasW, canvasH);
  return;
}
```

- All `<video>` elements: `aria-hidden="true"` (decorative)
- All canvas sections: `aria-label="Animated visual"` on wrapper
- Nav links: keyboard focusable with visible focus ring
- Form inputs: proper `<label>` associations

---

## 16. Current Repo State vs Target

| Item | Current | Target |
|------|---------|--------|
| Next.js | 16.2.10 | 14+ (compatible) |
| Framer Motion | Not installed | Required |
| Lenis | Not installed | Required |
| Canvas components | None | `HeroScroll`, `PlaneMorph` |
| Assets | Only SVGs in `/public` | Add `sequence-1/`, `sequence-2/`, `globe-loop.mp4` |
| Sections | Static Tailwind placeholders | Replace with cinematic components |

---

## 17. Agent Execution Prompt (Copy-Paste Ready)

```
You are building a cinematic Jesko Jets clone in Next.js App Router.

Read implementation_plan.md in the project root and execute all phases in order.

Hard requirements:
1. Use /public/sequence-1/ for HeroScroll canvas frames
2. Use /public/sequence-2/ for PlaneMorph canvas frames
3. Use /public/globe-loop.mp4 for Globe section background video
4. Implement useImagePreloader to cache all sequence frames
5. Sticky scrollytelling sections use h-[400vh] outer + sticky h-screen inner
6. Use Framer Motion for text reveals and section entrances
7. Use @studio-freight/lenis for smooth scroll via SmoothScrollProvider
8. All copy lives in src/lib/content.ts
9. Background color is #050505, text is white, font is Geist Sans
10. Do not use split_components.sh or generated.tsx

Start with Phase 1. After each phase, run `npm run build` to verify no errors.
```

---

*Generated for the Octo Air / Jesko Jets clone project. Update `SEQUENCES.frameCount` values after asset files are placed in `/public`.*
