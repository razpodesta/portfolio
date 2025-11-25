export default {
  displayName: '@portfolio/testing-utils',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  rootDir: '.',

  // 1. ARQUITECTURA ESPEJO
  roots: [
    '<rootDir>/src',
    '<rootDir>/../../tests/packages/testing-utils'
  ],

  // 2. CONFIGURACIÓN DEL SETUP
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // 3. TRANSFORMACIÓN DE DEPENDENCIAS (LA SOLUCIÓN)
  // Le decimos a Jest: "Ignora node_modules, EXCEPTO si el path contiene:
  // @faker-js, msw, @mswjs, o until-async". Esto fuerza la compilación de todos ellos.
  transformIgnorePatterns: [
    "node_modules/(?!.*(@faker-js|msw|@mswjs|until-async))"
  ],

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
  coverageDirectory: '../../coverage/packages/testing-utils',
  testMatch: [
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.test.ts',
    '**/*.test.tsx'
  ],
};
