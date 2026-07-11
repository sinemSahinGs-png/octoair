"use client";

import { useEffect, useState } from "react";

type PreloadState = {
  images: HTMLImageElement[];
  progress: number;
  isReady: boolean;
};

export function useImagePreloader(paths: string[]): PreloadState {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!paths.length) return;

    let loaded = 0;
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(paths.length);

    paths.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;

      const onDone = () => {
        if (cancelled) return;
        loaded += 1;
        imgs[i] = img;
        setProgress(loaded / paths.length);
        if (loaded === paths.length) {
          setImages([...imgs]);
          setIsReady(true);
        }
      };

      img.onload = onDone;
      img.onerror = () => {
        console.warn(`Failed to load frame: ${src}`);
        onDone();
      };
    });

    return () => {
      cancelled = true;
    };
  }, [paths]);

  return { images, progress, isReady };
}
