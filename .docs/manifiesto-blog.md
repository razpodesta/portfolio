# Manifiesto del Blog: La Plataforma de Contenido Estratégico
**Versión: 1.0**
**Fecha: 2025-11-12**

## 1. Filosofía: "Contenido como Activo de Autoridad"

Este blog no es un diario; es un activo estratégico. Su misión es doble: demostrar una profunda maestría técnica y filosófica, y actuar como un motor de crecimiento orgánico (SEO) que atraiga y eduque a nuestra audiencia objetivo. Cada artículo debe ser una pieza de ingeniería de conocimiento, diseñada para aportar un valor inmenso y reforzar nuestra posición como líderes de pensamiento en la creación de ecosistemas digitales.

Nuestros principios son:
1.  **Valor sobre Volumen:** Priorizamos la calidad y profundidad de cada artículo sobre la frecuencia de publicación.
2.  **Arquitectura Soberana:** El blog nacerá como un sistema basado en archivos (`.mdx`) para agilidad, pero su arquitectura estará diseñada desde el día cero para ser gestionada por un CMS Headless soberano, garantizando la escalabilidad a futuro.
3.  **SEO por Diseño:** Cada aspecto, desde la estructura de la URL hasta el renderizado del contenido, estará meticulosamente optimizado para el máximo rendimiento en los motores de búsqueda.

## 2. Arquitectura Holística del Dominio

El blog se compone de tres capas interconectadas: la capa de datos, la capa de presentación y la futura capa de gestión.

