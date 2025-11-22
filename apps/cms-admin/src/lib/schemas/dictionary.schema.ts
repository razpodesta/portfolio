import { z } from 'zod';
import { loginPageSchema } from './messages/login.schema';
import { dashboardSchema } from './messages/dashboard.schema';
import { sidebarSchema } from './messages/sidebar.schema';
import { contentSchema } from './messages/content.schema';

export const dictionarySchema = z.object({
  login_page: loginPageSchema,
  dashboard_page: dashboardSchema,
  sidebar: sidebarSchema,
  content_page: contentSchema,
});

export type Dictionary = z.infer<typeof dictionarySchema>;
