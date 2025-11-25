// RUTA: apps/cms-api/src/models/Declaration.ts
// VERSIÓN: 2.0 - Type Safe Refactor
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Eliminación de 'any' en la definición del modelo Declaration.
//              Se utiliza el tipo 'Sequelize' explícito para el conector de base de datos.

import { Sequelize } from 'sequelize';
import { iDeclaration, iDataTypes } from '../interfaces';

export default (sequelize: Sequelize, DataTypes: iDataTypes): iDeclaration => {
  const Declaration = sequelize.define('Declaration', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    declaration: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  // Realizamos un casting seguro para cumplir con la firma de retorno iDeclaration
  // ya que Sequelize retorna un ModelCtor<Model> que difiere ligeramente de la interfaz.
  return Declaration as unknown as iDeclaration;
};
