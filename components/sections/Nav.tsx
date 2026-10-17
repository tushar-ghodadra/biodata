"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const hide = y > prev && y > 160;
    setHidden(hide);
    if (hide) setMenuOpen(false);
    setSolid(y > 24);
  });

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[70] px-4 pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: hidden ? 0 : 0.1 }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <nav
          className={`flex w-full items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 ${
            solid || menuOpen
              ? "border-line-2 bg-cream/85 shadow-[0_10px_40px_-20px_rgb(43_26_14/0.35)] backdrop-blur-md"
              : "border-transparent bg-transparent"
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
            <span className="grid size-8 place-items-center rounded-full bg-saffron text-sm text-cream">
              TG
            </span>
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
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full bg-ink text-cream transition-colors hover:bg-saffron md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              id="mobile-menu"
              className="mt-2 flex flex-col gap-1 rounded-[28px] border border-line-2 bg-cream/95 p-2 shadow-[0_20px_50px_-20px_rgb(43_26_14/0.4)] backdrop-blur-md md:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            >
              {links.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    className="flex items-center justify-between rounded-[20px] px-4 py-3 text-base font-medium text-ink-2 transition-colors hover:bg-sand/60 hover:text-ink"
                  >
                    {l.label}
                    <span className="label text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
