# Blueprint: Portafolio Creativo
**Slug:** `portafolios-creativos`
**Objetivo:** Exhibición visual pura sin distracciones.

## 1. Arquitectura Visual
*   **Estilo:** Brutalista, Grandes Tipografías, Grid Asimétrico.
*   **Tipografía:** *Syne* (Artística) + *Manrope*.
*   **Color Primario:** Rosa (#ec4899).

## 2. Mapa de Secciones (Componentes a Construir)
1.  **Artist Statement:**
    *   *Componente:* `BigStatement.tsx`
    *   *Specs:* Texto gigante ocupando todo el viewport.
2.  **Masonry Gallery:**
    *   *Componente:* `MasonryGrid.tsx`
    *   *Specs:* Grid de imágenes de diferentes aspect-ratios que encajan perfectamente.
3.  **Lightbox Modal:**
    *   *Componente:* `ImageLightbox.tsx`
    *   *Specs:* Al hacer clic en una imagen, se expande a pantalla completa.
4.  **Process Journal:**
    *   *Componente:* `ProcessList.tsx`
    *   *Specs:* Lista minimalista de proyectos con efecto hover de imagen.

## 3. Requisitos Técnicos
*   Manejo avanzado de imágenes (Layout shift 0).
*   Transiciones de página fluidas.