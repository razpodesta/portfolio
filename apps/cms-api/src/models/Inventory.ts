/**
 * @file apps/cms-api/src/models/Inventory.ts
 * @description Modelo de Inventario de Élite.
 * Gestiona assets, productos o recursos del ecosistema con validación estricta y optimización para PostgreSQL.
 * @standard ELITE - SEQUELIZE TYPESCRIPT
 * @compliance NO-ANY, STRICT-TYPING, NO-EMPTY-INTERFACES
 */

import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { IBaseEntity, JsonValue } from '../interfaces';

// ---------------------------------------------------------------------------
// 1. Definición de Atributos (Contrato de Datos)
// ---------------------------------------------------------------------------

/**
 * Representación completa de la fila en base de datos.
 * Extiende IBaseEntity para garantizar ID, createdAt, updatedAt, deletedAt.
 */
export interface InventoryAttributes extends IBaseEntity {
  name: string;
  slug: string; // Identificador único amigable para URL
  sku: string;  // Stock Keeping Unit (Código de referencia único)
  type: 'DIGITAL' | 'PHYSICAL' | 'SERVICE';
  stock: number;
  price: number;
  isActive: boolean;
  metadata?: JsonValue; // Estructura flexible pero tipada (sin any)
  tags?: string[];
}

// ---------------------------------------------------------------------------
// 2. Definición de Atributos de Creación (DTO)
// ---------------------------------------------------------------------------

/**
 * Atributos requeridos para crear una instancia.
 * Usamos 'type' en lugar de 'interface' para evitar la regla @typescript-eslint/no-empty-object-type.
 * Los campos de sistema (id, fechas) y opcionales se marcan aquí.
 */
export type InventoryCreationAttributes = Optional<
  InventoryAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'metadata' | 'tags'
>;

// ---------------------------------------------------------------------------
// 3. Clase del Modelo (Lógica de Negocio)
// ---------------------------------------------------------------------------

export class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes>
  implements InventoryAttributes {

  public id!: string;
  public name!: string;
  public slug!: string;
  public sku!: string;
  public type!: 'DIGITAL' | 'PHYSICAL' | 'SERVICE';
  public stock!: number;
  public price!: number;
  public isActive!: boolean;
  public metadata!: JsonValue;
  public tags!: string[];

  // Propiedades de timestamp gestionadas automáticamente por Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  /**
   * Verifica si hay stock disponible.
   * Lógica de negocio encapsulada en el modelo.
   */
  public isInStock(): boolean {
    return this.stock > 0;
  }

  /**
   * Calcula el precio final (placeholder para lógica futura de impuestos/descuentos).
   */
  public getFinalPrice(): number {
    return this.price;
  }
}

// ---------------------------------------------------------------------------
// 4. Factory Function (Inyección en el Contexto de Sequelize)
// ---------------------------------------------------------------------------

/**
 * Inicializa el modelo Inventory en la instancia de Sequelize.
 * Define validaciones a nivel de base de datos y aplicación.
 *
 * @param sequelize Instancia activa de conexión a BD
 * @param dataTypes Librería de tipos de Sequelize
 * @returns Clase Inventory configurada
 */
export default function (sequelize: Sequelize, dataTypes: typeof DataTypes): typeof Inventory {
  Inventory.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
        comment: 'Identificador único universal (UUID v4)',
      },
      name: {
        type: dataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'El nombre es obligatorio' },
          len: [3, 255],
        },
      },
      slug: {
        type: dataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          is: /^[a-z0-9-]+$/i, // Solo caracteres URL-safe
        },
        comment: 'URL-friendly ID para SEO',
      },
      sku: {
        type: dataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: 'Código único de referencia del producto',
      },
      type: {
        type: dataTypes.ENUM('DIGITAL', 'PHYSICAL', 'SERVICE'),
        defaultValue: 'DIGITAL',
        allowNull: false,
      },
      stock: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: 'El stock no puede ser negativo' },
          isInt: true,
        },
      },
      price: {
        type: dataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        validate: {
          min: 0,
        },
      },
      isActive: {
        type: dataTypes.BOOLEAN,
        defaultValue: true,
      },
      metadata: {
        type: dataTypes.JSONB, // Optimización: JSONB permite indexación en PostgreSQL
        allowNull: true,
        defaultValue: {},
      },
      tags: {
        type: dataTypes.ARRAY(dataTypes.STRING),
        defaultValue: [],
        allowNull: true,
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
      tableName: 'inventories',
      modelName: 'Inventory',
      timestamps: true, // Gestiona createdAt y updatedAt
      paranoid: true,   // Habilita Soft Deletes (no borra filas, llena deletedAt)
      indexes: [
        {
          unique: true,
          fields: ['slug'],
        },
        {
          unique: true,
          fields: ['sku'],
        },
        {
          fields: ['type', 'isActive'], // Índice compuesto para búsquedas frecuentes
        },
        {
          fields: ['price'], // Índice para ordenamiento/filtrado por precio
        },
      ],
    }
  );

  return Inventory;
}
