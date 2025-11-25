// RUTA: apps/cms-api/src/models/Model.ts
// VERSIÓN: 2.0 - Static Model Type Fix
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Se elimina 'any'. Se implementa 'ModelDefinition' para tipar
//              correctamente los métodos estáticos 'associate' y 'hasMany', alineándose
//              con la arquitectura híbrida del backend.

import { Sequelize, Model, ModelStatic } from 'sequelize';
import { iModel, iModels, iDataTypes } from '../interfaces';

// Definimos el tipo para la "Clase Estática" del modelo Model
// Esto permite acceder a .associate y .hasMany sin errores de TS
type ModelDefinition = ModelStatic<Model> & {
  associate: (models: iModels) => void;
};

export default (sequelize: Sequelize, DataTypes: iDataTypes): iModel => {
  const ModelDefined = sequelize.define('Model', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }) as unknown as ModelDefinition; // Casting al tipo intermedio estático

  ModelDefined.associate = (models: iModels): void => {
    // Casting seguro de 'models.Field' para satisfacer la firma de 'hasMany'
    // ya que iModels define los modelos como 'any' o interfaces de instancia en algunos contextos
    ModelDefined.hasMany(models.Field as unknown as ModelStatic<Model>, {
      foreignKey: {
        name: 'modelId',
        field: 'model_id'
      },
      as: 'fields',
      onDelete: 'CASCADE'
    });
  };

  // Casting final a la interfaz de instancia para cumplir el contrato de exportación
  return ModelDefined as unknown as iModel;
};
