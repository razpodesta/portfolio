// RUTA: /apps/portfolio-web/jest.config.ts
// VERSIÓN: 6.0 - Definitiva y Alineada con la Arquitectura de Espejo
import type { Config } from 'jest';

const config: Config = {
  displayName: 'portfolio-web',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // --- INICIO DE LA CORRECCIÓN ---
  // Se apunta a la ubicación correcta de los archivos de prueba.
  testMatch: ['<rootDir>/../../tests/apps/portfolio-web/**/*.spec.ts?(x)'],
  // --- FIN DE LA CORRECCIÓN ---
};

export default config;
