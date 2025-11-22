// RUTA: apps/cms-api/src/lib/auth.ts
// VERSIÓN: 2.0 - "Guardián de Autenticación Soberano"
// @author: Raz Podestá - MetaShark Tech
// @description: Lógica de autenticación de élite, refactorizada para Apollo Server 4.
//               Utiliza tipos seguros, manejo de errores moderno con GraphQLError y dependencias correctas.
//               Se erradican todas las importaciones obsoletas y variables sin usar.

import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { verifyToken, generateToken, CustomPayload } from './jwt';
import models from '../models';
import type { UserInstance } from '../interfaces/types';
import type { Request } from 'express';

/**
 * @description Obtiene el usuario autenticado a partir del token en las cabeceras de la petición.
 * @param {Request} req El objeto de la petición de Express.
 * @returns {Promise<UserInstance | null>} La instancia del usuario encontrado en la DB o null.
 */
export const getUserFromRequest = async (req: Request): Promise<UserInstance | null> => {
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      const token = authorization.replace('Bearer ', '');
      const decodedPayload = verifyToken(token);

      if (decodedPayload?.userId) {
        const user = await models.User.findByPk(decodedPayload.userId);
        return user;
      }
    } catch (error) {
      console.error('[AUTH] Error procesando token:', error);
      return null;
    }
  }
  return null;
};

/**
 * @description Realiza el proceso de login, validando credenciales y generando un token.
 * @param {string} email El email del usuario.
 * @param {string} password La contraseña del usuario.
 * @returns {Promise<string>} El token JWT generado.
 * @throws {GraphQLError} Si las credenciales son inválidas o el usuario no existe.
 */
export const authenticateUser = async (email: string, password: string): Promise<string> => {
  const user = await models.User.findOne({ where: { email } });

  // Guardián de Contrato: Verifica si el usuario existe.
  if (!user) {
    throw new GraphQLError('Credenciales incorrectas.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  // Guardián de Contrato: Compara la contraseña.
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new GraphQLError('Credenciales incorrectas.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  // Creación del payload soberano.
  const tokenPayload: CustomPayload = {
    userId: user.id,
    email: user.email,
  };

  const token = generateToken(tokenPayload, { expiresIn: '7d' });

  return token;
};
