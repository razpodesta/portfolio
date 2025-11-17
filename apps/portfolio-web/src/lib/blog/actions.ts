// RUTA: apps/portfolio-web/src/lib/blog/actions.ts
// VERSIÓN: 1.2 - Alineado con la Fuente de Verdad Absoluta.
// DESCRIPCIÓN: Se elimina la importación no utilizada del tipo 'BlogPost'.
//              Gracias a la refactorización en 'blog.schema.ts', el tipo
//              'PostWithSlug' es ahora el único contrato de datos necesario,
//              ya que encapsula toda la estructura del post. Esto resuelve la
//              advertencia del compilador y simplifica las dependencias del módulo.

import fs from 'fs/promises';
import path from 'path';
// --- INICIO DE LA CORRECCIÓN DE IMPORTACIÓN ---
import { blogPostSchema, type PostWithSlug } from '../schemas/blog.schema';
// --- FIN DE LA CORRECCIÓN DE IMPORTACIÓN ---

const contentDir = path.join(process.cwd(), 'apps/portfolio-web/src/content/blog');

/**
 * Obtiene una lista de todos los artículos del blog, leyendo sus metadatos.
 * @returns Una promesa que se resuelve con un array de todos los posts, ordenados por fecha.
 */
export async function getAllPosts(): Promise<PostWithSlug[]> {
  try {
    const files = await fs.readdir(contentDir);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const posts = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const metadata = JSON.parse(fileContent);

        const validatedMetadata = blogPostSchema.parse(metadata);

        const slug = file.replace(/\.json$/, '');

        // El objeto retornado aquí coincide perfectamente con el tipo 'PostWithSlug'
        return {
          slug,
          metadata: validatedMetadata,
        };
      })
    );

    return posts.sort((a, b) => new Date(b.metadata.published_date).getTime() - new Date(a.metadata.published_date).getTime());
  } catch (error) {
    console.error('Error al obtener los posts del blog:', error);
    return [];
  }
}
