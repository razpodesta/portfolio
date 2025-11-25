// RUTA: apps/cms-api/src/models/Post.ts
// VERSIÓN: 3.1 - Association Type Fix
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Modelo Post con corrección de tipos en asociaciones.
//              Se utiliza casting explícito para cerrar la brecha entre modelos
//              funcionales y modelos de clases en el ecosistema híbrido.

import { Model, DataTypes, type ModelStatic, type Sequelize } from 'sequelize';
import type { DbModels } from './index';

export class Post extends Model {
  public id!: string;
  public title!: string;
  public slug!: string;
  public description!: string;
  public content!: string;
  public published_date!: Date;
  public featuredImageId!: string | null;

  public static associate(models: DbModels) {
    // SOLUCIÓN DE TIPO TS2345:
    // Forzamos a TS a tratar los modelos como Clases Estáticas de Sequelize,
    // que es lo que son en tiempo de ejecución dentro del objeto 'models'.

    Post.belongsToMany(models.Tag as unknown as ModelStatic<Model>, {
      through: 'PostTag',
      as: 'tags'
    });

    Post.hasMany(models.Comment as unknown as ModelStatic<Model>, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE'
    });
  }
}

export default function (sequelize: Sequelize): typeof Post {
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      published_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      featuredImageId: {
        type: DataTypes.UUID,
        allowNull: true
      },
    },
    {
      sequelize,
      tableName: 'posts',
    }
  );
  return Post;
}
