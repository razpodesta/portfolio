// RUTA: apps/portfolio-web/src/app/[lang]/page.tsx
// VERSIÓN: 2.3 - Final (Sin ProjectsSection)

import type { Metadata } from 'next';
import { type Locale } from '../../config/i18n.config';
import { getDictionary } from '../../dictionaries/get-dictionary';
import { HeroCarousel } from '../../components/sections/homepage/HeroCarousel';
// --- ProjectsSection ya no se importa ---
import { ContactSection } from '../../components/sections/homepage/ContactSection';
import { JsonLdScript } from '../../components/ui/JsonLdScript';

type HomePageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const heroTranslations = dictionary.homepage.hero;

  const title = heroTranslations.page_title;
  const description = heroTranslations.page_description;

  return {
    title,
    description,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raz Podestá', // <-- ACTUALIZADO
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4200',
    jobTitle: 'Arquitecto de Soluciones Creativas e Inteligentes', // <-- ACTUALIZADO
    knowsAbout: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Artificial Intelligence', 'Creative Development'],
  };

  return (
    <>
      <JsonLdScript data={personSchema} />

      <>
        <HeroCarousel dictionary={dictionary.homepage.hero} />
        {/* --- La línea que renderizaba ProjectsSection ha sido eliminada --- */}
        <ContactSection dictionary={dictionary.homepage.contact} />
      </>
    </>
  );
}
