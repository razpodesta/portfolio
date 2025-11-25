// RUTA: apps/cms-api/src/models/index.ts
// VERSIÓN: 7.0 - Clean & Polymorphic
import { Sequelize, DataTypes, type ModelStatic } from 'sequelize'; // Removed Model, added type
import { $dbUrl } from '../config/index.js';
import type { DbModels } from '../interfaces/types.js';

// Factories
import AppFactory from './App.js';
import DeclarationFactory from './Declaration.js';
import EnumerationFactory from './Enumeration.js';
import FieldFactory from './Field.js';
import I18nFactory from './I18n.js';
import ModelFactory from './Model.js';
import ReferenceFactory from './Reference.js';
import UserFactory from './User.js';
import ValueFactory from './Value.js';
import PostFactory from './Post.js';
import TagFactory from './Tag.js';
import CommentFactory from './Comment.js';

const sequelize = new Sequelize($dbUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

// Uso de 'unknown' para mayor seguridad en el casting intermedio
const initModel = (factory: unknown): ModelStatic<any> => {
  // Casting a Function para invocación dinámica segura
  const fn = factory as (s: Sequelize, d: typeof DataTypes) => ModelStatic<any>;
  return fn(sequelize, DataTypes);
};

const db: DbModels = {
  sequelize,
  Sequelize,

  App: initModel(AppFactory),
  Declaration: initModel(DeclarationFactory),
  Enumeration: initModel(EnumerationFactory),
  Field: initModel(FieldFactory),
  I18n: initModel(I18nFactory),
  Model: initModel(ModelFactory),
  Reference: initModel(ReferenceFactory),
  User: initModel(UserFactory),
  Value: initModel(ValueFactory),

  Post: initModel(PostFactory),
  Tag: initModel(TagFactory),
  Comment: initModel(CommentFactory),
};

Object.keys(db).forEach((modelName) => {
  if (modelName === 'sequelize' || modelName === 'Sequelize') return;

  const model = db[modelName];
  // Verificación de método 'associate'
  if (model && 'associate' in model && typeof (model as any).associate === 'function') {
    (model as any).associate(db);
  }
});

export default db;
