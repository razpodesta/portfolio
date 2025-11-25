# Blueprint: Landing Page de Conversión (CRO)
**Slug:** `landing-pages-de-conversion`
**Objetivo:** Maximizar la captura de leads con tiempos de carga sub-segundo.

## 1. Arquitectura Visual
*   **Estilo:** Minimalista, Alto Contraste, Direccional.
*   **Tipografía:** *Clash Display* (Títulos agresivos) + *Satoshi* (Lectura rápida).
*   **Color Primario:** Violeta Eléctrico (#7c3aed).

## 2. Mapa de Secciones (Componentes a Construir)
1.  **Hero Section (High Impact):**
    *   *Componente:* `HeroConversion.tsx`
    *   *Specs:* Título H1 grande, Subtítulo persuasivo, Formulario de captura visible *above the fold* (sin scroll).
2.  **Social Proof (Trust Bar):**
    *   *Componente:* `LogoTicker.tsx`
    *   *Specs:* Carrusel infinito de logotipos de empresas en escala de grises (framer-motion).
3.  **Benefits Grid (Bento Box):**
    *   *Componente:* `BentoBenefits.tsx`
    *   *Specs:* Grid CSS asimétrico mostrando 3-4 beneficios clave con iconos Lucide.
4.  **How It Works (Steps):**
    *   *Componente:* `StepsProcess.tsx`
    *   *Specs:* Línea de tiempo vertical o pasos horizontales con conectores animados.
5.  **FAQ Accordion:**
    *   *Componente:* `SmartAccordion.tsx`
    *   *Specs:* Lista desplegable optimizada para SEO (Schema FAQPage).
6.  **Floating CTA:**
    *   *Componente:* `StickyCtaBar.tsx`
    *   *Specs:* Barra inferior que aparece al hacer scroll hacia arriba.

## 3. Requisitos Técnicos
*   Validación de formulario con Zod.
*   Envío de datos a Supabase Edge Functions.
*   Lazy loading de imágenes "below the fold".