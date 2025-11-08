// RUTA: apps/portfolio-web/src/components/layout/Header.tsx
// VERSIÓN: 4.1 - Interactivo y Completo

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, MessageSquare, Mail, Code, Users, History, Rss
} from 'lucide-react';
import type { Dictionary } from '../../lib/schemas/dictionary.schema';
import { socialLinks } from '../../lib/social-links';
import { DropdownMenu } from '../ui/DropdownMenu';

type HeaderProps = {
  dictionary: Dictionary;
};

export function Header({ dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const aboutSections = [
    { label: 'Proyectos', href: '#', icon: Code },
    { label: 'Co-creación', href: '#', icon: Users },
    { label: 'Historia', href: '#', icon: History },
    { label: 'Blog', href: '#', icon: Rss },
  ];

  const contactMethods = [
    { label: 'WhatsApp', href: 'https://wa.me/YOUR_NUMBER', icon: MessageSquare }, // <-- ACTUALIZA TU NÚMERO
    { label: 'Email', href: 'mailto:YOUR_EMAIL', icon: Mail }, // <-- ACTUALIZA TU EMAIL
  ];

  const BrandIdentity = () => (
    <Link href="/" className="flex items-center gap-3 group">
      <Image
        src="/logo.png"
        alt="Logo de Raz Podestá"
        width={40}
        height={40}
        className="rounded-full transition-transform duration-300 group-hover:scale-110"
      />
      <div>
        <h1 className="font-bold text-white leading-tight">Raz Podestá</h1>
        <p className="text-xs text-zinc-400 font-sans leading-tight">{dictionary.header.tagline}</p>
      </div>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 p-4">
      {/* ============================================= */}
      {/* NAVEGACIÓN DESKTOP - CON MENÚS INTERACTIVOS   */}
      {/* ============================================= */}
      <nav className="hidden md:flex w-fit mx-auto items-center gap-1 rounded-full bg-zinc-950/80 p-2 backdrop-blur-lg shadow-2xl shadow-black/30 border border-zinc-800">
        <div className="px-2">
          <BrandIdentity />
        </div>

        <div className="flex items-center gap-1 border-l border-r border-zinc-700 px-2">
          <DropdownMenu
            trigger={
              <button className="flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white px-4 py-2 rounded-full hover:bg-zinc-800">
                {dictionary.header.about} <ChevronDown size={16} />
              </button>
            }
          >
            <div className="p-2 space-y-1">
              {aboutSections.map(link => (
                <Link key={link.label} href={link.href} className="flex items-center gap-3 text-zinc-300 hover:text-white hover:bg-zinc-800 p-2 rounded-md transition-colors text-sm">
                  <link.icon size={16} /> {link.label}
                </Link>
              ))}
            </div>
          </DropdownMenu>

          <DropdownMenu
            trigger={
              <button className="flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white px-4 py-2 rounded-full hover:bg-zinc-800">
                {dictionary.header.contact} <ChevronDown size={16} />
              </button>
            }
          >
            <div className="p-2">
              {contactMethods.map(link => (
                <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white hover:bg-zinc-800 p-2 rounded-md transition-colors text-sm">
                  <link.icon size={16} /> {link.label}
                </Link>
              ))}
              <div className="h-px bg-zinc-800 my-2" />
              <div className="flex items-center justify-center gap-2 p-2">
                {socialLinks.map(link => (
                  <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors">
                    <link.icon size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </DropdownMenu>
        </div>

        <Link
          href="#contact"
          className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          {dictionary.header.talk}
        </Link>
      </nav>

      {/* ============================================= */}
      {/* NAVEGACIÓN MÓVIL (BARRA SUPERIOR)             */}
      {/* ============================================= */}
      <div className="md:hidden flex items-center justify-between">
        <BrandIdentity />
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú de navegación"
          className="text-white p-2"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* ============================================= */}
      {/* OVERLAY DE MENÚ MÓVIL (COMPLETO)              */}
      {/* ============================================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-zinc-900 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Cerrar menú de navegación"
                className="absolute right-4 top-5 text-zinc-400"
              >
                <X size={32} />
              </button>
              <nav className="mt-20 flex flex-col items-center gap-8">
                {/* NOTA: Los enlaces del menú móvil son simplificados a propósito */}
                <Link href="#about" className="text-3xl font-semibold text-white" onClick={() => setIsMenuOpen(false)}>
                  {dictionary.header.about}
                </Link>
                <Link href="#contact" className="text-3xl font-semibold text-white" onClick={() => setIsMenuOpen(false)}>
                  {dictionary.header.contact}
                </Link>

                <Link
                  href="#contact"
                  className="mt-8 w-full rounded-md bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-center text-xl font-bold text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dictionary.header.talk}
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
