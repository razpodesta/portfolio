// RUTA: apps/portfolio-web/src/app/[lang]/page.tsx
// VERSIÓN: 9.0 - Integración de AI Visual Synth (Visual Gallery)
// DESCRIPCIÓN: Se importa y monta 'AiContentSection' para exhibir la galería
//              orbital impulsada por Ideogram 3.0.

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { HeroCarousel } from '@/components/sections/homepage/HeroCarousel';
import { AboutSection } from '@/components/sections/homepage/AboutSection';
import { TechStackSection } from '@/components/sections/homepage/TechStackSection';
import { ValuePropositionSection } from '@/components/sections/homepage/ValuePropositionSection';
import { ContactSection } from '@/components/sections/homepage/ContactSection';
// --- 1. IMPORTAR EL NUEVO COMPONENTE ---
import { AiContentSection } from '@/components/sections/homepage/AiContentSection';
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

      <AboutSection dictionary={homepageDict.about_section} />

      <TechStackSection dictionary={homepageDict.value_proposition_section} />

      <ValuePropositionSection dictionary={homepageDict.value_proposition_section} />

      {/* --- 2. MONTAR LA SECCIÓN DE IA AQUÍ --- */}
      {/* Se ubica estratégicamente antes del contacto para cerrar la propuesta de valor visual */}
      <AiContentSection dictionary={homepageDict.ai_gallery_section} />

      <ContactSection dictionary={homepageDict.contact} />
    </div>
  );
}
