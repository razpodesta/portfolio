// RUTA: apps/portfolio-web/src/app/[lang]/blog/tag/[slug]/page.tsx
// VERSIÓN: 2.0 - "Página de Archivo de Tags" (Dinámica, Robusta y Optimizada para SEO)
// DESCRIPCIÓN: Este Server Component dinámico consume la capa de datos para obtener
//              posts filtrados por una etiqueta. Genera metadatos SEO específicos para
//              la página de archivo y reutiliza componentes de UI para mantener una
//              consistencia visual y de experiencia de usuario impecable.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { getPostsByTag } from '@/lib/blog';
import { BlogCard } from '@/components/ui/BlogCard';
import { BlurText } from '@/components/razBits/BlurText';

type TagPageProps = {
  params: { slug: string; lang: Locale };
};

// Genera metadatos SEO dinámicos y específicos para la página de la etiqueta.
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  const tagName = decodeURIComponent(params.slug).replace(/-/g, ' '); // Decodifica y formatea el nombre.
  const blogTitle = dictionary.blog_page.page_title.split(' | ')[1] || 'Blog';

  return {
    title: `Artículos sobre "${tagName}" | ${blogTitle}`,
    description: `Explora todos los artículos, tutoriales y reflexiones sobre ${tagName}.`,
    alternates: {
      canonical: `/${params.lang}/blog/tag/${params.slug}`,
    },
  };
}

// Renderiza la página de archivo.
export default async function TagPage({ params }: TagPageProps) {
  const { lang, slug } = params;
  const dictionary = await getDictionary(lang);
  const posts = await getPostsByTag(slug);

  // Si no se encuentran posts para esa etiqueta, se muestra la página 404.
  if (!posts || posts.length === 0) {
    notFound();
  }

  const tagName = slug.replace(/-/g, ' ');

  return (
    <main className="container mx-auto px-4 py-20 sm:py-24">
      <header className="mx-auto max-w-3xl text-center mb-16">
        <p className="font-semibold text-purple-400">ARCHIVO DE ETIQUETA</p>
        <BlurText
          text={tagName}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl justify-center capitalize"
        />
        <p className="mt-4 text-zinc-400">
          {`Explorando ${posts.length} ${posts.length === 1 ? 'artículo' : 'artículos'} relacionados.`}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post.metadata}
            slug={post.slug}
            lang={lang}
            ctaText={dictionary.blog_page.read_more_cta}
          />
        ))}
      </div>
    </main>
  );
}
