// RUTA: apps/cms-api/src/models/Value.ts
// VERSIÓN: 2.0 - Type Safe Refactor
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Refactorización para seguridad de tipos. Se reemplaza 'any' por 'Sequelize'
//              en la inyección de dependencias y se asegura el retorno compatible con 'iValue'.

import { Sequelize } from 'sequelize';
import { iValue, iDataTypes } from '../interfaces';

export default (sequelize: Sequelize, DataTypes: iDataTypes): iValue => {
  const Value = sequelize.define('Value', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    entry: {
      type: DataTypes.UUID,
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fieldIdentifier: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Casting seguro: Convertimos el modelo de Sequelize a la interfaz de dominio iValue
  // para que sea consumible por el resto de la lógica de negocio del CMS.
  return Value as unknown as iValue;
};
