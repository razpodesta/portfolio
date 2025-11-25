// RUTA: apps/cms-api/src/lib/jwt.ts
// VERSIÓN: 3.0 - Strict Typing & Linter Compliance
// DESCRIPCIÓN: Servicio de verificación de tokens JWT con tipado genérico seguro.
//              Elimina el uso de 'any' y corrige las definiciones de interfaces conflictivas.

import * as jwt from 'jsonwebtoken';
import { $security } from '../config/index.js';

/**
 * Estructura interna esperada del Payload del JWT en este sistema.
 * Extiende el tipo base de la librería para incluir la propiedad custom 'data'.
 */
interface LegacyJwtPayload extends jwt.JwtPayload {
  data?: unknown;
}

/**
 * Tipo para el callback de verificación.
 * @template T El tipo de dato esperado dentro del payload.
 */
type VerifyCallback<T> = (data: T | null) => void;

/**
 * Verifica un token JWT de forma asíncrona y extrae su carga útil.
 *
 * @template T El tipo de dato que se espera recuperar (ej: User).
 * @param accessToken El token JWT (string) a verificar.
 * @param cb Función de callback que recibe los datos decodificados (T) o null si falla.
 */
export function jwtVerify<T = unknown>(accessToken: string, cb: VerifyCallback<T>): void {
  jwt.verify(accessToken, $security.secretKey, (error, decoded) => {
    // 1. Manejo de errores de firma o expiración
    if (error) {
      return cb(null);
    }

    // 2. Validación de estructura (Type Guard implícito)
    if (typeof decoded !== 'object' || decoded === null) {
      return cb(null);
    }

    // 3. Casting seguro a nuestra estructura conocida
    const payload = decoded as LegacyJwtPayload;

    // 4. Extracción de la propiedad 'data' específica de la lógica legacy
    if (!payload.data) {
      return cb(null);
    }

    // 5. Retorno del dato tipado
    return cb(payload.data as T);
  });
}

/**
 * Wrapper basado en Promesas para obtener datos del usuario desde un token.
 * Facilita el uso en funciones async/await.
 *
 * @template T El tipo de dato que se espera recuperar.
 * @param accessToken El token JWT.
 * @returns Una promesa que resuelve con los datos (T) o null si el token es inválido.
 */
export async function getUserData<T = unknown>(accessToken: string): Promise<T | null> {
  return new Promise((resolve) => {
    jwtVerify<T>(accessToken, (data) => resolve(data));
  });
}
