# Blueprint: Showroom Corporativo
**Slug:** `showrooms-corporativos`
**Objetivo:** Autoridad B2B y presentación de infraestructura/servicios.

## 1. Arquitectura Visual
*   **Estilo:** Inmersivo, Video de Fondo, Serio.
*   **Tipografía:** *Playfair Display* (Elegancia) + *Lato* (Legibilidad).
*   **Color Primario:** Slate Oscuro (#1e293b).

## 2. Mapa de Secciones (Componentes a Construir)
1.  **Video Hero (Cinematic):**
    *   *Componente:* `VideoHero.tsx`
    *   *Specs:* Video de fondo en loop (muted), texto blanco, overlay oscuro.
2.  **Corporate Timeline:**
    *   *Componente:* `HistoryTimeline.tsx`
    *   *Specs:* Scroll horizontal o vertical animado contando la historia de la empresa.
3.  **Global Presence (Map):**
    *   *Componente:* `InteractiveMap.tsx`
    *   *Specs:* Mapa SVG interactivo con puntos calientes (hotspots) de oficinas.
4.  **3D Product Viewer:**
    *   *Componente:* `ProductViewer3D.tsx`
    *   *Specs:* Canvas R3F mostrando un modelo industrial o arquitectónico rotable.
5.  **Investor Relations (Stats):**
    *   *Componente:* `AnimatedStats.tsx`
    *   *Specs:* Contadores numéricos animados (CountUp) al hacer scroll.

## 3. Requisitos Técnicos
*   Optimización de carga de video.
*   Lazy loading del modelo 3D.
*   Soporte i18n prioritario.