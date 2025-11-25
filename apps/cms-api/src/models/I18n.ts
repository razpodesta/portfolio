// RUTA: apps/cms-api/src/models/I18n.ts
// VERSIÓN: 2.0 - Type Safe Refactor
// AUTOR: Raz Podestá - MetaShark Tech
// DESCRIPCIÓN: Modelo I18n refactorizado. Se elimina el tipo 'any' en la inyección
//              de dependencias y se asegura la compatibilidad con la interfaz iI18n.

import { Sequelize } from 'sequelize';
import { iI18n, iDataTypes } from '../interfaces';

/**
 * Definición del Modelo I18n (Internacionalización).
 * Almacena pares clave-valor de traducciones para el sistema CMS.
 *
 * @param sequelize Instancia de conexión a la base de datos.
 * @param DataTypes Tipos de datos de Sequelize.
 * @returns El modelo I18n configurado.
 */
export default (sequelize: Sequelize, DataTypes: iDataTypes): iI18n => {
  const I18n = sequelize.define('I18n', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Casting seguro: Convertimos la definición de Sequelize a nuestra interfaz de dominio iI18n.
  // Esto permite que el resto de la aplicación consuma este modelo con tipos predecibles.
  return I18n as unknown as iI18n;
};
