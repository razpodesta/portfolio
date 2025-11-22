// RUTA: apps/cms-api/src/index.ts
// VERSIÓN: 2.0 - "El Orquestador de la API" (Ultra-Holístico y Type-Safe)
// DESCRIPCIÓN: Versión refactorizada que resuelve todas las inconsistencias de tipos
//              y rutas. Se alinea con la nueva estructura de carpetas, erradica 'any'
//              y establece un estándar de élite para la inicialización del servidor.

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';

import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';
import models from './models'; // La importación a la capa de datos es ahora limpia.
import { $server } from './config'; // Importación corregida tras la reubicación.
import { setInitialData } from './data';
import type { GraphQLContext } from './interfaces/types';

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  console.log('🚀 [CMS-API] Iniciando servidor Apollo...');

  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    // El middleware de Apollo se integra con Express.
    // El contexto ahora se tipa correctamente con GraphQLContext.
    expressMiddleware(server, {
      context: async ({ req }) => {
        // En un futuro, aquí se decodificará el token JWT del header 'Authorization'
        // para obtener el usuario y añadirlo al contexto.
        // const token = req.headers.authorization || '';
        // const user = await getUserFromToken(token);
        return { models /*, user */ };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: $server.port }, resolve)
  );

  // Sincronización con la Base de Datos y siembra de datos iniciales.
  await models.sequelize.sync();
  await setInitialData();

  console.log(`✅ [CMS-API] Servidor GraphQL listo y escuchando en http://localhost:${$server.port}/graphql`);
}

startApolloServer().catch(error => {
  console.error('💥 [CMS-API] Error crítico al iniciar el servidor:', error);
  process.exit(1);
});
