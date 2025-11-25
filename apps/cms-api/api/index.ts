// RUTA: apps/cms-api/api/index.ts
// VERSIÓN: 7.1 - ESLint Compliance & Architecture Justification
// DESCRIPCIÓN: Se añade la supresión justificada de la regla de límites de módulo.
//              La carpeta 'api/' actúa como Capa de Adaptación para Vercel/Serverless,
//              necesitando acceso legítimo al Núcleo de la Aplicación ('src/').

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

// --- IMPORTACIONES DEL NÚCLEO (ADAPTER PATTERN) ---
// Justificación: Este archivo es el punto de entrada para Serverless Functions.
// Reside fuera de 'src' por convención de Vercel, pero requiere acceso al dominio.
/* eslint-disable @nx/enforce-module-boundaries */
import typeDefs from '../src/graphql/types';
import resolvers from '../src/graphql/resolvers';
import models from '../src/models';
/* eslint-enable @nx/enforce-module-boundaries */

// --- CONFIGURACIÓN DEL SERVIDOR ---
// Inicialización fuera del handler para aprovechar la caché de Lambda (Warm Start)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
});

// --- GESTIÓN DE CONEXIÓN (PATRÓN SINGLETON) ---
let isDbConnected = false;

/**
 * Conexión a base de datos optimizada para entornos Serverless.
 * Evita overhead de reconexión y bloqueos por sync() en runtime.
 */
async function connectDB(): Promise<void> {
  if (isDbConnected) return;

  try {
    await models.sequelize.authenticate();
    isDbConnected = true;
    console.log('✅ [Serverless] DB Connection Established (Warm)');
  } catch (error) {
    isDbConnected = false;
    console.error('❌ [Serverless] DB Connection Failed:', error);
    throw new Error('Database connection failure');
  }
}

// --- HANDLER DEL API ROUTE ---
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: NextRequest) => {
    await connectDB();

    return {
      req,
      models,
    };
  },
});

export default handler;
