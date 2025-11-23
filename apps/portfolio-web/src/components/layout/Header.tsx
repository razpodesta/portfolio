// RUTA: apps/portfolio-web/src/components/layout/Header.tsx
// VERSIÓN: 22.0 - Migración a Zustand (Atomic Selectors)
// DESCRIPCIÓN: Se sustituye el Context API por Zustand para la gestión del estado global.
//              Se mantiene la lógica de 'auto-hide' al hacer scroll, ahora interactuando
//              directamente con el store global.

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import type { Dictionary } from '../../lib/schemas/dictionary.schema';
// --- MIGRACIÓN ZUSTAND ---
import { useUIStore } from '../../lib/store/ui.store';
// -------------------------
import { useScrollDirection } from '../../lib/hooks/use-scroll-direction';
import { DropdownMenu } from '../ui/DropdownMenu';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NestedDropdownContent } from '../ui/NestedDropdownContent';
import { ColorWaveBar } from '../ui/ColorWaveBar';
import { mainNavStructure, type NavItem } from '../../lib/nav-links';
import { getLocalizedHref } from '../../lib/utils/link-helpers';
import { i18n, type Locale } from '../../config/i18n.config';

// --- SUB-COMPONENTES OPTIMIZADOS ---

const Brand = ({
  isMobile = false,
  onLinkClick,
  dictionary,
  currentLang
}: {
  isMobile?: boolean;
  onLinkClick?: () => void;
  dictionary: Dictionary['header'];
  currentLang: Locale;
}) => (
    <Link
      href={`/${currentLang}`}
      className="transition-opacity group hover:opacity-80 block"
      onClick={onLinkClick}
    >
      {isMobile ? (
        <div className="text-left flex flex-col justify-center h-full">
           <h1 className="font-signature text-3xl text-white leading-none mb-1">
             {dictionary.mobile_title}
           </h1>
           <p className="font-sans text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
             {dictionary.mobile_subtitle}
           </p>
        </div>
      ) : (
        <div className="text-left">
          <h1 className="font-signature text-5xl text-white whitespace-nowrap leading-none pt-2">
            Raz Podestá
          </h1>
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mt-0 ml-1">
            {dictionary.personal_portfolio}
          </p>
        </div>
      )}
    </Link>
);

const SimpleMenuItem = ({ item, label, currentLang }: { item: NavItem; label: string; currentLang: Locale }) => {
  if (!('href' in item) || !item.href) return null;

  const finalHref = getLocalizedHref(item.href, currentLang);

  return (
    <Link
      href={finalHref}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-3 p-2 text-sm rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
    >
      {item.Icon && <item.Icon size={16} />}
      {label}
    </Link>
  );
};

const SocialMenuItem = ({ item }: { item: Extract<NavItem, { isSocial: true }> }) => (
  <>
    <div className="h-px my-2 bg-zinc-800" />
    <div className="flex items-center justify-center gap-2 p-2">
      {item.links.map(link => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <link.icon size={18} />
        </Link>
      ))}
    </div>
  </>
);

// --- COMPONENTE PRINCIPAL ---

type HeaderProps = {
  dictionary: Dictionary;
};

