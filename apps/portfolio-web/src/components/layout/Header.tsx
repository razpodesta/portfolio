// RUTA: apps/portfolio-web/src/components/layout/Header.tsx
// VERSIÓN: 23.0 - Theme Aware & i18n Verified
// DESCRIPCIÓN: Refactorización total para usar tokens semánticos (bg-background, text-foreground)
//              garantizando compatibilidad Dark/Light. Validación de i18n vía Zod.

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import type { Dictionary } from '../../lib/schemas/dictionary.schema';
import { useUIStore } from '../../lib/store/ui.store';
import { useScrollDirection } from '../../lib/hooks/use-scroll-direction';
import { DropdownMenu } from '../ui/DropdownMenu';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NestedDropdownContent } from '../ui/NestedDropdownContent';
import { ColorWaveBar } from '../ui/ColorWaveBar';
import { mainNavStructure, type NavItem } from '../../lib/nav-links';
import { getLocalizedHref } from '../../lib/utils/link-helpers';
import { i18n, type Locale } from '../../config/i18n.config';

// --- SUB-COMPONENTES ADAPTADOS AL TEMA ---

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
           {/* TEXT-FOREGROUND: Se adapta a blanco en dark, negro en light */}
           <h1 className="font-signature text-3xl text-foreground leading-none mb-1">
             {dictionary.mobile_title}
           </h1>
           <p className="font-sans text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
             {dictionary.mobile_subtitle}
           </p>
        </div>
      ) : (
        <div className="text-left">
          <h1 className="font-signature text-5xl text-foreground whitespace-nowrap leading-none pt-2">
            Raz Podestá
          </h1>
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-0 ml-1">
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
      // HOVER SEMÁNTICO: hover:bg-accent hover:text-accent-foreground
      className="flex items-center gap-3 p-2 text-sm rounded-md text-muted-foreground hover:text-accent-foreground hover:bg-accent transition-colors"
    >
      {item.Icon && <item.Icon size={16} />}
      {label}
    </Link>
  );
};

const SocialMenuItem = ({ item }: { item: Extract<NavItem, { isSocial: true }> }) => (
  <>
    {/* BORDER SEMÁNTICO */}
    <div className="h-px my-2 bg-border" />
    <div className="flex items-center justify-center gap-2 p-2">
      {item.links.map(link => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="p-2 rounded-full text-muted-foreground hover:text-accent-foreground hover:bg-accent transition-colors"
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
  const isVisitorHudOpen = useUIStore((state) => state.isVisitorHudOpen);
  const toggleVisitorHud = useUIStore((state) => state.toggleVisitorHud);
  const closeVisitorHud = useUIStore((state) => state.closeVisitorHud);

  const { scrollY, scrollDirection } = useScrollDirection();
  const hasAutoHiddenRef = useRef(false);

  const pathname = usePathname();
  const currentLang = (pathname?.split('/')[1] as Locale) || i18n.defaultLocale;

  useEffect(() => {
    if (scrollY > 50 && !hasAutoHiddenRef.current && isVisitorHudOpen) {
      closeVisitorHud();
      hasAutoHiddenRef.current = true;
    }
  }, [scrollY, isVisitorHudOpen, closeVisitorHud]);

  const navLabels = useMemo(() => {
    const headerSimpleLabels = dictionary.header;
    const navigationLinks = dictionary['nav-links'].nav_links;
    return { ...headerSimpleLabels, ...navigationLinks };
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
      // FONDO SEMÁNTICO CON BLUR: Se adapta a claro/oscuro
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container px-4 mx-auto">
        <div className="items-center justify-between hidden h-24 md:flex gap-8">
          <div className="shrink-0 pt-1">
            <Brand dictionary={dictionary.header} currentLang={currentLang} />
          </div>

          <nav className="flex items-center gap-1">
            {mainNavStructure.map((navGroup) => (
              <DropdownMenu key={navGroup.labelKey} trigger={
                <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-full text-muted-foreground transition-colors group hover:text-accent-foreground hover:bg-accent">
                  {navGroup.Icon && <navGroup.Icon size={14} className="mr-1" />}
                  {navLabels[navGroup.labelKey as keyof typeof navLabels]}
                  <ChevronDown size={14} className="text-muted-foreground transition-colors group-hover:text-accent-foreground" />
                </button>
              }>
                {navGroup.isNested ? (
                  <NestedDropdownContent links={navGroup.children as NavItem[]} dictionary={dictionary['nav-links'].nav_links} />
                ) : (
                  // FONDO DEL DROPDOWN SEMÁNTICO (definido en el componente DropdownMenu, pero revisamos aquí la estructura interna)
                  <div className="w-48 p-2 space-y-1">
                    {navGroup.children?.map((item) => {
                      if ('isSeparator' in item) return <div key="separator" className="h-px my-2 bg-border" />;
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
               {!isVisitorHudOpen && (
                 <motion.button
                   onClick={toggleVisitorHud}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                   aria-label="Mostrar información del visitante"
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
          <button onClick={() => setIsMenuOpen(true)} aria-label="Abrir menú de navegación" className="p-2 text-foreground">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <ColorWaveBar position="bottom" />

      {/* MOBILE MENU ADAPTADO */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-background/95 backdrop-blur-xl"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 w-full h-full p-6 bg-background"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeMenu} aria-label="Cerrar menú de navegación" className="absolute text-muted-foreground right-4 top-5">
                <X size={32} />
              </button>
              <nav className="flex flex-col items-center gap-8 mt-20">
                <Link href={`/${currentLang}/#quien-soy`} className="text-3xl font-semibold text-foreground" onClick={closeMenu}>{navLabels['sobre_mi']}</Link>
                <Link href={`/${currentLang}/#contact`} className="text-3xl font-semibold text-foreground" onClick={closeMenu}>{navLabels['contacto']}</Link>
                <Link href={`/${currentLang}/#contact`} className="w-full p-4 mt-8 text-xl font-bold text-center text-white rounded-md bg-linear-to-r from-purple-500 to-pink-600" onClick={closeMenu}>{dictionary.header.talk}</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
