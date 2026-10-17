import { site } from "@/content/biodata";
import { Ornament } from "@/components/ui/Ornament";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-x flex flex-col items-center gap-4 text-center">
        <p className="font-devanagari text-saffron text-xl" lang="sa">
          {site.blessing}
        </p>
        <Ornament className="h-5 w-40 text-gold" />
        <p className="text-sm text-muted">
          {site.name} · Biodata
        </p>
      </div>
    </footer>
  );
}
