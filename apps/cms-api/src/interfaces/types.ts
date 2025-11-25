// RUTA: apps/cms-api/src/interfaces/types.ts
// VERSIÓN: 5.0 - Strict Typing & Linting Hygiene
// DESCRIPCIÓN: Contratos de Tipos Soberanos para el Backend.
//              Se han eliminado las importaciones no utilizadas y erradicado el tipo 'any'.

import type {
  Model,
  ModelStatic,
  Sequelize,
  AbstractDataTypeConstructor,
} from 'sequelize';

// ===================================================================================
// 1. Interfaces de Dominio (DTOs Puros)
// ===================================================================================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface App {
  appName: string;
  identifier: string;
  icon: string;
  description: string;
  userId: string;
}

export interface Declaration {
  declaration: string;
  icon: string;
  description: string;
  color: string;
}

export interface Enumeration {
  enumerationName: string;
  identifier: string;
  description: string;
  values: string;
  appId: string;
}

export interface Field {
  type: string;
  fieldName: string;
  identifier: string;
  order: string;
  defaultValue: string;
  description: string;
  isMedia: boolean;
  isRequired: boolean;
  isUnique: boolean;
  isHide: boolean;
  isSystem: boolean;
  isPrimaryKey: boolean;
  modelId: string;
  modelName: string;
}

export interface I18n {
  key: string;
  value: string;
  language: string;
}

export interface ModelType {
  modelName: string;
  identifier: string;
  description: string;
  appId: string;
}

export interface Reference {
  parentModel: string;
  targetModel: string;
}

export interface User {
  username: string;
  password?: string; // Virtual field for creation
  email: string;
  privilege: 'god' | 'admin' | 'editor' | 'user';
  active: boolean;
  // Campos extendidos para autenticación y perfil
  role?: 'ADMIN' | 'EDITOR' | 'VISITOR';
  firstName?: string;
  lastName?: string;
  lastLogin?: Date;
  preferences?: Record<string, unknown>; // Tipado seguro en lugar de 'object' genérico
  avatarUrl?: string;
  passwordHash?: string;
  salt?: string;
}

export interface Value {
  entry: string;
  value: string;
  fieldIdentifier: string;
  fieldId: string;
}

// --- Dominio Blog ---
export interface Post {
  title: string;
  slug: string;
  description: string;
  content: string;
  published_date: Date;
  featuredImageId?: string | null;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface Comment {
  content: string;
  authorId: string;
  postId: string;
}

// --- Protocolo 33 (Gamificación) ---
export interface Artifact {
  slug: string;
  house: string;
  rarity: string;
  name: Record<string, unknown>; // i18n object
  lore: Record<string, unknown>; // i18n object
  visualData: Record<string, unknown>;
  baseValue: number;
  maxSupply?: number | null;
}

export interface Inventory {
  userId: string;
  artifactId: string;
  acquiredAt: Date;
  isEquipped: boolean;
  metadata?: Record<string, unknown>;
}

// ===================================================================================
// 2. Interfaces de Instancia (Sequelize Instances)
// ===================================================================================

/**
 * Interfaz genérica para modelos sin tipado estricto definido.
 * Utiliza Record<string, unknown> para obligar a la verificación de tipos antes del acceso.
 */
export interface GenericInstance extends Model<Record<string, unknown>, Record<string, unknown>> {
  [key: string]: unknown;
}

export interface UserInstance extends Model<User, Partial<User>>, User, BaseEntity {
  validatePassword: (password: string) => boolean;
  getApps: () => Promise<AppInstance[]>;
  createApp: (app: App) => Promise<AppInstance>;
}

export interface AppInstance extends Model<App, Partial<App>>, App, BaseEntity {}
export interface DeclarationInstance extends Model<Declaration, Partial<Declaration>>, Declaration, BaseEntity {}
export interface EnumerationInstance extends Model<Enumeration, Partial<Enumeration>>, Enumeration, BaseEntity {}
export interface FieldInstance extends Model<Field, Partial<Field>>, Field, BaseEntity {}
export interface I18nInstance extends Model<I18n, Partial<I18n>>, I18n, BaseEntity {}
export interface ModelInstance extends Model<ModelType, Partial<ModelType>>, ModelType, BaseEntity {}
export interface ReferenceInstance extends Model<Reference, Partial<Reference>>, Reference, BaseEntity {}
export interface ValueInstance extends Model<Value, Partial<Value>>, Value, BaseEntity {}

export interface PostInstance extends Model<Post, Partial<Post>>, Post, BaseEntity {
  getTags: () => Promise<TagInstance[]>;
  getComments: () => Promise<CommentInstance[]>;
}

export interface TagInstance extends Model<Tag, Partial<Tag>>, Tag, BaseEntity {
  getPosts: () => Promise<PostInstance[]>;
}

export interface CommentInstance extends Model<Comment, Partial<Comment>>, Comment, BaseEntity {
  getAuthor: () => Promise<UserInstance>;
  getPost: () => Promise<PostInstance>;
}

export interface ArtifactInstance extends Model<Artifact, Partial<Artifact>>, Artifact, BaseEntity {
  getOwners: () => Promise<InventoryInstance[]>;
}

export interface InventoryInstance extends Model<Inventory, Partial<Inventory>>, Inventory, BaseEntity {
  artifact?: ArtifactInstance;
  user?: UserInstance;
}

// ===================================================================================
// 3. Contrato de la Base de Datos (The Brain)
// ===================================================================================

/**
 * Representa el objeto 'db' exportado por models/index.ts.
 * Utilizamos ModelStatic<Model> en el index signature para evitar 'any',
 * indicando que cualquier propiedad dinámica es, como mínimo, un Modelo de Sequelize.
 */
export interface DbModels {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;

