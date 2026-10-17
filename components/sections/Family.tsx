"use client";

import { motion } from "motion/react";
import { Heart, Home } from "lucide-react";
import { family, site, type Member } from "@/content/biodata";
import { easeOutExpo } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const show = { once: true, amount: 0.5 } as const;

function Person({ m, highlight = false, delay = 0 }: { m: Member; highlight?: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={show}
      transition={{ delay, duration: 1, ease: easeOutExpo }}
      className={`relative w-full max-w-xs rounded-3xl p-6 text-center ${
        highlight ? "bg-saffron text-cream shadow-[0_30px_60px_-25px_rgb(154_77_11/0.7)]" : "hairline bg-cream/80 backdrop-blur-sm"
      }`}
    >
      <span className={`label ${highlight ? "text-gold-light" : ""}`}>{m.relation}</span>
      <p className="font-display mt-2 text-2xl font-medium tracking-tight sm:text-3xl">{m.name}</p>
      {m.note && <p className={`mt-1 text-sm ${highlight ? "text-cream/80" : "text-muted"}`}>{m.note}</p>}
    </motion.div>
  );
}

/** Lines are animated with scale so they survive any responsive layout. */
function LineX({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-px bg-gradient-to-r from-gold via-gold-deep to-gold ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={show}
      transition={{ delay, duration: 1, ease: easeOutExpo }}
    />
  );
}
function LineY({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`block w-px origin-top bg-gradient-to-b from-gold via-gold-deep to-gold ${className}`}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={show}
      transition={{ delay, duration: 1, ease: easeOutExpo }}
    />
  );
}

export function Family() {
  return (
    <section id="family" className="paper relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="Chapter two" title="The Family" devanagari="पारिवारिक विवरण" />

        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center">
          {/* Parents */}
          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center md:gap-0">
            <Person m={family.father} />
            <div className="flex items-center md:w-28">
              <LineX delay={0.4} className="hidden w-full origin-left md:block" />
              <LineY delay={0.4} className="h-8 md:hidden" />
              <motion.span
                className="grid size-10 shrink-0 place-items-center rounded-full border border-gold bg-cream text-saffron"
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={show}
                transition={{ delay: 0.8, duration: 0.9, ease: easeOutExpo }}
              >
                <Heart className="size-4 fill-current" />
              </motion.span>
              <LineX delay={0.4} className="hidden w-full origin-right md:block" />
              <LineY delay={0.4} className="h-8 md:hidden" />
            </div>
            <Person m={family.mother} delay={0.15} />
          </div>

          {/* Down to children */}
          <LineY delay={1} className="h-14" />

          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-center md:gap-10">
            <Person m={{ relation: "Self", name: site.name, note: "Software Engineer" }} highlight delay={1.2} />
            {family.siblings.map((s, i) => (
              <Person key={s.name} m={s} delay={1.35 + i * 0.1} />
            ))}
          </div>

          <Reveal delay={1.5} className="mt-12 flex items-center gap-3 rounded-full border border-line-2 bg-cream/80 px-5 py-2.5 text-sm">
            <Home className="size-4 text-saffron" />
            <span className="text-muted">Home</span>
            <span className="font-medium">{family.home}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
