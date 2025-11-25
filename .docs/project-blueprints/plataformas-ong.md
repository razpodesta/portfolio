# Blueprint: Plataforma ONG
**Slug:** `plataformas-ong`
**Objetivo:** Transparencia, emoción y recaudación.

## 1. Arquitectura Visual
*   **Estilo:** Humano, Cálido, Basado en Datos.
*   **Tipografía:** *Merriweather* (Serifa confiable) + *Open Sans*.
*   **Color Primario:** Ámbar (#f59e0b).

## 2. Mapa de Secciones (Componentes a Construir)
1.  **Impact Hero:**
    *   *Componente:* `EmotionalHero.tsx`
    *   *Specs:* Fotografía de alto impacto emocional, botón "Donar" destacado.
2.  **Donation Widget:**
    *   *Componente:* `DonationThermometer.tsx`
    *   *Specs:* Selector de monto (Único/Mensual) y barra de progreso de meta.
3.  **Transparency Charts:**
    *   *Componente:* `ImpactCharts.tsx`
    *   *Specs:* Gráficos de torta/barras (Recharts) mostrando distribución de fondos.
4.  **Stories Carousel:**
    *   *Componente:* `StoryCard.tsx`
    *   *Specs:* Historias de éxito con foto y testimonio.

## 3. Requisitos Técnicos
*   Visualización de datos (Recharts).
*   Accesibilidad AAA (Contraste alto).