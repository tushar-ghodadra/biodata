"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImagePlus, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { photos, type Photo } from "@/content/photos";
import { easeOutExpo } from "@/lib/motion";
import { useFinePointer } from "@/lib/hooks";
import { Mandala } from "@/components/ui/Mandala";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Tile({
  p,
  i,
  onOpen,
}: {
  p: Photo;
  i: number;
  onOpen: (i: number) => void;
}) {
  const base =
    "group relative shrink-0 overflow-hidden rounded-[28px] border border-line-2 bg-cream-2 shadow-[0_30px_60px_-30px_rgb(43_26_14/0.4)]";
  const size = { aspectRatio: String(p.ratio) };
  if (!p.src) {
    return (
      <div
        className={`${base} h-[52vh] max-h-[560px] min-h-[320px] border-dashed border-gold/70`}
        style={size}
        aria-label={`${p.caption ?? "Photo"} coming soon`}
      >
        <div className="absolute inset-0 grid place-items-center text-gold/40">
          <Mandala detail="simple" className="h-[120%] w-[120%]" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-cream/90 to-cream/40 p-6 text-center">
          <ImagePlus className="size-6 text-saffron" />
          <p className="font-display text-2xl">{p.caption}</p>
          <p className="label">Photo coming soon</p>
        </div>
      </div>
    );
  }
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(i)}
      data-cursor="VIEW"
      className={`${base} h-[52vh] max-h-[560px] min-h-[320px] text-left`}
      style={size}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      aria-label={`Open ${p.alt}`}
    >
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes="(min-width: 768px) 45vh, 80vw"
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/60 to-transparent p-5 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="font-display text-2xl">{p.caption}</span>
        <span className="label text-cream/80">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.button>
  );
}

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (d: 1 | -1) => void;
}) {
  const p = photos[index];
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", key);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      role="dialog"
      aria-modal
      aria-label={p.alt}
      className="fixed inset-0 z-[95] grid place-items-center bg-ink/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
      >
        <X className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        className="absolute left-4 grid size-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        className="absolute right-4 grid size-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
      >
        <ChevronRight className="size-5" />
      </button>
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          className="relative max-h-[85vh] w-auto max-w-[92vw]"
          style={{
            aspectRatio: String(p.ratio),
            height: "min(85vh, calc(92vw / " + p.ratio + "))",
          }}
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -8 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          onClick={(e) => e.stopPropagation()}
        >
          {p.src ? (
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="92vw"
              className="rounded-2xl object-contain"
            />
          ) : (
            <div className="grid h-full w-full place-items-center rounded-2xl border border-dashed border-gold/70 text-cream">
              <p className="font-display text-3xl">{p.caption}</p>
            </div>
          )}
          <figcaption className="absolute -bottom-10 left-0 right-0 text-center text-sm text-cream/80">
            {p.caption} · {index + 1} / {photos.length}
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Desktop: a pinned section where vertical scroll drives the strip sideways.
 * Touch/narrow: a plain horizontal scroller with snap points.
 */
export function Gallery() {
  const fine = useFinePointer();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const u = () => setWide(mql.matches);
    u();
    mql.addEventListener("change", u);
    return () => mql.removeEventListener("change", u);
  }, []);
  const pinned = fine && wide;

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      setDistance(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // false during SSR/hydration, true once on the client: portals need a DOM.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: 1 | -1) =>
      setOpen((i) =>
        i === null ? i : (i + d + photos.length) % photos.length,
      ),
    [],
  );

  const strip = (
    <div
      ref={trackRef}
      className={`flex gap-5 px-5 md:gap-7 md:px-10 ${pinned ? "w-max" : "snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none]"}`}
    >
      {photos.map((p, i) => (
        <div key={i} className="snap-center">
          <Tile p={p} i={i} onOpen={setOpen} />
        </div>
      ))}
      <div className="w-[10vw] shrink-0" aria-hidden />
    </div>
  );

  return (
    <section id="gallery" className="relative scroll-mt-24">
      <div className="container-x pt-24 md:pt-36">
        <SectionHeading
          eyebrow="Chapter three"
          title="Moments & Memories"
          devanagari="कुछ यादें"
        />
      </div>

      {/* The scroll target must always be mounted, pinned or not. */}
      <div
        ref={sectionRef}
        style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
        className="relative"
      >
        {pinned ? (
          <div className="relative h-full">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
              <motion.div style={{ x }}>{strip}</motion.div>
              <div className="container-x mt-8 flex items-center gap-4">
                <span className="label">Scroll to explore</span>
                <div className="h-px flex-1 bg-line-2">
                  <motion.div
                    className="h-full bg-saffron"
                    style={{ width: progress }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 pb-24">{strip}</div>
        )}
      </div>

      {/* Portalled so it stacks above the fixed nav, outside <main>'s stacking context. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open !== null && (
              <Lightbox index={open} onClose={close} onStep={step} />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
