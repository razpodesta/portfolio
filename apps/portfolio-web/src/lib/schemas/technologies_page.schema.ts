// RUTA: apps/portfolio-web/src/lib/schemas/technologies_page.schema.ts
// VERSIÓN: 3.0 - Sincronización Total
import { z } from 'zod';

export const technologiesPageSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  title: z.string(),
  subtitle: z.string(),
  search_placeholder: z.string(),

  // --- INICIO DE LA UNIFICACIÓN SEMÁNTICA FINAL ---
  load_more_button: z.string(),
  showing_results: z.string(),
  visit_official: z.string(),
  // --- FIN DE LA UNIFICACIÓN SEMÁNTICA FINAL ---

  category_all: z.string(),
  category_frontend: z.string(),
  category_backend: z.string(),
  category_devops: z.string(),
  category_ai: z.string(),
  category_design: z.string(),
  category_other: z.string(),
  library_help_btn: z.string(),
  library_help_title: z.string(),
  library_help_desc: z.string(),
  btn_docs: z.string(),
  btn_repo: z.string(),
  modal_install_title: z.string(),
  modal_usage_title: z.string(),
  modal_close: z.string(),
  scroll_top: z.string(),
  scroll_bottom: z.string(),
  view_details: z.string(),
});
