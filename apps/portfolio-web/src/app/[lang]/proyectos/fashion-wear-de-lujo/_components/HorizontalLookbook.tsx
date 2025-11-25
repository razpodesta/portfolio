'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// Datos simulados con imágenes de Unsplash para visualización inmediata
const looks = [
  { id: '01', src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop', alt: 'Look 01 - Avant Garde Black' },
  { id: '02', src: 'https://images.unsplash.com/photo-1509631179647-b8d291b2a0fd?q=80&w=800&auto=format&fit=crop', alt: 'Look 02 - Concrete Texture' },
  { id: '03', src: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop', alt: 'Look 03 - Accessories Detail' },
  { id: '04', src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop', alt: 'Look 04 - Street Editorial' },
  { id: '05', src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop', alt: 'Look 05 - Silhouette' },
];

export function HorizontalLookbook() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Ajustamos el rango de movimiento horizontal según la cantidad de ítems
  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-75%']);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-zinc-50">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 pl-12 md:gap-24 md:pl-24">
          {/* Título de la Sección */}
          <div className="flex h-[70vh] w-[40vw] flex-col justify-center shrink-0">
            <h3 className="font-heading text-6xl text-black md:text-8xl uppercase leading-none">
              The<br />Look<br />Book
            </h3>
            <p className="mt-8 max-w-xs font-body text-sm text-zinc-500 text-justify">
              Una exploración de la forma y la función. Materiales crudos encontrados con siluetas etéreas.
            </p>
          </div>

          {/* Tarjetas de Looks */}
          {looks.map((look) => (
            <div key={look.id} className="relative h-[70vh] w-[50vh] min-w-[300px] bg-zinc-200 overflow-hidden shrink-0 group">
               <Image
                 src={look.src}
                 alt={look.alt}
                 fill
                 className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />

               {/* Overlay de Información */}
               <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-t from-black/80 to-transparent">
                  <span className="text-white font-mono text-xs">REF. {look.id}</span>
                  <button className="text-white text-xs uppercase border-b border-white hover:text-zinc-300 hover:border-zinc-300 transition-colors">
                    Shop Look
                  </button>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
