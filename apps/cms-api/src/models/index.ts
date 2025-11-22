// RUTA: apps/cms-api/src/models/index.ts
// VERSIÓN: 5.1 - "Corazón de la Capa de Datos" (Alineado Arquitectónicamente)
// DESCRIPCIÓN: Se actualiza la ruta de importación del módulo de configuración para
//              reflejar su nueva ubicación dentro de 'src', completando la
//              alineación arquitectónica del proyecto.

import { Sequelize, DataTypes, Model } from 'sequelize';
// --- INICIO DE LA CORRECCIÓN DE RUTA ---
import { $dbUrl } from '../config'; // La ruta ahora es relativa a 'src'.
// --- FIN DE LA CORRECCIÓN DE RUTA ---

// ... (El resto del archivo, que ya era de élite, permanece sin cambios)

// --- PASO 1: Importación explícita de todas las definiciones de modelos ---
import AppModel from './App';
import DeclarationModel from './Declaration';
import EnumerationModel from './Enumeration';
import FieldModel from './Field';
import I18nModel from './I18n';
import ModelModel from './Model';
import ReferenceModel from './Reference';
import UserModel from './User';
import ValueModel from './Value';
import PostModel from './Post';
import TagModel from './Tag';
import CommentModel from './Comment';

// --- PASO 2: Definición de la interfaz de la base de datos ---
export interface DbModels {
  sequelize: Sequelize;
  App: typeof AppModel;
  Declaration: typeof DeclarationModel;
  Enumeration: typeof EnumerationModel;
  Field: typeof FieldModel;
  I18n: typeof I18nModel;
  Model: typeof ModelModel;
  Reference: typeof ReferenceModel;
  User: typeof UserModel;
  Value: typeof ValueModel;
  Post: typeof PostModel;
  Tag: typeof TagModel;
  Comment: typeof CommentModel;
  [key: string]: unknown; // Permite la indexación por string de forma segura.
}

// --- PASO 3: Inicialización de Sequelize (Lista para Producción) ---
const sequelize = new Sequelize($dbUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// --- PASO 4: Ensamblaje de los Modelos ---
const db: DbModels = {
  sequelize,
  App: AppModel(sequelize, DataTypes),
  Declaration: DeclarationModel(sequelize, DataTypes),
  Enumeration: EnumerationModel(sequelize, DataTypes),
  Field: FieldModel(sequelize, DataTypes),
  I18n: I18nModel(sequelize, DataTypes),
  Model: ModelModel(sequelize, DataTypes),
  Reference: ReferenceModel(sequelize, DataTypes),
  User: UserModel(sequelize, DataTypes),
  Value: ValueModel(sequelize, DataTypes),
  Post: PostModel(sequelize, DataTypes),
  Tag: TagModel(sequelize, DataTypes),
  Comment: CommentModel(sequelize, DataTypes),
};

// --- PASO 5: Orquestación de Asociaciones (100% Type-Safe) ---
function isAssociable(model: unknown): model is { associate: (models: DbModels) => void } {
  return typeof (model as { associate?: unknown }).associate === 'function';
}

Object.values(db).forEach((model) => {
  if (isAssociable(model)) {
    model.associate(db);
  }
});

export default db;
