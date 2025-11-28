// RUTA: apps/portfolio-web/src/app/[lang]/layout.tsx
// VERSIÓN: 22.0 - System Status Integration
// DESCRIPCIÓN: Layout Raíz localizado con SystemStatusTicker integrado.

import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

// --- Imports de Infraestructura ---
import { i18n, type Locale } from '../../config/i18n.config';
import { getDictionary } from '../../lib/get-dictionary';

// --- Componentes de Estructura ---
import { Providers } from '../../components/layout/Providers';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { SystemStatusTicker } from '../../components/ui/SystemStatusTicker'; // <-- NUEVO COMPONENTE

// --- Componentes de Inteligencia & UI Global ---
import { NewsletterModal } from '../../components/ui/NewsletterModal';
import { VisitorHud } from '../../components/ui/VisitorHud';
import { NavigationTracker } from '../../components/layout/NavigationTracker';

// --- Estilos Globales ---
import '../global.css';

// ===================================================================================
// 1. SISTEMA DE TIPOGRAFÍA
// ===================================================================================

const fontSatoshi = localFont({
  src: [
    { path: '../../../public/fonts/Satoshi-Variable.woff2', style: 'normal' },
    { path: '../../../public/fonts/Satoshi-VariableItalic.woff2', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const fontSignature = localFont({
  src: '../../../public/fonts/Dicaten.woff2',
  variable: '--font-signature',
  display: 'swap',
  preload: true,
});

const fontClashDisplay = localFont({
  src: [
    { path: '../../../public/fonts/ClashDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/ClashDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

// ===================================================================================
// 2. GENERACIÓN ESTÁTICA Y SEO
// ===================================================================================

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

// ===================================================================================
// 3. LAYOUT RAÍZ
// ===================================================================================

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body
        className={`${fontSatoshi.variable} ${fontSignature.variable} ${fontClashDisplay.variable} font-sans bg-background text-foreground antialiased selection:bg-purple-500/30`}
      >
        <Providers>
            {/* 1. Rastreo Silencioso */}
            <Suspense fallback={null}>
              <NavigationTracker />
            </Suspense>

            {/* 2. Estructura Visual Principal */}
            <div className="flex min-h-screen flex-col">
              <Header dictionary={dictionary} />

              {/* --- ZONA DE NOTIFICACIÓN DE SISTEMA --- */}
              <SystemStatusTicker dictionary={dictionary.system_status} />
              {/* --------------------------------------- */}

              <main className="grow relative z-0">
                {children}
              </main>

              <Footer
                content={dictionary.footer}
                navLabels={dictionary['nav-links'].nav_links}
                tagline={dictionary.header.tagline}
              />
            </div>

            {/* 3. Capa de UI Global */}
            <Suspense fallback={null}>
              <NewsletterModal />
            </Suspense>

            <VisitorHud dictionary={dictionary.visitor_hud} />
        </Providers>
      </body>
    </html>
  );
}
