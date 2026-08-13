# 04 — Sección Proyectos

**What to build:** El módulo de datos tipado `Proyecto` con 6 placeholders sin publicar, y la grilla que los renderiza en un estado "PRÓXIMAMENTE" honesto, bilingüe, con alineación consistente de carriles.

**Blocked by:** 01 — Scaffold del proyecto, 02 — Resolución de idioma + toggle

**Status:** resolved

- [x] Módulo de datos tipado `Proyecto` definido según `CONTEXT.md` (título, descripción corta, tecnologías, link a demo opcional, link a repo opcional, thumbnail opcional)
- [x] Módulo sembrado con 6 entradas placeholder, todas sin publicar
- [x] La grilla renderiza cada entrada con el estado honesto "PRÓXIMAMENTE"/"COMING SOON" en ambos idiomas
- [x] El layout de la grilla tolera menos o más entradas en el futuro sin necesitar rediseño (una última fila despareja es aceptable)
- [x] Las filas repetidas mantienen carriles verticales consistentes (numeración a la izquierda, marcador secundario a la derecha)
- [x] El eyebrow de índice de sección (01) está presente

## Comments

Implementado en `src/lib/proyectos.ts` (tipo `Proyecto` con `status: "published" | "upcoming"`, patrón de union constante como `locale.ts`) y `src/components/projects-section.tsx` (`ProjectsSection`, cliente, usa `useLocale`). Grilla `grid-cols-1 sm:grid-cols-2` con hairlines (`gap-px bg-border`) que tolera cualquier cantidad de entradas; cada fila mantiene el carril de numeración a la izquierda y el marcador secundario (PRÓXIMAMENTE/COMING SOON; Demo/Repo ↗ si publicado) a la derecha. Verificado: `next build` OK, `eslint` OK, `vitest` 11/11 OK (el error `LayoutProps` de `tsc` directo es preexistente en `layout.tsx` y desaparece con los tipos generados por el build).
