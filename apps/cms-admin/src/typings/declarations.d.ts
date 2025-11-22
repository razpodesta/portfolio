// RUTA: apps/cms-admin/src/typings/declarations.d.ts
// VERSIÓN: 2.0 - Con declaración para módulo 'isomorphic-fetch'
// DESCRIPCIÓN: Se añade la declaración para el módulo 'isomorphic-fetch'
//              para resolver el error de compilación TS7016 y satisfacer
//              las reglas de tipado estricto de TypeScript.

declare module '*.scss' {
  export const content: { [className: string]: string }
  export default content
}

// --- INICIO DE LA CORRECCIÓN ---
// Esta línea le dice a TypeScript: "Confía en mí, el módulo 'isomorphic-fetch'
// existe. No te preocupes por sus tipos internos por ahora."
declare module 'isomorphic-fetch';
// --- FIN DE LA CORRECCIÓN ---
