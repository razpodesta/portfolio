// RUTA: apps/portfolio-web/src/lib/blog-api.ts
// VERSIÓN: 1.0 - Capa de Acceso a Datos para el Blog (Fase 1: Basado en Archivos).
// DESCRIPCIÓN: Este aparato implementa la lógica para leer los metadatos y el
//              contenido de los artículos del blog directamente desde el sistema
//              de archivos en el directorio '/content/blog'. Actúa como la fuente
//              de verdad para el contenido del blog en la fase inicial del proyecto,
//              cumpliendo con el 'Manifiesto del Blog'.

import fs from 'fs/promises';
import path from 'path';
import { blogPostSchema, type BlogPost } from './schemas/blog.schema';

// Define la estructura de un post devuelto por la API, incluyendo su slug.
export type Post = {
  slug: string;
  metadata: BlogPost;
};

const contentDir = path.join(process.cwd(), 'apps/portfolio-web/src/content/blog');

/**
 * Obtiene una lista de todos los artículos del blog, leyendo sus metadatos.
 * @returns Una promesa que se resuelve con un array de todos los posts.
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const files = await fs.readdir(contentDir);

    // Filtra para procesar solo los archivos de metadatos .json
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const posts = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const metadata = JSON.parse(fileContent);

        // Valida los metadatos contra el esquema de Zod para garantizar la integridad.
        const validatedMetadata = blogPostSchema.parse(metadata);

        const slug = file.replace(/\.json$/, '');

        return {
          slug,
          metadata: validatedMetadata,
        };
      })
    );

    // Ordena los posts por fecha de publicación, del más reciente al más antiguo.
    return posts.sort((a, b) => new Date(b.metadata.published_date).getTime() - new Date(a.metadata.published_date).getTime());
  } catch (error) {
    console.error('Error al obtener los posts del blog:', error);
    // En un entorno de producción, podrías manejar esto de forma más elegante.
    return [];
  }
}
