"use client";

import { useId } from "react";

/** Static airplane-window neon ring (no traveling light). */
export function WindowNeonRing({ intensity = "strong" }: { intensity?: "soft" | "strong" }) {
  const rawId = useId().replace(/:/g, "");
  const glowId = `win-glow-${rawId}`;

  return (
    <svg
      className={`window-neon-ring window-neon-ring-${intensity}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter
          id={glowId}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="window-neon-base"
        fill="none"
        vectorEffect="non-scaling-stroke"
        d="M16,3.5 C6,3.5 2,9 1.5,18 C0.5,42 0.5,58 1.5,82 C2,91 6,96.5 16,96.5 L84,96.5 C94,96.5 98,91 98.5,82 C99.5,58 99.5,42 98.5,18 C98,9 94,3.5 84,3.5 Z"
      />

      <path
        className="window-neon-stroke"
        fill="none"
        vectorEffect="non-scaling-stroke"
        filter={`url(#${glowId})`}
        d="M16,3.5 C6,3.5 2,9 1.5,18 C0.5,42 0.5,58 1.5,82 C2,91 6,96.5 16,96.5 L84,96.5 C94,96.5 98,91 98.5,82 C99.5,58 99.5,42 98.5,18 C98,9 94,3.5 84,3.5 Z"
      />
    </svg>
  );
}
