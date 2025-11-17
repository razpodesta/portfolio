// RUTA: apps/portfolio-web/src/lib/schemas/blog.schema.ts
// VERSIÓN: 2.0 - Arquitectónicamente Puro y Fuente de Verdad Absoluta.
// DESCRIPCIÓN: Refactorización crítica para cumplir al 100% con el manifiesto
//              "Zod como Única Fuente de Verdad". Se introduce 'postWithSlugSchema'
//              para que TODOS los tipos de datos del dominio del blog, incluido el
//              contrato de API, se infieran directamente de un esquema Zod,
//              eliminando cualquier definición de tipo manual.

import { z } from 'zod';

// Esquema para los metadatos de un único artículo del blog. (Sin cambios)
export const blogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  published_date: z.string(),
  tags: z.array(z.string()),
});

// Esquema para la página principal del blog. (Sin cambios)
export const blogPageSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  featured_title: z.string(),
  all_posts_title: z.string(),
  read_more_cta: z.string(),
});

// --- INICIO DE LA MEJORA ARQUITECTÓNICA ---
// Se crea un nuevo esquema que representa el contrato de datos completo que la API devolverá.
export const postWithSlugSchema = z.object({
  slug: z.string(),
  metadata: blogPostSchema,
});
// --- FIN DE LA MEJORA ARQUITECTÓNICA ---

// Tipos inferidos para ser utilizados en toda la aplicación.
export type BlogPost = z.infer<typeof blogPostSchema>;
export type PostWithSlug = z.infer<typeof postWithSlugSchema>;
