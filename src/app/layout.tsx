import type { Metadata } from "next";
import { Chivo, Red_Hat_Mono } from "next/font/google";
import { LocaleProvider } from "@/components/locale-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
});

const redHatMono = Red_Hat_Mono({
  variable: "--font-red-hat-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manuel Di Fiore — Portfolio",
  description:
    "Portfolio personal de Manuel Di Fiore — Proyectos, Sobre mí y Contacto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${chivo.variable} ${redHatMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
