// RUTA: apps/cms-api/src/models/Post.ts
import { Model, DataTypes } from 'sequelize';
import type { Sequelize } from 'sequelize';
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
    Post.belongsToMany(models.Tag, { through: 'PostTag', as: 'tags' });
    Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE' });
  }
}

export default function (sequelize: Sequelize): typeof Post {
  Post.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      title: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      published_date: { type: DataTypes.DATE, allowNull: false },
      featuredImageId: { type: DataTypes.UUID, allowNull: true },
    },
    {
      sequelize,
      tableName: 'posts',
    }
  );
  return Post;
}
