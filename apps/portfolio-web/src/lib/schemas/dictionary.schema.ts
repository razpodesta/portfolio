// RUTA: apps/portfolio-web/src/lib/schemas/dictionary.schema.ts
// VERSIÓN: 2.4 - Integrada la sección "Not Found"

import { z } from 'zod';

/**
 * Esquema para los textos del Header.
 */
const headerSchema = z.object({
  projects: z.string(),
  about: z.string(),
  contact: z.string(),
  talk: z.string(),
  tagline: z.string(),
});

/**
 * Esquema para la sección Hero.
 */
const heroSchema = z.object({
  page_title: z.string(),
  page_description: z.string(),
  'RAZ-LINEUP': z.string(),
  'e-commerce': z.string(),
});

/**
 * Esquema para los mensajes de validación del formulario de contacto.
 */
const validationSchema = z.record(z.string(), z.string());

/**
 * Esquema para la sección de Contacto.
 */
const contactSchema = z.object({
  title: z.string(),
  form_cta: z.string(),
  form_placeholder_name: z.string(),
  form_placeholder_email: z.string(),
  form_placeholder_message: z.string(),
  form_button_submit: z.string(),
  validation: validationSchema,
});

/**
 * Esquema para los textos del Footer.
 */
const footerSchema = z.object({
  rights_reserved: z.string(),
  made_by: z.string(),
});

/**
 * Esquema para los textos de la página 404 (Not Found).
 */
const notFoundSchema = z.object({
  title: z.string().describe('El título principal de la página 404, ej: "Página No Encontrada".'),
  description: z.string().describe('El párrafo que explica al usuario qué ha ocurrido.'),
  cta_button: z.string().describe('El texto para el botón de llamado a la acción, ej: "Volver al Inicio".'),
});

// ===================================================================================
// ESQUEMA PRINCIPAL DEL DICCIONARIO
// ===================================================================================
export const dictionarySchema = z.object({
  header: headerSchema,
  homepage: z.object({
    hero: heroSchema,
    contact: contactSchema,
  }),
  footer: footerSchema,
  not_found: notFoundSchema, // <-- SECCIÓN AÑADIDA
});

/**
 * TIPO CANÓNICO: `Dictionary`
 */
export type Dictionary = z.infer<typeof dictionarySchema>;
