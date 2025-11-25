'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function RunwayHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      >
        <source src="https://cdn.coverr.co/videos/coverr-model-walking-on-runway-2534/1080p.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 pb-12">
        <div /> {/* Spacer */}

        <div className="flex flex-col items-center text-center mix-blend-difference">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[12vw] leading-[0.8] text-white uppercase tracking-tighter"
          >
            Avant Garde
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 font-body text-sm md:text-lg tracking-[0.3em] text-white uppercase"
          >
            Spring / Summer 2025 Collection
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex justify-center"
        >
          <ArrowDown className="animate-bounce text-white opacity-50" size={32} strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
}
