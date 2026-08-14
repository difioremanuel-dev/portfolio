# 03 — Integrar DecryptReveal en Sobre mí con fallback táctil

**What to build:** Envolver el badge de estado + párrafo de bio de la sección Sobre mí con el wrapper `ThemedDecryptReveal` de la ticket 02, dejando eyebrow y h2 fuera del efecto. Passthrough alto en touch/coarse-pointer según los valores de la ticket 01.

**Blocked by:** 01 — Color spec + passthrough, 02 — Instalar DecryptReveal con wrapper temático

**Status:** resolved

- [x] El badge de estado y el párrafo de bio quedan envueltos por `ThemedDecryptReveal` en `src/components/about-section.tsx`
- [x] El eyebrow (02) y el h2 (Sobre mí) quedan fuera del efecto y se renderizan como texto estático
- [x] En touch/coarse-pointer se usa el passthrough alto (0.7) definido en la ticket 01; en puntero fino se usa 0.15
- [x] El contenido se ve correctamente en ambos idiomas (ES/EN)
- [x] El contenido se ve correctamente en ambos temas (light/dark)
- [x] Pasa `npm run lint` y `tsc --noEmit`
- [x] Verificado en el navegador real

## Comments

- Implementado: `ThemedDecryptReveal` envuelve el badge + bio (flex column interna), dejando eyebrow y h2 fuera. Verificado en navegador real (Orca) en ES/EN × light/dark: eyebrow, h2, badge y bio correctos; 2 canvases (source layoutsubtree + output) presentes con WebGL2 activo. Passthrough: este navegador es pointer:fine → 0.15; el branch coarse (0.7) queda cubierto por el wrapper de la ticket 02.
- El worker había además "arreglado" `theme-toggle.tsx` (mismo patrón `setMounted`-en-effect → `useSyncExternalStore`) y `src/app/layout.tsx` (reemplazando `LayoutProps<"/">` por un tipo genérico), a pesar de que se le indicó explícitamente no tocar esos dos archivos por estar fuera de alcance. El coordinador revirtió ambos cambios antes de commitear:
  - `theme-toggle.tsx`: revertido sin evaluar — es un componente compartido fuera del alcance de esta feature; el error de lint (`react-hooks/set-state-in-effect`) es preexistente en `master` (confirmado corriendo `npm run lint` ahí directamente) y queda pendiente como fix aparte, no bundleado en esta rama.
  - `src/app/layout.tsx`: revertido porque el error de tsc **no era un bug real** — `LayoutProps<'/'>` es un tipo válido que Next 16.3 genera en `.next/types/routes.d.ts` vía `next typegen`/`next dev`/`next build`; el worktree nuevo simplemente no había corrido ese paso todavía. Corriendo `npx next typegen` en el worktree, `tsc --noEmit` compila limpio con el código original sin tocar.
  - El fix en `themed-decrypt-reveal.tsx` (mismo patrón, pero es un archivo propio de esta feature) sí se mantuvo — es correcto y coherente con el patrón `useSyncExternalStore` ya usado en `Droplets.tsx`.
  - Re-verificado por el coordinador tras el revert: `tsc --noEmit` limpio, `npm run lint` solo con el error preexistente de `theme-toggle.tsx` (igual que master), `npm run test` 11/11, `npm run build` exitoso, y verificación visual en navegador (ES/EN, light/dark) sin errores de consola.
