// RUTA: apps/portfolio-web/src/lib/schemas/cocreation_page.schema.ts
// VERSIÓN: 1.0 - Contrato para la Página de Co-creación.
// DESCRIPCIÓN: Define la estructura del contenido i18n para la futura página de co-creación.

import { z } from 'zod';

export const cocreationPageSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  title: z.string(),
  subtitle: z.string(),
  construction_notice: z.string(),
});
