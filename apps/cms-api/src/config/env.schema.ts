// RUTA: apps/cms-api/src/config/env.schema.ts
// VERSIÓN: 1.0 - Contrato de Entorno
// DESCRIPCIÓN: Define y valida las variables de entorno requeridas para que la API arranque.

import { z } from 'zod';

export const envSchema = z.object({
  // --- SERVIDOR ---
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),

  // --- BASE DE DATOS (Supabase Transaction Mode) ---
  DATABASE_URL: z.string().url('DATABASE_URL debe ser una URL válida de conexión a Postgres'),

  // --- SEGURIDAD ---
  SECURITY_SECRET_KEY: z.string().min(32, 'SECURITY_SECRET_KEY debe tener al menos 32 caracteres para firmar JWTs de forma segura'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // --- CORS ---
  CORS_ORIGIN: z.string().default('*'),
});

export type EnvConfig = z.infer<typeof envSchema>;
