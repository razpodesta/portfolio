// apps/portfolio-web/src/components/sections/homepage/BlogSection3D.tsx

/**
 * @file Sección del Blog con Carrusel 3D (Orbital).
 * @version 3.5 - Relative Imports (Linter Safe)
 * @description Carrusel 3D interactivo. Usa rutas relativas para todos los componentes
 *              internos, satisfaciendo las reglas de límites de módulo de Nx.
 */

'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useDrag } from '@use-gesture/react';

// CORRECCIÓN: Rutas relativas estrictas para componentes hermanos y padres
import { BlurText } from '../../razBits/BlurText';
import { BlogCard3D } from '../../ui/BlogCard3D';
import { ColorWaveBar } from '../../ui/ColorWaveBar';

// CORRECCIÓN: Rutas relativas profundas para lib
import type { PostWithSlug } from '../../../lib/schemas/blog.schema';
import type { Dictionary } from '../../../lib/schemas/dictionary.schema';

type BlogSection3DProps = {
  posts: PostWithSlug[];
  dictionary: Dictionary['blog_page'];
  lang: string;
};

interface DragState {
  swipe: [number, number];
  tap: boolean;
  offset: [number, number];
  direction: [number, number];
  velocity: [number, number];
  last: boolean;
}

const RADIUS = 5.5;

function CarouselRig({
  posts,
  lang,
  ctaText,
  activeIndex,
  setActiveIndex
}: {
  posts: PostWithSlug[];
  lang: string;
  ctaText: string;
  activeIndex: number;
  setActiveIndex: (val: number | ((prev: number) => number)) => void;
}) {
  const { rotationY } = useSpring({
    rotationY: activeIndex * (Math.PI * 2 / posts.length),
    config: { mass: 1, tension: 180, friction: 26 },
  });

  const bind = useDrag((state) => {
    const { swipe: [swipeX], tap } = state as unknown as DragState;

    if (tap) return;

    if (swipeX > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (swipeX < 0) {
      setActiveIndex((prev) => prev + 1);
    }
  }, {
    axis: 'x',
    pointer: { touch: true },
    filterTaps: true,
  });

  const cards = useMemo(() => {
    return posts.map((post, i) => {
      const angle = (i / posts.length) * Math.PI * 2;
      const x = Math.sin(angle) * RADIUS;
      const z = Math.cos(angle) * RADIUS;
      return {
        post,
        position: [x, 0, z] as [number, number, number],
        rotation: [0, angle, 0] as [number, number, number],
      };
    });
  }, [posts]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <a.group rotation-y={rotationY} {...(bind() as any)}>
      {cards.map((card) => (
        <BlogCard3D
          key={card.post.slug}
          post={card.post}
          lang={lang}
          ctaText={ctaText}
          position={card.position}
          rotation={card.rotation}
        />
      ))}
    </a.group>
  );
}

export function BlogSection3D({ posts, dictionary, lang }: BlogSection3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-black py-24 sm:py-32 border-t border-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(50,50,50,0.2)_0%,rgba(0,0,0,1)_70%)] pointer-events-none" />
      <ColorWaveBar position="top" direction="left-to-right" />

      <div className="container relative z-10 mx-auto mb-16 px-4 text-center">
        <span className="mb-4 inline-block rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 backdrop-blur-md">
          {dictionary.page_title.split('|')[0].trim()}
        </span>
        <BlurText
          text={dictionary.featured_title}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl justify-center"
        />
        <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
          Explorando la intersección entre ingeniería de software, inteligencia artificial y diseño.
        </p>
      </div>

      <div className="relative h-[650px] w-full cursor-grab active:cursor-grabbing">
        {isClient ? (
          <Suspense fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-zinc-500">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
              <span className="text-xs font-mono uppercase tracking-widest">Cargando Experiencia...</span>
            </div>
          }>
            <Canvas
              camera={{ position: [0, 2, 12], fov: 35 }}
              dpr={[1, 1.5]}
              gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
            >
              <fog attach="fog" args={['#000', 10, 25]} />
              <ambientLight intensity={0.3} />
              <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#a855f7" />
              <pointLight position={[-10, -5, -10]} intensity={0.8} color="#3b82f6" />

              <CarouselRig
                posts={posts}
                lang={lang}
                ctaText={dictionary.read_more_cta}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </Canvas>
          </Suspense>
        ) : (
          <div className="h-full w-full bg-zinc-950 flex items-center justify-center">
             <div className="w-64 h-96 rounded-2xl border border-zinc-800 bg-zinc-900/50 animate-pulse" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_40%,#000_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto -mt-8 flex flex-col items-center justify-center gap-6 pointer-events-none">
        <div className="flex items-center gap-8 pointer-events-auto">
          <button
            onClick={() => setActiveIndex(prev => prev - 1)}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-white backdrop-blur-md transition-all hover:border-purple-500/50 hover:bg-zinc-800 hover:scale-110 active:scale-95"
            aria-label="Artículo anterior"
          >
            <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
          </button>

          <div className="flex gap-2">
            {posts.map((_, idx) => {
              if (posts.length > 8 && Math.abs(idx - ((Math.round(activeIndex) % posts.length + posts.length) % posts.length)) > 3) return null;

              const normalizedActive = ((Math.round(activeIndex) % posts.length) + posts.length) % posts.length;
              const isActive = normalizedActive === idx;

              return (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? 'w-8 bg-purple-500' : 'w-1.5 bg-zinc-800'}`}
                />
              );
            })}
          </div>

          <button
            onClick={() => setActiveIndex(prev => prev + 1)}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-white backdrop-blur-md transition-all hover:border-purple-500/50 hover:bg-zinc-800 hover:scale-110 active:scale-95"
            aria-label="Siguiente artículo"
          >
            <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">
          Arrastra o usa las flechas para navegar
        </span>
      </div>
    </section>
  );
}
