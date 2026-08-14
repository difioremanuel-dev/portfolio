# 01 — Fijar valores de DecryptReveal para Sobre mí (escala de grises, light/dark, touch)

**What to build:** No es código — es la especificación de parámetros que las tickets 02 y 03 van a implementar sin adivinar valores. Documenta color, background y passthrough para light/dark y para desktop/touch, derivados de los design tokens reales del sitio (no del verde por defecto de la librería).

**Blocked by:** Ninguna, puede arrancar inmediatamente.

**Status:** resolved

- [x] `light.color` y `light.background` documentados, derivados de `--muted-foreground`/`--background` en `src/app/globals.css` (`oklch(1 0 0)` bg, `oklch(0.556 0 0)` muted-foreground → grises hex concretos, no oklch crudo, porque `DecryptReveal` espera CSS color parseable por `context.fillStyle`)
- [x] `dark.color` y `dark.background` documentados igual, derivados de `.dark { --background; --muted-foreground }`
- [x] `passthrough` documentado para dos estados: desktop (cerca del default `0.15`) y touch/coarse-pointer (`~0.6–0.8`, bio legible de fondo sin interacción)
- [x] `edgeTint`/`edgeGlow` documentados con valores reducidos respecto al default (`0.75`/`2`) para un borde de descifrado sutil, no "neón"
- [x] Confirmar que `colored=1` no introduce ningún acento de color (la paleta completa es gris, por lo que heredar el color del UI subyacente sigue siendo gris)
- [x] El resto de props (`radius`, `cell`, `aspect`, `scramble`, `scrambleSpeed`, `edgeWidth`, `aberration`, `threshold`, `smoothing`, `contrast`, `exposure`) quedan explícitamente marcados como "default de librería, a validar visualmente en pantalla durante 02/03" — no bloquean el resto del trabajo

## Valores fijados (espec para 02/03)

Derivados de `src/app/globals.css` — token `--background` y `--muted-foreground`, convertidos de oklch a hex (se usan hex concretos, no oklch crudo, porque `DecryptReveal` resuelve el color con `context.fillStyle`):

- `light.color` = `#737373` (= `oklch(0.556 0 0)` → `--muted-foreground`)
- `light.background` = `#ffffff` (= `oklch(1 0 0)` → `--background`)
- `dark.color` = `#a1a1a1` (= `oklch(0.708 0 0)` → `.dark --muted-foreground`; conversión sRGB exacta verificada con culori y Color.js — Tailwind documenta `#a3a3a3` pero el navegador computa `#a1a1a1`, que es el valor que ve `context.fillStyle`)
- `dark.background` = `#0a0a0a` (= `oklch(0.145 0 0)` → `.dark --background`)

`passthrough` por estado de input:

- Desktop / `(pointer: fine)`: `0.15` (default de librería, confirmado)
- Touch / `(pointer: coarse)`: `0.7` (punto medio del rango documentado `0.6–0.8`; bio legible de fondo sin interacción)

Borde de descifrado sutil (reducidos respecto al default de librería para evitar el efecto "neón"):

- `edgeTint` = `0.25` (default `0.75`)
- `edgeGlow` = `0.5` (default `2`)

`colored` = `1` (default): confirmado que **no** introduce acento de color — todos los tokens de la paleta tienen `chroma = 0` (gris puro en oklch), por lo que el color heredado del UI subyacente sigue siendo gris.

Resto de props: **default de librería**, a validar visualmente en pantalla durante 02/03:

`radius`, `cell`, `aspect`, `scramble`, `scrambleSpeed`, `edgeWidth`, `aberration`, `threshold`, `smoothing`, `contrast`, `exposure`.

## Comments

- Reemplaza el prototipo visual en Paper originalmente planeado: el MCP de Paper alcanzó su límite semanal de uso durante la sesión de grilling y el coordinador decidió, con aprobación del usuario, fijar los valores directamente a partir de los tokens reales del código (`src/app/globals.css`) en vez de esperar el reset o subir a Paper Pro.
- Valores fijados desde los tokens reales del sitio (cruzado contra `src/app/globals.css`, líneas 51–120) y los defaults de la librería (doc de Canvas UI para `DecryptReveal`: `passthrough: 0.15`, `edgeTint: 0.75`, `edgeGlow: 2`, `colored: 1`). La bio de Sobre mí usa `text-muted-foreground`, así que `color` hereda ese mismo gris y el cifrado coincide con el tono del texto que revela. Único punto a validar en pantalla durante 02/03: `edgeTint: 0.25` / `edgeGlow: 0.5` y `passthrough: 0.7` en coarse-pointer pueden necesitar un ajuste fino según el aspecto real del borde en el sitio.
