// RUTA: apps/cms-api/src/graphql/resolvers/index.ts
// VERSIÓN: 4.0 - Integración Protocolo 33
// DESCRIPCIÓN: Fusiona todos los resolvers del sistema. Se añade 'gamification'
//              para activar la lógica de artefactos e inventario.

import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';

// Importaciones explícitas de resolvers modernos
import postResolvers from './post.js';
import userResolvers from './user.js';
import gamificationResolvers from './gamification.js'; // <-- NUEVO CEREBRO

// Carga automática de resolvers legacy (archivos sueltos en la carpeta)
// Nota: En un futuro refactor, deberíamos importar todos explícitamente para mejor treeshaking.
const resolversArray = loadFilesSync(path.join(__dirname, './'), {
  extensions: ['js', 'ts'],
  ignoreIndex: true, // Ignora este archivo index
  // Excluimos los que ya importamos manualmente para evitar duplicados o conflictos
  filter: (file) => {
    const filename = path.basename(file);
    return !['post.ts', 'post.js', 'user.ts', 'user.js', 'gamification.ts', 'gamification.js', 'index.ts', 'index.js'].includes(filename);
  }
});

// Fusionamos todo: Legacy + Modernos
const resolvers = mergeResolvers([
  ...resolversArray,
  postResolvers,
  userResolvers,
  gamificationResolvers
]);

export default resolvers;
