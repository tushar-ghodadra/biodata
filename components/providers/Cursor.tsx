"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

type Mode = "default" | "hover" | "label" | "text";

/** Gold dot + trailing ring. Elements opt into a label with `data-cursor="VIEW"`. */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.55 });
  const ry = useSpring(y, { stiffness: 420, damping: 36, mass: 0.55 });

  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled?.dataset.cursor) {
        setMode("label");
        setLabel(labelled.dataset.cursor);
        return;
      }
      if (target.closest("a, button, [role='button'], summary, select")) {
        setMode("hover");
        return;
      }
      if (target.closest("p, h1, h2, h3, blockquote, li, dd, dt")) {
        setMode("text");
        return;
      }
      setMode("default");
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = {
    default: { width: 34, height: 34, borderRadius: 999, backgroundColor: "rgba(201,162,77,0)", borderColor: "rgba(43,26,14,0.35)" },
    hover: { width: 60, height: 60, borderRadius: 999, backgroundColor: "rgba(201,162,77,0.14)", borderColor: "rgba(154,77,11,0.8)" },
    label: { width: 92, height: 92, borderRadius: 999, backgroundColor: "rgba(154,77,11,0.96)", borderColor: "rgba(154,77,11,1)" },
    text: { width: 3, height: 30, borderRadius: 2, backgroundColor: "rgba(154,77,11,0.9)", borderColor: "rgba(154,77,11,0)" },
  }[mode];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute top-0 left-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center border"
        style={{ x: rx, y: ry }}
        animate={{ ...ring, opacity: visible ? 1 : 0, scale: pressed ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.6 }}
      >
        <motion.span
          className="text-[0.62rem] font-semibold tracking-[0.22em] text-cream"
          animate={{ opacity: mode === "label" ? 1 : 0, scale: mode === "label" ? 1 : 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {label}
        </motion.span>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron"
        style={{ x, y }}
        animate={{ opacity: visible && mode === "default" ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
