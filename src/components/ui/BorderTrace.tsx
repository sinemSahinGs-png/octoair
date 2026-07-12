"use client";

import { useEffect, useId, useRef, useState } from "react";

export type BorderTraceShape =
  | "pill"
  | "window-l1"
  | "window-l2"
  | "rounded"
  | "panel";

type BorderTraceProps = {
  shape?: BorderTraceShape;
  /** Featured / primary CTAs use a stronger idle glow */
  intensity?: "subtle" | "strong";
  className?: string;
};

function radiiFor(shape: BorderTraceShape, w: number, h: number, narrow: boolean) {
  switch (shape) {
    case "pill":
      return { rx: h / 2, ry: h / 2 };
    case "window-l1":
      if (narrow) {
        return {
          rx: Math.min(28, w / 2),
          ry: Math.min(40, h / 2),
        };
      }
      return {
        rx: Math.min(w * 0.34, w / 2),
        ry: Math.min(h * 0.2, h / 2),
      };
    case "window-l2":
      if (narrow) {
        return {
          rx: Math.min(22, w / 2),
          ry: Math.min(30, h / 2),
        };
      }
      return {
        rx: Math.min(Math.max(w * 0.08, 26), w / 2),
        ry: Math.min(Math.max(h * 0.12, 34), h / 2),
      };
    case "panel":
      return { rx: 16, ry: 16 };
    default:
      return { rx: 14, ry: 14 };
  }
}

export function BorderTrace({
  shape = "rounded",
  intensity = "subtle",
  className = "",
}: BorderTraceProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const reactId = useId().replace(/:/g, "");
  const glowId = `bt-glow-${reactId}`;
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;

    const measure = () => {
      const rect = parent.getBoundingClientRect();
      setBox({
        w: Math.round(rect.width * 10) / 10,
        h: Math.round(rect.height * 10) / 10,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const inset = 1.5;
  const w = Math.max(0, box.w - inset * 2);
  const h = Math.max(0, box.h - inset * 2);
  const { rx, ry } = radiiFor(shape, w, h, narrow);
  const crx = Math.min(rx, w / 2);
  const cry = Math.min(ry, h / 2);

  const segment = intensity === "strong" ? 16 : 11;
  const gap = 100 - segment;
  const ready = w > 4 && h > 4;

  return (
    <span
      ref={wrapRef}
      className={`border-trace border-trace-${intensity} ${className}`.trim()}
      aria-hidden
    >
      {ready && (
        <svg
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id={glowId}
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Static outline */}
          <rect
            x={inset}
            y={inset}
            width={w}
            height={h}
            rx={crx}
            ry={cry}
            className="border-trace-base"
            pathLength={100}
          />

          {/* Traveling light segment along the same path */}
          <rect
            x={inset}
            y={inset}
            width={w}
            height={h}
            rx={crx}
            ry={cry}
            className="border-trace-run"
            pathLength={100}
            strokeDasharray={`${segment} ${gap}`}
            strokeDashoffset={0}
            filter={`url(#${glowId})`}
          />
        </svg>
      )}
    </span>
  );
}
