// RUTA: apps/cms-api/src/lib/auth.ts
// VERSIÓN: 5.0 - AuthShield Integration & Sequelize Strict Fix
// DESCRIPCIÓN: Orquestador de autenticación. Delega la criptografía a la librería
//              soberana y utiliza métodos optimizados de Sequelize para evitar
//              conflictos de tipado en claves primarias.

import { GraphQLError } from 'graphql';
import { TokenManager, type AuthPayload } from '@razpodesta/auth-shield';
import { $security } from '../config/index.js';
import type { iAuthPayload, iModels, UserInstance } from '../interfaces/types.js';

// Inicialización del Gestor de Tokens con la configuración global validada
const tokenManager = new TokenManager({
  secret: $security.secretKey,
  expiresIn: $security.expiresIn
});

/**
 * Ejecuta el flujo de inicio de sesión completo.
 *
 * @param email Correo electrónico del usuario.
 * @param password Contraseña en texto plano.
 * @param models Acceso a la capa de datos (Inyección de Dependencias).
 */
export const doLogin = async (
  email: string,
  password: string,
  models: iModels
): Promise<iAuthPayload> => {
  // 1. Búsqueda del Usuario por Email
  // Sequelize infiere correctamente que 'email' existe en los atributos de User.
  const user = await models.User.findOne({
    where: { email, active: true }
  });

  // Protección contra enumeración de usuarios: Mensaje genérico
  if (!user) {
    throw new GraphQLError('Credenciales inválidas.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  // 2. Validación de Credenciales
  // El modelo User encapsula la lógica de comparación de hash (Rich Domain Model).
  const isValid = user.validatePassword(password);

  if (!isValid) {
    throw new GraphQLError('Credenciales inválidas.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  // 3. Construcción del Payload Seguro
  // Mapeamos los datos del modelo de BD al contrato de token de AuthShield.
  const payload: AuthPayload = {
    userId: user.id,
    email: user.email,
    role: user.role || 'VISITOR' // Fallback seguro si el rol es undefined
  };

  // 4. Firma del Token
  const token = tokenManager.sign(payload);

  return {
    token
  };
};

/**
 * Recupera una instancia de usuario basada en los datos del token decodificado.
 * Utilizado principalmente por el middleware de contexto de GraphQL.
 *
 * @param userData Payload decodificado del JWT.
 * @param models Capa de acceso a datos.
 */
export const getUserBy = async (
  userData: AuthPayload,
  models: iModels
): Promise<UserInstance | null> => {
  if (!userData.userId) return null;

  // CORRECCIÓN DE ÉLITE (TS2769):
  // En lugar de usar 'findOne' con 'where: { id }', usamos 'findByPk'.
  // Esto es semánticamente correcto para búsquedas por ID, más performante,
  // y evita la fricción de tipos de Sequelize respecto a la herencia de 'id'.
  const user = await models.User.findByPk(userData.userId);

  // Validación lógica: El usuario debe existir y estar activo.
  if (user && user.active) {
    return user;
  }

  return null;
};

// Re-exportamos la utilidad de verificación para uso en middlewares o resolvers
// Mantenemos la interfaz limpia exportando solo lo necesario.
export const verifyToken = (token: string): AuthPayload | null => {
  return tokenManager.verify(token);
};
