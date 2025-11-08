// RUTA: oh-hoteis/jest.setup.ts
// VERSIÓN: Con importación explícita de tipos para máxima compatibilidad

// Importa y ejecuta el código que extiende los matchers de Jest.
// Esto es necesario para que las pruebas funcionen en tiempo de ejecución.
import '@testing-library/jest-dom';

// La siguiente línea es un "triple-slash directive" de TypeScript.
// Le dice explícitamente al compilador que cargue las definiciones de tipo
// de este paquete para CUALQUIER archivo que importe este setup.
// Es una forma más directa y robusta de asegurar que TypeScript conozca
// los matchers como `.toBeInTheDocument()`.
/// <reference types="@testing-library/jest-dom" />
