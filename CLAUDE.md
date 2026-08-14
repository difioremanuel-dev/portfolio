# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # start dev server (Turbopack) at localhost:3000
npm run build        # production build
npm run start         # serve the production build
npm run lint           # eslint (flat config: eslint-config-next core-web-vitals + typescript)
npm run test            # vitest run (single pass)
npm run test:watch       # vitest watch mode
npx vitest run src/lib/locale.test.ts   # run a single test file
npx tsc --noEmit                          # type-check only (no dedicated script)
```

Deploy: this Vercel project (`.vercel/project.json`) has **no Git integration** — pushing to `origin/master` does not trigger a deploy. Ship with `npx vercel --prod` after pushing.

## Architecture

**Single-page site, no routes.** `src/app/page.tsx` composes four sections in a fixed anchor order — Hero/Índice (`#indice`), Proyectos (`#proyectos`), Sobre mí (`#sobre-mi`), Contacto (`#contacto`) — plus `SiteHeader`. There is no backend, no CMS, no contact form; Contacto is link-out only.

**Bilingual ES/EN without an i18n library.** `src/lib/locale.ts` is a pure, framework-free function (`resolveLocale(browserLanguages, storedPreference)`) — the only unit-tested module in the repo (`locale.test.ts` colocated next to it). `LocaleProvider` (`src/components/locale-provider.tsx`) wraps it with `useSyncExternalStore`, persisting the manual override to `localStorage` and broadcasting changes via a custom `locale:change` window event rather than React state, so every `useLocale()` consumer (including multiple toggles) stays in sync. The SSR snapshot always resolves to `DEFAULT_LOCALE` ("es") since browser language isn't known on the server. Section copy is hand-maintained per component as `Record<Locale, ...>` dictionaries (see `HERO_COPY`, `EYEBROW`, `TITLE` in each `*-section.tsx`) — there's no shared message catalog.

**Theming follows the same server/client split.** `next-themes` drives `class`-based dark mode (`attribute="class"`, `<html suppressHydrationWarning>` in `layout.tsx`); Tailwind reads it via `@custom-variant dark` in `globals.css`, with light/dark oklch tokens defined there. Any component reading `resolvedTheme` must gate on a `mounted` flag (see `theme-toggle.tsx`) — `resolvedTheme` is `undefined` during SSR, so rendering off it directly causes a hydration mismatch.

**Content lives in typed data files, not a CMS.** `src/data/about.ts`, `src/data/contact.ts`, `src/lib/proyectos.ts` are hand-edited TypeScript, per ADR-0001 and `PRODUCT.md`. `PROYECTOS` currently ships as 6 placeholder entries with `status: "upcoming"` — these must render honestly (e.g. "PRÓXIMAMENTE"/"COMING SOON"), never as fabricated project content. Don't invent project data, testimonials, or a technical differentiator that isn't confirmed in `PRODUCT.md`.

**One deliberate WebGL moment.** `src/components/canvasui/webgl-reveal.tsx` is a hand-rolled WebGL2 shader reveal used once, on the Hero identity panel — per ADR-0001, Canvas UI is used sparingly so it doesn't override the grayscale minimalist system. It self-disables on `prefers-reduced-motion`, a low-power-device heuristic (device memory / core count / coarse-pointer+narrow-viewport), or missing WebGL2 support, falling back to rendering children with no effect; it starts on `IntersectionObserver` viewport entry (or pointer-enter as a secondary trigger). `src/components/canvasui/Droplets.tsx` is unused scaffolding — don't assume it's wired up.

**Styling**: Tailwind v4, CSS-first config (`@theme inline` in `globals.css`, no `tailwind.config.*`). shadcn/ui is configured in `components.json` (style `base-nova`, RSC on, `@magicui`/`@canvas-ui` custom registries) — components are generated into `src/components/ui/`, not hand-written from scratch. Visual system is strict grayscale (oklch grays, no accent color), Chivo for display/heading, Red Hat Mono for monospace/label text, sequential numeric section eyebrows (00/01/02/03).

Path alias: `@/*` → `./src/*`.

## Testing convention

Per `.scratch/portfolio-site/spec.md`'s Testing Decisions: only pure logic (currently `resolveLocale`) gets unit tests, colocated as `*.test.ts` next to the function it covers (`vitest.config.mts` only includes `src/**/*.test.ts`). Presentational components (sections, the WebGL reveal) are deliberately not unit tested — there's no branching logic worth a seam there; treat visual correctness as a design/QA concern, not a test-coverage gap.

## Domain and product context

- `CONTEXT.md` — domain glossary (e.g. "Proyecto", "Bio" with explicitly avoided synonyms). Use these terms, not synonyms, in code, commits, and docs.
- `PRODUCT.md` — product scope and constraints: no contact form/backend, no CV/skills-list/timeline, bilingual by design, positioning intentionally left undefined (don't invent one).
- `docs/adr/0001-nextjs-shadcn-magicui-canvasui-stack.md` — why Next.js + shadcn/ui + Magic UI + Canvas UI over Astro or plain HTML.
- `future.md` — deferred ideas (per-project markdown files, headless CMS for Proyectos) and the conditions under which to reconsider them.
- `.scratch/portfolio-site/spec.md` — the full MVP spec (user stories, implementation/testing decisions, out-of-scope list) this codebase was built from.
- `AGENTS.md` — points agents at the docs above and records the local issue-tracker convention (`.scratch/<feature>/issues/NN-slug.md`). It also carries a Next.js–generated "agent rules" block that `next dev` re-adds automatically; leave it in place if it reappears.
