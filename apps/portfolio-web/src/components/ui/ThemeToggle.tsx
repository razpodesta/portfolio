// RUTA: apps/portfolio-web/src/components/ui/ThemeToggle.tsx
// VERSIÓN: 2.2 - Iconos reducidos para una estética más fina.

'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full">
        <div className="h-5 w-5 animate-pulse rounded-full bg-zinc-800" />
      </div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
      aria-label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
    >
      {/* --- INICIO DE LA MEJORA: Tamaño de icono reducido --- */}
      {isDark ? (
        <Moon size={18} strokeWidth={1.5} />
      ) : (
        <Sun size={18} strokeWidth={1.5} />
      )}
      {/* --- FIN DE LA MEJORA --- */}
    </button>
  );
}
