// RUTA: apps/cms-api/src/models/App.ts
// VERSIÓN: 3.0 - Static Model Type Fix
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Soluciona los errores TS2339 distinguiendo entre la definición estática del modelo
//              (que tiene métodos como 'hasMany' y 'associate') y la interfaz de instancia de retorno.

import { Sequelize, Model, ModelStatic } from 'sequelize';
import { iApp, iModels, iDataTypes } from '../interfaces';

// Definimos un tipo local que representa la "Clase Estática" del Modelo.
// Esto le dice a TS: "Este objeto tiene todos los métodos de un Modelo Sequelize Y un método associate".
type AppModelDefinition = ModelStatic<Model> & {
  associate: (models: iModels) => void;
};

export default (sequelize: Sequelize, DataTypes: iDataTypes): iApp => {
  // 1. Definición: Usamos el tipo intermedio para poder trabajar con métodos estáticos.
  const App = sequelize.define('App', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    appName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }) as unknown as AppModelDefinition;

  // 2. Asociación: Ahora TS reconoce 'associate' y 'hasMany' gracias a AppModelDefinition.
  App.associate = (models: iModels): void => {
    App.hasMany(models.Model as unknown as ModelStatic<Model>, {
      foreignKey: {
        name: 'appId',
        field: 'app_id'
      },
      as: 'models',
      onDelete: 'CASCADE'
    });

    App.hasMany(models.Enumeration as unknown as ModelStatic<Model>, {
      foreignKey: {
        name: 'appId',
        field: 'app_id'
      },
      as: 'enumerations',
      onDelete: 'CASCADE'
    });
  };

  // 3. Retorno: Hacemos el casting final a iApp para cumplir el contrato de la función exportada.
  return App as unknown as iApp;
};
