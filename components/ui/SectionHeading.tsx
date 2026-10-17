import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

type Props = { eyebrow: string; title: string; devanagari?: string; align?: "center" | "left" };

export function SectionHeading({ eyebrow, title, devanagari, align = "center" }: Props) {
  const center = align === "center";
  return (
    <div className={center ? "flex flex-col items-center text-center" : "flex flex-col items-start"}>
      <Reveal className="flex items-center gap-3">
        <span className="h-px w-8 bg-gold" />
        <span className="label text-saffron">{eyebrow}</span>
        <span className="h-px w-8 bg-gold" />
      </Reveal>
      <SplitText
        as="h2"
        text={title}
        by="word"
        stagger={0.08}
        className="font-display mt-4 text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl"
      />
      {devanagari && (
        <Reveal delay={0.2} className="font-devanagari mt-2 text-lg text-muted" lang="hi">
          {devanagari}
        </Reveal>
      )}
      <Reveal delay={0.25} className="mt-5">
        <Ornament className="h-5 w-40 text-gold" />
      </Reveal>
    </div>
  );
}
