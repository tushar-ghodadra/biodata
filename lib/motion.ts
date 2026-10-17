import type { Transition, Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

export const smooth: Transition = { duration: 1, ease: easeOutExpo };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: smooth },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const viewport = { once: true, amount: 0.3 } as const;
