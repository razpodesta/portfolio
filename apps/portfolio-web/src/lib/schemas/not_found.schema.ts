import { z } from 'zod';

export const notFoundSchema = z.object({
  title: z.string(),
  description: z.string(),
  cta_button: z.string(),
});
