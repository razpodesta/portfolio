// RUTA: apps/portfolio-web/src/app/[lang]/proyectos/[slug]/page.tsx
// VERSIÓN: 1.2 - Build-Safe (Defensive Coding)
// DESCRIPCIÓN: Se añade lógica defensiva en generateStaticParams para evitar
//              que el build falle si el diccionario no se carga correctamente.

import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, LayoutTemplate } from 'lucide-react';

// --- CORRECCIONES DE IMPORTACIÓN (Rutas Relativas Estrictas) ---
import { i18n, type Locale } from '../../../../config/i18n.config';
import { getDictionary } from '../../../../lib/get-dictionary';
import { getFontClassName } from '../../../../lib/fonts';
import { ProjectTechModal } from '../../../../components/projects/ProjectTechModal';
import { BlurText } from '../../../../components/razBits/BlurText';
import { FadeIn } from '../../../../components/ui/FadeIn';

type ProjectPageProps = {
  params: Promise<{ lang: Locale; slug: string }>;
};

// 1. Generación Estática de Rutas (SSG)
export async function generateStaticParams() {
  try {
    // Para obtener las claves, cargamos el diccionario por defecto
    const dict = await getDictionary(i18n.defaultLocale);

    // --- DEFENSA CONTRA DICCIONARIO INCOMPLETO ---
    if (!dict || !dict.project_details) {
      console.warn('⚠️ [SSG] Diccionario de detalles de proyecto no disponible. Saltando generación estática.');
      return [];
    }
    // ---------------------------------------------

    const projectKeys = Object.keys(dict.project_details);

    return i18n.locales.flatMap((lang) =>
      projectKeys.map((slug) => ({
        lang,
        slug,
      }))
    );
  } catch (error) {
    console.error('❌ [SSG] Error generando params estáticos para proyectos:', error);
    return []; // Fallback seguro: No generar páginas estáticas, dejar que se generen on-demand (ISR)
  }
}

// 2. Metadatos Dinámicos SEO
export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  // Acceso seguro con optional chaining
  const project = dict?.project_details?.[slug];

  if (!project) return { title: 'Proyecto No Encontrado' };

  return {
    title: `${project.title} | Arquetipo Digital`,
    description: project.subtitle,
    openGraph: {
      images: [`/images/projects/${slug}/og-1200x630-preview.jpg`],
    },
  };
}

// 3. Componente de Página
export default async function ProjectArchetypePage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  // Acceso seguro
  const project = dict?.project_details?.[slug];

  // Protección contra 404 si el slug no existe en el diccionario
  if (!project) {
    notFound();
  }

  // Resolución de Tipografía Dinámica
  const fontHeadingClass = getFontClassName(project.branding.font_heading);
  const fontBodyClass = getFontClassName(project.branding.font_body);

  // Rutas de Assets (Convención estricta)
  const heroImage = `/images/projects/${slug}/hero-1920x1080.jpg`;

  return (
    // Inyección de variables CSS para colores específicos del proyecto
    <div
      style={{
        '--project-primary': project.branding.primary_color
      } as React.CSSProperties}
      className={`min-h-screen bg-black text-white ${fontBodyClass}`}
    >
      {/* MODAL TÉCNICO PROACTIVO */}
      <ProjectTechModal data={project} />

      {/* HERO SECTION DINÁMICO */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        {/* Fondo con Imagen */}
        <div className="absolute inset-0 z-0">
           <Image
             src={heroImage}
             alt={`Hero de ${project.title}`}
             fill
             className="object-cover opacity-40"
             priority
           />
           <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <FadeIn>
            {/* --- CORRECCIÓN DE SINTAXIS TAILWIND v4 --- */}
            <span className={`mb-4 inline-block rounded-full border border-(--project-primary) bg-(--project-primary)/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-(--project-primary) backdrop-blur-md`}>
              Arquetipo {project.branding.layout_style}
            </span>
          </FadeIn>

          <BlurText
            text={project.title}
            className={`${fontHeadingClass} text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl justify-center mt-4 mb-6`}
            animateBy="words"
          />

          <FadeIn delay={0.4}>
            <p className="mx-auto max-w-2xl text-xl text-zinc-300 font-light leading-relaxed">
              {project.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SECCIÓN DE CONTENIDO */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-[1fr_300px]">

            {/* Columna Principal */}
            <div className="space-y-12">
              <div>
                <h2 className={`${fontHeadingClass} text-3xl font-bold text-white mb-6`}>
                  Componentes de Interfaz
                </h2>
                <p className="text-zinc-400 mb-8">
                  Este arquetipo está compuesto por las siguientes secciones modulares, diseñadas para maximizar la conversión y la experiencia de usuario.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {project.ui_sections.map((section, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-(--project-primary) transition-colors group">
                      <div className="p-2 rounded-lg bg-zinc-950 text-zinc-500 group-hover:text-(--project-primary) transition-colors">
                        <LayoutTemplate size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-200">{section}</h4>
                        <p className="text-xs text-zinc-500 mt-1">Módulo React Reutilizable</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Sticky */}
            <div className="relative">
              <div className="sticky top-32 space-y-8">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <h3 className="font-bold text-white mb-4">Ficha Técnica</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-zinc-500 uppercase tracking-wider">Stack</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tech_stack.slice(0, 3).map(t => (
                          <span key={t} className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-zinc-800">
                      <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-(--project-primary) px-4 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
                        Iniciar Proyecto Similar <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
