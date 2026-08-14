"use client";

import { ThemedDecryptReveal } from "@/components/canvasui/themed-decrypt-reveal";
import { aboutContent } from "@/data/about";
import type { Locale } from "@/lib/locale";
import { useLocale } from "./locale-provider";

const EYEBROW: Record<Locale, string> = {
  es: "02 — Sobre mí",
  en: "02 — About",
};

const TITLE: Record<Locale, string> = {
  es: "Sobre mí",
  en: "About",
};

export function AboutSection() {
  const { locale } = useLocale();

  return (
    <section
      id="sobre-mi"
      className="flex min-h-svh flex-col justify-center border-b border-border py-24"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {EYEBROW[locale]}
      </p>
      <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl">
        {TITLE[locale]}
      </h2>
      <ThemedDecryptReveal className="mt-8">
        <div className="flex flex-col items-start gap-6">
          <span className="border border-border px-2 py-1 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {aboutContent.status[locale]}
          </span>
          <p className="max-w-2xl text-muted-foreground">
            {aboutContent.bio[locale]}
          </p>
        </div>
      </ThemedDecryptReveal>
    </section>
  );
}
