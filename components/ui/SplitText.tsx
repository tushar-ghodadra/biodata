"use client";

import { motion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Split unit. Characters for short display lines, words for sentences. */
  by?: "char" | "word";
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll. */
  immediate?: boolean;
};

/** Masked rise-in text. Each unit slides up from behind a clip. */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  by = "char",
  delay = 0,
  stagger = 0.035,
  immediate = false,
}: Props) {
  const units = by === "char" ? Array.from(text) : text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.6 } })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {units.map((u, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-baseline" aria-hidden>
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", rotate: 4, opacity: 0 },
              show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 1.1, ease: easeOutExpo } },
            }}
          >
            {u === " " ? " " : u}
          </motion.span>
          {by === "word" && i < units.length - 1 ? " " : null}
        </span>
      ))}
    </MotionTag>
  );
}
