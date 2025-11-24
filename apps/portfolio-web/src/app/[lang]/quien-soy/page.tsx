// apps/portfolio-web/src/app/[lang]/quien-soy/page.tsx

/**
 * @file Página Quién Soy.
 * @version 4.0 - Server Component Puro con Islas de Cliente
 * @description Se delega la animación compleja al componente AnimatedActs.
 */

import type { Metadata } from 'next';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { BlurText } from '@/components/razBits/BlurText';
import { FadeIn } from '@/components/ui/FadeIn'; // Wrapper simple
import { Avatar } from '@/components/ui/Avatar';
import { AnimatedActs } from '@/components/sections/quien-soy/AnimatedActs'; // Nueva isla
import type { Section } from '@/lib/schemas/quien_soy.schema';

type QuienSoyPageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata(props: QuienSoyPageProps): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.quien_soy;
  return {
    title: t.page_title,
    description: t.page_description,
  };
}

export default async function QuienSoyPage(props: QuienSoyPageProps) {
  const params = await props.params;
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
        <FadeIn>
          <div className="flex justify-center mb-8">
            <Avatar
              src="/images/raz-podesta-avatar.jpg"
              alt="Foto de Raz Podestá"
              size="xl"
              shape="circle"
              className="border-4 border-zinc-800 shadow-2xl shadow-purple-500/20"
            />
          </div>
        </FadeIn>

        <BlurText
          text={t.intro_title}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl justify-center mb-4"
          animateBy="words"
        />

        <FadeIn delay={0.8}>
          <p className="font-sans text-xl text-zinc-300">
            {t.intro_subtitle}
          </p>
        </FadeIn>
      </section>

      {/* Isla de Cliente para la lista animada compleja */}
      <AnimatedActs acts={acts} />
    </main>
  );
}
