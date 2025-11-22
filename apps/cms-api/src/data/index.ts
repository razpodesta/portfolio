// RUTA: apps/cms-api/src/data/index.ts
// VERSIÓN: 2.1 - "Arquitectónicamente Conforme"
// DESCRIPCIÓN: Se refactoriza la importación de modelos para usar la ruta relativa '../models'.
//              Esto satisface la regla de ESLint '@nx/enforce-module-boundaries' que exige
//              importaciones relativas para archivos dentro del mismo proyecto, resolviendo
//              el error de build y manteniendo la pureza arquitectónica.

import { forEach } from '@contentpi/utils';

// Data de Internacionalización (i18n)
import ar from './i18n/ar.json';
import deDE from './i18n/de-DE.json';
import esMX from './i18n/es-MX.json';
import itIT from './i18n/it-IT.json';
import jaJP from './i18n/ja-JP.json';
import ptBR from './i18n/pt-BR.json';
import frFR from './i18n/fr-FR.json';
import ruRU from './i18n/ru-RU.json';

// --- INICIO DE LA CORRECCIÓN ARQUITECTÓNICA ---
import models from '../models';
// --- FIN DE LA CORRECCIÓN ARQUITECTÓNICA ---

const translations: Record<string, Record<string, string>> = {
  ar,
  'de-DE': deDE,
  'es-MX': esMX,
  'it-IT': itIT,
  'ja-JP': jaJP,
  'pt-BR': ptBR,
  'fr-FR': frFR,
  'ru-RU': ruRU,
};

async function createInitialContent(): Promise<void> {
  const count = await models.I18n.count();
  if (count === 0) {
    console.log(`[DATA] No hay traducciones en la DB. Creando sets de idiomas...`);
    const content: { key: string; value: string; language: string }[] = [];
    forEach(translations, (language: string) => {
      forEach(translations[language], (key: string) => {
        content.push({ key, value: translations[language][key], language });
      });
    });
    await models.I18n.bulkCreate(content);
  }
}

async function createFirstUser(): Promise<void> {
  const count = await models.User.count();
  if (count === 0) {
    console.log(`[DATA] No hay usuarios en la DB. Creando usuario 'admin'...`);
    await models.User.create({
      username: 'admin',
      password: '12345678',
      email: 'carlos.santana@dev.education',
      privilege: 'god',
      active: true,
    });
  }
}

async function createDeclarations(): Promise<void> {
  const count = await models.Declaration.count();
  if (count === 0) {
    console.log(`[DATA] No hay declaraciones de tipos de campo. Creándolas...`);
    const declarations = [
      { declaration: 'String', icon: 'fas fa-font', description: 'String', color: '#1bb935' },
      { declaration: 'Text', icon: 'fas fa-quote-right', description: 'Text', color: '#ff0098' },
      { declaration: 'Dropdown', icon: 'fas fa-caret-square-down', description: 'Dropdown', color: '#00b1ff' },
      { declaration: 'Integer', icon: 'fas fa-dice-five', description: 'Integer', color: '#3b4058' },
      { declaration: 'Float', icon: 'fas fa-dice-one', description: 'Float', color: '#e9aa28' },
      { declaration: 'Boolean', icon: 'fas fa-toggle-on', description: 'Boolean', color: '#000' },
      { declaration: 'Reference', icon: 'fas fa-link', description: 'Reference', color: '#760aff' },
    ];
    await models.Declaration.bulkCreate(declarations);
  }
}

export async function setInitialData(): Promise<void> {
  await createFirstUser();
  await createDeclarations();
  await createInitialContent();
}
