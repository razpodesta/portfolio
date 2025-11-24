// apps/cms-api/api/index.ts

/**
 * @file Entry Point Serverless para Vercel.
 * @version 1.0 - Vercel Adapter
 * @description Adapta la aplicación Express/Apollo existente para ejecutarse como una
 *              Serverless Function en la infraestructura de Vercel.
 */

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from '../src/graphql/types';
import resolvers from '../src/graphql/resolvers';
import models from '../src/models';

// Aseguramos conexión a DB (Singleton Pattern para Serverless)
// En serverless, las conexiones deben gestionarse con cuidado para no saturar el pool.
let isDbConnected = false;

async function connectDB() {
  if (isDbConnected) return;
  try {
    await models.sequelize.authenticate();
    // Sincronización suave (no force) para asegurar que las tablas existen
    await models.sequelize.sync();
    isDbConnected = true;
    console.log('✅ [Serverless] DB Conectada');
  } catch (error) {
    console.error('❌ [Serverless] Error DB:', error);
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Habilitado para facilitar depuración, desactivar en producción estricta
});

// Handler específico para Next.js API Routes (compatible con Vercel Functions)
const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    // Conectamos a la DB en cada invocación "en frío"
    await connectDB();
    return {
      req,
      res,
      models,
    };
  },
});

export default handler;
