// RUTA: apps/portfolio-web/src/components/sections/homepage/HeroCarousel.tsx
// VERSIÓN: 9.1 - Tipado de Variantes Corregido.
// DESCRIPCIÓN: Se importa y aplica el tipo 'Variants' a las constantes de
//              animación para garantizar la seguridad de tipos con Framer Motion.

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '../../../lib/schemas/dictionary.schema';
import { BlurText } from '../../razBits/BlurText';
import { ColorWaveBar } from '../../ui/ColorWaveBar';

const carouselItems = [
  { id: 'slide-01', subtitleKey: 'LANDINGS_SUBTITLE', titleKey: 'LANDINGS_TITLE', featuresKey: 'LANDINGS_FEATURES', imageUrl: '/projects/01-homepage-hero-landing-pages.jpg', projectSlug: 'landing-pages-de-conversion' },
  { id: 'slide-02', subtitleKey: 'ECOMMERCE_SUBTITLE', titleKey: 'ECOMMERCE_TITLE', featuresKey: 'ECOMMERCE_FEATURES', imageUrl: '/projects/02-homepage-hero-ecommerce.jpg', projectSlug: 'ecommerce-de-autor' },
  { id: 'slide-03', subtitleKey: 'SHOWROOMS_SUBTITLE', titleKey: 'SHOWROOMS_TITLE', featuresKey: 'SHOWROOMS_FEATURES', imageUrl: '/projects/03-homepage-hero-showrooms-corporativos.jpg', projectSlug: 'showrooms-corporativos' },
  { id: 'slide-04', subtitleKey: 'HOTELS_SUBTITLE', titleKey: 'HOTELS_TITLE', featuresKey: 'HOTELS_FEATURES', imageUrl: '/projects/04-homepage-hero-hoteleria.jpg', projectSlug: 'plataformas-hoteleras' },
  { id: 'slide-05', subtitleKey: 'COMMUNITIES_SUBTITLE', titleKey: 'COMMUNITIES_TITLE', featuresKey: 'COMMUNITIES_FEATURES', imageUrl: '/projects/05-homepage-hero-comunidades-online.jpg', projectSlug: 'comunidades-online' },
  { id: 'slide-06', subtitleKey: 'NGO_SUBTITLE', titleKey: 'NGO_TITLE', featuresKey: 'NGO_FEATURES', imageUrl: '/projects/06-homepage-hero-plataformas-ong.jpg', projectSlug: 'plataformas-ong' },
  { id: 'slide-07', subtitleKey: 'PORTFOLIOS_SUBTITLE', titleKey: 'PORTFOLIOS_TITLE', featuresKey: 'PORTFOLIOS_FEATURES', imageUrl: '/projects/07-homepage-hero-portafolios-creativos.jpg', projectSlug: 'portafolios-creativos' },
  { id: 'slide-08', subtitleKey: 'MAGAZINES_SUBTITLE', titleKey: 'MAGAZINES_TITLE', featuresKey: 'MAGAZINES_FEATURES', imageUrl: '/projects/08-homepage-hero-revistas-digitales.jpg', projectSlug: 'revistas-digitales' },
  { id: 'slide-09', subtitleKey: 'FASHION_SUBTITLE', titleKey: 'FASHION_TITLE', featuresKey: 'FASHION_FEATURES', imageUrl: '/projects/09-homepage-hero-fashion-wear.jpg', projectSlug: 'fashion-wear-de-lujo' },
];

// --- CORRECCIÓN DE TIPO ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
// --- FIN DE LA CORRECCIÓN ---

const DotButton = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
    <button
        className={`h-2 w-2 rounded-full transition-all duration-500 ease-out ${selected ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'}`}
        type="button" onClick={onClick} aria-label="Navegar al slide"
    />
);

type HeroCarouselProps = {
    dictionary: Dictionary['homepage']['hero'];
};

export function HeroCarousel({ dictionary }: HeroCarouselProps) {
    const emblaOptions: EmblaOptionsType = { loop: true };
    const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [ Fade(), Autoplay({ delay: 7000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
    const onSelect = useCallback((emblaApiInstance: EmblaCarouselType) => setSelectedIndex(emblaApiInstance.selectedScrollSnap()), []);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect) };
    }, [emblaApi, onSelect]);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <ColorWaveBar position="top" />
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {carouselItems.map((item, index) => (
                        <div className="relative min-w-0 flex-[0_0_100%]" key={item.id}>
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt={`Imagen de ${dictionary[item.titleKey as keyof typeof dictionary]}`}
                                    fill className="object-cover animate-ken-burns" priority={index === 0} sizes="100vw"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
                            <div className="absolute inset-0 flex flex-col justify-center p-8 text-foreground">
                                <div className="container mx-auto">
                                    <motion.div
                                        initial="hidden"
                                        animate={index === selectedIndex ? "visible" : "hidden"}
                                        variants={containerVariants}
                                        className="max-w-3xl"
                                    >
                                        <motion.div variants={itemVariants}>
                                            <BlurText text={dictionary[item.subtitleKey as keyof typeof dictionary]} className="font-sans text-base font-medium text-zinc-300" />
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <BlurText text={dictionary[item.titleKey as keyof typeof dictionary]} className="font-display text-5xl font-bold uppercase text-white md:text-7xl my-3" />
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <BlurText text={dictionary[item.featuresKey as keyof typeof dictionary]} className="font-sans text-sm tracking-wider text-zinc-400" />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="mt-8">
                                            <Link href={`/proyectos/${item.projectSlug}`} className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-pink-600 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
                                                {dictionary.CTA_BUTTON}
                                                <ArrowRight size={18} />
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {scrollSnaps.map((_, index) => <DotButton key={index} selected={index === selectedIndex} onClick={() => scrollTo(index)} />)}
            </div>
            <ColorWaveBar position="bottom" />
        </section>
    );
}
