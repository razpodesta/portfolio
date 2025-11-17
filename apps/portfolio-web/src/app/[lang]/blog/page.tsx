// RUTA: apps/portfolio-web/src/app/[lang]/blog/page.tsx
// VERSIÓN: 1.3 - Corregida la Ruta de Importación de i18n.
// DESCRIPCIÓN: Se ha corregido un error tipográfico crítico en la ruta de importación
//              del módulo de configuración de i18n. Se cambió la ruta incorrecta
//              '@/config/i-18n.config' por la ruta canónica y correcta '@/config/i18n.config',
//              resolviendo el error de compilación TS2307 y restaurando la conexión
//              del componente con la configuración de internacionalización del proyecto.

import type { Metadata } from 'next';
// --- INICIO DE LA CORRECCIÓN CRÍTICA ---
import { type Locale } from '@/config/i18n.config';
// --- FIN DE LA CORRECCIÓN CRÍTICA ---
import { getDictionary } from '@/lib/get-dictionary';
import { BlurText } from '@/components/razBits/BlurText';
import { BlogCard } from '@/components/ui/BlogCard';
import { getAllPosts } from '@/lib/blog';
import type { PostWithSlug } from '@/lib/schemas/blog.schema';

type BlogPageProps = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.blog_page;
  return {
    title: t.page_title,
    description: t.page_description,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.blog_page;
  const allPosts = await getAllPosts();

  return (
    <main className="container mx-auto px-4 py-20 sm:py-24">
      <header className="mx-auto max-w-2xl text-center mb-16">
        <BlurText
          text={t.all_posts_title}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl justify-center"
        />
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post: PostWithSlug) => (
          <BlogCard
            key={post.slug}
            post={post.metadata}
            slug={post.slug}
            lang={params.lang}
            ctaText={t.read_more_cta}
          />
        ))}
      </div>
    </main>
  );
}
