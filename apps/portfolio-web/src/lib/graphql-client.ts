// RUTA: apps/portfolio-web/src/lib/graphql-client.ts
// VERSIÓN: 2.0 - Visión Ultra Holística: Type-Safe, Fail-Fast y Resiliente.
// DESCRIPCIÓN: Cliente GraphQL soberano, refactorizado para eliminar `any` y `non-null assertions`.
//              Implementa una guarda de seguridad "fail-fast" para las variables de entorno,
//              garantizando una arquitectura robusta y a prueba de errores de configuración.

/**
 * Realiza una petición fetch a la API de GraphQL del CMS Headless.
 *
 * @template T El tipo de dato esperado en la respuesta de GraphQL (e.g., { getQuery: { ... } }).
 * @param query La consulta de GraphQL en formato de string.
 * @param variables Un objeto de variables para la consulta. Se utiliza `unknown` por seguridad de tipos.
 * @returns Una promesa que se resuelve con la propiedad `data` de la respuesta de GraphQL.
 * @throws {Error} Si la variable de entorno CMS_GRAPHQL_ENDPOINT no está configurada.
 * @throws {Error} Si la respuesta de la red no es 'ok'.
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown> // <-- SOLUCIÓN 1: Reemplazar `any` con `unknown`
): Promise<T> {
  // --- SOLUCIÓN 2: Guarda de Seguridad "Fail-Fast" ---
  const endpoint = process.env.CMS_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw new Error(
      'CRITICAL ARCHITECTURE ERROR: The CMS_GRAPHQL_ENDPOINT environment variable is not defined. The application cannot fetch content.'
    );
  }
  // ---------------------------------------------------

  const response = await fetch(endpoint, { // Usamos la variable segura 'endpoint'
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Aquí se podría añadir una API Key en el futuro si securizas el CMS:
      // 'Authorization': `Bearer ${process.env.CMS_API_KEY}`
    },
    body: JSON.stringify({ query, variables }),
    // Revalidación de caché de Next.js (Incremental Static Regeneration)
    // Esto hará que los datos del blog se actualicen como máximo cada hora.
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.error("GraphQL API Error:", response.status, response.statusText);
    throw new Error('Failed to fetch data from the Headless CMS');
  }

  const json = await response.json();

  if (json.errors) {
    console.error("GraphQL Query Errors:", json.errors);
    throw new Error('An error occurred in the GraphQL query.');
  }

  return json.data;
}
