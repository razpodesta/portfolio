// apps/portfolio-web/src/app/[lang]/page.tsx

/**
 * @file Página de Inicio (Homepage).
 * @version 11.0 - Font Cleanup
 * @description Se elimina la carga local de fuentes (localFont) ya que ahora
 *              se heredan globalmente desde el Layout.
 */

import type { Metadata } from 'next';
// import localFont removido - Ya está en el layout
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { HeroCarousel } from '@/components/sections/homepage/HeroCarousel';
import { AboutSection } from '@/components/sections/homepage/AboutSection';
import { TechStackSection } from '@/components/sections/homepage/TechStackSection';
import { ValuePropositionSection } from '@/components/sections/homepage/ValuePropositionSection';
import { ContactSection } from '@/components/sections/homepage/ContactSection';
import { AiContentSection } from '@/components/sections/homepage/AiContentSection';
import { JsonLdScript } from '@/components/ui/JsonLdScript';

// --- TIPADO SOBERANO ---
type HomePageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata(props: HomePageProps): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const heroTranslations = dictionary.homepage.hero;

  return {
    title: heroTranslations.page_title,
    description: heroTranslations.page_description,
  };
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
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
    // Eliminamos className={fontClashDisplay.variable} ya que está en el body del layout
    <div>
      <JsonLdScript data={personSchema} />

      <HeroCarousel dictionary={homepageDict.hero} />

      <AboutSection dictionary={homepageDict.about_section} />

      <TechStackSection dictionary={homepageDict.value_proposition_section} />

      <ValuePropositionSection dictionary={homepageDict.value_proposition_section} />

      <AiContentSection dictionary={homepageDict.ai_gallery_section} />

      <ContactSection dictionary={homepageDict.contact} />
    </div>
  );
}
