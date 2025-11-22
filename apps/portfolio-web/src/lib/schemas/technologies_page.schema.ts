// RUTA: apps/portfolio-web/src/lib/schemas/technologies_page.schema.ts
import { z } from 'zod';

export const technologiesPageSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  title: z.string(),
  subtitle: z.string(),
  search_placeholder: z.string(),
  category_all: z.string(),
  category_frontend: z.string(),
  category_backend: z.string(),
  category_devops: z.string(),
  category_ai: z.string(),
  category_design: z.string(),
  category_other: z.string(),
  showing_results: z.string(),
  load_more_button: z.string(),
  view_official_site: z.string(),
});
