// RUTA: apps/portfolio-web/src/lib/schemas/dictionary.schema.ts
// VERSIÓN: 11.0 - Sincronizado con la Navegabilidad Completa.
// DESCRIPCIÓN: Se importan y se integran los nuevos esquemas para las páginas
//              de contacto, sistema de diseño, co-creación y legales, completando
//              el contrato maestro de datos para todas las rutas del sitio.

import { z } from 'zod';

// Importaciones existentes...
import { headerSchema } from './header.schema';
import { navLinksSchema } from './nav-links.schema';
import { footerSchema } from './footer.schema';
import { languageSwitcherSchema } from './language_switcher.schema';
import { notFoundSchema } from './not_found.schema';
import { missionVisionSchema } from './mission_vision.schema';
import { quienSoySchema } from './quien_soy.schema';
import { blogPageSchema } from './blog.schema';
import { heroSchema } from './hero.schema';
import { aboutSectionSchema } from './about_section.schema';
import { valuePropositionSectionSchema } from './value_proposition.schema';
import { contactMessagesSchema } from './contact.schema';
import { historySectionSchema } from './history_section.schema';

// --- NUEVAS IMPORTACIONES ---
import { contactPageSchema } from './contact_page.schema';
import { designSystemPageSchema } from './design_system_page.schema';
import { cocreationPageSchema } from './cocreation_page.schema';
import { legalPageSchema } from './legal_page.schema';

// Homepage Schema (sin cambios)
export const homepageSchema = z.object({
  hero: heroSchema,
  about_section: aboutSectionSchema,
  value_proposition_section: valuePropositionSectionSchema,
  contact: contactMessagesSchema,
  history_section: historySectionSchema,
});

// Contrato para las páginas legales
const legalContentSchema = z.object({
  privacy_policy: legalPageSchema,
  terms_of_service: legalPageSchema,
});

// Contrato final y maestro del diccionario
export const dictionarySchema = z.object({
  header: headerSchema.merge(navLinksSchema),
  homepage: homepageSchema,
  footer: footerSchema,
  language_switcher: languageSwitcherSchema,
  not_found: notFoundSchema,
  mission_vision: missionVisionSchema,
  quien_soy: quienSoySchema,
  blog_page: blogPageSchema,
  // --- NUEVOS OBJETOS DE PÁGINA ---
  contact_page: contactPageSchema,
  design_system_page: designSystemPageSchema,
  cocreation_page: cocreationPageSchema,
  legal: legalContentSchema,
});

export type Dictionary = z.infer<typeof dictionarySchema>;
