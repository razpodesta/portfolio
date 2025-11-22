// RUTA: apps/portfolio-web/src/config/i18n.config.ts
// VERSIÓN: 5.0 - Producción Estricta
export const i18n = {
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en-US', 'es-ES'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
