// RUTA: oh-hoteis/src/dictionaries/get-dictionary.ts
// VERSIÓN: Corregida con importaciones relativas para cumplir con las reglas de Nx.

import 'server-only';
// --- INICIO DE LA CORRECCIÓN DE ESLINT ---
// Se utilizan rutas relativas porque los archivos están dentro del mismo proyecto ('oh-hoteis').
import type { Locale } from '../config/i18n.config';
import { dictionarySchema, type Dictionary } from '../lib/schemas/dictionary.schema';
// --- FIN DE LA CORRECCIÓN DE ESLINT ---

const dictionaries = {
  'en-US': () => import('./en-US.json').then((module) => module.default),
  'es-ES': () => import('./es-ES.json').then((module) => module.default),
  'pt-BR': () => import('./pt-BR.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale] || dictionaries['en-US'];
  const dictionaryModule = await loader();

  const validatedDictionary = dictionarySchema.parse(dictionaryModule);

  return validatedDictionary;
};
