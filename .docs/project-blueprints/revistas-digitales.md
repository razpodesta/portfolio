# Blueprint: Revista Digital
**Slug:** `revistas-digitales`
**Objetivo:** Lectura inmersiva y descubrimiento de contenido.

## 1. Arquitectura Visual
*   **Estilo:** Editorial Clásico, Grid de Periódico.
*   **Tipografía:** *Bodoni Moda* (Titulares) + *Lora* (Cuerpo).
*   **Color Primario:** Rojo Carmesí (#be123c).

## 2. Mapa de Secciones (Componentes a Construir)
1.  **Cover Story:**
    *   *Componente:* `MagazineCover.tsx`
    *   *Specs:* Diseño tipo portada de revista con titular grande e imagen principal.
2.  **Trending Sidebar:**
    *   *Componente:* `TrendingList.tsx`
    *   *Specs:* Lista numerada de artículos más leídos (Sticky sidebar).
3.  **Category Grid:**
    *   *Componente:* `ArticleGrid.tsx`
    *   *Specs:* Grid de artículos con diferentes tamaños según importancia.
4.  **Newsletter Insert:**
    *   *Componente:* `InContentNewsletter.tsx`
    *   *Specs:* Bloque de suscripción insertado entre el contenido.

## 3. Requisitos Técnicos
*   Tipografía optimizada para lectura prolongada.
*   Estructura HTML semántica (`<article>`, `<aside>`).