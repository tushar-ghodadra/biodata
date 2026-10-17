"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp, viewport } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; amount?: number };

/** Fades + rises into view once, with optional delay. */
export function Reveal({ delay = 0, amount = viewport.amount, children, ...rest }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
