// RUTA: apps/cms-admin/global.d.ts
// VERSIÓN: 2.0 - Type-Safe
// DESCRIPCIÓN: Se reemplaza el tipo 'any' por 'unknown' para forzar la
//              verificación de tipos al importar archivos JSON, mejorando la
//              seguridad global del tipado.

declare module '*.json' {
  // --- INICIO DE LA CORRECCIÓN ---
  const value: unknown;
  // --- FIN DE LA CORRECCIÓN ---
  export default value;
}
