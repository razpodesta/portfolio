// RUTA: /apps/cms-admin/eslint.config.mjs
// VERSIÓN: 1.0 ("Guardián del Legado y la Migración")
// DESCRIPCIÓN: Configuración de ESLint creada para el proyecto 'cms-admin',
//              alineada con la arquitectura flat, especializada para Next.js (Pages Router)
//              y preparada para la validación de pruebas con Jest.

import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jestPlugin from 'eslint-plugin-jest';

export default tseslint.config(
  // 1. HERENCIA: Hereda la configuración base del monorepo.
  ...baseConfig,

  // 2. CONFIGURACIÓN DE TYPESCRIPT: Aplica reglas al código fuente.
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // 3. ESPECIALIZACIÓN DE NEXT.JS (PAGES ROUTER):
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': ['error', 'apps/cms-admin/src/pages'],
    },
  },

  // 4. CAPA DE REACT HOOKS: Refuerza el uso correcto de los hooks.
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
        'react-hooks': reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },

  // 5. CAPA DE PRUEBAS (JEST): Configuración para archivos de especificaciones.
  {
    files: ['src/**/*.spec.ts', 'src/**/*.spec.tsx', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
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
  },

  // 6. ANULACIONES: Excepciones para archivos de configuración específicos.
  {
    files: ['next.config.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
);
