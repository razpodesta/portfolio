// RUTA: apps/cms-api/src/graphql/types/index.ts
// VERSIÓN: 3.0 - Inclusión de Gamificación
// DESCRIPCIÓN: Agregador maestro de definiciones de tipos GraphQL.

import { mergeTypeDefs } from '@graphql-tools/merge';

// Tipos Base
import App from './App.js';
import Declaration from './Declaration.js';
import Enumeration from './Enumeration.js';
import Field from './Field.js';
import I18n from './I18n.js';
import Model from './Model.js';
import Scalar from './Scalar.js';
import User from './User.js';
import Value from './Value.js';

// Tipos Modernos
import Post from './Post.js';
import Gamification from './Gamification.js'; // <-- NUEVO

export default mergeTypeDefs([
  App,
  Declaration,
  Enumeration,
  Field,
  I18n,
  Model,
  Scalar,
  User,
  Value,
  Post,
  Gamification // <-- REGISTRADO
]);
