// RUTA: /eslint.config.mjs (RAÍZ DEL PROYECTO)
// VERSIÓN: Definitiva de Élite 3.0 ("Reloj Suizo")

import nxPlugin from '@nx/eslint-plugin';

export default [
  // --- CAPA 1: FUNDACIÓN Y CONFIGURACIONES BASE ---
  // Establece las reglas fundamentales de Nx para JavaScript y TypeScript en todo el monorepo.
  ...nxPlugin.configs['flat/base'],
  ...nxPlugin.configs['flat/typescript'],
  ...nxPlugin.configs['flat/javascript'],

  // --- CAPA 2: EXCLUSIONES GLOBALES ---
  // Esta es la única fuente de verdad para los archivos y carpetas que NUNCA deben ser analizados.
  // Se aplica a todos los proyectos del workspace.
  {
    ignores: [
        '**/node_modules',
        '**/dist',
        '**/.next',
        '**/.nx',
        '**/coverage'
    ],
  },

  // --- CAPA 3: EL GUARDIÁN DE LA ARQUITECTURA ---
  // Configuración centralizada para la regla más importante de un monorepo.
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          // La clave "allow" se elimina por completo. Ya no es necesaria
          // y era la fuente del error de expresión regular.
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
];
