import { z } from 'zod';

export const sidebarSchema = z.object({
  models: z.string(),
  content: z.string(),
  i18n: z.string(),
  assets: z.string(),
  logout: z.string(),
  create: z.string(),
  enumerations: z.string(),
});

export type SidebarMessages = z.infer<typeof sidebarSchema>;
