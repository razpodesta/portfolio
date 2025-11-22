import { z } from 'zod';

export const loginPageSchema = z.object({
  page_title: z.string(),
  sign_in_title: z.string(),
  email_placeholder: z.string(),
  password_placeholder: z.string(),
  login_button: z.string(),
  signing_in_button: z.string(),
  register_button: z.string(),
  error_invalid_credentials: z.string(),
  error_unexpected: z.string(),
});

export type LoginPage = z.infer<typeof loginPageSchema>;
