import { site } from "@/content/biodata";

const items = [site.blessing, site.name, "Junagadh", "Software Engineer", "शुभ विवाह", "Keshod, Gujarat"];

/** Slow gold ticker used as a section divider. */
export function Marquee() {
  const row = [...items, ...items];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-line bg-cream-2/70 py-4 mask-fade-x">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-medium tracking-[0.2em] text-ink-2 uppercase">
            <span className={/[ऀ-ॿ]/.test(t) ? "font-devanagari text-base normal-case tracking-normal" : ""}>{t}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
