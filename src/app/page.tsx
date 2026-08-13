import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <HeroSection />

        <ProjectsSection />

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