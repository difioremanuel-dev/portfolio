# 06 — Soporte de dark mode

**What to build:** Toggle de tema claro/oscuro sobre la paleta en escala de grises ya definida, implementado siguiendo la guía de https://ui.sh/skills/add-dark-mode, persistiendo la preferencia igual que el toggle de idioma.

**Blocked by:** 01 — Scaffold del proyecto

**Status:** ready-for-agent

- [ ] Dark mode implementado según https://ui.sh/skills/add-dark-mode, adaptado a los tokens de diseño en escala de grises ya definidos (sin introducir color de acento)
- [ ] Toggle de tema visible en el header, análogo al toggle de idioma
- [ ] La preferencia de tema persiste entre recargas
- [ ] Si no hay preferencia guardada, se respeta `prefers-color-scheme` del sistema
- [ ] Los tokens de color quedan expresados como variables de tema (no valores hardcodeados), para que las secciones que se construyan después (Hero, Proyectos, Sobre mí, Contacto) hereden automáticamente el contraste correcto en ambos modos
