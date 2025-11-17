// RUTA: apps/portfolio-web/src/components/sections/homepage/TechStackSection.tsx
// VERSIÓN: 3.0 - Integración de Título Animado y CTA Internacionalizado.
// DESCRIPCIÓN: Este componente ahora utiliza el nuevo componente reutilizable `BlurText`
//              para renderizar un título animado. Se ha refactorizado para aceptar
//              el objeto de diccionario completo de su sección, permitiendo la
//              internacionalización tanto del título como del nuevo texto CTA.

'use client';

import { useRef } from 'react';
import {
    SiReact, SiNextdotjs, SiTailwindcss, SiSvelte, SiTypescript, SiJavascript,
    SiHtml5, SiCss, SiVite, SiVuedotjs, SiAngular, SiFramer,
    SiRedux, SiNodedotjs, SiNestjs, SiPython, SiGo, SiGraphql, SiPostgresql,
    SiMongodb, SiRedis, SiSupabase, SiFirebase, SiVercel, SiNetlify, SiGit,
    SiGithub, SiEslint, SiPrettier, SiJest, SiWebpack, SiPnpm,
    SiShopify, SiWoocommerce, SiPrestashop, SiVtex, SiGoogleads, SiMeta,
    SiTiktok, SiSpotify, SiGoogleanalytics, SiMailchimp, SiFigma, SiOpenai,
    SiHuggingface, SiTensorflow, SiPytorch, SiN8n, SiZapier
} from '@icons-pack/react-simple-icons';
import { GridScan } from '../../razBits/GridScan';
import { BlurText } from '../../razBits/BlurText';
import { useInfiniteCarouselAnimation } from '../../../lib/hooks/use-infinite-carousel-animation';
import type { Dictionary } from '../../../lib/schemas/dictionary.schema';

type TechStackSectionProps = {
  // Se espera el objeto de diccionario completo para esta sección
  dictionary: Dictionary['homepage']['value_proposition_section'];
};

// ===================================================================================
// DEFINICIÓN DE DATOS Y SUB-COMPONENTES
// ===================================================================================

