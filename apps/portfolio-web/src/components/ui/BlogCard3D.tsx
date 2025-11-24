// apps/portfolio-web/src/components/ui/BlogCard3D.tsx

/**
 * @file Tarjeta de Blog 3D Interactiva.
 * @version 6.0 - Strict Relative Imports
 * @description Renderiza una tarjeta individual. Usa rutas relativas para evitar
 *              falsos positivos del linter de límites de Nx.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSpring, a as a3d } from '@react-spring/three';
import { a as aDom } from '@react-spring/web';
import { Html } from '@react-three/drei';
import type { ThreeEvent, ThreeElements } from '@react-three/fiber';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';

// CORRECCIÓN: Ruta relativa estricta (../../) en lugar de alias (@/)
import type { PostWithSlug } from '../../lib/schemas/blog.schema';

type BlogCard3DProps = {
  post: PostWithSlug;
  lang: string;
  ctaText: string;
} & ThreeElements['group'];

export function BlogCard3D({ post, lang, ctaText, ...props }: BlogCard3DProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const { scale, opacity } = useSpring({
    scale: isHovered ? 1.1 : 1,
    opacity: isHovered ? 1 : 0.85,
    config: { mass: 1, tension: 280, friction: 20 },
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    router.push(`/${lang}/blog/${post.slug}`);
  };

  const imageUrl = `/images/blog/${post.slug}.jpg`;

  return (
    <a3d.group
      {...props}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <mesh>
        <planeGeometry args={[3.2, 4.4]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <Html
        transform
        occlude="blending"
        center
        distanceFactor={4}
        className="w-[320px] h-[440px] select-none"
      >
        <aDom.div
          style={{ opacity }}
          className={`
            group flex h-full flex-col overflow-hidden rounded-2xl border
            transition-all duration-300
            ${isHovered
              ? 'border-purple-500/50 bg-zinc-900/95 shadow-[0_0_30px_rgba(168,85,247,0.3)]'
              : 'border-zinc-800 bg-zinc-950/90 shadow-xl'
            }
          `}
        >
          <div className="relative h-48 w-full overflow-hidden shrink-0">
            <Image
              src={imageUrl}
              alt={`Imagen del artículo ${post.metadata.title}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 320px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
          </div>

          <div className="flex grow flex-col p-6">
            <div className="mb-3">
               <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400 border border-purple-500/20">
                 {post.metadata.tags[0] || 'Blog'}
               </span>
            </div>

            <h3 className="font-display text-xl font-bold leading-tight text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
              {post.metadata.title}
            </h3>

            <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-zinc-400 font-sans">
              {post.metadata.description}
            </p>
          </div>

          <div className="border-t border-zinc-800/50 p-4 flex justify-between items-center bg-zinc-900/30">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              {post.metadata.published_date}
            </span>
            <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-1">
              {ctaText} <ArrowRight size={12} />
            </span>
          </div>
        </aDom.div>
      </Html>
    </a3d.group>
  );
}
