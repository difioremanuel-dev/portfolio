"use client";

import { ArrowUpRight } from "lucide-react";
import { contactContent } from "@/data/contact";
import type { Locale } from "@/lib/locale";
import { useLocale } from "./locale-provider";

const EYEBROW: Record<Locale, string> = {
  es: "03 — Contacto",
  en: "03 — Contact",
};

const TITLE: Record<Locale, string> = {
  es: "Contacto",
  en: "Contact",
};

export function ContactSection() {
  const { locale } = useLocale();

  return (
    <section
      id="contacto"
      className="flex min-h-svh flex-col justify-center py-24"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {EYEBROW[locale]}
      </p>
      <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl">
        {TITLE[locale]}
      </h2>
      <ul className="mt-8 flex flex-col divide-y divide-border border-y border-border">
        {contactContent.links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 py-4"
            >
              <span className="font-heading text-lg font-bold">
                {link.name}
              </span>
              <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {contactContent.status[locale]}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}