const technologies = [
  { name: 'React', icon: SiReact, url: 'https://react.dev/' },
  { name: 'Next.js', icon: SiNextdotjs, url: 'https://nextjs.org/' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, url: 'https://tailwindcss.com/' },
  { name: 'Svelte', icon: SiSvelte, url: 'https://svelte.dev/' },
  { name: 'TypeScript', icon: SiTypescript, url: 'https://www.typescriptlang.org/' },
  { name: 'JavaScript', icon: SiJavascript, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'HTML5', icon: SiHtml5, url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' },
  { name: 'CSS3', icon: SiCss, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'Vite', icon: SiVite, url: 'https://vitejs.dev/' },
  { name: 'Vue.js', icon: SiVuedotjs, url: 'https://vuejs.org/' },
  { name: 'Angular', icon: SiAngular, url: 'https://angular.io/' },
  { name: 'Framer Motion', icon: SiFramer, url: 'https://www.framer.com/motion/' },
  { name: 'Redux', icon: SiRedux, url: 'https://redux.js.org/' },
  { name: 'Node.js', icon: SiNodedotjs, url: 'https://nodejs.org/' },
  { name: 'NestJS', icon: SiNestjs, url: 'https://nestjs.com/' },
  { name: 'Python', icon: SiPython, url: 'https://www.python.org/' },
  { name: 'Go', icon: SiGo, url: 'https://go.dev/' },
  { name: 'GraphQL', icon: SiGraphql, url: 'https://graphql.org/' },
  { name: 'PostgreSQL', icon: SiPostgresql, url: 'https://www.postgresql.org/' },
  { name: 'MongoDB', icon: SiMongodb, url: 'https://www.mongodb.com/' },
  { name: 'Redis', icon: SiRedis, url: 'https://redis.io/' },
  { name: 'Supabase', icon: SiSupabase, url: 'https://supabase.com/' },
  { name: 'Firebase', icon: SiFirebase, url: 'https://firebase.google.com/' },
  { name: 'Vercel', icon: SiVercel, url: 'https://vercel.com/' },
  { name: 'Netlify', icon: SiNetlify, url: 'https://www.netlify.com/' },
  { name: 'Git', icon: SiGit, url: 'https://git-scm.com/' },
  { name: 'GitHub', icon: SiGithub, url: 'https://github.com/' },
  { name: 'ESLint', icon: SiEslint, url: 'https://eslint.org/' },
  { name: 'Prettier', icon: SiPrettier, url: 'https://prettier.io/' },
  { name: 'Jest', icon: SiJest, url: 'https://jestjs.io/' },
  { name: 'Webpack', icon: SiWebpack, url: 'https://webpack.js.org/' },
  { name: 'PNPM', icon: SiPnpm, url: 'https://pnpm.io/' },
  { name: 'Shopify', icon: SiShopify, url: 'https://www.shopify.com/' },
  { name: 'WooCommerce', icon: SiWoocommerce, url: 'https://woocommerce.com/' },
  { name: 'PrestaShop', icon: SiPrestashop, url: 'https://www.prestashop.com/' },
  { name: 'VTEX', icon: SiVtex, url: 'https://vtex.com/' },
  { name: 'Google Ads', icon: SiGoogleads, url: 'https://ads.google.com/' },
  { name: 'Meta Ads', icon: SiMeta, url: 'https://www.facebook.com/business/ads' },
  { name: 'TikTok Ads', icon: SiTiktok, url: 'https://www.tiktok.com/business/' },
  { name: 'Spotify Ads', icon: SiSpotify, url: 'https://ads.spotify.com/' },
  { name: 'Google Analytics', icon: SiGoogleanalytics, url: 'https://analytics.google.com/' },
  { name: 'Mailchimp', icon: SiMailchimp, url: 'https://mailchimp.com/' },
  { name: 'Figma', icon: SiFigma, url: 'https://www.figma.com/' },
  { name: 'OpenAI', icon: SiOpenai, url: 'https://openai.com/' },
  { name: 'Hugging Face', icon: SiHuggingface, url: 'https://huggingface.co/' },
  { name: 'TensorFlow', icon: SiTensorflow, url: 'https://www.tensorflow.org/' },
  { name: 'PyTorch', icon: SiPytorch, url: 'https://pytorch.org/' },
  { name: 'n8n', icon: SiN8n, url: 'https://n8n.io/' },
  { name: 'Zapier', icon: SiZapier, url: 'https://zapier.com/' },
];

const TechItem = ({ item }: { item: (typeof technologies)[0] }) => (
  <a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Más información sobre ${item.name}`}
    className="group flex shrink-0 items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/50 px-6 py-3 transition-all duration-300 hover:bg-zinc-800/80"
  >
    <item.icon className="h-6 w-6 text-zinc-500 transition-all duration-300 group-hover:text-white" />
    <span className="text-sm font-medium text-zinc-400 transition-colors duration-300 group-hover:text-white">{item.name}</span>
  </a>
);

// ===================================================================================
// COMPONENTE PRINCIPAL DE LA SECCIÓN
// ===================================================================================

export function TechStackSection({ dictionary }: TechStackSectionProps) {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useInfiniteCarouselAnimation([
    { ref: track1Ref, duration: 120, direction: 1 },
    { ref: track2Ref, duration: 150, direction: -1 },
  ]);

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24">
      <GridScan
        className="absolute inset-0 z-0"
        linesColor="#27272a"
        scanColor="#a855f7"
        bloomIntensity={0.2}
        scanOpacity={0.3}
        scanGlow={0.8}
        noiseIntensity={0.005}
      />

      <div className="relative z-10">
        <div className="container mx-auto px-4 mb-12 text-center">
          <BlurText
            text={dictionary.tech_stack_title}
            className="font-display text-4xl font-bold text-white sm:text-5xl justify-center"
            animateBy="words"
          />
        </div>

        <div className="space-y-6">
          <div ref={track1Ref} className="flex w-max gap-6">
            {technologies.map((tech) => <TechItem key={`${tech.name}-track1`} item={tech} />)}
          </div>
          <div ref={track2Ref} className="flex w-max gap-6">
            {technologies.map((tech) => <TechItem key={`${tech.name}-track2`} item={tech} />)}
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12 text-center">
            <p className="text-sm text-zinc-500">
                {dictionary.tech_stack_cta}
            </p>
        </div>
      </div>
    </section>
  );
}
