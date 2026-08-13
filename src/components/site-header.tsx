"use client";

import type { Locale } from "@/lib/locale";
import { useLocale } from "./locale-provider";
import { LocaleToggle } from "./locale-toggle";
import { ThemeToggle } from "./theme-toggle";

const NAV_LABELS: Record<Locale, { href: string; label: string }[]> = {
  es: [
    { href: "#proyectos", label: "Proyectos" },
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#contacto", label: "Contacto" },
  ],
  en: [
    { href: "#proyectos", label: "Projects" },
    { href: "#sobre-mi", label: "About" },
    { href: "#contacto", label: "Contact" },
  ],
};

export function SiteHeader() {
  const { locale } = useLocale();
  const items = NAV_LABELS[locale];

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.25em]">
          Manuel Di Fiore
        </span>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.25em]">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
          <LocaleToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}