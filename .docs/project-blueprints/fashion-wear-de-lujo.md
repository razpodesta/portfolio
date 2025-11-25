# Blueprint: Fashion Luxury
**Slug:** `fashion-wear-de-lujo`
**Objetivo:** Experiencia sensorial y deseo.

## 1. Arquitectura Visual
*   **Estilo:** Avant-Garde, Espacio Negativo, Animación Suave.
*   **Tipografía:** *Italiana* (Moda) + *Tenor Sans*.
*   **Color Primario:** Negro (#000000).

## 2. Mapa de Secciones (Componentes a Construir)
1.  **Fullscreen Video:**
    *   *Componente:* `RunwayVideo.tsx`
    *   *Specs:* Video de pasarela a pantalla completa sin controles.
2.  **Lookbook Scroller:**
    *   *Componente:* `HorizontalScroll.tsx`
    *   *Specs:* Scroll horizontal suave mostrando outfits completos.
3.  **Texture Zoom:**
    *   *Componente:* `TextureDetail.tsx`
    *   *Specs:* Imagen macro de tela con efecto de lupa al pasar el mouse.
4.  **Shop the Look:**
    *   *Componente:* `HotspotImage.tsx`
    *   *Specs:* Imagen con puntos interactivos sobre las prendas para ver precio/comprar.

## 3. Requisitos Técnicos
*   WebGL para efectos de distorsión (opcional).
*   Lenis Scroll para desplazamiento de lujo.

---

actualiacion

# Blueprint: Fashion Wear de Lujo (Arquetipo "Avant-Garde")
**Slug:** `fashion-wear-de-lujo`
**Inspiración:** Balenciaga, Saint Laurent, SSENSE.
**Objetivo:** Crear una atmósfera de exclusividad y deseo mediante una UX sensorial, minimalista y técnicamente sofisticada.

## 1. Arquitectura Visual y Branding
*   **Concepto:** "Silent Luxury". La interfaz desaparece para dejar paso al producto.
*   **Paleta de Colores:** Monocromática Estricta.
    *   *Light Mode:* Blanco Absoluto (#FFFFFF) con texto Negro Puro (#000000).
    *   *Dark Mode:* Negro Profundo (#050505) con texto Blanco (#FFFFFF).
*   **Tipografía:**
    *   *Marca (Logo):* **Signature Script** (Fuente manuscrita personalizada para simular la firma del diseñador).
    *   *Titulares:* **Italiana** (Serifa afilada, elegante, editorial).
    *   *Datos/UI:* **Tenor Sans** (Humanista, limpia, para legibilidad en tamaños pequeños).
*   **Layout:** "Full Bleed". Las imágenes tocan los bordes del navegador. Sin márgenes laterales en secciones clave.

## 2. Estrategia de Desarrollo (Homepage Única)
Dado que solo desarrollamos la Homepage, esta funcionará como una **SPA (Single Page Application) híbrida**.
*   **Ruta:** `apps/portfolio-web/src/app/[lang]/proyectos/fashion-wear-de-lujo/page.tsx` (Override de la ruta dinámica genérica).
*   **Internacionalización:** Todo texto vendrá de `project_details.json` bajo la clave `fashion-wear-de-lujo`.

## 3. Mapa de Componentes (Secciones)

### A. Global UI (Persistente)
*   **`FashionHeader`:**
    *   *Behavior:* Sticky inteligente. Desaparece al bajar scroll, aparece al subir.
    *   *Elementos:* Logo "Manuscrito" centrado. Menú "Hamburguesa" minimalista a la izquierda. Iconos (Search, Cart, User) a la derecha.
*   **`LuxuryCartSidebar` (Drawer):**
    *   *Tech:* Zustand para estado global (`isOpen`, `items`).
    *   *UX:* Desliza desde la derecha. Muestra productos con fotos grandes. Botón "Checkout Express" (Apple Pay/Google Pay simulado).
*   **`MemberExclusiveZone` (Modal/Overlay):**
    *   *Trigger:* Intentar comprar ciertos ítems "Locked".
    *   *UX:* Blur de fondo. Formulario de login minimalista para acceder a "Ventas Privadas".

### B. Secciones de Página (Scrollytelling)

1.  **Hero: `RunwayVideo`**
    *   *Specs:* Video HTML5 `<video>` en loop, `muted`, `playsinline`.
    *   *Estilo:* Pantalla completa (100vh). Sin texto superpuesto, solo la fuerza visual. El logo del header flota sobre esto en modo `mix-blend-mode: difference`.

2.  **La Colección: `HorizontalLookbook`**
    *   *Tech:* `Framer Motion` + Scroll Horizontal nativo o emulado.
    *   *Visual:* Una cinta infinita de modelos caminando. Al hacer hover, la imagen se detiene o cambia a detalle de prenda.

3.  **Interacción: `HotspotShowcase` (Shop the Look)**
    *   *UX:* Imagen estática de alta resolución. Puntos pulsantes sobre las prendas.
    *   *Interacción:* Click en punto -> Abre tooltip con precio y botón "Añadir Rápido".

4.  **Detalle Técnico: `TextureZoom` (WebGL opcional)**
    *   *Tech:* Componente de imagen con efecto de lupa (Magnifier) o desplazamiento de mapa de desplazamiento (WebGL) para ver la trama de la tela.
    *   *Objetivo:* Demostrar calidad de materiales.

5.  **Cierre: `EditorialNewsletter`**
    *   *Estilo:* Tipografía gigante. "JOIN THE CULT".
    *   *Input:* Solo una línea subrayada. Minimalismo extremo.

## 4. Requisitos Técnicos y SEO
*   **Lenis Scroll:** Implementación obligatoria para suavizar el scroll y dar sensación de "peso" y lujo.
*   **SEO:** Schema.org de `Product` y `Organization` (Marca de moda).
*   **Performance:** Carga diferida (Lazy) de las imágenes del lookbook. El video del Hero debe ser poster-first (cargar imagen mientras baja el video).

---
