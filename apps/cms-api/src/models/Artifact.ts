/**
 * @file apps/cms-api/src/models/Artifact.ts
 * @description Modelo de Artefacto (Asset Digital).
 * Gestiona archivos, medios y recursos estáticos con validación estricta.
 * @standard ELITE - SEQUELIZE TYPESCRIPT
 * @compliance NO-ANY, STRICT-TYPING, NO-EMPTY-INTERFACES
 */

import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { IBaseEntity, JsonValue } from '../interfaces';

// ---------------------------------------------------------------------------
// 1. Definición de Atributos (Contrato de Datos)
// ---------------------------------------------------------------------------

/**
 * Representa un archivo o recurso digital en el sistema.
 * Puede ser una imagen, modelo 3D, documento o ejecutable.
 */
export interface ArtifactAttributes extends IBaseEntity {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number; // En bytes

  // Ubicación del recurso
  path: string; // Path relativo o Key en S3/Storage
  publicUrl?: string; // URL pública si aplica (CDN)

  // Clasificación
  type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | '3D_MODEL' | 'ARCHIVE' | 'UNKNOWN';
  bucket: string; // Identificador del contenedor de almacenamiento

  // Metadatos técnicos extraídos (Dimensiones, duración, etc.)
  metadata?: JsonValue;

  // Hash para integridad (MD5/SHA256)
  hash?: string;
}

// ---------------------------------------------------------------------------
// 2. Definición de Atributos de Creación (DTO)
// ---------------------------------------------------------------------------

/**
 * Atributos requeridos para registrar un nuevo artefacto.
 * ID y fechas son automáticos. PublicURL, metadata y hash son opcionales al inicio.
 */
export type ArtifactCreationAttributes = Optional<
  ArtifactAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'publicUrl' | 'metadata' | 'hash'
>;

// ---------------------------------------------------------------------------
// 3. Clase del Modelo (Lógica de Negocio)
// ---------------------------------------------------------------------------

export class Artifact extends Model<ArtifactAttributes, ArtifactCreationAttributes>
  implements ArtifactAttributes {

  public id!: string;
  public filename!: string;
  public originalName!: string;
  public mimeType!: string;
  public size!: number;

  public path!: string;
  public publicUrl!: string;

  public type!: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | '3D_MODEL' | 'ARCHIVE' | 'UNKNOWN';
  public bucket!: string;

  public metadata!: JsonValue;
  public hash!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  /**
   * Determina si el artefacto es una imagen procesable.
   */
  public isImage(): boolean {
    return this.type === 'IMAGE' || this.mimeType.startsWith('image/');
  }

  /**
   * Genera un nombre de archivo seguro para almacenamiento.
   * (Utilidad estática para uso antes de la inserción si es necesario)
   */
  public static sanitizeFilename(name: string): string {
    return name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
  }
}

// ---------------------------------------------------------------------------
// 4. Factory Function (Inyección en el Contexto de Sequelize)
// ---------------------------------------------------------------------------

export default function (sequelize: Sequelize, dataTypes: typeof DataTypes): typeof Artifact {
  Artifact.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      filename: {
        type: dataTypes.STRING(255),
        allowNull: false,
        comment: 'Nombre del archivo en el sistema de archivos/bucket',
      },
      originalName: {
        type: dataTypes.STRING(255),
        allowNull: false,
        comment: 'Nombre original del archivo subido por el usuario',
      },
      mimeType: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },
      size: {
        type: dataTypes.BIGINT, // BIGINT para archivos mayores a 2GB si fuera necesario
        allowNull: false,
        validate: {
          min: 0,
        },
        comment: 'Tamaño en bytes',
      },
      path: {
        type: dataTypes.STRING(1024), // Longitud extra para rutas profundas o keys de S3 largas
        allowNull: false,
      },
      publicUrl: {
        type: dataTypes.STRING(1024),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      type: {
        type: dataTypes.ENUM('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', '3D_MODEL', 'ARCHIVE', 'UNKNOWN'),
        defaultValue: 'UNKNOWN',
        allowNull: false,
      },
      bucket: {
        type: dataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'default',
        comment: 'Bucket de almacenamiento (ej. S3, Local, MinIO)',
      },
      metadata: {
        type: dataTypes.JSONB,
        allowNull: true,
        defaultValue: {},
        comment: 'Metadatos técnicos: width, height, duration, encoding, etc.',
      },
      hash: {
        type: dataTypes.STRING(64),
        allowNull: true,
        comment: 'Hash SHA-256 para validación de integridad',
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
      tableName: 'artifacts',
      modelName: 'Artifact',
      timestamps: true,
      paranoid: true, // Soft Deletes
      indexes: [
        {
          fields: ['type'], // Búsqueda rápida por tipo de archivo
        },
        {
          fields: ['bucket', 'path'], // Búsqueda única de ubicación
          unique: true,
        },
        {
          fields: ['hash'], // Detección de duplicados
        },
      ],
    }
  );

  return Artifact;
}
