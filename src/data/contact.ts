import type { Locale } from "@/lib/locale";

export type SocialLink = {
  name: string;
  href: string;
};

export type ContactContent = {
  status: Record<Locale, string>;
  links: SocialLink[];
};

export const contactContent: ContactContent = {
  status: {
    es: "PRÓXIMAMENTE",
    en: "COMING SOON",
  },
  links: [
    { name: "Instagram", href: "https://www.instagram.com/manudifiore_" },
    { name: "X", href: "https://x.com/" },
    { name: "GitHub", href: "https://github.com/" },
  ],
};