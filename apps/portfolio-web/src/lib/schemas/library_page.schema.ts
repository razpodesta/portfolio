// RUTA: apps/portfolio-web/src/lib/schemas/library_page.schema.ts
import { z } from 'zod';

export const libraryPageSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  header_title: z.string(),
  header_subtitle: z.string(),
  search_placeholder: z.string(),
  load_more: z.string(),
  showing_count: z.string(),
  visit_official: z.string(),
  copy_import: z.string(),
  view_details: z.string(),
  modal_install_title: z.string(),
  modal_usage_title: z.string(),
  modal_close: z.string(),
  scroll_top: z.string(),
  scroll_bottom: z.string(),
  // --- NUEVOS CAMPOS ---
  library_help_btn: z.string(),
  library_help_title: z.string(),
  library_help_desc: z.string(),
  btn_docs: z.string(),
  btn_repo: z.string(),
  // ---------------------
  categories: z.object({
    all: z.string(),
  }).passthrough(),
});
