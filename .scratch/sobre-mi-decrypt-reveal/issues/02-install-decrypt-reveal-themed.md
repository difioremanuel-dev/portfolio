# 02 — Instalar y adaptar DecryptReveal a escala de grises + tema

**What to build:** El componente Canvas UI `DecryptReveal` instalado en el proyecto, envuelto en un wrapper propio que deriva `color`/`background` del tema activo (`next-themes`) en vez de recibir el verde por defecto de la librería, verificable de forma aislada con contenido de prueba (sin depender todavía de Sobre mí).

**Blocked by:** 01 — Fijar valores de DecryptReveal para Sobre mí

**Status:** resolved

- [x] Instalado vía `npx shadcn@latest add @canvas-ui/decrypt-reveal-react` (el nombre del item en el registry `@canvas-ui` es `decrypt-reveal-react`, no `decrypt-reveal` a secas — ese 404 en la versión React) → `src/components/canvasui/DecryptReveal.tsx`
- [x] Wrapper propio `src/components/canvasui/themed-decrypt-reveal.tsx` que lee `resolvedTheme` de `next-themes`, gateado en un flag hidratado (inicialmente `useState`+`useEffect` como `theme-toggle.tsx`; reescrito a `useSyncExternalStore` en la revisión de la ticket 03 para resolver el lint `react-hooks/set-state-in-effect`)
- [x] El wrapper pasa los valores `color`/`background` light/dark documentados en la ticket 01, y re-renderiza al cambiar de tema en runtime
- [x] `edgeTint`/`edgeGlow` seteados a los valores reducidos de la ticket 01
- [x] Verificable de forma aislada — el wrapper no asume que su children es específicamente el contenido de Sobre mí

## Comments

- Implementado por un worker `opencode`/`deepseek-v4-flash-free` en la rama `difioremanuel-dev/decrypt-reveal-02-install-themed` (commit `84e4aa2`), mergeada a `master` como parte del merge de la ticket 03 (`39e6046`). El wrapper también agrega el fallback de `passthrough` táctil descrito en la ticket 01 (implementación adelantada desde acá, aunque el criterio formal de aceptación vive en la ticket 03).
