export default {
  displayName: 'cms-admin',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  rootDir: '.',

  // Estructura de Espejo
  roots: [
    '<rootDir>/src',
    '<rootDir>/../../tests/apps/cms-admin'
  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // --- CORRECCIÓN CRÍTICA: TRANSFORMACIÓN DE DEPENDENCIAS ---
  // Le decimos a Jest: "Ignora node_modules, PERO transforma @faker-js y msw"
  transformIgnorePatterns: [
    "node_modules/(?!.*(@faker-js|msw|until-async))"
  ],
  // ----------------------------------------------------------

  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
  },

  // Mapeo de alias específico de cms-admin
  moduleNameMapper: {
    '^@dashboard/(.*)$': '<rootDir>/src/shared/components/dashboard/$1',
    '^@modals/(.*)$': '<rootDir>/src/shared/components/modals/$1',
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@config$': '<rootDir>/src/config/index.ts',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@graphql/(.*)$': '<rootDir>/src/graphql/$1',
    '^@interfaces$': '<rootDir>/src/interfaces/index.ts',
    '^@lib/(.*)$': '<rootDir>/src/shared/lib/$1',
    '^@layouts/(.*)$': '<rootDir>/src/shared/components/layouts/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@ui/(.*)$': '<rootDir>/src/shared/components/ui/$1',
    '^@styles/(.*)$': '<rootDir>/src/shared/styles/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    // Alias globales
    '^@portfolio/testing-utils$': '<rootDir>/../../packages/testing-utils/src/index.ts'
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/cms-admin',
  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
};
