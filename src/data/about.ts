import type { Locale } from "@/lib/locale";

export type AboutContent = {
  status: Record<Locale, string>;
  bio: Record<Locale, string>;
};

export const aboutContent: AboutContent = {
  status: {
    es: "PRÓXIMAMENTE",
    en: "COMING SOON",
  },
  bio: {
    es: "Esta sección mostrará una presentación breve. El autor la completará próximamente.",
    en: "This section will show a short introduction. The author will complete it soon.",
  },
};