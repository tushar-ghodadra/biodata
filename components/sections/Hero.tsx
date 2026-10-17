"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { ArrowDown, Calendar, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";
import { birth, site } from "@/content/biodata";
import { easeOutExpo } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";
import { Petals } from "@/components/effects/Petals";
import { Magnetic } from "@/components/ui/Magnetic";
import { Mandala } from "@/components/ui/Mandala";
import { SplitText } from "@/components/ui/SplitText";
import { Tilt } from "@/components/ui/Tilt";

const facts = [
  { icon: Calendar, label: "Born", value: birth.date },
  { icon: MapPin, label: "From", value: birth.place },
  { icon: Sparkles, label: "Rashi", value: `${birth.rashi} ${birth.rashiSymbol}` },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const smoothRotate = useSpring(rotate, { stiffness: 60, damping: 20 });

  return (
    <section ref={ref} id="top" className="relative isolate min-h-dvh overflow-hidden pt-28 pb-20 md:pt-32">
      <Petals className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-80" />

      <div className="container-x grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 order-2 md:order-1">
          <motion.p
            className="font-devanagari text-saffron text-xl sm:text-2xl"
            lang="sa"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: easeOutExpo }}
          >
            {site.blessing}
          </motion.p>

          <h1 className="font-display mt-5 text-[13vw] leading-[0.92] font-medium tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            <SplitText text={site.firstName} immediate delay={0.35} className="block" />
            <SplitText text={site.lastName} immediate delay={0.6} className="text-gold block italic font-normal" />
          </h1>

          <motion.p
            className="mt-6 max-w-md text-lg text-ink-2 text-balance"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: easeOutExpo }}
          >
            {site.tagline}. A gentle introduction, with warm regards from the Ghodadra family.
          </motion.p>

          <motion.ul
            className="mt-8 flex flex-wrap gap-2.5"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 1.25 }}
          >
            {facts.map(({ icon: Icon, label, value }) => (
              <motion.li
                key={label}
                variants={{ hidden: { opacity: 0, y: 12, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
                className="flex items-center gap-2 rounded-full border border-line-2 bg-cream/70 px-3.5 py-2 text-sm backdrop-blur"
              >
                <Icon className="size-3.5 text-saffron" />
                <span className="text-muted">{label}</span>
                <span className="font-medium">{value}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1, ease: easeOutExpo }}
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToId("personal")}
                className="group relative overflow-hidden rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_18px_40px_-18px_rgb(154_77_11/0.8)]"
              >
                <span className="relative z-10">Read the biodata</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-saffron-light to-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToId("gallery")}
                className="rounded-full border border-line-2 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-gold hover:bg-gold-light/40"
              >
                View gallery
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div style={{ y: portraitY }} className="relative order-1 mx-auto w-[72vw] max-w-[380px] md:order-2 md:w-full md:max-w-[440px]">
          <div className="pointer-events-none absolute inset-[-28%] -z-10 text-gold">
            <Mandala rotate={smoothRotate} className="h-full w-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.4, ease: easeOutExpo }}
          >
            <Tilt className="arch relative aspect-[4/5] overflow-hidden border-[6px] border-cream shadow-[0_40px_80px_-30px_rgb(43_26_14/0.45),0_0_0_1px_rgb(201_162_77/0.6)]">
              <Image
                src={site.portrait}
                alt={`${site.name} portrait`}
                fill
                priority
                sizes="(min-width: 768px) 440px, 72vw"
                className="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-saffron-deep/30 via-transparent to-transparent" />
            </Tilt>
          </motion.div>

          {/* Floating name badge */}
          <motion.div
            className="animate-float absolute -right-3 bottom-8 rounded-2xl border border-line-2 bg-cream/90 px-4 py-3 shadow-lg backdrop-blur md:-right-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 1, ease: easeOutExpo }}
          >
            <p className="label">Software Engineer</p>
            <p className="font-display mt-0.5 text-xl leading-none">B.E. · ₹29.2 LPA</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToId("personal")}
        aria-label="Scroll to personal details"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: fade }}
      >
        <span className="label">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
