import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, isLocale, resolveLocale, type Locale } from "./locale";

describe("resolveLocale", () => {
  it("resolves 'es' when the browser reports exactly 'es'", () => {
    expect(resolveLocale(["es"], null)).toBe("es");
  });

  it("resolves 'en' when the browser reports exactly 'en'", () => {
    expect(resolveLocale(["en"], null)).toBe("en");
  });

  it("resolves the language from a region-tagged browser language", () => {
    expect(resolveLocale(["es-AR"], null)).toBe("es");
    expect(resolveLocale(["en-US"], null)).toBe("en");
  });

  it("is case-insensitive", () => {
    expect(resolveLocale(["ES"], null)).toBe("es");
    expect(resolveLocale(["EN-GB"], null)).toBe("en");
  });

  it("falls back to the default locale for unsupported browser languages", () => {
    expect(resolveLocale(["fr"], null)).toBe(DEFAULT_LOCALE);
    expect(resolveLocale(["de-DE", "pt-BR"], null)).toBe(DEFAULT_LOCALE);
  });

  it("falls back to the default locale when there is no browser language", () => {
    expect(resolveLocale([], null)).toBe(DEFAULT_LOCALE);
  });

  it("gives a stored manual preference precedence over browser language", () => {
    expect(resolveLocale(["es"], "en")).toBe("en");
    expect(resolveLocale(["en"], "es")).toBe("es");
  });

  it("resolves to the first supported language in the browser list", () => {
    expect(resolveLocale(["de", "es", "en"], null)).toBe("es");
    expect(resolveLocale(["fr-CA", "en-US"], null)).toBe("en");
  });
});

describe("isLocale", () => {
  it("accepts the supported locales", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
  });

  it("rejects anything that is not a supported locale", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("ES")).toBe(false);
    expect(isLocale("es-AR")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale(null)).toBe(false);
  });

  it("narrows the value to the Locale union", () => {
    const value: string | null = "es";
    const narrowed: Locale | null = isLocale(value) ? value : null;
    expect(narrowed).toBe("es");
  });
});
