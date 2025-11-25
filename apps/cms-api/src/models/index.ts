// RUTA: apps/cms-api/src/models/index.ts
// VERSIÓN: 8.0 - Strict Initialization & Typing
// DESCRIPCIÓN: Inicializador de Sequelize con tipado estricto, eliminando 'any'
//              y garantizando la integridad del contrato DbModels.

import { Sequelize, DataTypes, type ModelStatic, type Model } from 'sequelize';
import { $db, $server } from '../config/index.js';
import type { DbModels } from '../interfaces/types.js';

// Importación de Factorías
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
import ArtifactFactory from './Artifact.js';
import InventoryFactory from './Inventory.js';

// 1. Inicialización de Sequelize
const sequelize = new Sequelize($db.url, {
  dialect: 'postgres',
  logging: $server.isDev ? (msg) => console.log(`[SQL] ${msg}`) : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para Supabase en algunos entornos
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: false, // Mantenemos camelCase para alinearnos con JS
  }
});

/**
 * Tipo de la función Factory.
 * Describe una función que recibe la instancia de Sequelize y DataTypes,
 * y retorna un Modelo Estático.
 */
type ModelFactoryFn = (sequelize: Sequelize, dataTypes: typeof DataTypes) => ModelStatic<Model>;

/**
 * Helper de Inicialización Soberano.
 * Transforma una Factory Function en un Modelo Estático tipado de forma segura.
 */
const initModel = (factory: unknown): ModelStatic<any> => {
  // Validación en tiempo de ejecución (sanity check)
  if (typeof factory !== 'function') {
    throw new Error(`[DbInit] La factoría proporcionada no es una función: ${factory}`);
  }

  // Casting seguro a la firma esperada
  const typedFactory = factory as ModelFactoryFn;
  return typedFactory(sequelize, DataTypes);
};

// 2. Construcción del Objeto DB
// Se asignan los modelos inicializados a la interfaz DbModels.
const db: DbModels = {
  sequelize,
  Sequelize,

  // Modelos del Sistema (Core)
  App: initModel(AppFactory),
  Declaration: initModel(DeclarationFactory),
  Enumeration: initModel(EnumerationFactory),
  Field: initModel(FieldFactory),
  I18n: initModel(I18nFactory),
  Model: initModel(ModelFactory),
  Reference: initModel(ReferenceFactory),
  User: initModel(UserFactory),
  Value: initModel(ValueFactory),

  // Modelos de Dominio (Blog & Gamification)
  Post: initModel(PostFactory),
  Tag: initModel(TagFactory),
  Comment: initModel(CommentFactory),
  Artifact: initModel(ArtifactFactory),
  Inventory: initModel(InventoryFactory),
};

// 3. Asociación de Modelos (Wire-up)
// Iteramos sobre las claves del objeto db para ejecutar las asociaciones.
Object.keys(db).forEach((modelName) => {
  if (modelName === 'sequelize' || modelName === 'Sequelize') return;

  // Recuperamos el modelo como 'unknown' primero
  const model = db[modelName];

  // Type Guard para verificar si tiene el método 'associate'
  if (
    model &&
    typeof model === 'function' &&
    'associate' in model &&
    typeof (model as any).associate === 'function'
  ) {
    // Ejecutamos la asociación inyectando el objeto db completo
    (model as any).associate(db);
  }
});

// 4. Sincronización (Solo en Desarrollo y bajo demanda explícita)
// Nota: En producción, se deben usar migraciones (umzug), no sync().
if ($server.isDev && process.env.DB_SYNC === 'true') {
  console.warn('⚠️ [DbInit] DB_SYNC activado. Sincronizando esquema...');
  sequelize.sync({ alter: true }).then(() => {
    console.log('✅ [DbInit] Esquema sincronizado.');
  }).catch(err => {
    console.error('❌ [DbInit] Error sincronizando esquema:', err);
  });
}

export default db;
