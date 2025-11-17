// RUTA: apps/portfolio-web/src/app/[lang]/sistema-de-diseno/page.tsx
// VERSIÓN: 1.0 - Boilerplate para el Sistema de Diseño.
// DESCRIPCIÓN: Página placeholder que servirá como escaparate público de los
//              componentes de UI, tipografía y paleta de colores del proyecto.

import type { Metadata } from 'next';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { BlurText } from '@/components/razBits/BlurText';
import { motion } from 'framer-motion';

type DesignSystemPageProps = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: DesignSystemPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.design_system_page;
  return {
    title: t.page_title,
    description: t.page_description,
  };
}

export default async function DesignSystemPage({ params }: DesignSystemPageProps) {
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.design_system_page;

  return (
    <main className="container mx-auto px-4 py-20 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <BlurText
          text={t.title}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl justify-center mb-4"
          animateBy="words"
        />
        <p className="font-sans text-xl text-zinc-300 mb-12">{t.subtitle}</p>

        <div className="rounded-lg border border-dashed border-zinc-700 p-12">
            <p className="text-zinc-500">{t.construction_notice}</p>
        </div>
      </motion.div>
    </main>
  );
}
