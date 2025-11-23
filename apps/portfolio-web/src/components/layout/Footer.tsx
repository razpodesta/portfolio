// RUTA: apps/portfolio-web/src/components/layout/Footer.tsx
// VERSIÓN: 4.1 - Alineado con el Contrato de Datos Soberano
// DESCRIPCIÓN: Se corrige el tipo de la prop 'navLabels' para que apunte a la
//              sección correcta del diccionario ('nav-links' en lugar de 'header'),
//              resolviendo el error de tipo TS2339 y restaurando la integridad
//              del contrato de datos del componente.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/lib/schemas/dictionary.schema';
import { socialLinks } from '@/lib/social-links';
import { footerNavStructure } from '@/lib/nav-links';
import { getLocalizedHref } from '@/lib/utils/link-helpers';
import { i18n, type Locale } from '@/config/i18n.config';

// --- INICIO DE LA CORRECCIÓN CRÍTICA ---
type FooterProps = {
  content: Dictionary['footer'];
  navLabels: Dictionary['nav-links']['nav_links']; // Corregido para apuntar a la fuente de verdad correcta.
  tagline: string;
};
// --- FIN DE LA CORRECCIÓN CRÍTICA ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Footer({ content, navLabels, tagline }: FooterProps) {
  const t = content;
  const pathname = usePathname();
  const currentLang = (pathname?.split('/')[1] as Locale) || i18n.defaultLocale;

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="border-t border-zinc-800 bg-black text-zinc-400"
    >
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-2">
            <Link href={`/${currentLang}`} className="font-signature text-5xl text-white transition-colors hover:text-zinc-300">
              Raz Podestá
            </Link>
            <p className="mt-4 max-w-xs text-sm">
              {tagline}
            </p>
          </motion.div>

          {footerNavStructure.map((column) => (
            <motion.div variants={itemVariants} key={column.columnKey}>
              <h2 className="text-sm font-semibold tracking-wider text-zinc-100 uppercase">
                {t[column.columnKey as keyof typeof t]}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => {
                  const finalHref = getLocalizedHref(link.href, currentLang);

                  return (
                    <li key={link.labelKey}>
                      <Link href={finalHref} className="flex items-center gap-2 text-sm transition-colors hover:text-white hover:underline">
                        {link.Icon && <link.Icon size={14} className="shrink-0 text-zinc-500 group-hover:text-white transition-colors" />}
                        <span>{navLabels[link.labelKey as keyof typeof navLabels]}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-12 border-t border-zinc-800 pt-8">
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{t.newsletter_title}</h3>
              <p className="text-sm text-zinc-500">Recibe insights y actualizaciones directamente.</p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder={t.newsletter_placeholder}
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:ring-purple-500"
                aria-label={t.newsletter_placeholder}
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-white px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105"
                aria-label={t.newsletter_button}
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-zinc-800 pt-8 md:flex-row">
          <div className="text-center text-sm md:text-left">
            <p>{t.rights_reserved}</p>
            <p className="text-zinc-500">{t.made_by}</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visita mi perfil de ${label}`}
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
