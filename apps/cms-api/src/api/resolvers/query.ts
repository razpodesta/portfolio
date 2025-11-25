// RUTA: apps/cms-api/src/api/resolvers/query.ts
// VERSIÓN: 3.2 - Strict Typing & Zero Any
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Resolver para consultas dinámicas EAV. Refactorizado para eliminar
//              el tipo 'any' explícito, utilizando las interfaces de dominio
//              y tipos de utilidad de TypeScript.

import type { GraphQLContext, FieldInstance, ValueInstance } from '../../interfaces/types.js';

// Definición estricta de los parámetros de entrada
type GetQueryInput = {
  input: {
    model: string;
    operation: string;
    params?: Record<string, unknown>; // Diccionario seguro en lugar de 'any'
  };
};

// Estructura para el objeto reconstruido (Fila de base de datos dinámica)
type DynamicEntry = Record<string, unknown>;

// Mapa para agrupar valores por ID de entrada
type EntriesMap = Record<string, DynamicEntry>;

export default {
  Query: {
    getQuery: async (
      _: unknown,
      { input: { model: modelName } }: GetQueryInput,
      { models }: GraphQLContext
    ) => {
      // 1. Verificar si el modelo existe en la base de datos
      const targetModel = await models.Model.findOne({
        where: { modelName }
      });

      if (!targetModel) {
        return { data: {} };
      }

      // 2. Obtener todos los campos asociados al modelo
      // Sequelize retorna un array tipado de FieldInstance
      const fields = await models.Field.findAll({
        where: { modelName }
      });

      if (fields.length === 0) {
        return { data: {} };
      }

      // 3. Mapeo de IDs de campos a sus identificadores (slugs)
      const fieldMap = new Map<string, string>();
      const fieldIds: string[] = [];

      fields.forEach((f: FieldInstance) => {
        fieldMap.set(f.id, f.identifier);
        fieldIds.push(f.id);
      });

      // 4. Obtener todos los valores (EAV) asociados a estos campos
      // Sequelize retorna un array tipado de ValueInstance
      const allValues = await models.Value.findAll({
        where: {
          fieldId: fieldIds
        }
      });

      // 5. Reconstrucción de Entidades (Pivoting)
      // Agrupamos los valores dispersos en objetos coherentes
      const entriesMap: EntriesMap = {};

      allValues.forEach((v: ValueInstance) => {
        const entryId = v.entry;
        const fieldIdentifier = fieldMap.get(v.fieldId);

        // Si el valor apunta a un campo que no mapeamos (edge case), lo ignoramos
        if (!fieldIdentifier) return;

        // Inicializamos el objeto de la entrada si es la primera vez que lo vemos
        if (!entriesMap[entryId]) {
          entriesMap[entryId] = { id: entryId };
        }

        // Asignamos el valor a la propiedad dinámica correspondiente
        entriesMap[entryId][fieldIdentifier] = v.value;
      });

      // 6. Serialización de la respuesta
      const data = Object.values(entriesMap);

      return {
        // GraphQL espera un escalar JSON, que suele serializarse como string o objeto
        // dependiendo de la implementación del scalar. Aquí enviamos string para seguridad.
        data: JSON.stringify(data)
      };
    }
  }
};