  // Modelos del Sistema Core
  App: ModelStatic<AppInstance>;
  Declaration: ModelStatic<DeclarationInstance>;
  Enumeration: ModelStatic<EnumerationInstance>;
  Field: ModelStatic<FieldInstance>;
  I18n: ModelStatic<I18nInstance>;
  Model: ModelStatic<ModelInstance>;
  Reference: ModelStatic<ReferenceInstance>;
  User: ModelStatic<UserInstance>;
  Value: ModelStatic<ValueInstance>;

  // Modelos de Dominio (Blog & Gamificación)
  Post: ModelStatic<PostInstance>;
  Tag: ModelStatic<TagInstance>;
  Comment: ModelStatic<CommentInstance>;
  Artifact: ModelStatic<ArtifactInstance>;
  Inventory: ModelStatic<InventoryInstance>;

  // Index signature para acceso dinámico seguro.
  // 'unknown' es la opción más segura aquí para obligar al casting explícito
  // cuando se accede dinámicamente a un modelo desconocido.
  [key: string]: ModelStatic<Model> | Sequelize | typeof Sequelize | unknown;
}

// ===================================================================================
// 4. Utilidades de Inyección y Contexto
// ===================================================================================

// Definición estricta de DataTypes para inyección en factories legacy
export interface iDataTypes {
  UUID: AbstractDataTypeConstructor;
  UUIDV4: AbstractDataTypeConstructor;
  STRING: AbstractDataTypeConstructor;
  BOOLEAN: AbstractDataTypeConstructor;
  TEXT: AbstractDataTypeConstructor;
  INTEGER: AbstractDataTypeConstructor;
  DATE: AbstractDataTypeConstructor;
  FLOAT: AbstractDataTypeConstructor;
  NOW: AbstractDataTypeConstructor;
  JSONB: AbstractDataTypeConstructor;
  ENUM: AbstractDataTypeConstructor;
}

// Alias para compatibilidad con código legacy que usa estos nombres
export type iModels = DbModels;
export type iUser = UserInstance;
export type iApp = AppInstance;
export type iDeclaration = DeclarationInstance;
export type iEnumeration = EnumerationInstance;
export type iField = FieldInstance;
export type iI18n = I18nInstance;
export type iModel = ModelInstance;
export type iValue = ValueInstance;

export interface GraphQLContext {
  models: DbModels;
  user?: UserInstance;
  req?: unknown;
}

// Inputs para Mutaciones (Reflejan los args de los Resolvers)
export type DeleteByIdArgs = { id: string; };
export type CreateAppArgs = { input: App };
export type CreateDeclarationArgs = { input: Declaration };
export type CreateEnumerationArgs = { input: Enumeration };
export type EditEnumerationArgs = { id: string; input: Enumeration };
export type CreateFieldArgs = { input: Field };
export type UpdateFieldInput = Omit<Field, 'modelId' | 'modelName' | 'defaultValue'>;
export type EditFieldArgs = { id: string; input: UpdateFieldInput };
export type CreateModelArgs = { input: ModelType };
export type EditModelArgs = { id: string; input: Pick<ModelType, 'modelName' | 'identifier' | 'description'> };
export type CreateUserArgs = { input: User };
export type LoginArgs = { input: Pick<User, 'email' | 'password'> };
export type EntriesInput = { id: string; checked: boolean; status: string };
export type CreateValuesArgs = { input: Value[] };
export type FindUniqueValuesArgs = { input: { value: string }[] };
export type UpdateValuesArgs = { entry: string; input: Value[] };
export type DeleteValuesArgs = { entries: EntriesInput[] };
export type PublishOrUnpublishEntriesArgs = { entries: EntriesInput[]; action: 'publish' | 'unpublish' };
export type CreatePostArgs = { input: Post };
export type CreateCommentArgs = { input: { postId: string; content: string } };
export type GrantArtifactArgs = { userId: string; artifactSlug: string };
export type ToggleEquipArtifactArgs = { inventoryId: string };

// Alias de Inputs Legacy
export type iCreateAppInput = App;
export type iCreateI18nInput = I18n;
export type iCreateDeclarationInput = Declaration;
export type iCreateOrEditEnumerationInput = Enumeration;
export type iCreateFieldInput = Field;
export type iCreateOrUpdateValueInput = Value;
export type iValueInput = { value: string };
export type iCreateModelInput = ModelType;
export type iEditModelInput = ModelType;
export type iCreateUserInput = User;
export type iLoginInput = LoginArgs['input'];
export type iAuthPayload = { token: string };
