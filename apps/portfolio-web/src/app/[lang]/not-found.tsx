// RUTA: apps/portfolio-web/src/app/[lang]/not-found.tsx
// VERSIÓN: 4.2 - Alineado con la Nueva Arquitectura de Librerías.
// DESCRIPCIÓN: Se actualiza la ruta de importación de `getDictionary`.

import Link from 'next/link';
import { Home } from 'lucide-react';
import { i18n } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary'; // <-- RUTA CORREGIDA

export default async function NotFound() {
  const lang = i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  const translations = dictionary.not_found;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-8xl font-bold tracking-tighter text-transparent sm:text-9xl bg-clip-text bg-linear-to-r from-zinc-500 to-zinc-600">
          404
        </h1>
        <h2 className="mt-4 font-sans text-2xl font-semibold text-foreground sm:text-3xl">
          {translations.title}
        </h2>
        <p className="mt-2 text-zinc-400">
          {translations.description}
        </p>
        <Link
          href={`/${lang}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-pink-600 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          <Home size={18} />
          {translations.cta_button}
        </Link>
      </div>
    </div>
  );
}
