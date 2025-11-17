// RUTA: apps/portfolio-web/src/components/ui/NewsletterModal.tsx
// VERSIÓN: 3.1 - Sintaxis Canónica de Tailwind CSS.
// DESCRIPCIÓN: Se refina el componente reemplazando la clase 'flex-grow' por su
//              forma canónica y más concisa, 'grow'. Esto resuelve las advertencias
//              del linter y alinea el código con las mejores prácticas de Tailwind moderno.

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { setCookie, getCookie } from 'cookies-next';
import {
  SiGoogle,
  SiApple,
  SiGithub,
  SiFacebook,
  SiX,
} from '@icons-pack/react-simple-icons';

const COOKIE_NAME = 'newsletter_modal_seen';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    const hasSeenModal = getCookie(COOKIE_NAME);
    if (!hasSeenModal) {
      timerId = setTimeout(() => setIsOpen(true), 5000);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const handleClose = () => {
    setCookie(COOKIE_NAME, 'true', { maxAge: 60 * 60 * 24 * 365, path: '/' });
    setIsOpen(false);
  };

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'twitter' | 'apple' | 'facebook') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-10 rounded-full p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            <div className="relative h-48 w-full">
              <Image src="/images/newsletter-bg.jpg" alt="Fondo del newsletter" layout="fill" className="object-cover"/>
            </div>

            <div className="p-6 text-center">
              <h2 className="font-display text-2xl font-bold text-white">Únete a la Comunidad</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Usa tu proveedor preferido para una suscripción rápida.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-medium">
                <button onClick={() => handleOAuthLogin('google')} className="flex items-center justify-center gap-2 rounded-md bg-zinc-800 p-2 text-white transition-colors hover:bg-zinc-700">
                  <SiGoogle size={18} /> Google
                </button>
                <button onClick={() => handleOAuthLogin('apple')} className="flex items-center justify-center gap-2 rounded-md bg-zinc-800 p-2 text-white transition-colors hover:bg-zinc-700">
                  <SiApple size={18} /> Apple
                </button>
                <button onClick={() => handleOAuthLogin('github')} className="flex items-center justify-center gap-2 rounded-md bg-zinc-800 p-2 text-white transition-colors hover:bg-zinc-700">
                  <SiGithub size={18} /> GitHub
                </button>
                <button onClick={() => handleOAuthLogin('facebook')} className="flex items-center justify-center gap-2 rounded-md bg-zinc-800 p-2 text-white transition-colors hover:bg-zinc-700">
                  <SiFacebook size={18} /> Facebook
                </button>
                <button onClick={() => handleOAuthLogin('twitter')} className="flex items-center justify-center gap-2 rounded-md bg-zinc-800 p-2 text-white transition-colors hover:bg-zinc-700">
                  <SiX size={18} /> X
                </button>
                <div className="flex items-center justify-center rounded-md border border-dashed border-zinc-700 p-2 text-zinc-500">
                  Próximamente
                </div>
              </div>

              {/* --- INICIO DE LA CORRECCIÓN DE SINTAXIS --- */}
              <div className="my-4 flex items-center gap-3">
                <div className="h-px grow bg-zinc-700" />
                <span className="text-xs text-zinc-500">O</span>
                <div className="h-px grow bg-zinc-700" />
              </div>
              {/* --- FIN DE LA CORRECCIÓN DE SINTAXIS --- */}

              <Link
                href="/subscribe"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-zinc-700 p-2 text-sm font-medium text-white transition-colors hover:bg-zinc-600"
              >
                <Mail size={16} />
                Continuar con Email
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
