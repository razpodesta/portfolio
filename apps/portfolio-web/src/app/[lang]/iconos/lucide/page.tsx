// RUTA: apps/portfolio-web/src/app/[lang]/iconos/lucide/page.tsx
// VERSIÓN: 3.0 - Data-Only Server Component
// DESCRIPCIÓN: Pasa datos puramente serializables al cliente.

import type { Metadata } from 'next';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { BlurText } from '@/components/razBits/BlurText';
import { IconLibraryExplorer, type LibraryAsset } from '@/components/shared/IconLibraryExplorer';
import rawLucideData from '@/data/lucide-icons.json';

interface LucideJsonEntry {
  id: string;
  name: string;
  category: string;
  tags: string[];
  url: string;
}

type PageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.lucide_page.page_title,
    description: dictionary.lucide_page.page_description,
  };
}

export default async function LucideIconsPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.lucide_page;

  // Casting seguro de datos JSON
  const data = rawLucideData as LucideJsonEntry[];

  // Mapeo a estructura plana (sin funciones/componentes)
  const assets: LibraryAsset[] = data.map((icon) => ({
    id: icon.id,
    name: icon.name,
    category: icon.category,
    url: icon.url,
    tags: icon.tags,
  }));

  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <div className="container mx-auto px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <BlurText
            text={t.header_title}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl justify-center mb-6"
            animateBy="words"
          />
          <p className="font-sans text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {t.header_subtitle}
          </p>
        </div>

        <IconLibraryExplorer
          assets={assets}
          dictionary={t}
          accentColor="pink"
          libraryType="lucide" // Indicamos que use la librería Lucide
        />
      </div>
    </main>
  );
}
