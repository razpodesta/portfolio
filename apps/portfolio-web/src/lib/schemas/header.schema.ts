// RUTA: apps/portfolio-web/src/lib/schemas/header.schema.ts
// VERSIÓN: 2.0 - Simplificado y Alineado con nav-links.
// DESCRIPCIÓN: Se eliminan las claves de navegación redundantes ('about', 'contact').
//              Toda la lógica de texto de navegación ahora reside en nav-links.schema.ts.

import { z } from 'zod';

export const headerSchema = z.object({
  talk: z.string(),
  tagline: z.string(),
  personal_portfolio: z.string(),
  job_title: z.string(),
});
