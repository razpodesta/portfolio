// RUTA: apps/cms-api/src/config/index.ts
// VERSIÓN: 5.0 - Zod Powered Configuration
// DESCRIPCIÓN: Carga, valida y exporta la configuración. Falla inmediatamente si el entorno es inválido.

import dotenv from 'dotenv';
import path from 'path';
import { envSchema, type EnvConfig } from './env.schema.js';

// 1. Carga de variables de entorno (Prioridad: Sistema > .env local)
// Resolvemos la ruta absoluta para garantizar que funcione en monorepo
const envPath = path.resolve(process.cwd(), 'apps/cms-api/.env');
dotenv.config({ path: envPath });

// 2. Validación Estricta (Fail-Fast)
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ [CMS-API] Error Crítico de Configuración:');
  console.error(JSON.stringify(parsed.error.format(), null, 2));
  process.exit(1); // Detenemos la ejecución si el entorno no es seguro
}

const env: EnvConfig = parsed.data;

// 3. Exportación de Objetos de Configuración Estructurados
export const $server = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  corsOrigin: env.CORS_ORIGIN,
};

export const $db = {
  url: env.DATABASE_URL,
};

export const $security = {
  secretKey: env.SECURITY_SECRET_KEY,
  expiresIn: env.JWT_EXPIRES_IN,
};
