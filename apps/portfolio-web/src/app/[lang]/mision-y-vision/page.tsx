// RUTA: apps/portfolio-web/src/app/[lang]/mision-y-vision/page.tsx
// VERSIÓN: 1.1 - Tipado explícito y robusto.
// DESCRIPCIÓN: Se importa y utiliza el tipo `VisionPillar` para añadir tipado
//              explícito al método .map(), eliminando errores de 'implicit any'
//              y mejorando la robustez y legibilidad del código.

import type { Metadata } from 'next';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { BlurText } from '@/components/razBits/BlurText';
import { PillarCard } from '@/components/ui/PillarCard';
import { motion } from 'framer-motion';
import { BookOpen, BrainCircuit, Goal } from 'lucide-react';
import React from 'react';
// --- INICIO DE LA MEJORA DE ROBUSTEZ ---
import type { VisionPillar } from '@/lib/schemas/mission_vision.schema';
// --- FIN DE LA MEJORA DE ROBUSTEZ ---

type MissionVisionPageProps = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: MissionVisionPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.mission_vision; // Esto funcionará después del prebuild
  return {
    title: `${t.mission_title} & ${t.vision_title}`,
    description: t.mission_description,
  };
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const pillarIcons = [BookOpen, BrainCircuit, Goal];

export default async function MissionVisionPage({ params }: MissionVisionPageProps) {
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.mission_vision; // Esto funcionará después del prebuild

  return (
    <div className={`font-display ${'var(--font-display)'}`}>
      <main className="container mx-auto px-4 py-20 sm:py-32">
        {/* Sección de Misión */}
        <section className="mx-auto max-w-4xl text-center">
          <BlurText
            text={t.mission_title}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl justify-center mb-6"
            animateBy="words"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="font-sans text-lg text-zinc-400"
          >
            {t.mission_description}
          </motion.p>
        </section>

        {/* Separador Visual */}
        <div className="mx-auto my-20 h-px w-2/3 bg-zinc-800" />

        {/* Sección de Visión */}
        <section className="mx-auto max-w-5xl text-center">
          <BlurText
            text={t.vision_title}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl justify-center mb-4"
            animateBy="words"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="font-sans text-lg text-zinc-400 mb-20"
          >
            {t.vision_subtitle}
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row items-center md:items-end justify-center gap-8"
          >
            {/* --- INICIO DE LA MEJORA DE ROBUSTEZ --- */}
            {t.vision_pillars.map((pillar: VisionPillar, index: number) => (
            // --- FIN DE LA MEJORA DE ROBUSTEZ ---
              <React.Fragment key={pillar.title}>
                <PillarCard
                  Icon={pillarIcons[index]}
                  title={pillar.title}
                  description={pillar.description}
                  sequence={index + 1}
                  className="flex-1 min-w-0"
                />
              </React.Fragment>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
