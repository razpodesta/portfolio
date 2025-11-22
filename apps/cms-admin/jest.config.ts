// RUTA: /apps/cms-admin/jest.config.ts
// VERSIÓN: 6.0 - Definitiva y Alineada con la Arquitectura de Espejo
export default {
  displayName: 'cms-admin',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',

  // --- INICIO DE LA CORRECCIÓN 1/2 ---
  // Se declara explícitamente el archivo de setup para Jest.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // --- FIN DE LA CORRECCIÓN 1/2 ---

  // --- INICIO DE LA CORRECCIÓN 2/2 ---
  // Se apunta a la ubicación correcta de los archivos de prueba.
  testMatch: ['<rootDir>/../../tests/apps/cms-admin/**/*.spec.ts?(x)'],
  // --- FIN DE LA CORRECCIÓN 2/2 ---
};
