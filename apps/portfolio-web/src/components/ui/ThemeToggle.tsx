// RUTA: oh-hoteis/src/components/ui/ThemeToggle.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

/**
 * Componente para alternar entre el tema claro y oscuro.
 * Utiliza un estado 'mounted' para evitar errores de hidratación entre el servidor y el cliente.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect solo se ejecuta en el cliente, asegurando que el componente
  // se renderice correctamente después de la hidratación.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Si el componente aún no está montado en el cliente, renderizamos un placeholder
  // para mantener el espacio en el layout y evitar saltos visuales (CLS).
  if (!mounted) {
    return (
      <button className="h-10 w-10 p-2" aria-label="Carregando tema">
        <div className="h-6 w-6 animate-pulse rounded-full bg-border" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex h-10 w-10 items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-accent"
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
