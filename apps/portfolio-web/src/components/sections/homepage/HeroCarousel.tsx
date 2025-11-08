// RUTA: apps/portfolio-web/src/components/sections/homepage/HeroCarousel.tsx
// VERSIÓN: 3.3 - Canónica (Post-dependencia explícita)
// NOTA: Este código funcionará correctamente después de ejecutar `pnpm add embla-carousel`.

'use client';

import { useState, useEffect, useCallback } from 'react';
// Importamos los TIPOS directamente desde el paquete NÚCLEO.
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
// Importamos el HOOK desde el paquete de REACT.
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import type { Dictionary } from '../../../lib/schemas/dictionary.schema';
import { VisitorHud } from '../../ui/VisitorHud';

const carouselItems = [
    { id: 'slide-01', titleKey: 'RAZ-LINEUP', imageUrl: '/projects/hero-homepage-001.jpg' },
    { id: 'slide-02', titleKey: 'e-commerce', imageUrl: '/projects/hero-homepage-002.jpg' },
    { id: 'slide-03', titleKey: 'ai-art', imageUrl: '/projects/hero-homepage-003.jpg' },
];

const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customIndex: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: customIndex * 0.2,
            ease: 'easeOut',
            duration: 0.5,
        },
    }),
};

type DotButtonProps = {
    selected: boolean;
    onClick: () => void;
};

const DotButton = ({ selected, onClick }: DotButtonProps) => (
    <button
        className={`h-2 w-2 rounded-full transition-all duration-500 ease-out ${selected ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'}`}
        type="button"
        onClick={onClick}
        aria-label="Navegar al slide"
    />
);

type HeroCarouselProps = {
    dictionary: Dictionary['homepage']['hero'];
};

export function HeroCarousel({ dictionary }: HeroCarouselProps) {
    const emblaOptions: EmblaOptionsType = { loop: true };

    const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [
        Fade(),
        Autoplay({ delay: 5000, stopOnInteraction: false }),
    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback((index: number) => {
        emblaApi?.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback((emblaApiInstance: EmblaCarouselType) => {
        setSelectedIndex(emblaApiInstance.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect) };
    }, [emblaApi, onSelect]);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="embla__container flex h-full">
                    {carouselItems.map((item, index) => (
                        <div className="embla__slide relative min-w-0 flex-[0_0_100%]" key={item.id}>
                            <Image
                                src={item.imageUrl}
                                alt={`Imagen del proyecto ${dictionary[item.titleKey as keyof typeof dictionary]}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
                            <div className="absolute inset-0 flex flex-col justify-center p-8 text-foreground">
                                <div className="container mx-auto">
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.5 }}
                                        className="relative"
                                    >
                                        <motion.h1
                                            custom={0}
                                            variants={textVariants}
                                            className="font-display text-7xl font-bold uppercase text-white md:text-9xl text-shadow-lg"
                                        >
                                            {dictionary[item.titleKey as keyof typeof dictionary]}
                                        </motion.h1>
                                        <motion.div custom={1} variants={textVariants}>
                                            <VisitorHud />
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        selected={index === selectedIndex}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </section>
    );
}
