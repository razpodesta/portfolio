// RUTA: apps/portfolio-web/src/lib/supabase/client.ts
// ROL: Cliente Singleton para Supabase (Browser)

import { createBrowserClient } from '@supabase/ssr';

// Creamos un cliente de Supabase para ser usado en el navegador.
// Este es el único lugar donde se leen las variables de entorno de Supabase.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
