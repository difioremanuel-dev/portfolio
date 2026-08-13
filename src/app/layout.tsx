import type { Metadata } from "next";
import { Chivo, Red_Hat_Mono } from "next/font/google";
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
      className={`${chivo.variable} ${redHatMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
