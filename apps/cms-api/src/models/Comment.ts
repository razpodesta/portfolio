// RUTA: apps/cms-api/src/models/Comment.ts
import { Model, DataTypes } from 'sequelize';
import type { Sequelize } from 'sequelize';
import type { DbModels } from './index';

export class Comment extends Model {
  public id!: string;
  public content!: string;
  public authorId!: string;
  public postId!: string;
}

export default function (sequelize: Sequelize): typeof Comment {
  Comment.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      content: { type: DataTypes.TEXT, allowNull: false },
      authorId: { type: DataTypes.UUID, allowNull: false },
      postId: { type: DataTypes.UUID, allowNull: false },
    },
    {
      sequelize,
      tableName: 'comments',
    }
  );

  Comment.associate = (models: DbModels) => {
    Comment.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
    Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
  };

  return Comment;
}
