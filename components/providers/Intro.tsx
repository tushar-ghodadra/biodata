"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/biodata";
import { easeInOutQuint, easeOutExpo } from "@/lib/motion";

/**
 * Opening blessing. The Sanskrit line writes itself in, a gold rule draws
 * beneath it, then two cream curtains part to reveal the page.
 * Skipped for returning visitors in the same session (see layout script).
 */
export function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    // Returning visitors: the overlay is already display:none via CSS, so
    // nothing to animate. Leave it mounted and skip the choreography.
    if (html.classList.contains("intro-seen")) return;
    html.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setDone(true);
      html.style.overflow = "";
      try {
        sessionStorage.setItem("tg-bio-intro", "1");
      } catch {}
    }, 2600);
    return () => {
      window.clearTimeout(t);
      html.style.overflow = "";
    };
  }, []);

  const chars = Array.from(site.blessing);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-intro
          aria-hidden
          className="fixed inset-0 z-[100] grid place-items-center"
          exit={{ pointerEvents: "none" }}
        >
          {/* Curtains */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-cream-2"
            exit={{ x: "-100%" }}
            transition={{ duration: 1.1, ease: easeInOutQuint }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-cream-2"
            exit={{ x: "100%" }}
            transition={{ duration: 1.1, ease: easeInOutQuint }}
          />
          {/* Content */}
          <motion.div
            className="relative flex flex-col items-center gap-5 px-6 text-center"
            exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-devanagari text-saffron text-3xl sm:text-5xl md:text-6xl" lang="sa">
              {chars.map((c, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.25 + i * 0.045, duration: 0.8, ease: easeOutExpo }}
                >
                  {c === " " ? " " : c}
                </motion.span>
              ))}
            </p>
            <motion.span
              className="h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.9, ease: easeOutExpo }}
            />
            <motion.span
              className="label"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 1.4, duration: 1, ease: easeOutExpo }}
            >
              {site.blessingLatin}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
