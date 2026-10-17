"use client";

import { useEffect } from "react";
import { registerLenis } from "@/lib/scroll";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/** Inertial scrolling for mouse/trackpad users only. */
export function SmoothScroll() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (!fine || reduce) return;
    let destroyed = false;
    let instance: import("lenis").default | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      instance = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 0.95 });
      registerLenis(instance);
    });

    return () => {
      destroyed = true;
      instance?.destroy();
      registerLenis(null);
    };
  }, [fine, reduce]);

  return null;
}
