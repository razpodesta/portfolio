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
