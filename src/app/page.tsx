import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Droplets } from "@/components/canvasui/Droplets";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <section className="border-b border-border py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Prueba de librerías
          </p>
          <div className="mt-8 flex flex-col gap-8">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                shadcn/ui — Button
              </p>
              <Button>Button ejemplo</Button>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Magic UI — BorderBeam
              </p>
              <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-border p-8">
                <BorderBeam
                  size={160}
                  duration={8}
                  colorFrom="#d4d4d4"
                  colorTo="#404040"
                />
                <span className="font-mono text-xs uppercase tracking-[0.25em]">
                  BorderBeam
                </span>
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Canvas UI — Droplets
              </p>
              <Droplets className="h-40 w-full overflow-hidden rounded-2xl border border-border">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-mono text-xs uppercase tracking-[0.25em]">
                    Droplets (WebGL)
                  </span>
                </div>
              </Droplets>
            </div>
          </div>
        </section>

        <section id="proyectos" className="flex min-h-svh flex-col justify-center border-b border-border py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            01 — Proyectos
          </p>
          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl">
            Proyectos
          </h2>
        </section>

        <AboutSection />

        <ContactSection />
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