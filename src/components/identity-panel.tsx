import { cn } from "@/lib/utils";

function RegistrationMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute flex size-5 items-center justify-center",
        className,
      )}
    >
      <span className="absolute h-px w-full bg-foreground/40" />
      <span className="absolute h-full w-px bg-foreground/40" />
    </span>
  );
}

export function IdentityPanel() {
  return (
    <div className="relative border border-border bg-card px-10 py-14 sm:px-16 sm:py-20">
      <RegistrationMark className="-top-2.5 -left-2.5" />
      <RegistrationMark className="-top-2.5 -right-2.5" />
      <RegistrationMark className="-bottom-2.5 -left-2.5" />
      <RegistrationMark className="-bottom-2.5 -right-2.5" />

      <div className="flex flex-col items-center gap-12 text-center">
        <div className="flex size-28 items-center justify-center border border-border sm:size-32">
          <span className="font-heading text-5xl font-black tracking-tight sm:text-6xl">
            MDF
          </span>
        </div>

        <div className="flex w-full items-center justify-between gap-6 border-t border-border pt-4 font-mono text-[0.625rem] uppercase tracking-[0.35em] text-muted-foreground">
          <span>Portfolio</span>
          <span>MMXXVI</span>
        </div>
      </div>
    </div>
  );
}
