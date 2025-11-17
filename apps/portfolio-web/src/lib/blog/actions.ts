// RUTA: apps/portfolio-web/src/lib/blog/actions.ts
// VERSIÓN: 2.0 - Soberano y Desacoplado (Consume API GraphQL)
// DESCRIPCIÓN: Lógica de datos del blog completamente refactorizada para consumir
//              el CMS Headless (ContentPI), eliminando toda dependencia del sistema de archivos.

import { fetchGraphQL } from '../graphql-client';
import type { PostWithSlug } from '../schemas/blog.schema';

// Tipos para la respuesta de la API del CMS
type CmsEntry = {
  id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  published_date: string;
  tags: string;
  content: string;
};

type GetQueryPayload = {
  getQuery: {
    data: CmsEntry[];
  };
};

// Esta función ahora es VÁLIDA porque PostWithSlug ya espera la propiedad 'content'.
function mapCmsDataToPost(entry: CmsEntry): PostWithSlug {
  return {
    slug: entry.slug,
    metadata: {
      title: entry.title,
      description: entry.description,
      author: entry.author,
      published_date: entry.published_date,
      tags: entry.tags ? entry.tags.split(',').map(tag => tag.trim()) : [],
    },
    content: entry.content // ¡Esta línea ya no dará error!
  };
}

/**
 * Obtiene una lista de todos los artículos del blog desde el CMS.
 */
export async function getAllPosts(): Promise<PostWithSlug[]> {
  const query = `
    query GetAllBlogPosts {
      getQuery(input: { model: "post", operation: "find" }) {
        data
      }
    }
  `;

  try {
    const data = await fetchGraphQL<GetQueryPayload>(query);
    const posts = data.getQuery.data.map(mapCmsDataToPost);

    return posts.sort((a, b) => new Date(b.metadata.published_date).getTime() - new Date(a.metadata.published_date).getTime());
  } catch (error) {
    console.error('Error fetching all posts from CMS:', error);
    return [];
  }
}

/**
 * Obtiene un único artículo del blog por su slug desde el CMS.
 */
export async function getPostBySlug(slug: string): Promise<PostWithSlug | null> {
    const query = `
      query GetPostBySlug($slug: String!) {
        getQuery(input: { model: "post", operation: "findOne", params: { where: { slug: $slug } } }) {
          data
        }
      }
    `;

    try {
        const data = await fetchGraphQL<GetQueryPayload>(query, { slug });
        if (!data.getQuery.data || data.getQuery.data.length === 0) {
            return null;
        }

        return mapCmsDataToPost(data.getQuery.data[0]);
    } catch (error) {
        console.error(`Error fetching post with slug "${slug}" from CMS:`, error);
        return null;
    }
}
