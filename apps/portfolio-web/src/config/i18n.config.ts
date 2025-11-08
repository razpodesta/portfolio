// RUTA: oh-hoteis/src/config/i18n.config.ts
// VERSIÓN: Corregida y definitiva

export const i18n = {
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en-US', 'es-ES'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
