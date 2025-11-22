// RUTA: /apps/cms-api/jest.config.ts
// VERSIÓN: 3.0 - Definitiva, con Entorno Específico de Backend
export default {
  displayName: 'cms-api',
  preset: '../../jest.preset.js',

  // --- INICIO DE LA CORRECCIÓN ARQUITECTÓNICA ---
  // Se especifica 'node' como el entorno de pruebas, ya que esta es una API
  // y no tiene acceso al DOM del navegador.
  testEnvironment: 'node',
  // --- FIN DE LA CORRECCIÓN ARQUITECTÓNICA ---

  coverageDirectory: 'test-output/jest/coverage',
  testMatch: ['<rootDir>/../../tests/apps/cms-api/**/*.spec.ts?(x)'],
};
