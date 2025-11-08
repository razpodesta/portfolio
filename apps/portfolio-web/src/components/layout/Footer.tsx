// RUTA: apps/portfolio-web/src/components/layout/Footer.tsx
// VERSIÓN: De Élite - Nivelado para Portafolio Profesional

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import type { Dictionary } from '../../lib/schemas/dictionary.schema';

/**
 * PRINCIPIO DE SEGREGACIÓN DE INTERFACES (ISP):
 * Las props del componente solo solicitan la parte del diccionario que le
 * concierne ('footer'), derivando su tipo directamente de la fuente de verdad (Zod).
 * Esto lo hace más modular y reutilizable.
 */
type FooterProps = {
  dictionary: Dictionary['footer'];
};

/**
 * PRINCIPIO DRY (Don't Repeat Yourself):
 * Los enlaces sociales se definen como una constante fuera del componente.
 * Esto mantiene el JSX limpio y hace que la gestión de los enlaces sea trivial.
 */
const socialLinks = [
  {
    href: 'https://github.com/tu-usuario', // <-- ACTUALIZAR
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://linkedin.com/in/tu-usuario', // <-- ACTUALIZAR
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://twitter.com/tu-usuario', // <-- ACTUALIZAR
    label: 'Twitter',
    icon: Twitter,
  },
];

/**
 * Componente `Footer`
 *
 * El pie de página definitivo para el portafolio. Ha sido refactorizado para
 * reflejar una identidad profesional, con enlaces a redes relevantes, una estética
 * cohesiva con el resto del sitio y un fuerte enfoque en la accesibilidad.
 *
 * @param dictionary - Objeto que contiene las traducciones para el pie de página.
 */
export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-8 text-center md:grid-cols-3 md:text-left">
        {/* Columna 1: Identidad Personal (Wordmark) */}
        <div className="flex justify-center md:justify-start">
          <Link
            href="/"
            className="text-xl font-bold text-zinc-200 transition-colors hover:text-white"
          >
            [Tu Nombre Completo] {/* <-- ACTUALIZAR */}
          </Link>
        </div>

        {/* Columna 2: Copyright y Créditos */}
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()}. {dictionary.rights_reserved}</p>
          <p>{dictionary.made_by.replace('[Seu Nome]', '[Tu Nombre Completo]')}</p> {/* <-- Reemplazo para consistencia */}
        </div>

        {/* Columna 3: Redes Sociales Profesionales */}
        <div className="flex justify-center gap-4 md:justify-end">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              // A11Y: `aria-label` es crucial para la accesibilidad.
              aria-label={`Visita mi perfil de ${label}`}
              className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
