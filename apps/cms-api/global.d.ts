// RUTA: /apps/cms-api/global.d.ts
// VERSIÓN: 2.0 - "Guardián de la Seguridad de Tipos"
// DESCRIPCIÓN: Se reemplaza el tipo 'any' por 'unknown'. Esto satisface la
//              regla de ESLint '@typescript-eslint/no-explicit-any' y refuerza la
//              arquitectura del proyecto al forzar una validación de tipo explícita
//              en cualquier importación de archivos JSON, cumpliendo con el
//              manifiesto de "Erradicación Total del Tipo any".

declare module '*.json' {
  // --- INICIO DE LA CORRECCIÓN ARQUITECTÓNICA ---
  // Al usar 'unknown', forzamos al consumidor de este JSON a validar su estructura
  // (preferiblemente con Zod) antes de usarlo, eliminando una fuente de errores.
  const value: unknown;
  // --- FIN DE LA CORRECCIÓN ARQUITECTÓNICA ---
  export default value;
}
