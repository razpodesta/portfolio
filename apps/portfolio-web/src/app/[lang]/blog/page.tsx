/**
 * @file Página Índice del Blog.
 * @version 2.0 - Next.js 15 Compliance
 * @description Listado de todos los artículos. Actualizado para params asíncronos.
 */

import type { Metadata } from 'next';
import { type Locale } from '@/config/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { BlurText } from '@/components/razBits/BlurText';
import { BlogCard } from '@/components/ui/BlogCard';
import { getAllPosts } from '@/lib/blog';
import type { PostWithSlug } from '@/lib/schemas/blog.schema';

// --- DEFINICIÓN DE TIPOS SOBERANA ---
type BlogPageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata(props: BlogPageProps): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const t = dictionary.blog_page;
  return {
    title: t.page_title,
    description: t.page_description,
  };
}

export default async function BlogPage(props: BlogPageProps) {
  const params = await props.params;
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
