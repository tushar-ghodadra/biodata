import { Contact } from "@/components/sections/Contact";
import { Family } from "@/components/sections/Family";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Personal } from "@/components/sections/Personal";
import { Marquee } from "@/components/ui/Marquee";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Personal />
        <Family />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
