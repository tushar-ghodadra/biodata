"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/content/biodata";
import { scrollToId } from "@/lib/scroll";
import { easeOutExpo } from "@/lib/motion";

const links = [
  { id: "personal", label: "Personal" },
  { id: "family", label: "Family" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

/** Floating top bar. Hides on scroll down, returns on scroll up. */
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setSolid(y > 24);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: hidden ? 0 : 0.1 }}
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 ${
          solid ? "border-line-2 bg-cream/85 shadow-[0_10px_40px_-20px_rgb(43_26_14/0.35)] backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
        aria-label="Primary"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
          className="font-display ml-2 flex items-center gap-2 text-xl font-semibold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-full bg-saffron text-sm text-cream">TG</span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(l.id);
                }}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-sand/60 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
