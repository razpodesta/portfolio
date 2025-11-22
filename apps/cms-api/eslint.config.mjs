// RUTA: /apps/cms-api/eslint.config.mjs
// VERSIÓN: 1.0 ("Guardián del Backend")
// DESCRIPCIÓN: Configuración de ESLint creada para el proyecto 'cms-api'.
//              Está optimizada para un entorno de backend con Node.js y TypeScript,
//              y preparada para la validación de pruebas unitarias y de integración con Jest.

import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';

export default tseslint.config(
  // 1. HERENCIA: Hereda las reglas y exclusiones globales del monorepo.
  ...baseConfig,

  // 2. CONFIGURACIÓN DE TYPESCRIPT PARA BACKEND:
  //    Aplica las reglas recomendadas de typescript-eslint al código fuente de la API.
  {
    files: ['src/**/*.ts'],
    rules: {
      ...tseslint.configs.recommended.rules,
      // Se puede habilitar esta regla para forzar el manejo de promesas.
      '@typescript-eslint/no-floating-promises': 'off'
    },
  },

  // 3. CAPA DE PRUEBAS (JEST):
  //    Configuración específica para los archivos de prueba de la API.
  {
    files: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    plugins: {
        jest: jestPlugin,
    },
    rules: {
        ...jestPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      }
    }
  }
);
