import { z } from 'zod';

export const contentSchema = z.object({
  page_title: z.string(),
  new_entry: z.string(),
  delete_entry: z.string(),
  delete_entries: z.string(),
  publish: z.string(),
  unpublish: z.string(),
});

export type ContentMessages = z.infer<typeof contentSchema>;
