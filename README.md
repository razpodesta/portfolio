# Portafolio de Vanguardia: Un Ecosistema Digital de Élite

![Estado: En Desarrollo Activo](https://img.shields.io/badge/status-en--desarrollo-purple.svg)
![Licencia: Propietaria](https://img.shields.io/badge/licencia-propietaria-red.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.2.5-black.svg?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg?logo=typescript)
![Nx Monorepo](https://img.shields.io/badge/Nx-Monorepo-blueviolet.svg?logo=nx)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC.svg?logo=tailwind-css)

> Este repositorio es más que código; es el plano de un ecosistema digital de élite, forjado como un testimonio viviente de la arquitectura de software moderna y la ingeniería de experiencias. Cada línea y cada decisión de diseño están al servicio de una misión: demostrar cómo la tecnología, cuando se ejecuta con rigor, estrategia y creatividad, se convierte en un activo de negocio escalable y de alto rendimiento.

---

## 🏛️ Arquitectura y Principios Fundamentales

Este proyecto se rige por una serie de manifiestos internos que tratan el **"Código como un Artefacto"**. La excelencia no es un objetivo, es el punto de partida.

| Pilar Arquitectónico | Descripción Detallada | Beneficio Clave |
| :--- | :--- | :--- |
| 👑 **Zod como Única Fuente de Verdad** | Toda estructura de datos (i18n, formularios, API) se define como un esquema Zod. Los tipos de TypeScript se infieren (`z.infer`), prohibiendo la creación manual de `types` o `interfaces`. | **Integridad y Robustez Absolutas.** Garantiza validación en tiempo de ejecución, elimina la duplicación (DRY) y crea un contrato de datos inquebrantable. |
| 🧠 **Contenido Soberano y Desacoplado** | La aplicación `cms-api` actúa como un CMS Headless y la única fuente de verdad para el contenido dinámico. El frontend (`portfolio-web`) es un cliente puro de esta API, completamente independiente. | **Escalabilidad y Flexibilidad.** Permite que el frontend y el backend evolucionen de forma independiente. El contenido puede ser consumido por cualquier plataforma (web, móvil, etc.) en el futuro. |
| 🌍 **Internacionalización (i18n) Granular** | El contenido se segmenta en archivos JSON atómicos por característica. Un script de pre-construcción los ensambla en diccionarios completos antes del `build` o `dev`. | **Rendimiento y Mantenibilidad.** Elimina la sobrecarga de lectura de archivos en tiempo de ejecución y permite a los desarrolladores modificar textos de una sección sin efectos secundarios. |
| 🧱 **Componentes S.O.L.I.D.** | La UI se descompone siguiendo el Principio de Responsabilidad Única: **Páginas** (orquestadores de datos), **Secciones** (bloques de UI) y **UI/razBits** (componentes reutilizables). | **Cohesión y Reutilización.** Facilita las pruebas, el mantenimiento y la escalabilidad de la interfaz de usuario. La lógica está encapsulada y es predecible. |
| 🚀 **SEO y Rendimiento por Diseño** | Cada componente se construye con el SEO y los Core Web Vitals como prioridad: Datos estructurados (JSON-LD), `next/font`, `next/image` y Renderizado Estático (SSG). | **Máxima Visibilidad y UX.** Asegura las mejores puntuaciones en auditorías de rendimiento y una comprensión profunda del contenido por parte de los motores de búsqueda. |

---

## 🧠 El CMS Soberano: `cms-api`

Una de las mejoras más significativas ha sido la evolución hacia una arquitectura de contenido desacoplada. El proyecto `cms-api` ahora funciona como un **CMS Headless soberano**, el cerebro central que gobierna todo el contenido dinámico del ecosistema.

### Capacidades Actuales
-   📝 **Gestión de Posts**: Infraestructura completa para crear, leer y gestionar los artículos del blog.
-   🏷️ **Sistema de Tags**: Modelos y lógica para la categorización y el filtrado de contenido.
-   💬 **Módulo de Comunidad**: Cimientos para el futuro sistema de comentarios, con relaciones claras entre usuarios, posts y comentarios.
-   🔐 **Autenticación de Usuarios**: Sistema robusto para la gestión de usuarios y roles.
-   🚀 **API GraphQL de Alto Rendimiento**: Expone todos los datos a través de una API de GraphQL moderna, `type-safe` y optimizada, construida sobre **Apollo Server v4**.

### Visión Futura del CMS
-   🖼️ **Gestor de Activos (Assets)**: Implementación de una interfaz para la subida y gestión de recursos multimedia (imágenes, videos).
-   🎮 **Gamificación de Comentarios**: Evolución del módulo de comunidad para incluir niveles de comentarista e insignias, fomentando la participación de calidad.

---

## 🛠️ Stack Tecnológico

La selección de tecnologías se basa en la eficiencia, la escalabilidad y la creación de una experiencia de usuario de vanguardia.

| Categoría | Tecnologías Clave |
| :--- | :--- |
| **Arquitectura y Frontend** | Next.js (App Router), React (v19), TypeScript, Tailwind CSS (v4) |
| **Backend y Datos** | Node.js, **Apollo Server v4**, **Sequelize**, **PostgreSQL**, GraphQL |
| **Estilo y Animación** | Framer Motion, **Three.js**, **Postprocessing**, Lucide Icons |
| **Calidad de Código y Tooling** | ESLint, Prettier, Jest, Playwright (futuro), **Zod** |
| **Monorepo y Build System** | **Nx**, pnpm (Workspaces) |
| **Infraestructura** | Vercel (Deploy), Supabase (Auth & Database) |

---

## ✨ Funcionalidades Destacadas

-   🌐 **Sistema de Internacionalización Robusto**: Soporte para `pt-BR`, `en-US` y `es-ES` gestionado a través de una arquitectura de pre-construcción.
-   🔮 **Componentes Visuales Inmersivos (razBits)**: `GridScan` y `LetterGlitch` demuestran capacidades de desarrollo creativo con Three.js y Canvas API.
-   🛰️ **Widget de Datos del Visitante (VisitorHud)**: Consume APIs externas en tiempo real para mostrar geolocalización, clima y hora del usuario.
-   📝 **Blog Estratégico con SSG**: Impulsado por el CMS Headless (`cms-api`), con renderizado estático (SSG) e ISR para un rendimiento extremo y un SEO impecable.
-   ⚡ **Rendimiento Intocable**: Optimización exhaustiva de fuentes, imágenes y carga de JavaScript para superar los umbrales de Core Web Vitals.

---

## 🗺️ Hoja de Ruta Evolutiva: Del Manifiesto a la Realidad

Este ecosistema está en constante evolución. La hoja de ruta refleja la transición de una base arquitectónica sólida a una plataforma de contenido y servicios completamente funcional.

### ✅ **Hitos Completados**

-   **Infraestructura Backend del Blog**: Se han implementado los modelos de datos (`Post`, `Tag`, `Comment`) y los resolvers de GraphQL en `cms-api`.
-   **Desacoplamiento del Frontend**: `portfolio-web` ahora consume los datos del blog a través de la API de GraphQL, eliminando la dependencia del sistema de archivos.
-   **Modernización de `cms-api`**: El backend ha sido migrado a Apollo Server v4 y refactorizado para ser completamente `type-safe`, eliminando `any` de su núcleo.
-   **Identidad Visual y Homepage**: La nueva identidad visual, tipografía y el `HeroCarousel` están implementados y en producción.

### ⏳ **Próximos Pasos Estratégicos**

-   **Fase 2: Panel de Gestión (`cms-admin`)**: Desarrollar las interfaces de usuario en la aplicación de administración para gestionar los posts, tags y moderar los comentarios del blog.
-   **Fase 3: SEO Avanzado y Comunidad (Frontend)**:
    -   Implementar `generateStaticParams` y `generateMetadata` en las páginas del blog para activar SSG y el SEO dinámico.
    -   Construir el componente de `ShareButtons` y la página de archivo para tags.
    -   Desarrollar el componente de cliente para visualizar y enviar comentarios.
-   **Fase 4: Expansión de Servicios y Contenido de IA**:
    -   Desarrollar páginas detalladas para cada servicio ofrecido.
    -   Integrar funcionalidades de IA Creativa como demos interactivas.
-   **Fase 5: Alineación Arquitectónica de Pruebas**: Migrar la estructura de pruebas actual a la "Estructura de Espejo" definida en el `manifiesto-pruebas.md`, centralizando todos los tests en un directorio `/tests` en la raíz.

---

## 📜 Licencia

Este proyecto es de código cerrado y está registrado bajo una licencia propietaria. Todos los derechos están reservados.

© 2025 Raz Podestá | MetaShark Tech
Florianópolis, SC, Brasil

El código, los manifiestos de arquitectura, el diseño y el contenido de este repositorio son propiedad intelectual del autor y no pueden ser copiados, modificados o distribuidos sin permiso explícito por escrito.

---

## 📞 Contacto

-   **LinkedIn**: [linkedin.com/in/razpodesta](https://linkedin.com/in/razpodesta)
-   **GitHub**: [github.com/razpodesta](https://github.com/razpodesta)
-   **Sitio Web**: [razpodesta.com](https://www.razpodesta.com) (URL del proyecto desplegado)
