import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <HeroSection />

        <section id="proyectos" className="flex min-h-svh flex-col justify-center border-b border-border py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            01 — Proyectos
          </p>
          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl">
            Proyectos
          </h2>
        </section>

        <section id="sobre-mi" className="flex min-h-svh flex-col justify-center border-b border-border py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            02 — Sobre mí
          </p>
          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl">
            Sobre mí
          </h2>
        </section>

        <section id="contacto" className="flex min-h-svh flex-col justify-center py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            03 — Contacto
          </p>
          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl">
            Contacto
          </h2>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Manuel Di Fiore</span>
          <span>Hecho con Next.js</span>
        </div>
      </footer>
    </>
  );
}