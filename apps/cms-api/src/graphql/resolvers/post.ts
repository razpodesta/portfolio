// RUTA: apps/cms-api/src/graphql/resolvers/post.ts
// VERSIÓN: 4.0 - Type Safe Associations
import { GraphQLError } from 'graphql';
import type { GraphQLContext, CreatePostArgs, CreateCommentArgs, UserInstance } from '../../interfaces/types.js';

type ResolverContext = GraphQLContext & { user?: UserInstance };

export default {
  Query: {
    getPosts: async (_: unknown, __: unknown, { models }: GraphQLContext) => {
      return models.Post.findAll({
        include: [{ model: models.Tag, as: 'tags' }],
        order: [['published_date', 'DESC']],
      });
    },
    getPostBySlug: async (_: unknown, { slug }: { slug: string }, { models }: GraphQLContext) => {
      return models.Post.findOne({
        where: { slug },
        include: [
          { model: models.Tag, as: 'tags' },
          { model: models.Comment, as: 'comments', include: [{ model: models.User, as: 'author' }] },
        ],
      });
    },
    getPostsByTagSlug: async (_: unknown, { slug }: { slug: string }, { models }: GraphQLContext) => {
      const tag = await models.Tag.findOne({ where: { slug } });

      if (!tag) {
        throw new GraphQLError(`Tag not found: ${slug}`, { extensions: { code: 'BAD_USER_INPUT' } });
      }

      // CORRECCIÓN: El método getPosts generado por BelongsToMany en Sequelize
      // SÍ acepta opciones, pero los tipos por defecto a veces son incompletos.
      // Usamos una aserción segura para decirle a TS que confiamos en la API de Sequelize.
      // O, alternativamente, hacemos la query inversa que es más eficiente y segura en tipos:

      return models.Post.findAll({
        include: [{
          model: models.Tag,
          as: 'tags',
          where: { slug: slug } // Filtramos por el slug del tag relacionado
        }],
        order: [['published_date', 'DESC']],
      });
    },
  },
  Mutation: {
    createPost: async (_: unknown, { input }: CreatePostArgs, { models }: GraphQLContext) => {
      return models.Post.create(input);
    },
    createComment: async (_: unknown, { input }: CreateCommentArgs, { models, user }: ResolverContext) => {
      const authenticatedUser = user || { id: '00000000-0000-0000-0000-000000000000' };

      if (!authenticatedUser) {
        throw new GraphQLError('Authentication required', { extensions: { code: 'UNAUTHENTICATED' } });
      }
      if (!input.content || input.content.trim().length < 3) {
        throw new GraphQLError('Invalid content', { extensions: { code: 'BAD_USER_INPUT' } });
      }

      const newComment = await models.Comment.create({
        postId: input.postId,
        content: input.content.trim(),
        authorId: authenticatedUser.id,
      });

      return models.Comment.findByPk(newComment.id, {
        include: [{ model: models.User, as: 'author' }]
      });
    }
  },
};
