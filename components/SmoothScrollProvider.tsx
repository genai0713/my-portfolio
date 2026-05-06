"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduce-motion");
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      syncTouch: false
    });

    document.documentElement.classList.add("lenis-smooth");

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, []);

  return children;
}
