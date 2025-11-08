# Plano de Evolución: Portafolio Digital de Vanguardia
**Versión: 2.0**
**Fecha: 2025-11-07**
**Status:** En Desarrollo Activo

## 1. Visión General y Objetivos

Este documento es la hoja de ruta para la construcción de un **portafolio digital de vanguardia**. El objetivo es crear una experiencia inmersiva que funcione como una vitrina central para un conjunto diverso de habilidades, incluyendo:

*   **Desarrollo Web de Élite:** Proyectos con Next.js, React y arquitecturas Full-Stack.
*   **Inteligencia Artificial Creativa:** Generación de imágenes y producción musical.
*   **Diseño y Marca Personal:** Una estética visual única y memorable.

Nuestros pilares son:

*   **Estética Futurista:** Inspirado en el diseño de alta tecnología, utilizando una paleta de colores oscura, tipografía de autor audaz y animaciones fluidas (`Framer Motion`).
*   **Rendimiento Intocable:** Tiempos de carga instantáneos y una puntuación perfecta en Core Web Vitals, demostrando la excelencia técnica que se ofrece.
*   **Arquitectura Escalable (Headless):** Construir una base que pueda expandirse fácilmente para incluir un blog, páginas de servicios detalladas y, potencialmente, un CMS para gestionar el contenido.

## 2. Análisis del Estado Actual

El snapshot `portafolio-snapshot.txt` revela un workspace Nx con una aplicación Next.js (`portfolio-web`) que ya cuenta con una base sólida: internacionalización (i18n), estructura de componentes y configuración de herramientas de alta calidad. Esta base es perfecta para construir la nueva visión.

## 3. Stack Tecnológico y Dependencias Adicionales

La base actual es excelente. Añadiremos las siguientes dependencias para materializar la nueva visión:

*   **Carrusel de Alto Rendimiento:** `embla-carousel-react` (extremadamente performático y personalizable, ideal para la `HeroSection`).

**Comando de Instalación:**
```bash
pnpm add embla-carousel-react
4. Plano de Acción Inicial (Fase 1 - La Identidad Visual)
Tarea 1: Identidad Visual y Tipografía de Autor

Fuentes Locales: Descargar las tipografías de autor elegidas (formatos .woff2) y alojarlas localmente en una nueva carpeta apps/portfolio-web/src/fonts/.

Integración con next/font: Configurar las fuentes en apps/portfolio-web/src/app/[lang]/layout.tsx utilizando next/font/local para optimizar el rendimiento y evitar layout shifts.

Configuración de Tailwind: Actualizar tailwind.config.js para definir la paleta de colores del tema oscuro/claro (y futuros temas) y registrar las nuevas familias tipográficas (fontFamily).

Sistema de Theming: Implementar la lógica de temas en global.css utilizando variables CSS para colores, permitiendo un cambio instantáneo y la creación de múltiples temas en el futuro.
Tarea 2: Reconstrucción del Homepage (Hero Section)

Crear HeroCarousel.tsx: Desarrollar un nuevo componente de carrusel utilizando embla-carousel-react.

Diseño Inspirado: Implementar el diseño de la imagen proporcionada: un carrusel de imágenes de proyectos a pantalla completa con texto superpuesto y elementos de diseño tipo "HUD" (Heads-Up Display) como coordenadas o datos.

Animaciones con Framer Motion: Animar la entrada de los elementos de texto para crear un efecto dinámico y atractivo.
Tarea 3: Estructura de Contenido Futuro

Crear Carpetas de Servicios: Generar la estructura de carpetas inicial en apps/portfolio-web/src/app/[lang]/ para las futuras páginas de servicios:
/servicios/desarrollo-frontend
/servicios/desarrollo-backend
/servicios/ia-creativa

Crear Archivos page.tsx Básicos: Añadir un componente page.tsx simple como placeholder en cada una de las nuevas carpetas.

---


