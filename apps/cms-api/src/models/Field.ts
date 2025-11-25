// RUTA: apps/cms-api/src/models/Field.ts
// VERSIÓN: 2.1 - Boolean DataType Fix
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Se corrige el error de tipado en las definiciones de columnas booleanas.
//              La interfaz 'iDataTypes' devuelve un primitivo boolean que es incompatible
//              con la definición de modelos de Sequelize. Se aplica casting a 'DataType'.

import { Sequelize, Model, ModelStatic, DataType } from 'sequelize';
import { iField, iModels, iDataTypes } from '../interfaces';

// Definimos el tipo para la "Clase Estática" del modelo Field
type FieldModelDefinition = ModelStatic<Model> & {
  associate: (models: iModels) => void;
};

export default (sequelize: Sequelize, DataTypes: iDataTypes): iField => {
  const Field = sequelize.define('Field', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fieldName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultValue: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    isMedia: {
      // CORRECCIÓN: Casting explícito para corregir la inferencia de 'boolean' a 'DataType'
      type: DataTypes.BOOLEAN as unknown as DataType,
      allowNull: false,
      defaultValue: false
    },
    isRequired: {
      type: DataTypes.BOOLEAN as unknown as DataType,
      allowNull: false,
      defaultValue: false
    },
    isUnique: {
      type: DataTypes.BOOLEAN as unknown as DataType,
      allowNull: false,
      defaultValue: false
    },
    isHide: {
      type: DataTypes.BOOLEAN as unknown as DataType,
      allowNull: false,
      defaultValue: false
    },
    isSystem: {
      type: DataTypes.BOOLEAN as unknown as DataType,
      allowNull: false,
      defaultValue: false
    },
    isPrimaryKey: {
      type: DataTypes.BOOLEAN as unknown as DataType,
      allowNull: false,
      defaultValue: false
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }) as unknown as FieldModelDefinition;

  Field.associate = (models: iModels): void => {
    Field.hasMany(models.Value as unknown as ModelStatic<Model>, {
      foreignKey: {
        name: 'fieldId',
        field: 'field_id'
      },
      as: 'values',
      onDelete: 'CASCADE'
    });
  };

  return Field as unknown as iField;
};
