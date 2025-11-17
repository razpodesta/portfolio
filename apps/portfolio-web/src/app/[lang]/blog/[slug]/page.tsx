// RUTA: apps/portfolio-web/src/app/[lang]/blog/[slug]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { type Locale } from '@/config/i18n.config';
import { blogPostSchema } from '@/lib/schemas/blog.schema';

type PostPageProps = {
  params: Promise<{
    slug: string;
    lang: Locale;
  }>;
};

async function getPost(slug: string) {
  const contentDir = path.join(process.cwd(), 'apps/portfolio-web/src/content/blog');
  const jsonPath = path.join(contentDir, `${slug}.json`);
  const mdxPath = path.join(contentDir, `${slug}.mdx`);

  try {
    const [jsonContent, mdxContent] = await Promise.all([
      fs.readFile(jsonPath, 'utf-8'),
      fs.readFile(mdxPath, 'utf-8'),
    ]);

    const metadata = blogPostSchema.parse(JSON.parse(jsonContent));
    return { metadata, content: mdxContent };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }
  return {
    title: `${post.metadata.title} | Blog`,
    description: post.metadata.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-20 sm:py-24">
      <header className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">{post.metadata.title}</h1>
        <p className="mt-4 text-zinc-400">
          Por {post.metadata.author} el {post.metadata.published_date}
        </p>
      </header>

      <div className="prose prose-invert prose-lg mx-auto font-sans">
        <p>{post.content}</p>
      </div>
    </article>
  );
}
