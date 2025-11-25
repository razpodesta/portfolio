// RUTA: apps/cms-api/src/models/Tag.ts
// VERSIÓN: 3.0 - Association Type Fix
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Solución al conflicto de tipos en la asociación belongsToMany.
//              Se aplica casting explícito a 'ModelStatic<Model>' para alinear
//              el tipo inferido de la fábrica con la clase requerida por Sequelize.

import { Model, DataTypes, type ModelStatic, type Sequelize } from 'sequelize';
import type { DbModels } from './index';

export class Tag extends Model {
  public id!: string;
  public name!: string;
  public slug!: string;

  public static associate(models: DbModels) {
    // SOLUCIÓN DE TIPO TS2345:
    // El sistema de tipos ve models.Post como la función factory (por la definición en index.ts),
    // pero en runtime es la clase inicializada. El casting puentea esta discrepancia.
    Tag.belongsToMany(models.Post as unknown as ModelStatic<Model>, {
      through: 'PostTag',
      as: 'posts'
    });
  }
}

export default function (sequelize: Sequelize): typeof Tag {
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
    {
      sequelize,
      tableName: 'tags',
    }
  );
  return Tag;
}
