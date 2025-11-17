// RUTA: apps/portfolio-web/src/lib/schemas/homepage.schema.ts
// VERSIÓN: 2.0 - Integración del esquema para la sección "Sobre Mí".
// DESCRIPCIÓN: Se importa y añade `aboutSectionSchema` al contrato de la
//              página de inicio para validar el contenido de la nueva sección.

import { z } from 'zod';
import { heroSchema } from './hero.schema';
import { valuePropositionSectionSchema } from './value_proposition.schema';
import { contactMessagesSchema } from './contact.schema';
import { aboutSectionSchema } from './about_section.schema';

export const homepageSchema = z.object({
  hero: heroSchema,
  about_section: aboutSectionSchema,
  value_proposition_section: valuePropositionSectionSchema,
  contact: contactMessagesSchema,
});
