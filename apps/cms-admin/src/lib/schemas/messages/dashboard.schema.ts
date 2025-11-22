import { z } from 'zod';

export const dashboardSchema = z.object({
  page_title: z.string(),
  header: z.string(),
  create_new_app: z.string(),
});

export type DashboardMessages = z.infer<typeof dashboardSchema>;
