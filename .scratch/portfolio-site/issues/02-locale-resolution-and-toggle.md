# 02 — Resolución de idioma + toggle

**What to build:** La función pura `resolveLocale` (el seam confirmado en el spec), un toggle ES/EN en el header conectado a ella, con override manual persistido y detección automática por idioma del navegador cuando no hay preferencia guardada.

**Blocked by:** 01 — Scaffold del proyecto

**Status:** ready-for-agent

- [ ] `resolveLocale(browserLanguages, storedPreference)` implementada según la firma del spec, desacoplada de React
- [ ] Tests unitarios cubren: idioma de navegador "es"/"en" exacto, idioma no soportado (fallback a default), preferencia guardada con prioridad sobre el idioma del navegador, y el caso sin preferencia guardada ni match de idioma
- [ ] El header incluye un toggle ES/EN conectado a `resolveLocale`
- [ ] La elección manual del toggle persiste entre recargas
- [ ] El idioma por defecto se detecta automáticamente del navegador cuando no hay override manual guardado
