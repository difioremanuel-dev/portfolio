# Portfolio site (MVP)

Status: ready-for-agent

## Problem Statement

Manuel Di Fiore doesn't have a personal portfolio yet. He needs one to build his personal brand and demonstrate his technical skills to developers and general visitors who find him through social links — but he has no real Proyectos loaded yet, and the site still needs to feel complete, deliberate, and professional in that empty state rather than looking unfinished.

## Solution

A single-page, bilingual (ES/EN) static portfolio site with three sections — Proyectos, Sobre mí, Contacto — built on Next.js with shadcn/ui, Magic UI, and Canvas UI, in a grayscale "index/catalog" visual system (confirmed via `/impeccable shape`). Proyectos with no real content are shown honestly as unpublished placeholders rather than fabricated entries. Contacto links out to Manuel's social profiles; there is no contact form or backend.

## User Stories

1. As a casual visitor arriving from an Instagram link, I want to immediately understand whose site this is and what it's for, so that I don't bounce in the first few seconds.
2. As a developer visitor arriving from a GitHub profile link, I want to see technical craft reflected in the site itself, so that the site acts as a demonstration, not just a claim.
3. As any visitor, I want the site to load and render correctly on mobile, so that I can browse it comfortably regardless of device.
4. As a Spanish-speaking visitor, I want the site to default to Spanish based on my browser language, so that I don't have to manually switch.
5. As an English-speaking visitor, I want the site to default to English based on my browser language, so that the content is immediately legible to me.
6. As any visitor, I want to manually toggle between ES and EN, so that I can read the site in my preferred language regardless of what my browser reports.
7. As a returning visitor, I want my manual language choice to persist across visits, so that I don't have to re-toggle every time.
8. As a visitor, I want to see a Proyectos section, so that I can evaluate Manuel's work.
9. As a visitor, when no real Proyectos exist yet, I want to see that state represented honestly (e.g. "PRÓXIMAMENTE") rather than fake or empty content, so that I understand the site is real and in progress, not broken or deceptive.
10. As a visitor, I want each Proyecto entry to show a title, short description, and tech stack, so that I can quickly assess relevance.
11. As a visitor, I want each Proyecto entry to optionally link to a live demo and/or repository, so that I can go deeper when I'm interested.
12. As a visitor, I want a Sobre mí section with a short bio, so that I get a sense of who Manuel is beyond the project list.
13. As a visitor, I want a Contacto section listing Manuel's social profiles (Instagram, X, GitHub), so that I can follow or reach out to him on the platform I already use.
14. As a visitor, I do not want to be asked to fill out a contact form, so that reaching out stays as low-friction as clicking a link I already trust.
15. As a visitor, I want a single distinctive visual moment (the Canvas UI WebGL reveal) on the identity panel or Proyectos grid, so that the site feels crafted rather than templated.
16. As a visitor on a low-power device or with reduced-motion preferences, I want the WebGL moment to degrade gracefully to a static equivalent, so that the site still works and doesn't feel broken.
17. As a visitor, I want consistent vertical alignment across repeated rows (Proyectos grid, Contacto chips), so that the site reads as deliberate and well-crafted rather than assembled.
18. As Manuel (site owner), I want to add real Proyectos later by editing a typed data structure, so that I don't need to redesign or touch layout code to publish new work.
19. As Manuel (site owner), I want the site deployed on Vercel's free subdomain for now, so that I can ship without committing to a custom domain yet.
20. As Manuel (site owner), I want the codebase to avoid inventing project content, testimonials, or a technical differentiator I haven't confirmed, so that the site never claims something about me that isn't true yet.
21. As a future maintainer, I want the language-resolution logic isolated from rendering, so that it can be reasoned about and tested without a browser or component tree.

## Implementation Decisions

