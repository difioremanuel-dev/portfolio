# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js con shadcn/ui, Magic UI y Canvas UI (Canvas UI usado con moderación, en 1-2 puntos puntuales). Deploy en Vercel, con el subdominio gratuito (`*.vercel.app`) por ahora — dominio propio queda para más adelante. Justificación completa en `docs/adr/0001-nextjs-shadcn-magicui-canvasui-stack.md`.

## Users

Developers y público general que llegan vía redes (Instagram, X, GitHub) o links compartidos — no está enfocado específicamente en reclutadores formales. Llegan evaluando casualmente el trabajo y la persona detrás del portfolio.

## Product Purpose

Portfolio personal de Manuel Di Fiore para marca personal y demostrar habilidades técnicas. Éxito significa que el visitante entienda quién es, vea sus proyectos, y pueda seguirlo/contactarlo por redes.

## Positioning

Sin definir todavía — no se estableció una especialidad o diferencial técnico puntual. A revisar cuando se carguen los proyectos reales (ver Evidence on Hand).

## Operating Context

Sitio estático, sin backend ni base de datos. El contenido de Proyectos vive en un archivo de datos TypeScript editado directamente por el autor (ver `CONTEXT.md` y `future.md` para alternativas futuras como markdown o CMS). Contacto solo por links a redes, sin formulario.

## Capabilities and Constraints

- Sin formulario de contacto ni backend — solo links externos a redes (Instagram, X, GitHub).
- Sin CV descargable, sin lista de skills separada, sin timeline de experiencia — bio corta únicamente (alcance actual).
- Contenido bilingüe (español/inglés) con switcher — mecanismo de selección de idioma aún sin diseñar.
- Proyectos: sin contenido real cargado todavía — arranca con placeholders.
- Terminología del dominio en `CONTEXT.md` (términos "Proyecto" y "Bio").

## Brand Commitments

Nombre a mostrar: Manuel Di Fiore. Redes a enlazar: Instagram, X (Twitter), GitHub.

## Evidence on Hand

Sin proyectos reales cargados todavía. El sitio arranca con datos placeholder en la sección Proyectos que el autor completará después. No inventar proyectos, links, testimonios ni bio de ejemplo presentados como reales.

## Product Principles

- Minimalismo funcional: la estética en escala de grises y el uso moderado de Canvas UI nunca deben opacar el contenido.
- Contenido real por sobre relleno: no se fabrican proyectos ni datos de ejemplo — los placeholders quedan explícitamente marcados como tales.
- Alcance acotado deliberado: sin backend, sin formulario, sin CMS — todo el sitio es estático y editado directamente por el autor.
- Audiencia dual: debe leerse bien tanto para developers (GitHub, tecnicismos) como para público general (Instagram) — evitar jerga excesiva.
- Bilingüe desde el diseño: cualquier componente de copy contempla ambos idiomas desde el inicio, no como agregado tardío.
