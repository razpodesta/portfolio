// RUTA: apps/cms-api/config/index.ts
// VERSIÓN: 3.0 - "Adaptado a Supabase"
// DESCRIPCIÓN: Se refactoriza para leer las variables de entorno 'DATABASE_URL' y
//              'SECURITY_SECRET_KEY' del archivo .env, preparando la API para
//              la cohesión total con la infraestructura de Supabase.

import dotenv from 'dotenv';
import path from 'path';
import config from './config.json';

// Carga las variables de entorno desde el archivo .env en la raíz de la app cms-api
dotenv.config({ path: path.resolve(process.cwd(), 'apps/cms-api/.env') });

interface iSecurity { secretKey: string; expiresIn: string; }
interface iServer { port: number; }

const {
  DATABASE_URL = '',
  SECURITY_SECRET_KEY = ''
} = process.env;

if (!DATABASE_URL || !SECURITY_SECRET_KEY) {
  throw new Error("CRITICAL ERROR: 'DATABASE_URL' o 'SECURITY_SECRET_KEY' no están definidas en apps/cms-api/.env. La API no puede iniciar.");
}

const { security, server } = config;
security.secretKey = SECURITY_SECRET_KEY;

export const $dbUrl: string = DATABASE_URL;
export const $security: iSecurity = security;
export const $server: iServer = server;
