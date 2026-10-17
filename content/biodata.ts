/**
 * Single source of truth for everything shown on the site.
 * Edit values here; the UI reads from this file only.
 */

export const site = {
  name: "Tushar Ghodadra",
  firstName: "Tushar",
  lastName: "Ghodadra",
  tagline: "Software Engineer · Junagadh, Gujarat",
  blessing: "ॐ श्री गणेशाय नमः",
  blessingLatin: "Om Shri Ganeshaya Namah",
  url: "https://biodata.tusharghodadra.com",
  description:
    "Marriage biodata of Tushar Ghodadra — Software Engineer from Junagadh, Gujarat. Personal, family and contact details with photo gallery.",
  portrait: "/photos/portrait.png",
} as const;

export const birth = {
  date: "16 June 1997",
  dateISO: "1997-06-16",
  time: "11:00 AM",
  place: "Junagadh, Gujarat",
  rashi: "Tula",
  rashiEnglish: "Libra",
  rashiSymbol: "♎\uFE0E",
} as const;

export type Detail = {
  label: string;
  value: string;
  hint?: string;
  icon: "clock" | "star" | "palette" | "ruler" | "graduation" | "briefcase" | "rupee" | "calendar" | "pin";
};

export const personal: Detail[] = [
  { label: "Date of Birth", value: birth.date, icon: "calendar" },
  { label: "Time of Birth", value: birth.time, icon: "clock" },
  { label: "Place of Birth", value: birth.place, icon: "pin" },
  { label: "Rashi", value: `${birth.rashi} (${birth.rashiEnglish})`, hint: birth.rashiSymbol, icon: "star" },
  { label: "Complexion", value: "Brown", icon: "palette" },
  { label: "Height", value: "5 ft 3 in", hint: "160 cm", icon: "ruler" },
  { label: "Education", value: "Bachelor of Engineering", icon: "graduation" },
  { label: "Profession", value: "Software Engineer", icon: "briefcase" },
  { label: "Annual Income", value: "₹29.2 LPA", icon: "rupee" },
];

export type Member = {
  relation: string;
  name: string;
  note?: string;
};

export const family = {
  father: { relation: "Father", name: "Hirabhai Ghodadra" } satisfies Member,
  mother: { relation: "Mother", name: "Jayaben Ghodadra", note: "Housewife" } satisfies Member,
  siblings: [{ relation: "Sister", name: "Ripta Ghodadra" }] as Member[],
  home: "Keshod, Gujarat",
};

export const contact = {
  person: "Hirabhai Ghodadra",
  personRelation: "Father",
  phone: "+91 98242 31594",
  phoneRaw: "919824231594",
  email: "tusharghodadra@gmail.com",
  address: "Mangle Dham Society, Mangrol Road, Keshod, Gujarat",
  mapsQuery: "Mangle Dham Society, Mangrol Road, Keshod, Gujarat",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;
export const whatsappUrl = `https://wa.me/${contact.phoneRaw}?text=${encodeURIComponent(
  `Namaste, I came across Tushar's biodata and would like to connect.`,
)}`;
