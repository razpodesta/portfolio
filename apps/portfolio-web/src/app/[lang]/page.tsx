// RUTA: apps/portfolio-web/src/app/[lang]/page.tsx
// VERSIÓN: 8.0 - Orquestación con Sección de Biografía Fusionada.
// DESCRIPCIÓN: Se elimina la importación y renderizado del componente 'HistorySection'
//              ya que su efecto visual ha sido fusionado directamente en la nueva
//              versión de 'AboutSection', creando una experiencia unificada.

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { HeroCarousel } from '@/components/sections/homepage/HeroCarousel';
import { AboutSection } from '@/components/sections/homepage/AboutSection';
import { TechStackSection } from '@/components/sections/homepage/TechStackSection';
import { ValuePropositionSection } from '@/components/sections/homepage/ValuePropositionSection';
import { ContactSection } from '@/components/sections/homepage/ContactSection';
// import { HistorySection } from '@/components/sections/homepage/HistorySection'; // <-- 1. ELIMINAR ESTA LÍNEA
import { JsonLdScript } from '@/components/ui/JsonLdScript';

const fontClashDisplay = localFont({
  src: [
    { path: '../../../public/fonts/ClashDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/ClashDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});

type HomePageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const heroTranslations = dictionary.homepage.hero;

  return {
    title: heroTranslations.page_title,
    description: heroTranslations.page_description,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const homepageDict = dictionary.homepage;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raz Podestá',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4200',
    jobTitle: 'Arquitecto de Soluciones Creativas e Inteligentes',
    knowsAbout: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Artificial Intelligence', 'Creative Development'],
  };

  return (
    <div className={fontClashDisplay.variable}>
      <JsonLdScript data={personSchema} />

      <HeroCarousel dictionary={homepageDict.hero} />

      {/* Renderiza la nueva versión fusionada de AboutSection */}
      <AboutSection dictionary={homepageDict.about_section} />

      <TechStackSection dictionary={homepageDict.value_proposition_section} />
      <ValuePropositionSection dictionary={homepageDict.value_proposition_section} />
      <ContactSection dictionary={homepageDict.contact} />

      {/* --- 2. ELIMINAR EL COMPONENTE HistorySection de aquí --- */}
      {/* <HistorySection dictionary={homepageDict.history_section} /> */}
    </div>
  );
}
