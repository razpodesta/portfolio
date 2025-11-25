// RUTA: apps/cms-api/src/graphql/types/App.ts
// VERSIÓN: 2.0 - Dependencia Soberana
// DESCRIPCIÓN: Definición del esquema GraphQL para la entidad 'App'.
//              Utiliza la utilidad local 'gql' para evitar errores de build.

import gql from '../../lib/gql.js';

export default gql`
  type App {
    id: UUID!
    userId: UUID!
    appName: String!
    identifier: String!
    icon: String!
    description: String!
    createdAt: Datetime!
    updatedAt: Datetime!
    models: [Model!]
    enumerations: [Enumeration!]
  }

  type Query {
    getApps: [App!]
    getAppById(id: String!): App!
  }

  type Mutation {
    createApp(input: CreateAppInput): App!
  }

  input CreateAppInput {
    appName: String!
    identifier: String!
    icon: String!
    description: String!
    userId: UUID!
  }
`;
