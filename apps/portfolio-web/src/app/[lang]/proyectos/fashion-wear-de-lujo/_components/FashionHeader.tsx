'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ShoppingBag, Search, User } from 'lucide-react';
import Link from 'next/link';

export function FashionHeader({ lang }: { lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-4 text-black' : 'bg-transparent py-8 text-white'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Left: Menu */}
        <div className="flex items-center gap-6">
          <button className="group flex items-center gap-2">
            <Menu size={24} className="stroke-1" />
            <span className="hidden md:block text-xs tracking-[0.2em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Menu
            </span>
          </button>
          <span className="hidden md:block text-xs font-mono tracking-widest">EST. 2025</span>
        </div>

        {/* Center: Brand (Signature) */}
        <Link href={`/${lang}`} className="absolute left-1/2 -translate-x-1/2 text-center group">
          <h1 className={`font-signature text-4xl md:text-5xl transition-colors duration-500 ${isScrolled ? 'text-black' : 'text-white'} group-hover:opacity-80`}>
            Noir Éternel
          </h1>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button aria-label="Search" className="hover:opacity-60 transition-opacity">
            <Search size={20} className="stroke-1" />
          </button>
          <button aria-label="Account" className="hidden md:block hover:opacity-60 transition-opacity">
            <User size={20} className="stroke-1" />
          </button>
          <button
            aria-label="Cart"
            className="relative hover:opacity-60 transition-opacity"
            onClick={() => setCartCount(prev => prev + 1)}
          >
            <ShoppingBag size={20} className="stroke-1" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}
