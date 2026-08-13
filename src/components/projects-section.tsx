"use client";

import type { Locale } from "@/lib/locale";
import { PROYECTOS, type Proyecto } from "@/lib/proyectos";
import { useLocale } from "./locale-provider";

const LABELS: Record<
  Locale,
  { eyebrow: string; heading: string; upcoming: string }
> = {
  es: {
    eyebrow: "01 — Proyectos",
    heading: "Proyectos",
    upcoming: "PRÓXIMAMENTE",
  },
  en: {
    eyebrow: "01 — Projects",
    heading: "Projects",
    upcoming: "COMING SOON",
  },
};

export function ProjectsSection() {
  const { locale } = useLocale();
  const labels = LABELS[locale];

  return (
    <section
      id="proyectos"
      className="flex min-h-svh flex-col justify-center border-b border-border py-24"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {labels.eyebrow}
      </p>
      <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl">
        {labels.heading}
      </h2>
      <ol className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
        {PROYECTOS.map((proyecto, index) => (
          <ProyectoRow
            key={proyecto.id}
            proyecto={proyecto}
            numero={String(index + 1).padStart(2, "0")}
            upcomingLabel={labels.upcoming}
          />
        ))}
      </ol>
    </section>
  );
}

function ProyectoRow({
  proyecto,
  numero,
  upcomingLabel,
}: {
  proyecto: Proyecto;
  numero: string;
  upcomingLabel: string;
}) {
  return (
    <li className="flex min-h-40 flex-col justify-between gap-6 bg-background p-6">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {numero}
        </span>
        {proyecto.status === "upcoming" ? (
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {upcomingLabel}
          </span>
        ) : (
          <div className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {proyecto.demoUrl && (
              <a
                href={proyecto.demoUrl}
                className="transition-colors hover:text-foreground"
              >
                Demo ↗
              </a>
            )}
            {proyecto.repoUrl && (
              <a
                href={proyecto.repoUrl}
                className="transition-colors hover:text-foreground"
              >
                Repo ↗
              </a>
            )}
          </div>
        )}
      </div>
      {proyecto.status === "published" && (
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-xl font-black tracking-tight">
            {proyecto.title}
          </h3>
          <p className="text-sm text-muted-foreground">{proyecto.description}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {proyecto.technologies.join(" / ")}
          </p>
        </div>
      )}
    </li>
  );
}
