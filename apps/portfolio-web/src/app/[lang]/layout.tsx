// RUTA: apps/portfolio-web/src/app/[lang]/layout.tsx
// VERSIÓN: 14.0 - Arquitectura Simplificada (Zustand)
// DESCRIPCIÓN: Se elimina el WidgetProvider obsoleto.

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { i18n, type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { Providers } from '@/components/layout/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewsletterModal } from '@/components/ui/NewsletterModal';
import { VisitorHud } from '@/components/ui/VisitorHud';
// --- BORRADO: import { WidgetProvider } ... ---
import '../global.css';

const fontSatoshi = localFont({
  src: [
    { path: '../../../public/fonts/Satoshi-Variable.woff2', style: 'normal' },
    { path: '../../../public/fonts/Satoshi-VariableItalic.woff2', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const fontSignature = localFont({
    src: '../../../public/fonts/Dicaten.woff2',
    variable: '--font-signature',
    display: 'swap',
});

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
    alternates: {
      canonical: `${baseUrl}/${currentLanguage}`,
      languages: languageAlternates,
    },
  };
}

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
        className={`${fontSatoshi.variable} ${fontSignature.variable} font-sans bg-background text-foreground antialiased`}
      >
        <Providers>
          {/* --- MIGRACIÓN: Se ha eliminado <WidgetProvider> --- */}
            <div className="flex min-h-screen flex-col">
              <Header dictionary={dictionary} />
              <main className="grow">{children}</main>
              <Footer
                content={dictionary.footer}
                navLabels={dictionary['nav-links'].nav_links}
                tagline={dictionary.header.tagline}
              />
            </div>
            <NewsletterModal />
            <VisitorHud dictionary={dictionary.visitor_hud} />
          {/* --- MIGRACIÓN: Fin de bloque limpio --- */}
        </Providers>
      </body>
    </html>
  );
}
