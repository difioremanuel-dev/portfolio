export const SUPPORTED_LOCALES = ["es", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

const SUPPORTED = new Set<string>(SUPPORTED_LOCALES);

export function isLocale(value: string | null | undefined): value is Locale {
  return typeof value === "string" && SUPPORTED.has(value);
}

export function resolveLocale(
  browserLanguages: readonly string[],
  storedPreference: Locale | null,
): Locale {
  if (storedPreference !== null) {
    return storedPreference;
  }

  for (const language of browserLanguages) {
    const primary = language.toLowerCase().split("-")[0];
    if (isLocale(primary)) {
      return primary;
    }
  }

  return DEFAULT_LOCALE;
}
