// RUTA: apps/cms-api/src/models/Reference.ts
// VERSIÓN: 2.0 - Type Safe Refactor
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Refactorización para seguridad de tipos. Se reemplaza 'any' por 'Sequelize'
//              y se asegura que el retorno cumpla con la interfaz 'iValue'.

import { Sequelize } from 'sequelize';
import { iValue, iDataTypes } from '../interfaces';

export default (sequelize: Sequelize, DataTypes: iDataTypes): iValue => {
  const Reference = sequelize.define('Reference', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    parentModel: {
      type: DataTypes.UUID,
      allowNull: false
    },
    targetModel: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });

  // Casting seguro: Convertimos el modelo de Sequelize a la interfaz de dominio iValue
  // para mantener la consistencia con el resto de la aplicación legado.
  return Reference as unknown as iValue;
};
