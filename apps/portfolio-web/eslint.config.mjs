// RUTA: /apps/portfolio-web/eslint.config.mjs
// VERSIÓN: Definitiva de Élite 4.0 ("Guardián de React")
// DESCRIPCIÓN: Se integra el plugin 'eslint-plugin-react-hooks' para
//              reforzar las mejores prácticas en el uso de hooks de React,
//              eliminando una clase entera de bugs potenciales.

import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooksPlugin from 'eslint-plugin-react-hooks'; // <-- INICIO DE LA MEJORA

export default tseslint.config(
  // 1. HERENCIA: Hereda toda la configuración base de la raíz.
  ...baseConfig,

  // 2. CONFIGURACIÓN DE TYPESCRIPT: Aplica reglas recomendadas al código fuente.
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

  // 4. --- NUEVA CAPA: REGLAS DE REACT HOOKS ---
  // Se aplica la configuración recomendada del plugin de hooks a todos los
  // archivos relevantes, asegurando que las dependencias de los hooks
  // sean siempre correctas.
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
        'react-hooks': reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },
  // <-- FIN DE LA MEJORA

  // 5. ANULACIONES QUIRÚRGICAS: Excepciones para archivos de configuración.
  {
    files: ['next.config.js', 'postcss.config.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
