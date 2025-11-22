// RUTA: apps/portfolio-web/src/lib/blog/actions.ts
// VERSIÓN: 3.0 - "Capa de Acceso a Datos Soberana" (Hiper-Holístico)
// DESCRIPCIÓN: Abstrae por completo la lógica de comunicación con la API de GraphQL.
//              Cada función encapsula una única consulta, proveyendo una interfaz
//              limpia y tipada para que los componentes del servidor consuman
//              los datos del blog sin conocer los detalles de implementación de GraphQL.
//              Implementa un manejo de errores resiliente y un mapeo de datos centralizado.

import { fetchGraphQL } from '../graphql-client';
import type { PostWithSlug } from '../schemas/blog.schema';

// --- PASO 1: Tipado Estricto de la Carga Útil de la API ---
// Define la estructura exacta de los datos que esperamos de la API de GraphQL.
// Esto crea un contrato robusto que TypeScript puede verificar.
type CmsTag = {
  name: string;
  slug: string;
};

type CmsAuthor = {
  username: string;
};

type CmsPost = {
  title: string;
  slug: string;
  description: string;
  content: string;
  author: CmsAuthor;
  published_date: string;
  tags: CmsTag[];
};

type GetPostsPayload = { getPosts: CmsPost[] };
type GetPostBySlugPayload = { getPostBySlug: CmsPost | null };
type GetPostsByTagPayload = { getPostsByTagSlug: CmsPost[] };

// --- PASO 2: Mapeador de Datos Soberano ---
// Esta función pura es la única responsable de transformar los datos de la API
// a la estructura que utiliza el resto de la aplicación (`PostWithSlug`).
// Centraliza la lógica de transformación, facilitando futuras modificaciones.
function mapCmsDataToPost(entry: CmsPost): PostWithSlug {
  return {
    slug: entry.slug,
    metadata: {
      title: entry.title,
      description: entry.description,
      author: entry.author.username,
      published_date: entry.published_date,
      tags: entry.tags.map(tag => tag.name),
    },
    content: entry.content,
  };
}

// --- PASO 3: Acciones de Datos de Élite ---

/**
 * Obtiene una lista de todos los artículos del blog desde el CMS.
 * @returns Una promesa que se resuelve con un array de posts o un array vacío en caso de error.
 */
export async function getAllPosts(): Promise<PostWithSlug[]> {
  const query = `
    query GetAllPosts {
      getPosts {
        title slug description content published_date
        author { username }
        tags { name slug }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<GetPostsPayload>(query);
    const posts = data.getPosts.map(mapCmsDataToPost);

    // La ordenación se mantiene como una responsabilidad de esta capa.
    return posts.sort((a, b) => new Date(b.metadata.published_date).getTime() - new Date(a.metadata.published_date).getTime());
  } catch (error) {
    console.error("Error en la capa de datos [getAllPosts]:", error);
    return []; // Devuelve un estado vacío y predecible en caso de fallo.
  }
}

/**
 * Obtiene un único artículo del blog por su slug.
 * @param slug El slug único del artículo a obtener.
 * @returns Una promesa que se resuelve con el post encontrado o `null` si no existe o hay un error.
 */
export async function getPostBySlug(slug: string): Promise<PostWithSlug | null> {
  const query = `
    query GetPostBySlug($slug: String!) {
      getPostBySlug(slug: $slug) {
        title slug description content published_date
        author { username }
        tags { name slug }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<GetPostBySlugPayload>(query, { slug });
    if (!data.getPostBySlug) {
      return null;
    }
    return mapCmsDataToPost(data.getPostBySlug);
  } catch (error) {
    console.error(`Error en la capa de datos [getPostBySlug] para slug "${slug}":`, error);
    return null; // Devuelve un estado nulo y predecible.
  }
}

/**
 * Obtiene una lista de artículos filtrados por el slug de una etiqueta.
 * @param slug El slug de la etiqueta para filtrar los posts.
 * @returns Una promesa que se resuelve con un array de posts o un array vacío en caso de error.
 */
export async function getPostsByTag(slug: string): Promise<PostWithSlug[]> {
  const query = `
    query GetPostsByTag($slug: String!) {
      getPostsByTagSlug(slug: $slug) {
        title slug description content published_date
        author { username }
        tags { name slug }
      }
    }
  `;
  try {
    const data = await fetchGraphQL<GetPostsByTagPayload>(query, { slug });
    return data.getPostsByTagSlug.map(mapCmsDataToPost);
  } catch (error) {
    console.error(`Error en la capa de datos [getPostsByTag] para slug "${slug}":`, error);
    return []; // Devuelve un estado vacío y predecible.
  }
}
