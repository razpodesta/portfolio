// RUTA: apps/cms-api/src/lib/jwt.ts
// VERSIÓN: 2.0 - "Contrato de Token Soberano y Type-Safe"
// @author: Raz Podestá - MetaShark Tech
// @description: Versión refactorizada y corregida del manejador de JSON Web Tokens.
//               Se exporta la interfaz 'CustomPayload' y se corrige la firma de 'generateToken'
//               para cumplir con la API de 'jsonwebtoken' y restaurar la seguridad de tipos.

import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { $security } from '../config';

/**
 * @description Interfaz soberana que define la estructura del payload de nuestros tokens de autenticación.
 *              Se exporta para ser utilizada en todo el ecosistema de la API.
 */
export interface CustomPayload extends JwtPayload {
  userId: string;
  email: string;
}

/**
 * @description Verifica un token JWT y devuelve su payload si es válido.
 * @param {string} token El JWT string a verificar.
 * @returns {CustomPayload | null} El payload del token o null si es inválido.
 */
export const verifyToken = (token: string): CustomPayload | null => {
  try {
    const decoded = jwt.verify(token, $security.secretKey);
    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as CustomPayload;
    }
    return null;
  } catch {
    console.error('[AUTH] La verificación del token falló.');
    return null;
  }
};

/**
 * @description Genera un nuevo token JWT.
 * @param {object} payload El objeto a incluir en el token.
 * @param {SignOptions} options Las opciones de firma, como 'expiresIn'.
 * @returns {string} Un string con el token JWT firmado.
 */
export const generateToken = (payload: object, options: SignOptions): string => {
  return jwt.sign(payload, $security.secretKey, options);
};
