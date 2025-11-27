// RUTA: apps/portfolio-web/src/lib/graphql-client.ts
// VERSIÓN: 7.0 - Mock Adapter Correction & Type Safety
// DESCRIPCIÓN: Se corrige la lógica de filtrado de mocks para alinearse con la
//              nueva estructura plana de 'cms.mocks.ts'. Se solucionan los errores
//              TS2339 (propiedad inexistente) y TS7006 (any implícito).

import { MOCK_POSTS, MOCK_PROFILE, MOCK_CODEX } from '../data/mocks/cms.mocks';

// Definimos la estructura de respuesta de GraphQL genérica
type GraphQLResponse<T> = {
  data: T;
  errors?: unknown[];
};

// Definimos una interfaz local mínima para los Tags dentro del Mock
// para evitar el error de 'any' implícito durante el filtrado.
type MockTag = {
  name: string;
  slug: string;
};

/**
 * Adaptador de Mocks.
 * Analiza la query y devuelve los datos locales correspondientes.
 * Esta función es pura y sincrónica.
 */
function getMockDataForQuery<T>(query: string, variables?: Record<string, unknown>): T | null {
  // 1. Blog: GetAllPosts
  if (query.includes('GetAllPosts')) {
    return { getPosts: MOCK_POSTS } as unknown as T;
  }

  // 2. Blog: GetPostBySlug
  if (query.includes('GetPostBySlug')) {
    const slug = variables?.slug;
    const post = MOCK_POSTS.find(p => p.slug === slug) || null;
    return { getPostBySlug: post } as unknown as T;
  }

  // 3. Blog: GetPostsByTag (CORRECCIÓN CRÍTICA AQUÍ)
  if (query.includes('GetPostsByTag')) {
    const tagSlug = variables?.slug as string;

    // Filtramos sobre la nueva estructura plana de MOCK_POSTS.
    // p.tags es ahora un array de objetos { name, slug }, no strings.
    const posts = MOCK_POSTS.filter(p =>
      // Solución TS2339: Accedemos directamente a p.tags (ya no p.metadata.tags)
      // Solución TS7006: Tipamos explícitamente 't' como MockTag
      p.tags.some((t: MockTag) => t.slug === tagSlug)
    );

    return { getPostsByTagSlug: posts } as unknown as T;
  }

  // 4. Gamification: GetMyProfile
  if (query.includes('GetMyProfile')) {
    return { getMyProfile: MOCK_PROFILE } as unknown as T;
  }

  // 5. Gamification: GetCodex
  if (query.includes('GetCodex')) {
    return { getCodex: MOCK_CODEX } as unknown as T;
  }

  return null;
}

/**
 * Realiza una petición fetch a la API de GraphQL del CMS Headless.
 * Implementa lógica "Fail-Safe" para entornos de CI/CD y validación estricta de entorno.
 *
 * @param query La consulta GraphQL en formato string.
 * @param variables Objeto opcional de variables para la consulta.
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const endpoint = process.env.CMS_GRAPHQL_ENDPOINT;

  // Detección de entorno de construcción o falta de configuración
  const isBuildStep = process.env.CI === 'true' || process.env.VERCEL === '1';
  // Si USE_MOCKS está activo o no hay endpoint, usamos mocks.
  const useMocks = process.env.USE_MOCKS === 'true' || !endpoint;

  // --- ESTRATEGIA DE MOCKS (OFFLINE / BUILD / DEV OPTIMIZADO) ---
  if (useMocks) {
    const mockData = getMockDataForQuery<T>(query, variables);

    if (mockData) {
      // En desarrollo, informamos que se está usando un mock para transparencia
      if (process.env.NODE_ENV === 'development') {
        // console.log(`🛡️ [GraphQL Mock] Sirviendo: ${queryName}`);
      }
      return mockData;
    }

    // Si estamos en build y no hay mock, devolvemos objeto vacío para no romper SSG
    if (isBuildStep) return {} as T;

    throw new Error(`[GraphQL Mock] No mock data found for query: ${query}`);
  }

  // --- GUARDIÁN DE TIPO ESTRICTO ---
  if (!endpoint) {
    throw new Error('CRITICAL CONFIG ERROR: CMS_GRAPHQL_ENDPOINT is not defined, and mocks are disabled.');
  }

  // --- ESTRATEGIA ONLINE (FETCH) ---
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s Timeout

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      next: { revalidate: 60 }, // ISR: Revalidación incremental cada 60s
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`GraphQL Network Error: ${response.status} ${response.statusText}`);
    }

    const json: GraphQLResponse<T> = await response.json();

    if (json.errors) {
      console.error("❌ [GraphQL API Error]:", json.errors);
      if (isBuildStep) {
         console.warn("⚠️ Build step error detected. Attempting fallback to mocks.");
         const fallback = getMockDataForQuery<T>(query, variables);
         if (fallback) return fallback;
      }
      throw new Error('GraphQL API returned errors.');
    }

    return json.data;

  } catch (error) {
    console.warn(`⚠️ [GraphQL Client] Connection failed. Attempting Mock Fallback.`);

    // Última línea de defensa: Si la red falla, intentamos usar mocks
    const fallbackData = getMockDataForQuery<T>(query, variables);

    if (fallbackData) {
        return fallbackData;
    }

    if (isBuildStep) return {} as T;

    throw error;
  }
}