- **Stack**: Next.js, shadcn/ui, Magic UI, Canvas UI (per ADR-0001, `docs/adr/0001-nextjs-shadcn-magicui-canvasui-stack.md`). Deployed on Vercel, free subdomain (no custom domain yet).
- **Structure**: single page with anchored sections in order — Índice/Hero, Proyectos, Sobre mí, Contacto. No separate routes.
- **Visual system**: grayscale palette only, no accent color (pure white / near-black / mid-gray / hairline gray). Chivo (Black/Bold for display, Regular for body) paired with a technical monospace face (metadata/index labels — e.g. Red Hat Mono), loaded via `next/font/google`. Sequential section indexing (00 Índice, 01 Proyectos, 02 Sobre mí, 03 Contacto) as small mono eyebrow labels — this replaces the literal photography/darkroom vocabulary considered and rejected during design (see design session history; terms like "rollo", "revelado", "cuadro" were explicitly removed).
- **Identity panel**: a corner-registration-mark motif (visual device, not a literal camera reference) housing a monogram and small metadata tags (e.g. role/year).
- **Canvas UI usage**: exactly one WebGL moment — a reveal/transition effect tied to scroll or hover on the identity panel or Proyectos grid. Not a persistent background. Must have a static fallback for reduced-motion / low-power contexts.
- **Locale module**: a pure function (not coupled to React) that resolves the active locale from browser language plus a stored manual override, e.g. shape `resolveLocale(browserLanguages: string[], storedPreference: 'es' | 'en' | null): 'es' | 'en'`. The toggle in the header writes the override; the function itself has no side effects. This is the seam confirmed with the user for this spec.
- **Proyectos data**: a typed array of `Proyecto` entries (per `CONTEXT.md`) with fields — title, short description, tech stack tags, optional demo link, optional repository link, optional thumbnail. Currently seeded with 6 unpublished placeholder entries rendered as "PRÓXIMAMENTE"; the grid layout must tolerate fewer or more entries later without redesign (an uneven last row is acceptable). Alternatives considered (per-project markdown files, headless CMS) were rejected for now and recorded in `future.md`.
- **Sobre mí**: short bio text only. No skills list, no downloadable CV, no experience timeline — explicitly out of scope per `PRODUCT.md`.
- **Contacto**: static list of social links (Instagram, X, GitHub). No form, no backend, no email capture, no third-party form service.
- **Positioning**: intentionally left undefined in `PRODUCT.md` — do not invent a technical differentiator, tagline claim, or specialization during implementation.

## Testing Decisions

- Good tests here exercise external behavior only: given inputs, does the function return the correct output — not implementation details like internal render counts or component structure.
- The one module to unit test is the locale-resolution seam (`resolveLocale` or equivalent): cases include browser language exactly "es"/"en", unsupported browser languages falling back to a default, a stored manual override taking precedence over browser language, and no stored preference plus no matching browser language.
- No prior art exists in this codebase yet — this is the first tested module in the repo, so it also establishes the convention (colocate the test next to the pure function it covers; test runner choice left to whoever implements, following whatever the repo's Next.js scaffold defaults to).
- Presentational rendering (Hero, Proyectos grid, Sobre mí, Contacto, the WebGL reveal) is explicitly not unit tested — there's no branching logic there worth a seam; visual correctness is a design/QA concern, not a spec-level testing concern.

## Out of Scope

- Contact form, backend, or email capture of any kind.
- CMS or markdown-based authoring for Proyectos (deferred; see `future.md`).
- CV download, skills list, or experience timeline in Sobre mí.
- Custom domain setup (site ships on the free Vercel subdomain).
- Recruiter-oriented content (job history, testimonials, case studies) — audience is developers and general visitors, not formal recruiters.
- Analytics or visitor tracking.
- Automated visual regression testing of the WebGL reveal effect.

## Further Notes

- Full context lives in `PRODUCT.md`, `CONTEXT.md`, `docs/adr/0001-nextjs-shadcn-magicui-canvasui-stack.md`, `future.md`, and the confirmed direction from the `/impeccable shape` session (grayscale index/catalog system, one WebGL moment, photography vocabulary explicitly rejected in favor of neutral indexing language).
- All Proyectos content ships as honest placeholders until Manuel supplies real projects — never fabricate project data, links, descriptions, or a differentiator not yet confirmed.
