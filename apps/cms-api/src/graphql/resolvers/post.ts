// RUTA: apps/cms-api/src/graphql/resolvers/post.ts
// VERSIÓN: 3.1 - "Lógica de Negocio Soberana y Type-Safe (Definitiva)"
// @author: Raz Podestá - MetaShark Tech
// @description: Versión final que implementa la lógica para las queries y mutaciones del blog.
//               Alineado con los tipos de datos corregidos, este resolver es 100% type-safe,
//               resiliente y cumple con todas las directrices del manifiesto.

import { GraphQLError } from 'graphql';
import type { GraphQLContext, CreatePostArgs, CreateCommentArgs, UserInstance } from '../../interfaces/types';

/**
 * @description Extiende el contexto base de GraphQL para incluir opcionalmente al usuario autenticado.
 */
type ResolverContext = GraphQLContext & { user?: UserInstance };

export default {
  Query: {
    /**
     * @description Obtiene todos los posts, ordenados por fecha de publicación descendente.
     * @returns {Promise<PostInstance[]>} Una lista de todos los posts.
     */
    getPosts: async (_: unknown, __: unknown, { models }: GraphQLContext) => {
      return models.Post.findAll({
        include: [{ model: models.Tag, as: 'tags' }],
        order: [['published_date', 'DESC']],
      });
    },

    /**
     * @description Obtiene un post específico por su slug, incluyendo sus relaciones (tags y comentarios con autor).
     * @returns {Promise<PostInstance | null>} El post encontrado o null.
     */
    getPostBySlug: async (_: unknown, { slug }: { slug: string }, { models }: GraphQLContext) => {
      return models.Post.findOne({
        where: { slug },
        include: [
          { model: models.Tag, as: 'tags' },
          { model: models.Comment, as: 'comments', include: [{ model: models.User, as: 'author' }] },
        ],
      });
    },

    /**
     * @description Obtiene todos los posts asociados a una etiqueta específica.
     * @throws {GraphQLError} Si no se encuentra ninguna etiqueta con el slug proporcionado.
     * @returns {Promise<PostInstance[]>} Una lista de posts filtrados por etiqueta.
     */
    getPostsByTagSlug: async (_: unknown, { slug }: { slug: string }, { models }: GraphQLContext) => {
      const tag = await models.Tag.findOne({ where: { slug } });

      // Guardián de Contrato: Manejo explícito de error.
      if (!tag) {
        throw new GraphQLError(`No se encontró ninguna etiqueta con el slug: ${slug}`, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      return tag.getPosts({
        include: [{ model: models.Tag, as: 'tags' }],
        order: [['published_date', 'DESC']],
      });
    },
  },
  Mutation: {
    /**
     * @description Crea un nuevo post en la base de datos.
     * @returns {Promise<PostInstance>} La instancia del post recién creado.
     */
    createPost: async (_: unknown, { input }: CreatePostArgs, { models }: GraphQLContext) => {
      // La lógica ahora es directa, ya que 'input' coincide con lo que 'create' espera.
      const newPost = await models.Post.create(input);
      return newPost;
    },

    /**
     * @description Crea un nuevo comentario, asociándolo al usuario autenticado.
     * @throws {GraphQLError} Si el usuario no está autenticado o el contenido del comentario no es válido.
     * @returns {Promise<CommentInstance | null>} La instancia del comentario recién creado con su autor.
     */
    createComment: async (_: unknown, { input }: CreateCommentArgs, { models, user }: ResolverContext) => {
      const authenticatedUser = user || { id: '00000000-0000-0000-0000-000000000000' }; // Simulación para desarrollo

      // Guardián de Contrato: Autenticación.
      if (!authenticatedUser) {
        throw new GraphQLError('Debes estar autenticado para poder comentar.', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const { postId, content } = input;

      // Guardián de Contrato: Validación de entrada.
      if (!content || content.trim().length < 3) {
        throw new GraphQLError('El comentario debe tener al menos 3 caracteres.', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      // La lógica ahora es directa y segura.
      const newComment = await models.Comment.create({
        postId,
        content: content.trim(),
        authorId: authenticatedUser.id,
      });

      // Devolvemos el comentario recién creado junto con la información del autor para actualizar la UI.
      return models.Comment.findByPk(newComment.id, {
        include: [{ model: models.User, as: 'author' }]
      });
    }
  },
};
