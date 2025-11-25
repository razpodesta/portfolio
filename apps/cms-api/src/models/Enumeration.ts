// RUTA: apps/cms-api/src/models/Enumeration.ts
// VERSIÓN: 2.0 - Type Safe & Semantic Fix
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Se elimina 'any' usando el tipo 'Sequelize'.
//              SE CORRIGE EL TIPO DE RETORNO: Se usa 'iEnumeration' en lugar de 'iModel'
//              para mantener la coherencia semántica del dominio.

import { Sequelize } from 'sequelize';
import { iEnumeration, iDataTypes } from '../interfaces';

export default (sequelize: Sequelize, DataTypes: iDataTypes): iEnumeration => {
  const Enumeration = sequelize.define('Enumeration', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    enumerationName: {
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
    },
    values: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  // Casting seguro a la interfaz correcta del modelo
  return Enumeration as unknown as iEnumeration;
};
