// RUTA: apps/portfolio-web/src/lib/schemas/design_system_page.schema.ts
// VERSIÓN: 1.0 - Contrato para la Página del Sistema de Diseño.
// DESCRIPCIÓN: Define la estructura del contenido i18n para la futura página del sistema de diseño.

import { z } from 'zod';

export const designSystemPageSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  title: z.string(),
  subtitle: z.string(),
  construction_notice: z.string(),
});
