/**
 * @file Contrato de datos soberano para la página de Currículum.
 * @version 5.0 - Inclusión de Certificaciones y Footer de Impresión.
 */
import { z } from 'zod';

const experienceItemSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  location: z.string(),
  duties: z.array(z.string()),
});

const educationItemSchema = z.object({
  degree: z.string(),
  university: z.string(),
  period: z.string(),
  location: z.string(),
});

const skillCategorySchema = z.object({
  title: z.string(),
  skills: z.array(z.string()),
});

// Nuevo esquema para certificaciones
const certificationItemSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.string(),
  url: z.string().optional(),
});

export const curriculumSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  print_button: z.string(),
  printable_footer: z.string(), // <-- Corregido el error TS2339
  header: z.object({
    name: z.string(),
    title: z.string(),
    phone: z.string(),
    email: z.string(),
    linkedin: z.string(),
    location: z.string(),
  }),
  summary: z.object({
    title: z.string(),
    content: z.string(),
  }),
  experience: z.object({
    title: z.string(),
    items: z.array(experienceItemSchema),
  }),
  education: z.object({
    title: z.string(),
    items: z.array(educationItemSchema),
  }),
  certifications: z.object({ // <-- Nueva Sección
    title: z.string(),
    items: z.array(certificationItemSchema),
  }),
  skills_section: z.object({
    title: z.string(),
    categories: z.array(skillCategorySchema),
  }),
  hobbies: z.object({ // <-- Nueva Sección
    title: z.string(),
    items: z.array(z.string()),
  }),
  // Mantenemos compatibilidad con secciones anteriores si existen en JSON, o las hacemos opcionales
  methodologies: z.object({
    title: z.string(),
    items: z.array(z.string()),
  }).optional(),
  call_to_action: z.object({
    title: z.string(),
    content: z.string(),
  }).optional(),
});

export type Curriculum = z.infer<typeof curriculumSchema>;
