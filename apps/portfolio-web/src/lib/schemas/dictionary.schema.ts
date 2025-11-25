// RUTA: apps/portfolio-web/src/lib/schemas/dictionary.schema.ts
// VERSIÓN: 22.0 - Integración de Detalles de Proyecto
// DESCRIPCIÓN: Registro oficial del esquema 'project_details' en el contrato global.

import { z } from 'zod';

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
import { profilePageSchema } from './profile_page.schema';

// --- IMPORTACIÓN NUEVA ---
import { projectDetailsDictionarySchema } from './project_details.schema';

const visitorHudSchema = z.object({
  label_visitor_info: z.string(),
  label_ip_visitor: z.string(),
  footer_credits: z.string(),
  status_calibrating: z.string(),
  status_error: z.string(),
  label_location: z.string(),
  label_weather: z.string(),
  weather_sunny: z.string(),
  weather_rainy: z.string(),
  weather_cloudy: z.string(),
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
  profile_page: profilePageSchema,

  // --- REGISTRO SOBERANO DE LA NUEVA SECCIÓN ---
  project_details: projectDetailsDictionarySchema,

  not_found: notFoundSchema,
  server_error: serverErrorSchema,
  maintenance: maintenanceSchema,
});

export type Dictionary = z.infer<typeof dictionarySchema>;
