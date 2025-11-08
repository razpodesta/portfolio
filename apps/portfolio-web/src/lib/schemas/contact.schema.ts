// RUTA: apps/portfolio-web/src/lib/schemas/contact.schema.ts
// VERSIÓN: Migrada a Portafolio

import { z } from 'zod';

// Esquema de validación para el formulario de contacto.
export const contactFormSchema = z.object({
  name: z.string().min(1, 'name_required'),
  email: z.string().email('email_invalid').min(1, 'email_required'),
  message: z.string().min(10, 'message_too_short'),
});

// Tipo inferido para los datos del formulario.
export type ContactFormData = z.infer<typeof contactFormSchema>;
