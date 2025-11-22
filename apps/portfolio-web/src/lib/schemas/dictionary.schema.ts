// RUTA: apps/portfolio-web/src/lib/schemas/dictionary.schema.ts
// VERSIÓN: 16.0 - Maestro Completo
// DESCRIPCIÓN: Contrato de datos global. No contiene abreviaciones.

import { z } from 'zod';

// Importaciones de esquemas granulares
import { headerSchema } from './header.schema';
import { navLinksSchema } from './nav-links.schema';
import { footerSchema } from './footer.schema';
import { languageSwitcherSchema } from './language_switcher.schema';
import { notFoundSchema } from './not_found.schema';
import { missionVisionSchema } from './mission_vision.schema';
import { quienSoySchema } from './quien_soy.schema';
import { blogPageSchema } from './blog.schema';
import { homepageSchema } from './homepage.schema'; // <-- Contiene la corrección de AI Gallery
import { contactPageSchema } from './contact_page.schema';
import { designSystemPageSchema } from './design_system_page.schema';
import { cocreationPageSchema } from './cocreation_page.schema';
import { legalPageSchema } from './legal_page.schema';
import { curriculumSchema } from './curriculum.schema';
import { libraryPageSchema } from './library_page.schema';

// Sub-esquema para agrupación legal
const legalContentSchema = z.object({
  privacy_policy: legalPageSchema,
  terms_of_service: legalPageSchema,
});

// Esquema Maestro
export const dictionarySchema = z.object({
  // Componentes Globales
  header: headerSchema.merge(navLinksSchema),
  footer: footerSchema,
  language_switcher: languageSwitcherSchema,
  not_found: notFoundSchema,

  // Páginas Principales
  homepage: homepageSchema,
  mission_vision: missionVisionSchema,
  quien_soy: quienSoySchema,
  curriculum: curriculumSchema,

  // Páginas de Servicios y Contenido
  blog_page: blogPageSchema,
  contact_page: contactPageSchema,
  design_system_page: designSystemPageSchema,
  cocreation_page: cocreationPageSchema,
  legal: legalContentSchema,

  // Páginas de Recursos (Librerías)
  lucide_page: libraryPageSchema,
  technologies_page: libraryPageSchema,
});

// Inferencia de Tipos Global
export type Dictionary = z.infer<typeof dictionarySchema>;
