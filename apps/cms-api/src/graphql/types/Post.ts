// RUTA: apps/cms-api/src/graphql/types/Post.ts
// VERSIÓN: 2.2 - "Contrato de Dominio de Contenido (Fuente de Verdad Corregida)"
// @author: Raz Podestá - MetaShark Tech
// @description: Se corrige la importación de 'gql' para que provenga del paquete canónico 'graphql'.
//               Esta es la solución definitiva al error TS2307, alineando el aparato con las
//               mejores prácticas de GraphQL v16+ y Apollo Server v4+.

import { gql } from 'graphql';

export default gql`
  # Define la estructura pública de un artículo del blog.
  type Post {
    id: UUID!
    title: String!
    slug: String!
    description: String!
    content: String!
    published_date: Datetime!
    tags: [Tag!]
    comments: [Comment!]
  }

  # Define la estructura de una etiqueta o categoría.
  type Tag {
    id: UUID!
    name: String!
    slug: String!
  }

  # Define la estructura de un comentario, exponiendo al autor.
  type Comment {
    id: UUID!
    content: String!
    author: User! # Relación directa con el modelo User para obtener sus datos públicos.
    createdAt: Datetime!
  }

  # Extiende el tipo Query raíz con nuevas capacidades de consulta para el blog.
  type Query {
    getPosts: [Post!]
    getPostBySlug(slug: String!): Post
    getPostsByTagSlug(slug: String!): [Post!]
  }

  # Input para la creación de nuevos artículos.
  input CreatePostInput {
    title: String!
    slug: String!
    description: String!
    content: String!
    published_date: Datetime!
  }

  # Input para la creación de nuevos comentarios. Simple y seguro.
  input CreateCommentInput {
    postId: UUID!
    content: String!
  }

  # Extiende el tipo Mutation raíz con nuevas capacidades de escritura.
  type Mutation {
    createPost(input: CreatePostInput!): Post!
    createComment(input: CreateComment-input!): Comment!
  }
`;
