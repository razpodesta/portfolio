// RUTA: apps/cms-api/src/interfaces/types.ts
// VERSIÓN: 5.1 - "La Constitución de Tipos del Ecosistema Completo"
// @author: Raz Podestá - MetaShark Tech
// @description: Fuente de verdad soberana y completa para todos los tipos del backend.
//               Se corrige la definición de los tipos base de las entidades para que no
//               incluyan propiedades generadas por la base de datos (como 'id'), resolviendo
//               conflictos de tipo en las operaciones de creación de Sequelize.

import type { Model as SequelizeModel, ModelStatic, Sequelize } from 'sequelize';

// ===================================================================================
// SECCIÓN 1: TIPOS BASE DE LAS ENTIDADES (REPRESENTAN DATOS PUROS DE CREACIÓN)
// ===================================================================================

export type App = {
  appName: string;
  identifier: string;
  icon: string;
  description: string;
  userId: string;
};

export type Declaration = {
  declaration: string;
  icon: string;
  description: string;
  color: string;
};

export type Enumeration = {
  enumerationName: string;
  identifier: string;
  description: string;
  values: string;
  appId: string;
};

export type Field = {
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
};

export type I18n = {
  key: string;
  value: string;
  language: string;
};

export type Model = {
  modelName: string;
  identifier: string;
  description: string;
  appId: string;
};

export type Reference = {
  parentModel: string;
  targetModel: string;
};

export type User = {
  username: string;
  password: string;
  email: string;
  privilege: 'god' | 'admin' | 'editor' | 'user';
  active: boolean;
};

export type Value = {
  entry: string;
  value: string;
  fieldIdentifier: string;
  fieldId: string;
};

// --- Tipos para el Dominio del Blog (CORREGIDOS) ---
export type Post = {
  title: string;
  slug: string;
  description: string;
  content: string;
  published_date: Date;
  featuredImageId?: string | null;
};

export type Tag = {
  name: string;
  slug: string;
};

export type Comment = {
  content: string;
  authorId: string;
  postId: string;
};

// ===================================================================================
// SECCIÓN 2: TIPOS PARA INSTANCIAS DE MODELOS DE SEQUELIZE (CON 'id')
// ===================================================================================

export type AppInstance = SequelizeModel<App, App> & App & { id: string };
export type DeclarationInstance = SequelizeModel<Declaration, Declaration> & Declaration & { id: string };
export type EnumerationInstance = SequelizeModel<Enumeration, Enumeration> & Enumeration & { id: string };
export type FieldInstance = SequelizeModel<Field, Field> & Field & { id: string };
export type I18nInstance = SequelizeModel<I18n, I18n> & I18n & { id: string };
export type ModelInstance = SequelizeModel<Model, Model> & Model & { id: string };
export type ReferenceInstance = SequelizeModel<Reference, Reference> & Reference & { id: string };
export type UserInstance = SequelizeModel<User, User> & User & { id: string };
export type ValueInstance = SequelizeModel<Value, Value> & Value & { id: string };
export type PostInstance = SequelizeModel<Post, Post> & Post & { id: string; getPosts: (options?: unknown) => Promise<PostInstance[]> };
export type TagInstance = SequelizeModel<Tag, Tag> & Tag & { id: string; getPosts: (options?: unknown) => Promise<PostInstance[]> };
export type CommentInstance = SequelizeModel<Comment, Comment> & Comment & { id: string };

// ===================================================================================
// SECCIÓN 3: CONTRATO DE MODELOS DE BASE DE DATOS Y CONTEXTO GRAPHQL
// ===================================================================================

export interface DbModels {
  sequelize: Sequelize;
  App: ModelStatic<AppInstance>;
  Declaration: ModelStatic<DeclarationInstance>;
  Enumeration: ModelStatic<EnumerationInstance>;
  Field: ModelStatic<FieldInstance>;
  I18n: ModelStatic<I18nInstance>;
  Model: ModelStatic<ModelInstance>;
  Reference: ModelStatic<ReferenceInstance>;
  User: ModelStatic<UserInstance>;
  Value: ModelStatic<ValueInstance>;
  Post: ModelStatic<PostInstance>;
  Tag: ModelStatic<TagInstance>;
  Comment: ModelStatic<CommentInstance>;
}

export interface GraphQLContext {
  models: DbModels;
  user?: UserInstance;
}

// ===================================================================================
// SECCIÓN 4: TIPOS PARA ARGUMENTOS DE RESOLVERS (COMPLETO)
// ===================================================================================

export type DeleteByIdArgs = {
  id: string;
};

// --- Tipos para Mutaciones de 'App' ---
export type CreateAppArgs = {
  input: App;
};

// --- Tipos para Mutaciones de 'Declaration' ---
export type CreateDeclarationArgs = {
  input: Declaration;
};

// --- Tipos para Mutaciones de 'Enumeration' ---
export type CreateEnumerationArgs = {
  input: Enumeration;
};
export type EditEnumerationArgs = {
  id: string;
  input: Enumeration;
};

// --- Tipos para Mutaciones de 'Field' ---
export type CreateFieldArgs = {
  input: Field;
};
export type UpdateFieldInput = Omit<Field, 'modelId' | 'modelName' | 'defaultValue'>;
export type EditFieldArgs = {
  id: string;
  input: UpdateFieldInput;
};

// --- Tipos para Mutaciones de 'Model' ---
export type CreateModelArgs = {
  input: Model;
};
export type EditModelArgs = {
  id: string;
  input: Pick<Model, 'modelName' | 'identifier' | 'description'>;
};

// --- Tipos para Mutaciones de 'User' ---
export type CreateUserArgs = {
  input: User;
};
export type LoginArgs = {
  input: Pick<User, 'email' | 'password'>;
};

// --- Tipos para Mutaciones de 'Value' ---
export type EntriesInput = {
  id: string;
  checked: boolean;
  status: string;
};
export type CreateValuesArgs = {
  input: Value[];
};
export type FindUniqueValuesArgs = {
  input: { value: string }[];
};
export type UpdateValuesArgs = {
  entry: string;
  input: Value[];
};
export type DeleteValuesArgs = {
  entries: EntriesInput[];
};
export type PublishOrUnpublishEntriesArgs = {
  entries: EntriesInput[];
  action: 'publish' | 'unpublish';
};

// --- Tipos para Mutaciones de 'Post' ---
export type CreatePostArgs = {
  input: Post; // El tipo 'Post' base (sin 'id') ahora es perfecto para la creación.
};

// --- Tipos para Mutaciones de 'Comment' ---
export type CreateCommentArgs = {
  input: {
    postId: string;
    content: string;
  };
};
