// RUTA: apps/cms-api/src/models/Tag.ts
import { Model, DataTypes } from 'sequelize';
import type { Sequelize } from 'sequelize';
import type { DbModels } from './index';

export class Tag extends Model {
  public id!: string;
  public name!: string;
  public slug!: string;

  public static associate(models: DbModels) {
    Tag.belongsToMany(models.Post, { through: 'PostTag', as: 'posts' });
  }
}

export default function (sequelize: Sequelize): typeof Tag {
  Tag.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      tableName: 'tags',
    }
  );
  return Tag;
}
