// RUTA: apps/portfolio-web/src/components/ui/LanguageSwitcher.tsx
// VERSIÓN: 3.2 - Tipado de Props Arquitectónicamente Correcto.
// DESCRIPCIÓN: Se ha corregido la firma de tipos del componente para definir
//              explícitamente la forma del objeto de props. El error anterior
//              ocurría al intentar desestructurar una propiedad 'dictionary' de un
//              tipo que ya era el diccionario mismo. La solución define un tipo
//              explícito para las props, `{ dictionary: Dictionary['language_switcher'] }`,
//              resolviendo el error de compilación de forma limpia y definitiva.

'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { i18n, type Locale } from '../../config/i18n.config';
import type { Dictionary } from '../../lib/schemas/dictionary.schema';
import { Flag } from './Flag';

// --- INICIO DE LA CORRECCIÓN ARQUITECTÓNICA ---
// 1. Se define un tipo explícito para el objeto de props del componente.
//    Esto aclara que el componente espera recibir un objeto que contenga
//    una propiedad llamada `dictionary`.
type LanguageSwitcherProps = {
  dictionary: Dictionary['language_switcher'];
};
// --- FIN DE LA CORRECCIÓN ARQUITECTÓNICA ---

// 2. Se aplica el tipo de props correcto a la firma de la función.
export function LanguageSwitcher({ dictionary }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = (pathName?.split('/')[1] as Locale) || i18n.defaultLocale;

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const getCountryCode = (locale: Locale): string => {
    if (locale === 'en-US') return 'US';
    if (locale === 'es-ES') return 'ES';
    return 'BR'; // pt-BR
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-full hover:bg-zinc-800 transition-colors"
        aria-label={dictionary.label}
      >
        <div className="transition-transform duration-300 ease-out hover:scale-110">
          <Flag countryCode={getCountryCode(currentLocale)} className="h-[22px] w-[22px]" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full mt-2 w-max origin-top-right rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg z-50 right-0"
          >
            <div className="p-1">
              {i18n.locales.map((locale) => (
                <Link
                  key={locale}
                  href={redirectedPathName(locale)}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full p-2 text-left text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                >
                  <Flag countryCode={getCountryCode(locale)} className="h-5 w-5" />
                  {/* Se añade un 'as' para garantizar a TypeScript que 'locale' es una clave válida. */}
                  <span>{dictionary[locale as keyof typeof dictionary]}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
