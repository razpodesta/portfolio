/**
 * @file apps/cms-api/src/data/index.ts
 * @description Seeder de Datos Iniciales.
 * @standard ELITE - STRICT TYPING & ERROR HANDLING
 */

import db from '../models/index.js';
import type { iDataTypes } from '../interfaces/types.js'; // Solo importamos tipos

// Importación de JSONs (Requiere resolveJsonModule: true en tsconfig)
import ar from './i18n/ar.json';
import deDE from './i18n/de-DE.json';
import esMX from './i18n/es-MX.json';
import itIT from './i18n/it-IT.json';
import jaJP from './i18n/ja-JP.json';
import ptBR from './i18n/pt-BR.json';
import frFR from './i18n/fr-FR.json';
import ruRU from './i18n/ru-RU.json';

type TranslationMap = Record<string, string>;
const translations: Record<string, TranslationMap> = {
  ar: ar as TranslationMap,
  'de-DE': deDE as TranslationMap,
  'es-MX': esMX as TranslationMap,
  'it-IT': itIT as TranslationMap,
  'ja-JP': jaJP as TranslationMap,
  'pt-BR': ptBR as TranslationMap,
  'fr-FR': frFR as TranslationMap,
  'ru-RU': ruRU as TranslationMap,
};

const createInitialContent = async (): Promise<void> => {
  try {
    // TS2339 SOLUCIONADO: db.I18n ahora es ModelStatic, por lo tanto tiene .count()
    const count = await db.I18n.count();

    if (count === 0) {
      console.log('[SEED] I18n table empty. Seeding translations...');

      const content = Object.entries(translations).flatMap(([language, keys]) =>
        Object.entries(keys).map(([key, value]) => ({
          key,
          value,
          language
        }))
      );

      // TS2339 SOLUCIONADO: .bulkCreate() existe en ModelStatic
      await db.I18n.bulkCreate(content);
      console.log(`[SEED] ✅ Inserted ${content.length} translations.`);
    }
  } catch (error) {
    console.error('[SEED] ❌ Error seeding I18n:', error);
  }
};

const createFirstUser = async (): Promise<void> => {
  try {
    // db.User es ModelStatic<UserInstance>
    const count = await db.User.count();

    if (count === 0) {
      console.log('[SEED] No users found. Creating admin...');

      // La contraseña será hasheada por el hook beforeCreate del modelo
      await db.User.create({
        username: 'admin',
        password: '12345678',
        email: 'carlos.santana@dev.education',
        privilege: 'god',
        active: true,
        role: 'ADMIN', // Añadido para cumplir interfaz estricta
        firstName: 'System',
        lastName: 'Admin',
        salt: 'temp', // El hook lo regenerará
        passwordHash: 'temp' // El hook lo regenerará
      });

      console.log('[SEED] ✅ Admin user created.');
    }
  } catch (error) {
    console.error('[SEED] ❌ Error creating admin:', error);
  }
};

const createDeclarations = async (): Promise<void> => {
  try {
    const count = await db.Declaration.count();

    if (count === 0) {
      const declarations = [
        { declaration: 'String', icon: 'fas fa-font', description: 'String', color: '#1bb935' },
        { declaration: 'Text', icon: 'fas fa-quote-right', description: 'Text', color: '#ff0098' },
        { declaration: 'Dropdown', icon: 'fas fa-caret-square-down', description: 'Dropdown', color: '#00b1ff' },
        { declaration: 'Integer', icon: 'fas fa-dice-five', description: 'Integer', color: '#3b4058' },
        { declaration: 'Float', icon: 'fas fa-dice-one', description: 'Float', color: '#e9aa28' },
        { declaration: 'Boolean', icon: 'fas fa-toggle-on', description: 'Boolean', color: '#000' },
        { declaration: 'Reference', icon: 'fas fa-link', description: 'Reference', color: '#760aff' },
      ];

      await db.Declaration.bulkCreate(declarations);
      console.log('[SEED] ✅ Declarations created.');
    }
  } catch (error) {
    console.error('[SEED] ❌ Error creating declarations:', error);
  }
};

export const setInitialData = async (): Promise<void> => {
  await createFirstUser();
  await createDeclarations();
  await createInitialContent();
};
