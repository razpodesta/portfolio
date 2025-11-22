// RUTA: apps/portfolio-web/src/app/[lang]/tecnologias/page.tsx
// VERSIÓN: 3.0 - Data-Only Server Component

import type { Metadata } from 'next';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { BlurText } from '@/components/razBits/BlurText';
import { IconLibraryExplorer, type LibraryAsset } from '@/components/shared/IconLibraryExplorer';
import techData from '@/data/technologies.json';

type PageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.technologies_page.page_title,
    description: dictionary.technologies_page.page_description,
  };
}

export default async function TechIconsPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.technologies_page;

  // Mapeo a estructura plana (el JSON ya viene limpio)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assets: LibraryAsset[] = techData.map((icon: any) => ({
    id: icon.id,
    name: icon.name,
    category: icon.category,
    url: icon.url,
    // No pasamos IconComponent
  }));

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <BlurText
            text={t.header_title}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl justify-center mb-6"
            animateBy="words"
          />
          <p className="font-sans text-lg text-zinc-400 max-w-2xl mx-auto">
            {t.header_subtitle}
          </p>
        </div>

        <IconLibraryExplorer
          assets={assets}
          dictionary={t}
          accentColor="purple"
          libraryType="simple-icons" // Indicamos que use Simple Icons
        />
      </div>
    </main>
  );
}
