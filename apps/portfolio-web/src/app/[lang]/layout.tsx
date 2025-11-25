// RUTA: apps/portfolio-web/src/app/[lang]/layout.tsx
// VERSIÓN: 20.0 - "The Content Orchestrator"
// DESCRIPCIÓN: Wrapper semántico para rutas localizadas.
//              Eliminada la definición de html/body para evitar conflictos de hidratación.

import type { Metadata } from 'next';
import { i18n, type Locale } from '../../config/i18n.config';
import { getDictionary } from '../../lib/get-dictionary';

// --- COMPONENTES DE ESTRUCTURA ---
import { Providers } from '../../components/layout/Providers';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

// --- COMPONENTES DE INTELIGENCIA & UI GLOBAL ---
import { NewsletterModal } from '../../components/ui/NewsletterModal';
import { VisitorHud } from '../../components/ui/VisitorHud';
import { NavigationTracker } from '../../components/layout/NavigationTracker';

// --- METADATOS SEO (Se mantienen aquí para ser específicos por idioma) ---
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang: currentLanguage } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4200';

  const languageAlternates = i18n.locales.reduce((accumulator, locale) => {
    accumulator[locale] = `${baseUrl}/${locale}`;
    return accumulator;
  }, {} as Record<Locale, string>);

  return {
    title: {
      template: '%s | Portafolio de Raz Podestá',
      default: 'Portafolio de Desarrollo y Creatividad | Raz Podestá',
    },
    description: 'Explora una colección de proyectos en desarrollo web, IA, música y diseño.',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${currentLanguage}`,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      siteName: 'Raz Podestá Portfolio',
    },
  };
}

// --- LAYOUT DE CONTENIDO ---
export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <Providers>
        {/* 1. Rastreo Silencioso (Protocolo Ariadna) */}
        <NavigationTracker />

        {/* 2. Estructura Visual Principal (Sticky Footer) */}
        <div className="flex min-h-screen flex-col">
          <Header dictionary={dictionary} />

          {/* 'grow' empuja el footer hacia abajo si hay poco contenido */}
          <main className="grow relative z-0">
            {children}
          </main>

          <Footer
            content={dictionary.footer}
            navLabels={dictionary['nav-links'].nav_links}
            tagline={dictionary.header.tagline}
          />
        </div>

        {/* 3. Capa de UI Global (Overlays) */}
        <NewsletterModal />
        <VisitorHud dictionary={dictionary.visitor_hud} />
    </Providers>
  );
}
