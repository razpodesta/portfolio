# Blueprint: E-Commerce de Autor
**Slug:** `ecommerce-de-autor`
**Objetivo:** Experiencia de compra fluida y estética de marca premium.

## 1. Arquitectura Visual
*   **Estilo:** Corporativo Moderno, Limpio, Espaciado.
*   **Tipografía:** *Cabinet Grotesk* (Personalidad) + *Inter* (Utilidad).
*   **Color Primario:** Azul Cielo (#0ea5e9).

## 2. Mapa de Secciones (Componentes a Construir)
1.  **Hero Slider (Promocional):**
    *   *Componente:* `ShopHero.tsx`
    *   *Specs:* Slider con `embla-carousel`, texto superpuesto y botón "Comprar Ahora".
2.  **Featured Categories:**
    *   *Componente:* `CategoryPills.tsx`
    *   *Specs:* Navegación rápida por categorías con filtro visual.
3.  **Product Showcase (Dynamic Grid):**
    *   *Componente:* `ProductGrid.tsx`
    *   *Specs:* Tarjetas de producto con "Quick View" (Modal) y botón de añadir al carrito directo.
4.  **Promo Banner:**
    *   *Componente:* `MarqueeBanner.tsx`
    *   *Specs:* Texto en movimiento anunciando ofertas (ej. "Envío Gratis").
5.  **Newsletter Popup:**
    *   *Componente:* `DiscountModal.tsx`
    *   *Specs:* Modal de salida (Exit Intent) ofreciendo descuento por email.

## 3. Requisitos Técnicos
*   Gestión de estado del carrito con Zustand (Persist).
*   Integración simulada con Stripe (UI de Checkout).
*   Filtros de búsqueda en cliente.