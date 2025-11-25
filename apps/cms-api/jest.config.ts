/**
 * @file Configuración de Jest para cms-api.
 * @description Configuración optimizada para entorno Backend (Node.js).
 * @version 3.0.0 - Elite Standard
 */

export default {
  displayName: 'cms-api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node', // CRÍTICO: Entorno puro de backend
  rootDir: '.',

  // 1. ARQUITECTURA DE ESPEJO
  roots: [
    '<rootDir>/src',
    '<rootDir>/../../tests/apps/cms-api'
  ],

  // 2. COBERTURA
  coverageDirectory: '../../coverage/apps/cms-api',

  // 3. TRANSFORMACIÓN
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', { jsc: { target: 'es2022' } }]
  },

  // 4. PATRONES DE ARCHIVOS
  testMatch: [
    '**/*.spec.ts',
    '**/*.test.ts'
  ],
};
