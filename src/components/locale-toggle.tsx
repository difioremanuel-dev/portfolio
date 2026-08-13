"use client";

import { SUPPORTED_LOCALES } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { useLocale } from "./locale-provider";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center border border-border"
    >
      {SUPPORTED_LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={cn(
              "px-2 py-1 font-mono text-xs uppercase tracking-[0.25em] transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}