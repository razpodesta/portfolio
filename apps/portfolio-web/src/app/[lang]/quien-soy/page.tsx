// RUTA: apps/portfolio-web/src/app/[lang]/quien-soy/page.tsx
// VERSIÓN: 2.1 - Tipado de Variantes Corregido.
// DESCRIPCIÓN: Se importa el tipo 'Variants' de Framer Motion y se aplica a las
//              constantes de animación para garantizar la seguridad de tipos
//              y resolver errores de compilación.

import type { Metadata } from 'next';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { BlurText } from '@/components/razBits/BlurText';
import { motion, type Variants } from 'framer-motion';
import { Avatar } from '@/components/ui/Avatar';
import type { Section } from '@/lib/schemas/quien_soy.schema';

type QuienSoyPageProps = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: QuienSoyPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.quien_soy;
  return {
    title: t.page_title,
    description: t.page_description,
  };
}

// --- CORRECCIÓN DE TIPO ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.4, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
// --- FIN DE LA CORRECCIÓN ---

// Componente de Acto para evitar repetición de código
const ActSection = ({ act, title, description }: { act: string; title: string; description: string }) => (
  <motion.div variants={itemVariants}>
    <h2 className="font-display text-3xl font-bold text-white mb-3">{act}: <span className="text-purple-400">{title}</span></h2>
    <p className="font-sans text-lg text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
);

export default async function QuienSoyPage({ params }: QuienSoyPageProps) {
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.quien_soy;

  const acts: { id: string; content: Section }[] = [
    { id: 'I', content: t.act_i },
    { id: 'II', content: t.act_ii },
    { id: 'III', content: t.act_iii },
    { id: 'IV', content: t.act_iv },
    { id: 'V', content: t.act_v },
  ];

  return (
    <main className="container mx-auto px-4 py-20 sm:py-32">
      <section className="mx-auto max-w-4xl text-center mb-24">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <Avatar
            src="/images/raz-podesta-avatar.jpg"
            alt="Foto de Raz Podestá"
            size="xl"
            shape="circle"
            className="border-4 border-zinc-800 shadow-2xl shadow-purple-500/20"
          />
        </motion.div>
        <BlurText
          text={t.intro_title}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl justify-center mb-4"
          animateBy="words"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-sans text-xl text-zinc-300"
        >
          {t.intro_subtitle}
        </motion.p>
      </section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-3xl space-y-16"
      >
        {acts.map((act) => (
          <ActSection
            key={act.id}
            act={`Acto ${act.id}`}
            title={act.content.title}
            description={act.content.description}
          />
        ))}
      </motion.div>
    </main>
  );
}
