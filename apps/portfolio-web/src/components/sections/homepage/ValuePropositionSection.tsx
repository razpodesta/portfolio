// RUTA: apps/portfolio-web/src/components/sections/homepage/ValuePropositionSection.tsx
// VERSIÓN: 2.3 - Nivelado para Jerarquía Visual.
// DESCRIPCIÓN: Se ha actualizado el contenedor Flexbox para alinear los ítems
//              en la parte inferior ('md:items-end') en la vista de escritorio.
//              Este cambio es crucial para permitir la nueva jerarquía visual
//              de tamaño incremental en los PillarCards.

'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Blocks, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import type { Dictionary } from '../../../lib/schemas/dictionary.schema';
import { PillarCard } from '../../ui/PillarCard';

type ValuePropositionSectionProps = {
  dictionary: Dictionary['homepage']['value_proposition_section'];
};

const pillarIcons = [Blocks, Sparkles, TrendingUp];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const connectorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function ValuePropositionSection({ dictionary }: ValuePropositionSectionProps) {
  return (
    <section className="w-full bg-zinc-950/50 py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center mb-16 md:mb-24"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {dictionary.title}
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            {dictionary.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          // --- MEJORA ARQUITECTÓNICA: Alineación para altura variable ---
          className="flex flex-col md:flex-row items-center md:items-end justify-center gap-8"
        >
          {dictionary.pillars.map((pillar, index) => (
            <React.Fragment key={pillar.title}>
              <PillarCard
                Icon={pillarIcons[index]}
                title={pillar.title}
                description={pillar.description}
                sequence={index + 1}
                className="flex-1 min-w-0"
              />

              {index < dictionary.pillars.length - 1 && (
                <motion.div
                  variants={connectorVariants}
                  className="hidden md:flex items-center justify-center"
                >
                  <ChevronRight className="h-12 w-12 text-zinc-700" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
