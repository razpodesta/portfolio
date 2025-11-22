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

Roadmap de Modernización: cms-api a Nivel de Élite
Versión: 1.0
Fecha: 2025-11-20
1. Misión y Filosofía
La misión de esta modernización es transformar cms-api de un servidor tradicional a una API de vanguardia, robusta y completamente type-safe. Los principios rectores son:
Sincronía Tecnológica: La API utilizará un stack que refleje la modernidad de portfolio-web, adoptando @apollo/server v4 y las mejores prácticas del ecosistema Node.js actual.
Erradicación Total de any: Se refactorizará toda la base de código para eliminar por completo el tipo any, reemplazándolo con tipos inferidos de Zod y tipos explícitos donde sea necesario. La seguridad de tipos no es negociable.
Arquitectura Limpia y Desacoplada: Se optimizará la estructura de archivos y la lógica interna para mejorar la legibilidad, mantenibilidad y facilidad para añadir nuevas funcionalidades.
Consistencia del Monorepo: Se unificarán las versiones de dependencias clave (como typescript y zod) en todo el monorepo para garantizar la máxima compatibilidad y evitar conflictos.
2. Plan de Acción Táctico: Ejecución por Fases
Fase 1: Cirugía de Dependencias y Cimientos
Esta fase es crítica y se enfoca en reemplazar el "corazón" de la API.
1.1. Eliminar Dependencias Obsoletas:
Vamos a remover Apollo Server 3 y otras librerías que serán reemplazadas.
code
Cmd
pnpm remove apollo-server-express graphql-tag
1.2. Instalar el Nuevo Núcleo de Apollo Server 4 y Dependencias Esenciales:
Instalaremos @apollo/server y las librerías necesarias para integrarlo con Express, además de graphql que ahora es un peer dependency.
code
Cmd
pnpm add @apollo/server express graphql cors
1.3. Unificar Versiones del Monorepo:
Asegurémonos de que todo el workspace use las mismas versiones de herramientas clave.
code
Cmd
pnpm add -D typescript@~5.9.3 zod@^4.1.12
Fase 2: Refactorización Arquitectónica del Servidor (index.ts)
El archivo de entrada src/index.ts será completamente reescrito para adoptar la nueva sintaxis de @apollo/server v4.
Objetivo: Reemplazar la lógica de apollo-server-express por la nueva integración con expressMiddleware.
Acción: Te proporcionaré el archivo index.ts completamente refactorizado.
Fase 3: Erradicación de any y Tipado Soberano
Esta es la fase de calidad de código más intensiva. Auditaremos y refactorizaremos cada archivo para eliminar any y usar tipos estrictos.
Objetivo: Lograr un 100% de type safety.
Foco Principal:
apps/cms-api/src/interfaces/types.ts: Se convertirá en la fuente de verdad soberana para todos los tipos de datos del backend. Lo reescribiremos para que sea explícito y robusto.
Resolvers (apps/cms-api/src/graphql/resolvers/): Los argumentos de cada resolver (parent, args, context, info) serán tipados explícitamente.
Modelos de Sequelize: Se asegurará que los modelos y sus asociaciones estén correctamente tipados.
Fase 4: Optimización de la Estructura y Lógica
Revisaremos la lógica actual para mejorarla y hacerla más eficiente.
Objetivo: Simplificar el código y mejorar el rendimiento.
Acciones:
apps/cms-api/src/models/index.ts: Se refactorizará la forma en que se inicializa Sequelize y se asocian los modelos para que sea más limpia.
apps/cms-api/src/lib/auth.ts: Se auditará y refinará la lógica de autenticación y creación de tokens.

---


