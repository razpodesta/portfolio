// ===================================================================================
// ARQUITECTURA: El Corazón de la Aplicación (Root Layout Dinámico)
// ROL: Server Component
// VERSIÓN: 5.0 - Integrado el Sistema de Captación de Suscriptores
// ===================================================================================

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { i18n, type Locale } from '../../config/i18n.config';
import { getDictionary } from '../../dictionaries/get-dictionary';
import { Providers } from '../../components/layout/Providers';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { NewsletterModal } from '../../components/ui/NewsletterModal'; // <-- 1. Importar el modal
import '../global.css';

// ===================================================================================
// SECCIÓN 1: El Pilar Tipográfico – Carga de Fuentes Locales
// DESCRIPCIÓN: Se definen y cargan las fuentes de autor de forma local y optimizada.
//              Esto elimina peticiones a servidores externos, mejorando el rendimiento (LCP)
//              y la privacidad. Las variables CSS permiten su uso global en Tailwind.
// ===================================================================================

const fontSatoshi = localFont({
  src: [
    {
      path: '../../../public/fonts/Satoshi-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Satoshi-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-sans', // Fuente para claridad y cuerpo de texto.
  display: 'swap',
});

const fontClashDisplay = localFont({
  src: [
    {
      path: '../../../public/fonts/ClashDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ClashDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-display', // Fuente para impacto y títulos.
  display: 'swap',
});

// ===================================================================================
// SECCIÓN 2: El Mapa del Sitio – Generación de Rutas Estáticas
// DESCRIPCIÓN: Esta función le indica a Next.js en tiempo de construcción (build time)
//              qué versiones de idioma de la página debe pre-renderizar como HTML estático.
//              Es la base de la estrategia de Static Site Generation (SSG).
// ===================================================================================

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// ===================================================================================
// SECCIÓN 3: La Tarjeta de Presentación para SEO – Generación de Metadatos
// DESCRIPCIÓN: Genera dinámicamente los metadatos esenciales para cada idioma.
//              Esto incluye el título, la descripción y, crucialmente, las etiquetas
//              'hreflang' que informan a Google sobre las versiones alternativas de
//              la página, maximizando el posicionamiento SEO internacional.
// ===================================================================================

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const currentLanguage = params.lang || i18n.defaultLocale;
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

// ===================================================================================
// SECCIÓN 4: El Componente Principal – La Estructura Fundamental
// DESCRIPCIÓN: Este es el componente de layout en sí. Ensambla la página,
//              inyectando el idioma correcto, las clases de las fuentes y la estructura
//              de componentes globales (Providers, Header, Footer, NewsletterModal).
// ===================================================================================

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const currentLanguage = params.lang;
  const dictionary = await getDictionary(currentLanguage);

  return (
    <html lang={currentLanguage} suppressHydrationWarning>
      <head />
      <body
        className={`${fontSatoshi.variable} ${fontClashDisplay.variable} font-sans bg-background text-foreground antialiased`}
      >
        <Providers>
          {/* El contenedor principal de la UI visible */}
          <div className="flex min-h-screen flex-col">
            <Header dictionary={dictionary} />
            <main className="flex-grow">{children}</main>
            <Footer dictionary={dictionary.footer} />
          </div>

          {/* Componentes globales superpuestos (overlays) como el modal */}
          <NewsletterModal />
        </Providers>
      </body>
    </html>
  );
}
