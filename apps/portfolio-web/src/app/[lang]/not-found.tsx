// RUTA: apps/portfolio-web/src/app/[lang]/not-found.tsx
// VERSIÓN: 1.0 - Página 404 "Ultra Fashion" e Internacionalizada

import Link from 'next/link';
import { Home } from 'lucide-react';
import { getDictionary } from '../../dictionaries/get-dictionary';
import { type Locale } from '../../config/i18n.config';

// Next.js automáticamente renderizará este componente para cualquier ruta no encontrada
// dentro del segmento [lang]. Es un Server Component por defecto.
export default async function NotFound({ params: { lang } }: { params: { lang: Locale } }) {
  // Cargamos el diccionario específico para el idioma actual.
  const dictionary = await getDictionary(lang);
  const translations = dictionary.not_found;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md">
        {/* Usamos la tipografía de impacto para el código de error */}
        <h1 className="font-display text-8xl font-bold tracking-tighter text-transparent sm:text-9xl bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-600">
          404
        </h1>

        {/* Usamos la tipografía de claridad para el mensaje */}
        <h2 className="mt-4 font-sans text-2xl font-semibold text-foreground sm:text-3xl">
          {translations.title}
        </h2>
        <p className="mt-2 text-zinc-400">
          {translations.description}
        </p>

        {/* Un llamado a la acción claro y con el estilo del sitio */}
        <Link
          href={`/${lang}`} // Enlace a la página de inicio del idioma actual
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          <Home size={18} />
          {translations.cta_button}
        </Link>
      </div>
    </div>
  );
}
