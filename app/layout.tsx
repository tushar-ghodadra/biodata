import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Tiro_Devanagari_Hindi } from "next/font/google";
import { AppShell } from "@/components/providers/AppShell";
import { birth, contact, site } from "@/content/biodata";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["devanagari"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Biodata`, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: `${site.name} Biodata`,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${site.name} Biodata`,
    title: `${site.name} — Biodata`,
    description: site.description,
    locale: "en_IN",
    firstName: site.firstName,
    lastName: site.lastName,
  },
  // A biodata is shared privately; keep it out of search engines.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf5ec",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  givenName: site.firstName,
  familyName: site.lastName,
  birthDate: birth.dateISO,
  birthPlace: birth.place,
  jobTitle: "Software Engineer",
  email: `mailto:${contact.email}`,
  telephone: `+${contact.phoneRaw}`,
  url: site.url,
};

// Runs before first paint: skip the intro for returning visitors and for
// anyone who prefers reduced motion.
const introScript = `try{if(sessionStorage.getItem('tg-bio-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-seen')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} ${tiro.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">
        <div aria-hidden className="ambient" />
        <div aria-hidden className="grain" />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
