// apps/portfolio-web/src/lib/graphql-client.ts

/**
 * @file Cliente GraphQL Soberano e Indestructible.
 * @version 4.0 - Build-Safe & Mock Fallback Strategy
 * @description Gestiona la comunicación con el CMS. Incluye una estrategia de
 *              supervivencia para el tiempo de compilación: si la API no está
 *              disponible, devuelve mocks estructurales para permitir el despliegue.
 */

// Definimos interfaces mínimas para los mocks de seguridad
interface MockResponse {
  getPosts: never[];
  getPostBySlug: null;
  getPostsByTagSlug: never[];
}

/**
 * Realiza una petición fetch a la API de GraphQL del CMS Headless.
 * Implementa lógica "Fail-Safe" para entornos de CI/CD.
 *
 * @template T El tipo de dato esperado en la respuesta.
 * @param query La consulta GraphQL.
 * @param variables Variables opcionales.
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const endpoint = process.env.CMS_GRAPHQL_ENDPOINT;
  // Detectamos si estamos en un entorno de CI (Vercel/GitHub Actions)
  const isBuildStep = process.env.CI === 'true' || process.env.VERCEL === '1';

  // --- ESTRATEGIA DE SUPERVIVENCIA DE BUILD ---
  // Si no hay endpoint configurado, asumimos que estamos en un entorno de build
  // temprano donde la API aún no existe. Devolvemos mocks seguros.
  if (!endpoint) {
    if (isBuildStep) {
      console.warn('⚠️ [WARN] CMS_GRAPHQL_ENDPOINT no definido en build. Usando Mocks de Supervivencia.');
      return getSafeMockData<T>();
    }
    // En desarrollo local, queremos que falle para alertar al desarrollador
    throw new Error('CRITICAL: CMS_GRAPHQL_ENDPOINT is missing in local development.');
  }

  try {
    // Timeout controller para evitar que el build se cuelgue eternamente esperando una API dormida
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos máximo

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      // ISR: Revalidar cada 60 segundos si hay éxito
      next: { revalidate: 60 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      // Si hay errores de GraphQL pero estamos en build, fallback a mock para no romper el deploy
      if (isBuildStep) return getSafeMockData<T>();
      throw new Error('GraphQL Error');
    }

    return json.data;

  } catch (error) {
    console.error(`❌ [GraphQL Client] Fallo de conexión:`, error);

    // Si estamos en Build y falla la API (ej. timeout, offline), NO ROMPEMOS EL BUILD.
    // Devolvemos mocks vacíos. La página se generará sin contenido dinámico,
    // pero se revalidará automáticamente (ISR) cuando la API reviva.
    if (isBuildStep) {
      console.log('🛡️ [Rescue] Activando protocolo de datos simulados para completar el build.');
      return getSafeMockData<T>();
    }

    throw error;
  }
}

/**
 * Genera un objeto de datos vacío que cumple estructuralmente con las queries
 * esperadas, evitando errores de "cannot read property of undefined".
 */
function getSafeMockData<T>(): T {
  // Este objeto mock debe coincidir con la estructura que esperan tus componentes
  // para no lanzar excepciones al renderizar.
  const mockData: MockResponse = {
    getPosts: [],
    getPostBySlug: null,
    getPostsByTagSlug: []
  };
  return mockData as unknown as T;
}
