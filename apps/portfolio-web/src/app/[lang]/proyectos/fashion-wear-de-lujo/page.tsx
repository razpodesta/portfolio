// RUTA: apps/portfolio-web/src/app/[lang]/proyectos/fashion-wear-de-lujo/page.tsx
// VERSIÓN: 2.0 - Next.js 15 Compliant (Viewport API)
// DESCRIPCIÓN: Se separa 'themeColor' en un export 'viewport' dedicado.

import type { Metadata, Viewport } from 'next';

// --- CORRECCIÓN DE IMPORTACIONES ---
import { getDictionary } from '../../../../lib/get-dictionary';
import type { Locale } from '../../../../config/i18n.config';
import { FadeIn } from '../../../../components/ui/FadeIn';
// --------------------------------------------------------------

import { FashionHeader } from './_components/FashionHeader';
import { RunwayHero } from './_components/RunwayHero';
import { HorizontalLookbook } from './_components/HorizontalLookbook';

// --- TIPADO ---
type PageProps = {
  params: Promise<{ lang: Locale }>;
};

// --- VIEWPORT (Next.js 15 Standard) ---
export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

// --- METADATOS SEO ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const project = dict.project_details['fashion-wear-de-lujo'];

  return {
    title: project?.title || 'Noir Éternel | Luxury Fashion',
    description: project?.subtitle || 'Experiencia de moda inmersiva y vanguardista.',
    // themeColor eliminado de aquí
  };
}

export default async function FashionPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <main className="bg-white min-h-screen selection:bg-black selection:text-white">
      <FashionHeader lang={lang} />

      {/* HERO SECTION */}
      <RunwayHero />

      {/* MANIFESTO (Brutalismo Tipográfico) */}
      <section className="py-32 px-4 md:px-12 bg-white text-black">
        <div className="container mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-black pt-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs uppercase tracking-widest block mb-2">( 01 )</span>
                <span className="font-mono text-xs uppercase tracking-widest block">Manifesto</span>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-heading text-4xl md:text-6xl leading-tight uppercase">
                  La moda no es utilidad.<br />
                  Es <span className="italic font-serif lowercase">actitud</span>.
                </h2>
                <div className="mt-12 grid grid-cols-2 gap-8 max-w-2xl">
                  <p className="font-body text-sm leading-relaxed text-justify">
                    En un mundo saturado de ruido, el silencio es el lujo definitivo.
                    Nuestra colección Primavera 2025 explora los límites entre la estructura
                    y el caos, utilizando materiales sostenibles de grado aeroespacial.
                  </p>
                  <p className="font-body text-sm leading-relaxed text-justify">
                    Cada pieza es numerada y registrada en blockchain para garantizar
                    su autenticidad perpetua. Bienvenido a la nueva era del couture digital.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LOOKBOOK (Scroll Horizontal) */}
      <HorizontalLookbook />

      {/* MEMBER ZONE (CTA) */}
      <section className="relative py-40 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-[0.3em] mb-6">Acceso Reservado</p>
          <h2 className="font-heading text-5xl md:text-8xl uppercase tracking-tighter mb-12">
            Join The <br/><span className="italic font-serif">Culte</span>
          </h2>

          <div className="max-w-md mx-auto">
            <form className="flex border-b border-white pb-2">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent w-full outline-none text-white placeholder-zinc-600 font-mono text-sm uppercase tracking-wider"
              />
              <button className="text-white font-bold uppercase text-xs tracking-widest hover:text-zinc-400 transition-colors">
                Suscribirse
              </button>
            </form>
            <p className="mt-4 text-[10px] text-zinc-600 font-mono uppercase text-left">
              Al unirse, acepta recibir comunicaciones encriptadas.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER MINIMALISTA */}
      <footer className="bg-white text-black py-12 px-6 border-t border-black">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-end">
           <div>
             <h3 className="font-signature text-3xl">Noir Éternel</h3>
             <p className="font-mono text-[10px] mt-2">© 2025 RAZ PODESTÁ PROJECT</p>
           </div>
           <div className="flex gap-8 mt-8 md:mt-0 font-mono text-xs uppercase tracking-widest">
             <a href="#" className="hover:line-through">Instagram</a>
             <a href="#" className="hover:line-through">Legal</a>
             <a href="#" className="hover:line-through">Contact</a>
           </div>
        </div>
      </footer>
    </main>
  );
}
