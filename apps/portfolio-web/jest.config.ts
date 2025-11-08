// RUTA: apps/portfolio-web/jest.config.ts
// VERSIÓN: Arquitectónicamente Pura - Usando el Mecanismo de Preset Nativo de Jest

import type { Config } from 'jest';

/**
 * ===================================================================================
 * CONFIGURACIÓN DE JEST DE ÉLITE
 * ===================================================================================
 *
 * VISIÓN ARQUITECTÓNICA:
 * Esta configuración ha sido refactorizada para utilizar la forma canónica y
 * nativa de Jest para heredar configuraciones: la clave `preset`.
 *
 * El método anterior, que usaba un `import` de JavaScript y el operador de
 * propagación (...), era la causa raíz del error de linting de
 * `@nx/enforce-module-boundaries`. Forzaba a ESLint a tratar la configuración
 * base como una dependencia de código fuente, violando los límites del módulo.
 *
 * Al usar `preset`, delegamos la resolución de la configuración base al propio
 * motor de Jest, lo cual es más limpio, declarativo y la práctica estándar
 * de la industria. Esto resuelve el error de linting de forma definitiva y
 * alinea el proyecto con las mejores prácticas de configuración de Jest.
 *
 * ===================================================================================
 */
const config: Config = {
  // --- INICIO DE LA CORRECCIÓN DE RAÍZ ---
  // Se elimina la importación de JS y el operador de propagación (...nxPreset).
  // Se adopta la clave 'preset' nativa de Jest para una herencia limpia.
  preset: '../../jest.preset.js',
  // --- FIN DE LA CORRECCIÓN DE RAÍZ ---

  displayName: 'portfolio-web',
  testEnvironment: 'jsdom',
  rootDir: '.',

  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageDirectory: '../../coverage/apps/portfolio-web',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // La clave 'testMatch' ya no es necesaria si 'rootDir' está bien configurado,
  // ya que Jest buscará archivos .spec/.test por defecto en todo el proyecto.
  // Sin embargo, la mantenemos por explicitud, ya que estaba en el original.
  testMatch: ['<rootDir>/specs/**/*.spec.ts', '<rootDir>/specs/**/*.spec.tsx'],
};

export default config;
