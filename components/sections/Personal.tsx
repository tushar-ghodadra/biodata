"use client";

import { motion } from "motion/react";
import { Briefcase, Calendar, Clock, GraduationCap, IndianRupee, MapPin, Palette, Ruler, Star } from "lucide-react";
import type { ComponentType } from "react";
import { personal, type Detail } from "@/content/biodata";
import { fadeUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<Detail["icon"], ComponentType<{ className?: string }>> = {
  clock: Clock,
  star: Star,
  palette: Palette,
  ruler: Ruler,
  graduation: GraduationCap,
  briefcase: Briefcase,
  rupee: IndianRupee,
  calendar: Calendar,
  pin: MapPin,
};

function Card({ d, i }: { d: Detail; i: number }) {
  const Icon = icons[d.icon];
  return (
    <motion.li
      variants={fadeUp}
      className="spotlight group relative rounded-3xl bg-cream/80 p-6 backdrop-blur-sm"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        e.currentTarget.style.setProperty("--spot-opacity", "1");
      }}
      onPointerLeave={(e) => e.currentTarget.style.setProperty("--spot-opacity", "0")}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-sand text-saffron shadow-inner transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110">
          <Icon className="size-5" />
        </span>
        <span className="font-display text-4xl leading-none text-sand-2 transition-colors group-hover:text-gold">{String(i + 1).padStart(2, "0")}</span>
      </div>
      <dl className="mt-6">
        <dt className="label">{d.label}</dt>
        <dd className="font-display mt-1.5 text-2xl font-medium tracking-tight sm:text-3xl">
          {d.value}
          {d.hint && <span className="ml-2 text-base text-muted">{d.hint}</span>}
        </dd>
      </dl>
    </motion.li>
  );
}

export function Personal() {
  return (
    <section id="personal" className="relative scroll-mt-24 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="Chapter one" title="Personal Details" devanagari="व्यक्तिगत विवरण" />
        <motion.ul
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {personal.map((d, i) => (
            <Card key={d.label} d={d} i={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
