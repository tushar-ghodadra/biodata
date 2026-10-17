"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useFinePointer } from "@/lib/hooks";

/** 3D tilt toward the pointer, with a moving sheen. Mouse-only. */
export function Tilt({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 20 });
  const sheenX = useTransform(px, [0, 1], ["-40%", "140%"]);

  const move = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        style={{ opacity: fine ? 1 : 0 }}
      >
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          style={{ left: sheenX, skewX: -12 }}
        />
      </motion.div>
    </motion.div>
  );
}
