// RUTA: apps/portfolio-web/src/app/[lang]/layout.tsx
// VERSIÓN: 21.0 - Nx Compliance & Suspense Safety
// DESCRIPCIÓN: Layout Raíz localizado.
//              - Corrección de importaciones relativas para pasar el linter de Nx.
//              - Mantenimiento de Suspense para useSearchParams (Next.js 15).

import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

// --- CORRECCIÓN DE IMPORTACIONES (Rutas Relativas Estrictas) ---
import { i18n, type Locale } from '../../config/i18n.config';
import { getDictionary } from '../../lib/get-dictionary';
// --------------------------------------------------------------

// --- COMPONENTES DE ESTRUCTURA ---
import { Providers } from '../../components/layout/Providers';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

// --- COMPONENTES DE INTELIGENCIA & UI GLOBAL ---
import { NewsletterModal } from '../../components/ui/NewsletterModal';
import { VisitorHud } from '../../components/ui/VisitorHud';
import { NavigationTracker } from '../../components/layout/NavigationTracker';

// --- ESTILOS GLOBALES (Tailwind v4) ---
import '../global.css';

// ===================================================================================
// 1. SISTEMA DE TIPOGRAFÍA (Local Fonts para Performance Extrema)
// ===================================================================================

// Satoshi: Cuerpo de texto y UI (Legibilidad técnica)
const fontSatoshi = localFont({
  src: [
    { path: '../../../public/fonts/Satoshi-Variable.woff2', style: 'normal' },
    { path: '../../../public/fonts/Satoshi-VariableItalic.woff2', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

// Signature: Branding personal (Estilo manuscrito)
const fontSignature = localFont({
  src: '../../../public/fonts/Dicaten.woff2',
  variable: '--font-signature',
  display: 'swap',
  preload: true,
});

// Clash Display: Títulos de alto impacto (Brutalismo refinado)
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

  // Generación dinámica de etiquetas 'alternate' para SEO internacional
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
// 3. LAYOUT RAÍZ (SERVER COMPONENT)
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
        // Inyección de variables CSS de fuentes en el contexto global
        className={`${fontSatoshi.variable} ${fontSignature.variable} ${fontClashDisplay.variable} font-sans bg-background text-foreground antialiased selection:bg-purple-500/30`}
      >
        <Providers>
            {/* 1. Rastreo Silencioso (Protocolo Ariadna) - ENVUELTO EN SUSPENSE */}
            <Suspense fallback={null}>
              <NavigationTracker />
            </Suspense>

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
            <Suspense fallback={null}>
              <NewsletterModal />
            </Suspense>

            <VisitorHud dictionary={dictionary.visitor_hud} />
        </Providers>
      </body>
    </html>
  );
}
