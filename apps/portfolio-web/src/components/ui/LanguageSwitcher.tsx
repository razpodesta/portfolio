// RUTA: oh-hoteis/src/components/ui/LanguageSwitcher.tsx
// VERSIÓN: Definitiva, con tipado estricto y perfecto

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
// --- CORRECCIÓN 1: Importar el tipo 'FlagIconCode' ---
// Importamos no solo el componente, sino también el tipo específico que necesita como prop.
import { FlagIcon, type FlagIconCode } from 'react-flag-kit';
import { i18n, type Locale } from '@/config/i18n.config';

export function LanguageSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  // --- CORRECCIÓN 2: Cambiar el tipo de retorno de la función ---
  // Ahora, esta función promete devolver un valor que es, garantizado, un 'FlagIconCode'.
  // TypeScript puede verificar que 'US', 'ES', y 'BR' son todos miembros válidos de este tipo.
  const getCountryCode = (locale: Locale): FlagIconCode => {
    if (locale === 'en-US') return 'US';
    if (locale === 'es-ES') return 'ES';
    return 'BR';
  };

  return (
    <div className="flex items-center gap-2">
      {i18n.locales.map((locale: Locale) => (
        <Link key={locale} href={redirectedPathName(locale)}>
          <FlagIcon
            code={getCountryCode(locale)} // Ahora el tipo coincide perfectamente.
            size={24}
            className="cursor-pointer rounded-sm transition-transform hover:scale-110"
            title={locale.toUpperCase()}
          />
        </Link>
      ))}
    </div>
  );
}
