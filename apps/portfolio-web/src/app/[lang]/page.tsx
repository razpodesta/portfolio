// apps/portfolio-web/src/app/[lang]/page.tsx

/**
 * @file Página de Inicio (Homepage).
 * @version 13.0 - Relative Imports
 * @description Usa rutas relativas para importar componentes, evitando errores de Nx.
 */

import type { Metadata } from 'next';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { getAllPosts } from '@/lib/blog';

// CORRECCIÓN: Rutas relativas estrictas (subiendo 3 niveles hasta src)
import { HeroCarousel } from '../../components/sections/homepage/HeroCarousel';
import { AboutSection } from '../../components/sections/homepage/AboutSection';
import { TechStackSection } from '../../components/sections/homepage/TechStackSection';
import { ValuePropositionSection } from '../../components/sections/homepage/ValuePropositionSection';
import { BlogSection3D } from '../../components/sections/homepage/BlogSection3D';
import { AiContentSection } from '../../components/sections/homepage/AiContentSection';
import { ContactSection } from '../../components/sections/homepage/ContactSection';
import { JsonLdScript } from '../../components/ui/JsonLdScript';

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

  const latestPosts = await getAllPosts();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raz Podestá',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4200',
    jobTitle: 'Arquitecto de Soluciones Creativas e Inteligentes',
    knowsAbout: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Artificial Intelligence', 'Creative Development'],
  };

  return (
    <div>
      <JsonLdScript data={personSchema} />

      <HeroCarousel dictionary={homepageDict.hero} />

      <AboutSection dictionary={homepageDict.about_section} />

      <TechStackSection dictionary={homepageDict.value_proposition_section} />

      <ValuePropositionSection dictionary={homepageDict.value_proposition_section} />

      <BlogSection3D
        posts={latestPosts}
        dictionary={dictionary.blog_page}
        lang={params.lang}
      />

      <AiContentSection dictionary={homepageDict.ai_gallery_section} />

      <ContactSection dictionary={homepageDict.contact} />
    </div>
  );
}
