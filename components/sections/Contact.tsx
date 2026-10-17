"use client";

import { motion } from "motion/react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact, mapsUrl, site, whatsappUrl } from "@/content/biodata";
import { fadeUp, stagger } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { Mandala } from "@/components/ui/Mandala";
import { SectionHeading } from "@/components/ui/SectionHeading";

const actions = [
  { href: `tel:+${contact.phoneRaw}`, icon: Phone, label: "Call", value: contact.phone, primary: true },
  { href: whatsappUrl, icon: MessageCircle, label: "WhatsApp", value: "Send a message", external: true },
  { href: `mailto:${contact.email}`, icon: Mail, label: "Email", value: contact.email },
  { href: mapsUrl, icon: MapPin, label: "Address", value: contact.address, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="paper relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute -right-40 -bottom-40 size-[560px] text-gold/60 md:size-[760px]">
        <Mandala className="h-full w-full" />
      </div>

      <div className="container-x relative">
        <SectionHeading eyebrow="Chapter four" title="Get in Touch" devanagari="संपर्क" />

        <motion.div
          className="mx-auto mt-14 max-w-3xl"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="hairline rounded-[32px] bg-cream/85 p-7 backdrop-blur-sm sm:p-10">
            <p className="label">Contact person</p>
            <p className="font-display mt-2 text-4xl font-medium tracking-tight sm:text-5xl">{contact.person}</p>
            <p className="mt-1 text-muted">{contact.personRelation} of {site.firstName}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {actions.map(({ href, icon: Icon, label, value, primary, external }) => (
                <li key={label}>
                  <Magnetic strength={0.15} className="h-full">
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className={`group flex h-full items-center gap-4 rounded-2xl p-4 transition-all duration-500 ease-[var(--ease-out-expo)] ${
                        primary
                          ? "bg-saffron text-cream shadow-[0_20px_40px_-20px_rgb(154_77_11/0.8)] hover:bg-saffron-deep"
                          : "hairline bg-cream hover:border-gold hover:bg-gold-light/30"
                      }`}
                    >
                      <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${primary ? "bg-cream/15" : "bg-gradient-to-br from-gold-light to-sand text-saffron"}`}>
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className={`label block ${primary ? "text-gold-light" : ""}`}>{label}</span>
                        <span className="mt-0.5 block truncate font-medium">{value}</span>
                      </span>
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-col items-center gap-3 text-center">
            <p className="max-w-sm text-sm text-muted text-balance">
              Please reach out to {contact.person} for any enquiry. Replies are usually quick on WhatsApp.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
