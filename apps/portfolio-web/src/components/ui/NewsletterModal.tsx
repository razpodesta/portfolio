// RUTA: apps/portfolio-web/src/components/ui/NewsletterModal.tsx
// VERSIÓN: 1.1 - Corregido el patrón de limpieza de useEffect y dependencias

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Mail } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase/client';
import { setCookie, getCookie } from 'cookies-next';

// Placeholder para los iconos de redes sociales.
const GoogleIcon = () => <span>G</span>;
const GithubIcon = () => <span>GH</span>;
const XIcon = () => <span>X</span>;

const COOKIE_NAME = 'newsletter_modal_seen';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createSupabaseBrowserClient();

  // --- INICIO DE LA CORRECCIÓN: Patrón de useEffect robusto ---
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    const hasSeenModal = getCookie(COOKIE_NAME);

    if (!hasSeenModal) {
      timerId = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
    }

    // Devolvemos SIEMPRE una función de limpieza.
    // Esto cumple con el contrato de useEffect y soluciona el error ts(7030).
    return () => {
      // Solo intentamos limpiar el temporizador si fue creado.
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []); // El array de dependencias vacío es correcto, solo se ejecuta al montar.
  // --- FIN DE LA CORRECCIÓN ---

  const handleClose = () => {
    setCookie(COOKIE_NAME, 'true', { maxAge: 60 * 60 * 24 * 365, path: '/' });
    setIsOpen(false);
  };

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'twitter') => {
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleClose} className="absolute top-3 right-3 text-zinc-500 hover:text-white z-10">
              <X size={24} />
            </button>

            <div className="relative w-full h-48">
              {/* NOTA: Reemplaza '/images/newsletter-bg.jpg' con la ruta a tu imagen real */}
              <Image src="/images/newsletter-bg.jpg" alt="Newsletter" layout="fill" className="object-cover"/>
            </div>

            <div className="p-6 text-center">
              <h2 className="font-display text-2xl font-bold text-white">Únete a la Comunidad</h2>
              <p className="mt-2 text-zinc-400 text-sm">Recibe contenido exclusivo, proyectos y actualizaciones directamente en tu bandeja de entrada.</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button onClick={() => handleOAuthLogin('google')} className="flex items-center justify-center gap-2 p-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"><GoogleIcon /> Google</button>
                <button onClick={() => handleOAuthLogin('github')} className="flex items-center justify-center gap-2 p-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"><GithubIcon /> GitHub</button>
                <button onClick={() => handleOAuthLogin('twitter')} className="flex items-center justify-center gap-2 p-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"><XIcon /> X</button>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="h-px flex-grow bg-zinc-700"/>
                <span className="text-zinc-500 text-xs">O</span>
                <div className="h-px flex-grow bg-zinc-700"/>
              </div>

              <Link href="/subscribe" className="mt-4 flex items-center justify-center gap-2 w-full p-2 bg-zinc-700 rounded-md hover:bg-zinc-600 transition-colors">
                <Mail size={16}/>
                Continuar con Email
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
