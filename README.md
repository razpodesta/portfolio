Portafolio de Vanguardia: Un Ecosistema Digital de Élite
![alt text](https://img.shields.io/badge/status-en--desarrollo-purple.svg)

![alt text](https://img.shields.io/badge/licencia-propietaria-red.svg)

![alt text](https://img.shields.io/badge/Next.js-15.2.5-black.svg?logo=next.js)

![alt text](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg?logo=typescript)

![alt text](https://img.shields.io/badge/Nx-Monorepo-blueviolet.svg?logo=nx)

![alt text](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC.svg?logo=tailwind-css)
Visión Estratégica: Este no es simplemente un portafolio. Es un ecosistema digital de élite, forjado como un testimonio viviente de la arquitectura de software moderna y la ingeniería de experiencias. Cada línea de código y cada decisión de diseño están al servicio de una misión: demostrar cómo la tecnología, cuando se ejecuta con rigor, estrategia y creatividad, se convierte en un activo de negocio escalable y de alto rendimiento.
🏛️ Arquitectura y Principios Fundamentales
Este proyecto se rige por una serie de manifiestos internos que tratan el "Código como un Artefacto". La excelencia no es un objetivo, es el punto de partida.
Pilar Arquitectónico	Descripción Detallada	Beneficio Clave
👑 Zod como Única Fuente de Verdad	Toda estructura de datos (i18n, formularios, SEO) se define primero como un esquema Zod. Los tipos de TypeScript se infieren (z.infer) a partir de estos esquemas. Se prohíbe la creación manual de types o interfaces para estructuras de datos.	Integridad y Robustez Absolutas. Garantiza la validación de datos en tiempo de ejecución, elimina la duplicación de código (DRY) y crea un contrato de datos inquebrantable en toda la aplicación.
🌍 Internacionalización (i18n) Granular	El contenido se segmenta en archivos JSON atómicos por característica (/messages/{lang}/{feature}.json). Un script de pre-construcción los ensambla en diccionarios completos antes del build o dev, optimizando el rendimiento.	Rendimiento y Mantenibilidad. Elimina la sobrecarga de lectura de múltiples archivos en tiempo de ejecución y permite a los desarrolladores modificar textos de una sección con confianza, sin efectos secundarios.
🧱 Componentes S.O.L.I.D.	La UI se descompone siguiendo el Principio de Responsabilidad Única: Páginas (orquestadores de datos), Secciones (bloques de UI) y UI/razBits (componentes reutilizables y efectos especiales).	Cohesión y Escalabilidad. Facilita las pruebas, el mantenimiento y la reutilización de componentes. La lógica está encapsulada y es predecible.
🚀 SEO y Rendimiento por Diseño	Cada componente y página se construye con el SEO y los Core Web Vitals como prioridad. Se utilizan datos estructurados (JSON-LD), next/font para fuentes locales y optimización de imágenes con next/image.	Máxima Visibilidad y UX. Asegura las mejores puntuaciones en auditorías de rendimiento y una comprensión profunda del contenido por parte de los motores de búsqueda, traduciéndose en un mejor posicionamiento orgánico.
🛠️ Stack Tecnológico
La selección de tecnologías se basa en la eficiencia, la escalabilidad y la creación de una experiencia de usuario de vanguardia.
Categoría	Tecnologías Clave
Arquitectura y Frontend	Next.js (App Router), React (v19), TypeScript
Estado y Lógica	React Hooks, Context API, Zod (Validación y Tipado)
Estilo y Animación	Tailwind CSS (v4), Framer Motion, Three.js (para razBits)
Calidad de Código y Tooling	ESLint, Prettier, Jest, Playwright (futuro)
Monorepo y Build System	Nx (Next.js Plugin), pnpm (Workspaces)
Infraestructura y Datos	Vercel (Deploy), Supabase (Auth, Futuro CMS)
✨ Funcionalidades Destacadas
🌐 Sistema de Internacionalización Robusto: Soporte completo para múltiples idiomas (pt-BR, en-US, es-ES) gestionado a través de una arquitectura de pre-construcción que garantiza un rendimiento óptimo.
🔮 Componentes Visuales Inmersivos (razBits):
GridScan y LetterGlitch: Fondos animados y efectos de texto generados con Three.js y Canvas API, demostrando capacidades de desarrollo creativo y gráfico.
BlurText: Componente tipográfico que anima la entrada de texto con un efecto de desenfoque, mejorando el impacto visual de los títulos.
🛰️ Widget de Datos del Visitante (VisitorHud): Un componente que consume APIs externas en tiempo real para mostrar la geolocalización, coordenadas y clima del usuario, personalizando la experiencia de forma sutil y elegante.
📝 Blog Estratégico Basado en Archivos: Un sistema de blog ágil que utiliza archivos locales .mdx y .json para el contenido, validado contra esquemas Zod y diseñado para una futura migración sin fricciones a un CMS Headless.
⚡ Rendimiento Intocable: Optimización exhaustiva de fuentes, imágenes y carga de JavaScript para superar los umbrales de Core Web Vitals y ofrecer una experiencia de usuario instantánea.
scalability Escalabilidad, Monorepo y Domain-Driven Design (DDD)
La arquitectura del proyecto está diseñada para un crecimiento sin límites.
Nx Monorepo: El uso de un monorepo gestionado por Nx es una decisión estratégica. Permite:
Cohesión del Ecosistema: Alojar múltiples aplicaciones (ej. portfolio-web, admin-panel) y librerías (shared-ui, data-access) en un solo repositorio.
Límites de Módulos: ESLint refuerza reglas estrictas sobre cómo los proyectos pueden importarse entre sí, manteniendo la integridad arquitectónica.
Cacheo Inteligente: Nx acelera drásticamente los tiempos de build y test al cachear las operaciones.
Potencial de Escalabilidad:
Nuevo Panel de Admin: Se puede añadir una nueva aplicación Next.js (admin-app) dentro de /apps para gestionar el contenido del blog y los servicios, consumiendo librerías compartidas.
Librerías Reutilizables: La lógica de negocio o los componentes de UI pueden extraerse a librerías en /packages para ser compartidos entre aplicaciones.
Micro-Frontends: A futuro, la estructura permite descomponer la UI en micro-frontends si la complejidad del ecosistema lo requiere.
Alineación con Domain-Driven Design (DDD): Aunque es un portafolio, los principios de DDD están presentes. Cada "dominio" o "característica" (blog, legal, contacto) tiene sus propios esquemas de datos (/lib/schemas), archivos de contenido (/messages) y, en el caso del blog, su propia capa de acceso a datos. Esto crea límites claros y reduce el acoplamiento entre las diferentes partes de la aplicación.
🗺️ Roadmap y Proyecciones Futuras
Este ecosistema está en constante evolución. Las próximas fases se centrarán en transformar este portafolio en una plataforma de contenido y servicios completamente soberana.

Fase 2: CMS Soberano y Panel de Gestión

Migrar la capa de datos del blog de archivos locales a tablas en Supabase.

Desarrollar una nueva aplicación (admin-panel) para gestionar artículos, proyectos y servicios.

Implementar Server Actions para la creación y actualización de contenido de forma segura.

Fase 3: Expansión de Servicios y Contenido de IA

Desarrollar páginas detalladas para cada servicio ofrecido.

Integrar funcionalidades de IA Creativa (generación de texto/imágenes) como demos interactivas.

Construir un motor de búsqueda semántica para el blog utilizando embeddings de Supabase.

Fase 4: Sistema de Diseño y Storybook

Completar la página /sistema-de-diseno como un escaparate público de los componentes de UI.

Integrar Storybook en el monorepo para documentar y probar los componentes de forma aislada.

Fase 5: Optimización Continua y Pruebas

Implementar una suite completa de pruebas unitarias y de integración con Jest.

Añadir pruebas End-to-End con Playwright para los flujos de usuario críticos.
📜 Licencia
Este proyecto es de código cerrado y está registrado bajo una licencia propietaria. Todos los derechos están reservados.
© 2025 Raz Podestá | MetaShark Tech
Florianópolis, SC, Brasil
El código, los manifiestos de arquitectura, el diseño y el contenido de este repositorio son propiedad intelectual del autor y no pueden ser copiados, modificados o distribuidos sin permiso explícito por escrito.
📞 Contacto
LinkedIn: linkedin.com/in/razpodesta
GitHub: github.com/razpodesta
Sitio Web: razpodesta.com (URL del proyecto desplegado)