export function Header({ dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- MIGRACIÓN ZUSTAND: Selectores Atómicos ---
  const isVisitorHudVisible = useUIStore((state) => state.isVisitorHudVisible);
  const toggleVisitorHud = useUIStore((state) => state.toggleVisitorHud);
  // ----------------------------------------------

  const { scrollY, scrollDirection } = useScrollDirection();
  const hasAutoHiddenRef = useRef(false);

  const pathname = usePathname();
  const currentLang = (pathname?.split('/')[1] as Locale) || i18n.defaultLocale;

  // Lógica de auto-ocultamiento al hacer scroll
  useEffect(() => {
    if (scrollY > 50 && !hasAutoHiddenRef.current && isVisitorHudVisible) {
      toggleVisitorHud();
      hasAutoHiddenRef.current = true;
    }
  }, [scrollY, isVisitorHudVisible, toggleVisitorHud]);

  const navLabels = useMemo(() => {
    const headerSimpleLabels = dictionary.header;
    const navigationLinks = dictionary['nav-links'].nav_links;

    return {
        ...headerSimpleLabels,
        ...navigationLinks,
    };
  }, [dictionary]);

  const headerVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: '-100%', opacity: 0 },
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      variants={headerVariants}
      animate={scrollY > 200 && scrollDirection === 'down' ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800"
    >
      <div className="container px-4 mx-auto">
        <div className="items-center justify-between hidden h-24 md:flex gap-8">
          <div className="shrink-0 pt-1">
            <Brand dictionary={dictionary.header} currentLang={currentLang} />
          </div>

          <nav className="flex items-center gap-1">
            {mainNavStructure.map((navGroup) => (
              <DropdownMenu key={navGroup.labelKey} trigger={
                <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-full text-zinc-300 transition-colors group hover:text-white hover:bg-zinc-800">
                  {navGroup.Icon && <navGroup.Icon size={14} className="mr-1" />}
                  {navLabels[navGroup.labelKey as keyof typeof navLabels]}
                  <ChevronDown size={14} className="text-zinc-500 transition-colors group-hover:text-white" />
                </button>
              }>
                {navGroup.isNested ? (
                  <NestedDropdownContent links={navGroup.children as NavItem[]} dictionary={dictionary['nav-links'].nav_links} />
                ) : (
                  <div className="w-48 p-2 space-y-1">
                    {navGroup.children?.map((item) => {
                      if ('isSeparator' in item) return <div key="separator" className="h-px my-2 bg-zinc-800" />;
                      if ('isSocial' in item) return <SocialMenuItem key="social" item={item} />;
                      const label = navLabels[item.labelKey as keyof typeof navLabels];
                      return <SimpleMenuItem key={label} item={item} label={label} currentLang={currentLang} />;
                    })}
                  </div>
                )}
              </DropdownMenu>
            ))}
          </nav>

          <div className="flex items-center gap-2">
             <LanguageSwitcher dictionary={dictionary.language_switcher} />
             <ThemeToggle />
             <AnimatePresence>
               {/* Usamos la variable del store */}
               {!isVisitorHudVisible && (
                 <motion.button
                   onClick={toggleVisitorHud}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   className="flex items-center justify-center w-10 h-10 rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                   aria-label="Mostrar widget de visitante"
                 >
                   <Globe size={18} strokeWidth={1.5} />
                 </motion.button>
               )}
             </AnimatePresence>
             <Link
               href={`/${currentLang}/#contact`}
               className="px-4 py-2 ml-2 text-xs font-bold text-white transition-transform rounded-full bg-linear-to-r from-purple-500 to-pink-600 hover:scale-105"
             >
                {dictionary.header.talk}
              </Link>
          </div>
        </div>

        <div className="flex items-center justify-between h-20 md:hidden">
          <div className="pl-1">
            <Brand isMobile onLinkClick={closeMenu} dictionary={dictionary.header} currentLang={currentLang} />
          </div>
          <button onClick={() => setIsMenuOpen(true)} aria-label="Abrir menú de navegación" className="p-2 text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <ColorWaveBar position="bottom" />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/80 backdrop-blur-lg"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 w-4/5 h-full max-w-sm p-6 bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeMenu} aria-label="Cerrar menú de navegación" className="absolute text-zinc-400 right-4 top-5">
                <X size={32} />
              </button>
              <nav className="flex flex-col items-center gap-8 mt-20">
                <Link href={`/${currentLang}/#quien-soy`} className="text-3xl font-semibold text-white" onClick={closeMenu}>{navLabels['sobre_mi']}</Link>
                <Link href={`/${currentLang}/#contact`} className="text-3xl font-semibold text-white" onClick={closeMenu}>{navLabels['contacto']}</Link>
                <Link href={`/${currentLang}/#contact`} className="w-full p-4 mt-8 text-xl font-bold text-center text-white rounded-md bg-linear-to-r from-purple-500 to-pink-600" onClick={closeMenu}>{dictionary.header.talk}</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
