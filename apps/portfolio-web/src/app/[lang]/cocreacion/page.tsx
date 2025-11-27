// apps/portfolio-web/src/app/[lang]/cocreacion/page.tsx

/**
 * @file Página de Co-creación.
 * @version 3.1 - Lint Fixed
 * @description Corrección de rutas relativas (3 niveles).
 */

import type { Metadata } from 'next';

// CORRECCIÓN: 3 niveles hacia arriba
import { type Locale } from '../../../config/i18n.config';
import { getDictionary } from '../../../lib/get-dictionary';
import { BlurText } from '../../../components/razBits/BlurText';
import { FadeIn } from '../../../components/ui/FadeIn';

type CocreationPageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata(props: CocreationPageProps): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.cocreation_page;
  return {
    title: t.page_title,
    description: t.page_description,
  };
}

export default async function CocreationPage(props: CocreationPageProps) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.cocreation_page;

  return (
    <main className="container mx-auto px-4 py-20 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <BlurText
            text={t.title}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl justify-center mb-4"
            animateBy="words"
          />
          <p className="font-sans text-xl text-zinc-300 mb-12">{t.subtitle}</p>

          <div className="rounded-lg border border-dashed border-zinc-700 p-12">
              <p className="text-zinc-500">{t.construction_notice}</p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
