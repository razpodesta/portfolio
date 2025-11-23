// RUTA: apps/portfolio-web/src/lib/schemas/dictionary.schema.ts
// VERSIÓN: 20.0 - Inclusión de Visitor HUD
// DESCRIPCIÓN: Se añade el sub-esquema 'visitor_hud' para garantizar la
//              cobertura de i18n en el widget flotante.

import { z } from 'zod';

// ... (Importaciones anteriores se mantienen igual) ...
import { headerSchema } from './header.schema';
import { navLinksSchema } from './nav-links.schema';
import { footerSchema } from './footer.schema';
import { languageSwitcherSchema } from './language_switcher.schema';
import { notFoundSchema, serverErrorSchema, maintenanceSchema } from './not_found.schema';
import { missionVisionSchema } from './mission_vision.schema';
import { quienSoySchema } from './quien_soy.schema';
import { blogPageSchema } from './blog.schema';
import { homepageSchema } from './homepage.schema';
import { contactPageSchema } from './contact_page.schema';
import { designSystemPageSchema } from './design_system_page.schema';
import { cocreationPageSchema } from './cocreation_page.schema';
import { legalPageSchema } from './legal_page.schema';
import { curriculumSchema } from './curriculum.schema';
import { technologiesPageSchema } from './technologies_page.schema';
import { libraryPageSchema } from './library_page.schema';

// --- NUEVO ESQUEMA GRANULAR ---
const visitorHudSchema = z.object({
  label_visitor_info: z.string(), // Reemplaza a label_system
  label_ip_visitor: z.string(),   // Nueva etiqueta específica
  footer_credits: z.string(),     // Nuevo footer
  status_calibrating: z.string(),
  status_error: z.string(),
  label_location: z.string(),
  label_weather: z.string(),
  weather_sunny: z.string(),      // Estado Clima
  weather_rainy: z.string(),      // Estado Clima
  weather_cloudy: z.string(),     // Estado Clima
  label_time: z.string(),
  coords_format: z.string(),
});

const legalContentSchema = z.object({
  privacy_policy: legalPageSchema,
  terms_of_service: legalPageSchema,
});

export const dictionarySchema = z.object({
  header: headerSchema,
  'nav-links': navLinksSchema,
  footer: footerSchema,
  language_switcher: languageSwitcherSchema,

  // --- NUEVA PROPIEDAD ---
  visitor_hud: visitorHudSchema,

  homepage: homepageSchema,
  mission_vision: missionVisionSchema,
  quien_soy: quienSoySchema,
  curriculum: curriculumSchema,
  blog_page: blogPageSchema,
  contact_page: contactPageSchema,
  design_system_page: designSystemPageSchema,
  cocreation_page: cocreationPageSchema,
  legal: legalContentSchema,
  technologies_page: technologiesPageSchema,
  lucide_page: libraryPageSchema,
  not_found: notFoundSchema,
  server_error: serverErrorSchema,
  maintenance: maintenanceSchema,
});

export type Dictionary = z.infer<typeof dictionarySchema>;
