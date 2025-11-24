// RUTA: apps/portfolio-web/src/app/[lang]/blog/[slug]/page.tsx
// VERSIÓN: 4.0 - Tipado de Props Soberano
// DESCRIPCIÓN: Se corrige la definición de tipo de 'PostPageProps' para que la
//              propiedad 'params' sea un objeto simple, alineándose con la
//              forma en que Next.js App Router pasa las props a los componentes de página.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { i18n, type Locale } from '@/config/i18n.config';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { JsonLdScript } from '@/components/ui/JsonLdScript';
import { ShareButtons } from '@/components/ui/ShareButtons';
import Image from 'next/image';

// --- INICIO DE LA CORRECCIÓN DE TIPO SOBERANA ---
type PostPageProps = {
  params: { slug: string; lang: Locale };
};
// --- FIN DE LA CORRECCIÓN DE TIPO SOBERANA ---

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return i18n.locales.flatMap((lang) =>
    posts.map((post) => ({
      lang,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { title: 'Artículo no encontrado' };
  }

  const { title, description, published_date } = post.metadata;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4200';
  const canonicalUrl = `${baseUrl}/${params.lang}/blog/${params.slug}`;
  const imageUrl = `${baseUrl}/images/blog/${params.slug}.jpg`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: published_date,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { title, author, published_date, tags } = post.metadata;
  const imageUrl = `/images/blog/${params.slug}.jpg`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    author: { '@type': 'Person', name: author },
    datePublished: published_date,
    image: imageUrl,
    description: post.metadata.description,
  };

  return (
    <>
      <JsonLdScript data={articleSchema} />
      <main className="container mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <article>
          <header className="mb-8">
            <div className="relative mb-8 h-60 w-full overflow-hidden rounded-xl md:h-80">
              <Image
                src={imageUrl}
                alt={`Imagen destacada para ${title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              {title}
            </h1>
            <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
              <span>Por {author}</span>
              <span>{new Date(published_date).toLocaleDateString(params.lang, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none font-sans">
            <MDXRemote source={post.content} />
          </div>

          <footer className="mt-12 border-t border-zinc-800 pt-8">
            <ShareButtons title={title} />
          </footer>
        </article>
      </main>
    </>
  );
}
