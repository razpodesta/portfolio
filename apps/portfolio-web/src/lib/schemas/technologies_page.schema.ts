// RUTA: apps/portfolio-web/src/lib/schemas/technologies_page.schema.ts
// VERSIÓN: 2.0 - Sincronizado con Componente Compartido
import { z } from 'zod';

export const technologiesPageSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  title: z.string(), // Mantenemos 'title' y 'subtitle' para el encabezado de la página
  subtitle: z.string(),
  search_placeholder: z.string(),
  load_more_button: z.string(), // Renombrado desde load_more para consistencia
  showing_results: z.string(), // Renombrado desde showing_count
  view_official_site: z.string(),
  category_all: z.string(),
  category_frontend: z.string(),
  category_backend: z.string(),
  category_devops: z.string(),
  category_ai: z.string(),
  category_design: z.string(),
  category_other: z.string(),

  // --- INICIO DE LA SINCRONIZACIÓN ARQUITECTÓNICA ---
  // Se añaden las claves requeridas por el modal de ayuda en IconLibraryExplorer
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
  // --- FIN DE LA SINCRONIZACIÓN ARQUITECTÓNICA ---
});
