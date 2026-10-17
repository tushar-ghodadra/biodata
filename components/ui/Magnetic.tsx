"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useFinePointer } from "@/lib/hooks";

/** Pulls its child gently toward the pointer. Mouse-only. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const move = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}
