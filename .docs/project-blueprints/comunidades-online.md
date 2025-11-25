# Blueprint: Comunidad Online
**Slug:** `comunidades-online`
**Objetivo:** Interacción social y contenido restringido (Paywall).

## 1. Arquitectura Visual
*   **Estilo:** Tech, Dashboard, Oscuro ("Discord-like").
*   **Tipografía:** *Space Grotesk* (Tech) + *DM Sans*.
*   **Color Primario:** Esmeralda (#10b981).

## 2. Mapa de Secciones (Componentes a Construir)
1.  **Community Hero:**
    *   *Componente:* `CommunityIntro.tsx`
    *   *Specs:* Ilustración 3D o abstracta, métricas de miembros activos.
2.  **Activity Feed (Preview):**
    *   *Componente:* `FeedPreview.tsx`
    *   *Specs:* Lista animada de "posts" recientes simulando tiempo real.
3.  **Membership Plans:**
    *   *Componente:* `PricingCards.tsx`
    *   *Specs:* Tarjetas de precios con comparativa de características.
4.  **Live Chat Demo:**
    *   *Componente:* `ChatInterface.tsx`
    *   *Specs:* UI de chat simulada con mensajes entrantes automáticos.

## 3. Requisitos Técnicos
*   Simulación de WebSockets.
*   UI de estado vacío y de carga (Skeletons).