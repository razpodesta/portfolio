import 'server-only';
import type { Dictionary } from './schemas/dictionary.schema';
import config from '@config';

type Locale = (typeof config.languages.list)[number];

// --- INICIO DE LA CORRECCIÓN ARQUITECTÓNICA ---
// Se utilizan rutas relativas al 'baseUrl' ("src") definido en tsconfig.json.
// Esto elimina la fragilidad de las rutas relativas ('../').
const dictionaryLoaders: Record<string, () => Promise<Dictionary>> = {
  'en-US': () => import('dictionaries/en-US.json').then((module) => module.default as unknown as Dictionary),
  'es-ES': () => import('dictionaries/es-ES.json').then((module) => module.default as unknown as Dictionary),
  'pt-BR': () => import('dictionaries/pt-BR.json').then((module) => module.default as unknown as Dictionary),
  'ar': () => import('dictionaries/en-US.json').then((module) => module.default as unknown as Dictionary), // Fallback a inglés
  'ja-JP': () => import('dictionaries/en-US.json').then((module) => module.default as unknown as Dictionary),
  'fr-FR': () => import('dictionaries/en-US.json').then((module) => module.default as unknown as Dictionary),
  'ru-RU': () => import('dictionaries/en-US.json').then((module) => module.default as unknown as Dictionary),
  'it-IT': () => import('dictionaries/en-US.json').then((module) => module.default as unknown as Dictionary),
  'de-DE': () => import('dictionaries/en-US.json').then((module) => module.default as unknown as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const load = dictionaryLoaders[locale] ?? dictionaryLoaders[config.languages.default as Locale];
  return load();
};
// --- FIN DE LA CORRECCIÓN ARQUITECTÓNICA ---
