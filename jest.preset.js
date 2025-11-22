// RUTA: /jest.preset.js
// VERSIÓN: 4.0 - "La Única Fuente de Verdad"

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.base.json');

module.exports = {
  ...require('@nx/jest/preset').default,
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', {
      jsc: {
        parser: { syntax: 'typescript', tsx: true },
        transform: { react: { runtime: 'automatic' } },
      },
      swcrc: false,
    }],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  coverageReporters: ['html', 'text'],
  passWithNoTests: true,
};
