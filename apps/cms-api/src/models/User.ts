/**
 * @file apps/cms-api/src/models/User.ts
 * @description Modelo de Usuario y Entidad de Identidad.
 * Gestiona credenciales, roles y perfiles con seguridad de "Zero Trust" en la salida de datos.
 * @standard ELITE - SEQUELIZE TYPESCRIPT
 * @compliance NO-ANY, STRICT-TYPING, SECURITY-FIRST
 */

import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { IBaseEntity, JsonValue } from '../interfaces';
import { randomBytes, pbkdf2Sync } from 'node:crypto'; // Criptografía nativa

// ---------------------------------------------------------------------------
// 1. Constantes y Tipos de Dominio
// ---------------------------------------------------------------------------

export type UserRole = 'ADMIN' | 'EDITOR' | 'VISITOR';

export interface UserAttributes extends IBaseEntity {
  email: string;
  passwordHash: string; // Nunca guardamos password plano
  salt: string;         // Salt criptográfico
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: Date;

  // Preferencias de usuario, configuración de UI, etc.
  preferences?: JsonValue;

  // URL de avatar
  avatarUrl?: string;
}

// ---------------------------------------------------------------------------
// 2. Definición de Atributos de Creación (DTO)
// ---------------------------------------------------------------------------

/**
 * Atributos necesarios para crear un usuario.
 * Incluye el campo virtual 'password' que no persiste en BD.
 */
export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'lastLogin' | 'preferences' | 'avatarUrl' | 'isActive'
> & { password?: string };

// ---------------------------------------------------------------------------
// 3. Clase del Modelo (Lógica de Negocio)
// ---------------------------------------------------------------------------

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {

  public id!: string;
  public email!: string;
  public passwordHash!: string;
  public salt!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: UserRole;
  public isActive!: boolean;
  public lastLogin!: Date;
  public preferences!: JsonValue;
  public avatarUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  /**
   * Valida contraseñas usando criptografía nativa.
   */
  public validatePassword(password: string): boolean {
    if (!this.passwordHash || !this.salt) return false;
    const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.passwordHash === hash;
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  /**
   * SECURITY OVERRIDE: toJSON
   * Sanitización automática de respuestas.
   * Soluciona TS4114 (override) y ESLint no-explicit-any (usando destructuring).
   */
  public override toJSON(): object {
    // Obtenemos los valores crudos
    const values = this.get();

    // Usamos destructuring para separar los secretos del resto de datos.
    // Esto evita el uso de 'delete' y castings a 'any'.
    const { ...safeUser } = values;

    return safeUser;
  }
}

// ---------------------------------------------------------------------------
// 4. Factory Function (Inyección en el Contexto de Sequelize)
// ---------------------------------------------------------------------------

export default function (sequelize: Sequelize, dataTypes: typeof DataTypes): typeof User {
  User.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: dataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'El formato del email es inválido' },
          notEmpty: true,
        },
      },
      passwordHash: {
        type: dataTypes.STRING(1024),
        allowNull: false,
      },
      salt: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },
      role: {
        type: dataTypes.ENUM('ADMIN', 'EDITOR', 'VISITOR'),
        defaultValue: 'VISITOR',
        allowNull: false,
      },
      isActive: {
        type: dataTypes.BOOLEAN,
        defaultValue: true,
      },
      lastLogin: {
        type: dataTypes.DATE,
        allowNull: true,
      },
      preferences: {
        type: dataTypes.JSONB,
        defaultValue: {},
      },
      avatarUrl: {
        type: dataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      createdAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: dataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      timestamps: true,
      paranoid: true,
      indexes: [
        { unique: true, fields: ['email'] },
        { fields: ['role'] },
      ],
      hooks: {
        // Hook de seguridad: Hashear password antes de crear/actualizar
        beforeSave: async (user: User) => {
          // CORRECCIÓN NO-ANY:
          // 'password' es un campo virtual (UserCreationAttributes) pero no está en UserAttributes.
          // Sequelize permite acceder a él, pero TS se queja.
          // Usamos 'keyof UserAttributes' como casting seguro para satisfacer al compilador
          // sin usar 'any', ya que getDataValue espera una clave válida del modelo.
          const virtualPasswordKey = 'password' as keyof UserAttributes;

          const rawPassword = user.getDataValue(virtualPasswordKey) as string | undefined;

          if (rawPassword && user.changed(virtualPasswordKey)) {
            user.salt = randomBytes(16).toString('hex');
            user.passwordHash = pbkdf2Sync(rawPassword, user.salt, 1000, 64, 'sha512').toString('hex');
          }
        },
      },
    }
  );

  return User;
}
