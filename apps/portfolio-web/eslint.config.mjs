// RUTA: /apps/portfolio-web/eslint.config.mjs
// VERSIÓN: Definitiva de Élite 3.0 ("Reloj Suizo")

import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  // 1. HERENCIA: Hereda toda la configuración base de la raíz (incluyendo las exclusiones globales).
  ...baseConfig,

  // 2. CONFIGURACIÓN DE TYPESCRIPT: Aplica reglas recomendadas solo al código fuente de esta app.
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // 3. ESPECIALIZACIÓN DE NEXT.JS: Añade las reglas y plugins específicos para Next.js.
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'off',
    },
  },

  // 4. ANULACIONES QUIRÚRGICAS: Excepciones para archivos de configuración específicos de este proyecto.
  {
    files: ['next.config.js', 'postcss.config.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // La sección "ignores" se ha eliminado de aquí porque ahora se gestiona globalmente en la raíz.
);