```mermaid
graph TD
    subgraph "Capa de Datos (El Cerebro)"
        A[Contenido Soberano] --> B{Capa de Acceso a Datos};
        subgraph "Fase 1: Archivos Locales"
            A1[Archivos .mdx y .json en /content]
        end
        subgraph "Fase 2: CMS Headless"
            A2[Tablas en Supabase: blog_posts, blog_tags]
        end
        B[Server Actions: blog.actions.ts] --> C[getPostBySlug(), getAllPosts()];
    end

    subgraph "Capa de Presentación (El Rostro)"
        D[App Router de Next.js] --> E[Página de Listado: /blog];
        D --> F[Página de Artículo: /blog/[slug]];
        E -- Renderiza --> G[Componente: BlogCard];
        F -- Renderiza --> H[Contenido del Artículo con @tailwindcss/typography];
    end

    subgraph "Capa de Gestión (El Taller)"
        I[Panel de Admin: /manage/blog] --> J[Componente: PostEditor];
        J -- Llama a --> K[Server Actions: createPost(), updatePost()];
    end

    C --> E;
    C --> F;
    K --> B;

    style A fill:#a78bfa,color:#fff
    style I fill:#3b82f6,color:#fff
3. Estructura de Contenido y Datos
3.1. Metadatos del Artículo (.json)
Cada artículo estará acompañado de un archivo JSON que define sus metadatos, validados por blogPostSchema.ts.
title: Título principal para SEO y visualización.
description: Resumen corto para tarjetas de vista previa y meta description.
author: Nombre del autor.
published_date: Fecha de publicación en formato YYYY-MM-DD.
tags: Un array de strings para la categorización.
3.2. Contenido del Artículo (.mdx)
El cuerpo del artículo se escribirá en formato MDX (Markdown + JSX), permitiendo no solo texto formateado, sino también la incrustación de componentes React interactivos para demostraciones o visualizaciones de datos.
4. Estrategia de Contenido Fundacional
El blog se lanzará con una base de 10 artículos que establecen nuestra filosofía y conocimiento:
¿Qué es una PWA? La Web App que se Siente Nativa.
Más Allá de React vs. Svelte: Entendiendo las Diferencias Reales de Tecnología.
De Página a Cerebro Digital: El Nuevo Paradigma de los Sitios Inteligentes.
Arquitectura por Manifiesto: Por Qué el "Cómo" Importa Más que el "Qué".
Monorepo con Nx: La Base para Ecosistemas Digitales Escalables.
Zod como Única Fuente de Verdad: El Secreto para un Código a Prueba de Futuro.
El Ciclo de Vida de la Conversión: Un Enfoque Holístico del Marketing Digital.
IA Soberana: Cómo Entrenar tu Propio Co-piloto de Desarrollo (El Caso de LIA Legacy).
Filosofía Mobile-First: Diseñando para la Realidad del Usuario.
Del Embudo a la Experiencia: Creando Páginas de Venta que Conectan.
5. Hoja de Ruta de Implementación
Fase 1 (MVP):
Crear los esquemas Zod (blog.schema.ts).
Crear la capa de acceso a datos (blog-api.ts) para leer desde archivos locales.
Construir los componentes de UI (BlogCard) y las páginas públicas (/blog y /blog/[slug]).
Escribir y añadir los 10 artículos fundacionales como archivos .mdx/.json.
Fase 2 (CMS Soberano):
Migrar el esquema de datos a tablas en Supabase.
Refactorizar la capa de acceso a datos para usar Server Actions que interactúen con Supabase.
Construir la interfaz de gestión de contenido en /manage/blog.

---
Manifiesto y Hoja de Ruta del Blog Soberano
Versión: 2.0
Fecha: 2025-11-20
1. Filosofía y Principios Inquebrantables
Este documento define la arquitectura y la hoja de ruta para evolucionar el blog desde un sistema basado en archivos a un activo de contenido dinámico y soberano, impulsado por el CMS ContentPI. Los principios son:
Rendimiento como Dogma (SSG + ISR): La velocidad es una característica fundamental. Todas las páginas de artículos y listados se generarán como HTML estático en tiempo de build (SSG) y se mantendrán actualizadas de forma inteligente y automática (ISR), garantizando tiempos de carga instantáneos y las mejores puntuaciones en Core Web Vitals.
Contenido Soberano y Desacoplado: El CMS cms-api es la única fuente de verdad para todo el contenido dinámico del blog. La capa de presentación (portfolio-web) es un "cliente" de esta API, completamente desacoplada y libre para evolucionar de forma independiente.
SEO por Diseño: Cada aspecto del blog, desde la estructura de la URL hasta los metadatos para redes sociales y los datos estructurados para Google, está meticulosamente diseñado para alcanzar la máxima visibilidad y autoridad orgánica.
La Comunidad como Activo: El blog no es un monólogo, es una plataforma para la conversación. Fomentaremos una comunidad de alta calidad a través de un sistema de comentarios robusto, autenticado y con elementos de gamificación.
2. Análisis del Estado Actual
Actualmente, el blog (apps/portfolio-web) opera en Fase 1 (MVP). El contenido reside en el sistema de archivos (/src/content/blog/) en formato .mdx y .json. La capa de acceso a datos (/src/lib/blog-api.ts) lee directamente de estos archivos. Esta base fue excelente para un lanzamiento rápido, pero ahora debe evolucionar para cumplir la visión holística.
3. Arquitectura de Destino: La Visión Holística
3.1. Capa de Datos (El Cerebro - cms-api)
Para soportar las nuevas funcionalidades, debemos extender el esquema de nuestra base de datos en cms-api con los siguientes modelos:
code
Mermaid
erDiagram
    "User" }o--o{ "Comment" : "escribe"
    "Post" }o--o{ "Comment" : "contiene"
    "Post" }o--|| "PostTag" : "tiene"
    "Tag" }o--|| "PostTag" : "asociado_a"
    "Post" ||--o{ "Asset" : "tiene_imagen_destacada"

    "Post" {
        UUID id PK
        string title
        string slug UK "URL amigable, única"
        text description "Para SEO y vistas previas"
        text content "Cuerpo del artículo en MDX"
        date published_date
        UUID featuredImageId FK "Referencia al modelo Asset"
    }

    "Tag" {
        UUID id PK
        string name UK
        string slug UK
    }

    "Comment" {
        UUID id PK
        text content
        UUID authorId FK "Referencia al User"
        UUID postId FK "Referencia al Post"
    }

    "User" {
        UUID id PK
        string username
        string email
        string commenter_level "Ej: 'Novato', 'Habitual', 'Experto'"
    }

    "Asset" {
        UUID id PK
        string url "URL del archivo en el storage"
        string alt_text "Texto alternativo para SEO"
        string mime_type
    }
Modelo Post: El núcleo de nuestro blog. El slug será la base para la URL SEO-amigable.
Modelo Tag: Permite la categorización y es la base para las páginas de archivo (/blog/tag/[tag-slug]).
Modelo Comment: Almacena los comentarios, vinculados a un Post y a un User.
Modelo User (Extendido): Usaremos el sistema de login existente (vía Supabase/Newsletter) para autenticar a los comentaristas. Añadiremos un campo commenter_level para la gamificación.
Modelo Asset: Es nuestra estrategia de recursos multimedia. cms-admin tendrá una interfaz para subir imágenes. El modelo Asset guardará la URL del archivo (en un S3, Vercel Blob, o similar) y su alt_text para SEO. El modelo Post simplemente referenciará un Asset como su imagen destacada.
3.2. Capa de Presentación (El Rostro - portfolio-web)
Generación de Contenido (SSG + ISR)
Las páginas del blog serán Server Components que utilizarán las funciones generateStaticParams y la opción revalidate.
generateStaticParams en [slug]/page.tsx: En tiempo de build, esta función consultará la cms-api para obtener todos los slugs de los posts publicados y le dirá a Next.js que genere una página HTML estática para cada uno.
revalidate en fetchGraphQL: Nuestra función fetchGraphQL ya está configurada con next: { revalidate: 3600 }. Esto activa ISR. Cada hora (o el tiempo que definamos), Next.js regenerará las páginas estáticas si hay contenido nuevo, sin necesidad de un nuevo despliegue.
Página de Artículo (/[lang]/blog/[slug]/page.tsx)
Esta será la joya de la corona del SEO.
URL Canónica: La URL será limpia y semántica (ej: .../es-ES/blog/que-es-una-pwa).
Metadatos Dinámicos: La función generateMetadata de la página obtendrá los datos del post y generará:
Título SEO: <title>{post.title} | Tu Blog</title>
Meta Descripción: <meta name="description" content="{post.description}">
Metadatos para Redes Sociales (Open Graph & Twitter Cards):
og:title: El título del post.
og:description: La descripción.
og:image: La URL de la featuredImage desde el modelo Asset.
og:url: La URL canónica de la página del post.
twitter:card: "summary_large_image".
Datos Estructurados (JSON-LD): Se inyectará un script con el schema Article para que Google entienda perfectamente el contenido (autor, fecha, imagen, etc.).
Componentes para Compartir: Se añadirá un componente ShareButtons con enlaces que construyan dinámicamente las URLs para compartir en X (Twitter), LinkedIn, Facebook, WhatsApp y por Email.
3.3. Capa de Interacción y Comunidad
Sistema de Comentarios
Será un Client Component dentro de la página del artículo.
Autenticación: El componente verificará si el usuario está logueado (usando el mismo sistema de Supabase del newsletter). Si no lo está, mostrará un CTA para iniciar sesión.
Visualización: Hará una petición fetch para obtener los comentarios de ese post.
Envío: El formulario de comentarios llamará a un Server Action. Esta acción segura en el servidor validará los datos, creará el comentario en la cms-api y, como parte de la lógica de gamificación, podría actualizar el commenter_level del usuario.
Actualización: Tras el envío, el componente se revalidará para mostrar el nuevo comentario.
Gamificación: Insignias de Comentarista
Para incentivar la participación de calidad, se implementará un sistema de niveles:
Nivel 1 (Comentarista Ocasional): 1-5 comentarios.
Nivel 2 (Miembro Habitual): 6-20 comentarios.
Nivel 3 (Voz de la Comunidad): +21 comentarios.
Junto al nombre del autor de cada comentario, se mostrará una pequeña insignia visual que corresponda a su nivel.
4. Hoja de Ruta de Implementación
Fase 1: Fundamentos del CMS (Backend)
[cms-api] Crear y migrar los modelos Post, Tag, Comment y extender User.
[cms-api] Actualizar la API de GraphQL con los typeDefs y resolvers para los nuevos modelos (CRUD completo).
[cms-admin] Construir las interfaces en el panel de administración para crear/editar Posts (incluyendo un editor de Markdown), Tags y moderar Comentarios.
[cms-admin] Implementar la lógica de subida de archivos para el modelo Asset.
Fase 2: Conexión y Renderizado Estático (Frontend)
[portfolio-web] Refactorizar lib/blog/actions.ts para que consuma la API de GraphQL en lugar de leer archivos locales.
[portfolio-web] Implementar generateStaticParams en [slug]/page.tsx para pre-renderizar todas las páginas.
[portfolio-web] Implementar generateMetadata en [slug]/page.tsx con toda la lógica de SEO (Open Graph, JSON-LD).
[portfolio-web] Crear y añadir el componente de ShareButtons.
[portfolio-web] Crear la nueva página dinámica [tag-slug]/page.tsx para listar posts por tag.
Fase 3: Implementación de la Comunidad
[portfolio-web] Construir el componente de comentarios (Client Component).
[portfolio-web] Crear el Server Action para la gestión del envío de comentarios.
[cms-api] Implementar la lógica en el backend para asignar los niveles de gamificación.

---

