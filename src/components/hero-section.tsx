"use client";

import type { Locale } from "@/lib/locale";
import { IdentityPanel } from "@/components/identity-panel";
import { WebGLReveal } from "@/components/canvasui/webgl-reveal";
import { useLocale } from "@/components/locale-provider";

const HERO_COPY: Record<Locale, { eyebrow: string; tagline: string }> = {
  es: {
    eyebrow: "00 — Índice",
    tagline: "Portfolio personal — Proyectos, Sobre mí y Contacto",
  },
  en: {
    eyebrow: "00 — Index",
    tagline: "Personal portfolio — Projects, About and Contact",
  },
};

export function HeroSection() {
  const { locale } = useLocale();
  const copy = HERO_COPY[locale];

  return (
    <section
      id="indice"
      className="flex min-h-svh flex-col justify-center border-b border-border py-24"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {copy.eyebrow}
          </p>
          <h1 className="mt-8 font-heading text-[clamp(3.5rem,12vw,8.75rem)] font-black leading-[0.88] tracking-[-0.04em]">
            Manuel
            <br />
            <span className="text-muted-foreground">Di Fiore</span>
          </h1>
          <p className="mt-10 max-w-md font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {copy.tagline}
          </p>
        </div>

        <WebGLReveal className="mx-auto w-full max-w-sm lg:mx-0">
          <IdentityPanel />
        </WebGLReveal>
      </div>
    </section>
  );
}
