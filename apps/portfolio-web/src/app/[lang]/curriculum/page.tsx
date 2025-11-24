// apps/portfolio-web/src/app/[lang]/curriculum/page.tsx

/**
 * @file Página de Currículum.
 * @version 16.0 - Type-Safe Icon Props
 * @description Soluciona el error de asignación de tipos en componentes de íconos dinámicos.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { PrintButton } from '@/components/ui/PrintButton';
import { AnimatedQrCode } from '@/components/ui/AnimatedQrCode';
import { Mail, Linkedin, MapPin, Globe, Calendar, Award, Heart } from 'lucide-react';
import {
    SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiPostgresql, SiMongodb,
    SiTailwindcss, SiGit, SiFigma, SiSvelte, SiNestjs, SiGraphql,
    SiPython, SiTensorflow, SiSolidity, SiPrestashop, SiShopify, SiWoocommerce,
    SiVtex, SiMeta, SiGoogleads, SiJest, SiWhatsapp, SiUdemy, SiGoogle
} from '@icons-pack/react-simple-icons';
import type { Curriculum } from '@/lib/schemas/curriculum.schema';
import type { ComponentType, SVGProps } from 'react';

// --- TIPADO SOBERANO ---
type CurriculumPageProps = { params: Promise<{ lang: Locale }> };

// Definición robusta para un componente de icono
type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; title?: string }>;

type SectionProps = { title: string; children: React.ReactNode; className?: string };
type ExperienceItemProps = { item: Curriculum['experience']['items'][0] };
// CORRECCIÓN: Uso de IconComponent en lugar de React.ElementType
type ContactInfoProps = { icon: IconComponent; text: string; href?: string; isBold?: boolean };
type TechItem = { name: string; icon: IconComponent; url: string };
type SkillCategoryProps = { title: string; skills: TechItem[] };

// ===================================================================================
// METADATOS
// ===================================================================================
export async function generateMetadata(props: CurriculumPageProps): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.curriculum;
  if (!t) return { title: "Currículum" };
  return { title: t.page_title, description: t.page_description };
}

// ===================================================================================
// BASE DE DATOS DE HABILIDADES
// ===================================================================================
const skillCategories: { title: string; skills: TechItem[] }[] = [
    {
        title: "Frontend & Diseño",
        skills: [
            { name: "TypeScript", icon: SiTypescript, url: "https://www.typescriptlang.org/" },
            { name: "React", icon: SiReact, url: "https://react.dev/" },
            { name: "Next.js", icon: SiNextdotjs, url: "https://nextjs.org/" },
            { name: "Tailwind", icon: SiTailwindcss, url: "https://tailwindcss.com/" },
            { name: "Svelte", icon: SiSvelte, url: "https://svelte.dev/" },
            { name: "Figma", icon: SiFigma, url: "https://www.figma.com/" }
        ]
    },
    {
        title: "Backend & DB",
        skills: [
            { name: "Node.js", icon: SiNodedotjs, url: "https://nodejs.org/" },
            { name: "NestJS", icon: SiNestjs, url: "https://nestjs.com/" },
            { name: "GraphQL", icon: SiGraphql, url: "https://graphql.org/" },
            { name: "Postgres", icon: SiPostgresql, url: "https://www.postgresql.org/" },
            { name: "MongoDB", icon: SiMongodb, url: "https://www.mongodb.com/" },
            { name: "Python", icon: SiPython, url: "https://www.python.org/" }
        ]
    },
    {
        title: "DevOps & Git",
        skills: [
            { name: "Git", icon: SiGit, url: "https://git-scm.com/" },
            { name: "Jest", icon: SiJest, url: "https://jestjs.io/" },
            { name: "TensorFlow", icon: SiTensorflow, url: "https://www.tensorflow.org/" },
            { name: "Solidity", icon: SiSolidity, url: "https://soliditylang.org/" }
        ]
    },
    {
        title: "E-commerce",
        skills: [
            { name: "Shopify", icon: SiShopify, url: "https://www.shopify.com/" },
            { name: "WooCommerce", icon: SiWoocommerce, url: "https://woocommerce.com/" },
            { name: "PrestaShop", icon: SiPrestashop, url: "https://www.prestashop.com/" },
            { name: "VTEX", icon: SiVtex, url: "https://vtex.com/" },
            { name: "Meta Ads", icon: SiMeta, url: "https://www.facebook.com/business/ads" },
            { name: "Google Ads", icon: SiGoogleads, url: "https://ads.google.com/" }
        ]
    }
];

// ===================================================================================
// SUB-COMPONENTES DE UI
// ===================================================================================
const Section = ({ title, children, className = '' }: SectionProps) => (
  <section className={className}>
    <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 border-b-2 border-zinc-100 pb-2 mb-4 print:text-[10px] print:mb-3 print:border-zinc-300">
      {title}
    </h2>
    <div className="space-y-6 print:space-y-4">{children}</div>
  </section>
);

const ExperienceItem = ({ item }: ExperienceItemProps) => (
  <div className="text-sm break-inside-avoid experience-item mb-6 print:mb-4">
    <div className="flex justify-between items-baseline mb-1">
        <h3 className="font-bold text-zinc-900 text-[15px] print:text-[13px]">{item.role}</h3>
        <span className="text-xs font-semibold text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded print:bg-transparent print:p-0 print:text-zinc-600 print:text-[10px]">
            {item.period}
        </span>
    </div>
    <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-purple-700 text-xs print:text-zinc-800 print:font-bold">{item.company}</p>
        <p className="text-[10px] text-zinc-500 print:text-zinc-600">{item.location}</p>
    </div>
    <ul className="mt-2 list-disc list-outside ml-3 space-y-1 text-zinc-700 text-justify print:text-zinc-900 print:text-[11px] print:leading-snug">
      {item.duties.map((duty, i) => <li key={i} className="pl-1">{duty}</li>)}
    </ul>
  </div>
);

const ContactInfo = ({ icon: Icon, text, href, isBold = false }: ContactInfoProps) => (
  <div className={`flex items-center gap-2 text-xs text-zinc-600 print:text-zinc-900 print:text-[10px] ${isBold ? 'font-bold text-zinc-900 print:font-bold' : ''}`}>
    <Icon size={14} className="shrink-0 text-purple-600 print:text-zinc-900 print:w-3 print:h-3" />
    {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-purple-700 transition-colors print:no-underline print:text-zinc-900">
            {text}
        </a>
    ) : (
        <span className="print:text-zinc-900">{text}</span>
    )}
  </div>
);

const SkillCategory = ({ title, skills }: SkillCategoryProps) => (
  <div className="break-inside-avoid mb-5 print:mb-3">
    <h4 className="font-bold text-[10px] uppercase text-zinc-500 mb-2 tracking-wider print:text-zinc-700">{title}</h4>
    <div className="grid grid-cols-2 gap-2 print:flex print:flex-wrap print:gap-1.5">
      {skills.map(({ name, icon: Icon, url }) => (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            key={name}
            className="
                inline-flex items-center gap-1.5
                bg-zinc-50 rounded-full
                px-2.5 py-1
                border border-zinc-100
                hover:border-purple-200 hover:bg-purple-50 transition-colors
                print:bg-white print:border-zinc-300 print:px-2 print:py-0.5 print:no-underline
            "
        >
          <Icon className="h-3.5 w-3.5 text-zinc-600 shrink-0 print:text-zinc-900 print:w-3 print:h-3" />
          <span className="text-[11px] font-medium text-zinc-700 whitespace-nowrap print:text-zinc-900 print:text-[10px]">{name}</span>
        </a>
      ))}
    </div>
  </div>
);

// ===================================================================================
// COMPONENTE PRINCIPAL
// ===================================================================================
export default async function CurriculumPage(props: CurriculumPageProps) {
  const params = await props.params;
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.curriculum;
  const portfolioUrl = `https://www.razpodesta.com/${lang}`;
  const currentDate = new Date().toLocaleDateString(lang, { month: 'long', year: 'numeric' });

  if (!t) notFound();

  return (
    <>
      <main id="curriculum-content" className="font-sans bg-white text-zinc-800 min-h-screen">
        <div className="container mx-auto max-w-[210mm] p-6 md:p-12 print:p-0 print:max-w-none">
          <header className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-zinc-100 pb-8 mb-10 print:border-zinc-300 print:pb-6 print:mb-6">
            <div className="flex gap-5 items-center">
              <div className="relative shrink-0">
                  <Image
                    src="/images/256x256-raz-podesta-avatar-curriculum-circular_png.png"
                    alt={`Fotografía profesional de ${t.header.name}`}
                    width={90}
                    height={90}
                    className="rounded-full border-4 border-zinc-50 shadow-sm print:border-zinc-200 print:w-[75px] print:h-[75px]"
                    priority
                  />
              </div>
              <div>
                <h1 className="font-display text-4xl font-bold text-zinc-900 leading-tight mb-1 tracking-tight print:text-3xl">
                    {t.header.name}
                </h1>
                <h2 className="text-sm font-bold text-purple-700 uppercase tracking-widest print:text-zinc-800 print:text-xs">
                    {t.header.title}
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 sm:items-end min-w-[200px] print:gap-1">
              <ContactInfo icon={SiWhatsapp} text={t.header.phone} href={`https://wa.me/${t.header.phone.replace(/\D/g, '')}`} isBold />
              <ContactInfo icon={Mail} text={t.header.email} href={`mailto:${t.header.email}`} isBold />
              <ContactInfo icon={Linkedin} text="linkedin.com/in/razpodesta" href={`https://${t.header.linkedin}`} />
              <ContactInfo icon={MapPin} text={t.header.location} />
              <ContactInfo icon={Globe} text="razpodesta.com" href="https://www.razpodesta.com" />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-12 print:grid print:grid-cols-[1fr_65mm] print:gap-8">
            <div className="space-y-10 print:space-y-6">
              <Section title={t.summary.title}>
                <p className="text-sm text-zinc-700 leading-relaxed text-justify print:text-zinc-900 print:text-[11px] print:leading-normal">
                    {t.summary.content}
                </p>
              </Section>
              <Section title={t.experience.title}>
                <div className="space-y-1">
                    {t.experience.items.map((item) => <ExperienceItem key={item.company} item={item} />)}
                </div>
              </Section>
              {t.hobbies && (
                <Section title={t.hobbies.title}>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 print:gap-y-1">
                        {t.hobbies.items.map((hobby, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-zinc-600 print:text-[10px] print:text-zinc-900">
                                <Heart size={12} className="text-purple-500 shrink-0 print:text-zinc-800" />
                                <span>{hobby}</span>
                            </div>
                        ))}
                    </div>
                </Section>
              )}
            </div>

            <aside className="space-y-10 print:space-y-6">
              <Section title={t.skills_section.title}>
                <div className="space-y-2">
                    {skillCategories.map(cat => <SkillCategory key={cat.title} title={cat.title} skills={cat.skills} />)}
                </div>
              </Section>

              <Section title={t.education.title}>
                <div className="space-y-5 print:space-y-3">
                    {t.education.items.map((item) => (
                        <div key={item.university} className="text-sm break-inside-avoid">
                            <h3 className="font-bold text-zinc-900 text-[13px] leading-snug print:text-[11px]">{item.degree}</h3>
                            <p className="font-medium text-purple-700 text-xs mt-0.5 print:text-zinc-800 print:text-[10px]">{item.university}</p>
                            <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1 print:text-zinc-600 print:text-[9px]">
                                <Calendar size={10} /> {item.period}
                            </p>
                        </div>
                    ))}
                </div>
              </Section>

              {t.certifications && (
                <Section title={t.certifications.title}>
                    <div className="space-y-3 print:space-y-2">
                        {t.certifications.items.map((cert, idx) => {
                            const Icon = cert.issuer.includes('Google') ? SiGoogle : cert.issuer.includes('Udemy') ? SiUdemy : Award;
                            return (
                                <div key={idx} className="flex gap-2 items-start break-inside-avoid">
                                    <Icon className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0 print:text-zinc-800" />
                                    <div>
                                        <div className="text-xs font-bold text-zinc-800 leading-tight print:text-[10px]">
                                            {cert.name}
                                        </div>
                                        <div className="text-[10px] text-zinc-500 print:text-zinc-600">
                                            {cert.issuer} • {cert.year}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Section>
              )}
              <Section title="Portafolio" className="print-hidden">
                  <div className="flex flex-col items-center text-center bg-zinc-50 p-4 rounded-xl border border-zinc-100 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-zinc-400">Portafolio Web</p>
                      <AnimatedQrCode url={portfolioUrl} alt="QR Portafolio" size={100} />
                      <p className="text-[10px] text-zinc-500 mt-2 font-medium">
                          razpodesta.com
                      </p>
                  </div>
              </Section>
            </aside>
          </div>
          <div id="print-footer" className="hidden print:flex flex-col items-start mt-8 pt-2 border-t border-zinc-200">
            <div className="flex justify-between w-full text-[8px] text-zinc-500 uppercase tracking-wider">
                <span>{t.header.name} - Currículum Vitae</span>
                <span>Actualizado: {currentDate}</span>
            </div>
            <div className="w-full text-center mt-2">
                <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">
                    {t.printable_footer}
                </span>
            </div>
          </div>
        </div>
      </main>
      <PrintButton text={t.print_button} />
    </>
  );
}
