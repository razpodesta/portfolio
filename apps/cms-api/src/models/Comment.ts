// RUTA: apps/cms-api/src/models/Comment.ts
// VERSIÓN: 3.0 - Hybrid Architecture Fix
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Modelo de Comentarios refactorizado para cerrar la brecha entre
//              la arquitectura legado (Function-based) y la moderna (Class-based).
//              Soluciona los errores TS2339 y TS2345 mediante tipado explícito y casting seguro.

import { Model, DataTypes, type ModelStatic, type Sequelize } from 'sequelize';
import type { DbModels } from './index';

/**
 * Clase Comment.
 * Representa la entidad de comentarios en la base de datos.
 * Extiende directamente de Model de Sequelize para aprovechar las características modernas.
 */
export class Comment extends Model {
  public id!: string;
  public content!: string;
  public authorId!: string;
  public postId!: string;

  /**
   * Definición explícita del método estático associate.
   * Esto resuelve el error TS2339, informando a TS que esta propiedad existirá en la clase.
   */
  public static associate: (models: DbModels) => void;
}

/**
 * Factory function para inicializar el modelo.
 * Mantiene la compatibilidad con el cargador de modelos en `models/index.ts`.
 *
 * @param sequelize La instancia de conexión de Sequelize.
 * @returns La clase Comment inicializada.
 */
export default function (sequelize: Sequelize): typeof Comment {
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      authorId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: 'comments',
    }
  );

  /**
   * Definición de Asociaciones.
   * Se utiliza 'as unknown as ModelStatic<Model>' para puente el error de tipado
   * causado por la mezcla de modelos funcionales (legacy) y de clases (modernos).
   */
  Comment.associate = (models: DbModels) => {
    // Relación N:1 con User (Autor)
    // models.User está tipado como función en DbModels, pero es una clase en runtime.
    Comment.belongsTo(models.User as unknown as ModelStatic<Model>, {
      foreignKey: 'authorId',
      as: 'author'
    });

    // Relación N:1 con Post (Artículo)
    // models.Post también puede sufrir de inferencia incorrecta dependiendo de index.ts
    Comment.belongsTo(models.Post as unknown as ModelStatic<Model>, {
      foreignKey: 'postId',
      as: 'post'
    });
  };

  return Comment;
}
