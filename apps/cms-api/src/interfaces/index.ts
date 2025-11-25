/**
 * @file apps/cms-api/src/interfaces/index.ts
 * @description Contratos de Tipado Base para el CMS.
 * @standard ELITE - STRICT NO-ANY POLICY
 */

// ---------------------------------------------------------------------------
// 1. Primitivas de Datos Estrictas (JSON Recursivo)
// Reemplaza los 'any' en objetos de configuración o payloads dinámicos de BD.
// ---------------------------------------------------------------------------

export type JsonPrimitive = string | number | boolean | null;

export type JsonMap = {
  [key: string]: JsonValue;
};

export type JsonArray = JsonValue[];

/**
 * Tipo seguro para representar datos JSON crudos de Supabase/Postgres.
 * Obliga a usar Type Guards o Zod parsers para leer los valores.
 */
export type JsonValue = JsonPrimitive | JsonMap | JsonArray;

/**
 * Diccionario genérico estricto.
 * Por defecto usa 'unknown' para obligar a la validación antes del uso.
 */
export type Dict<T = unknown> = Record<string, T>;


// ---------------------------------------------------------------------------
// 2. Protocolos de Respuesta de Servicios (Standard Response Pattern)
// Soluciona errores en líneas ~24 y ~31-33
// ---------------------------------------------------------------------------

export interface IServiceError {
  code: string;
  message: string;
  details?: JsonMap; // Nunca 'any', usamos estructura JSON segura
}

/**
 * Wrapper universal para respuestas de lógica de negocio.
 * @template T - El tipo de dato esperado (inferido de Zod en capas superiores).
 */
export interface IServiceResult<T = void> {
  success: boolean;
  data?: T;
  error?: IServiceError;
  metadata?: {
    timestamp: number;
    requestId?: string;
    pagination?: IPaginationMeta;
  };
}


// ---------------------------------------------------------------------------
// 3. Interfaces de Paginación y Filtros
// ---------------------------------------------------------------------------

export interface IPaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IFilterOptions {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  // Campo dinámico para filtros específicos, tipado como Diccionario Seguro
  filters?: Dict<string | number | boolean | string[]>;
}


// ---------------------------------------------------------------------------
// 4. Interfaces de Contexto (Apollo / Express)
// ---------------------------------------------------------------------------

export interface ICurrentUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'VISITOR'; // Roles explícitos, no strings sueltos
  permissions: string[];
}

export interface IAppContext {
  // Token crudo si es necesario pasarlo
  token?: string;
  // Usuario ya decodificado y validado por AuthShield
  currentUser?: ICurrentUser | null;
  // Cliente de base de datos o servicios inyectados
  dataSources?: Dict;
  // Info de request para logging
  reqInfo?: {
    ip: string;
    userAgent?: string;
  };
}


// ---------------------------------------------------------------------------
// 5. Abstracción de Modelos de Base de Datos (Base Entity)
// Soluciona el bloque de errores ~131-146 (probablemente definiciones de modelos sueltos)
// ---------------------------------------------------------------------------

/**
 * Interfaz base para cualquier entidad persistida en PostgreSQL/Supabase.
 */
export interface IBaseEntity {
  id: string; // UUID
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null; // Soft delete support
}

/**
 * Tipo de utilidad para eliminar propiedades de sistema al crear nuevos registros.
 */
export type CreateEntityDTO<T> = Omit<T, keyof IBaseEntity>;

/**
 * Tipo de utilidad para actualizaciones parciales.
 */
export type UpdateEntityDTO<T> = Partial<Omit<T, keyof IBaseEntity>>;
