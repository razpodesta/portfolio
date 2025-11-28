// RUTA: apps/portfolio-web/src/components/ui/SystemStatusTicker.tsx
// VERSIÓN: 1.1 - Fix Lint & Tailwind v4 & Strict Relative Imports
// DESCRIPCIÓN: Barra de estado "Noticiero".
//              - Corrección: Importación relativa estricta (../../).
//              - Corrección: Sintaxis de gradiente Tailwind v4 (bg-linear-to-r).

// IMPORTACIÓN RELATIVA CORREGIDA (Satisface @nx/enforce-module-boundaries)
import type { Dictionary } from '../../lib/schemas/dictionary.schema';

type SystemStatusTickerProps = {
  // TypeScript detectará esta propiedad una vez que dictionary.schema.ts esté guardado
  dictionary: Dictionary['system_status'];
};

export function SystemStatusTicker({ dictionary }: SystemStatusTickerProps) {
  // Duplicamos los items para un loop visualmente infinito
  const loopedItems = [...dictionary.items, ...dictionary.items, ...dictionary.items];

  return (
    <div
      className="relative z-40 w-full overflow-hidden border-b border-white/5 bg-[#050505] py-2.5 text-xs font-medium uppercase tracking-widest text-zinc-400"
      role="marquee"
      aria-label={dictionary.aria_label}
    >
      {/* CORRECCIÓN TAILWIND v4: bg-linear-to-r */}
      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-[#050505] to-transparent pointer-events-none" />

      {/* CORRECCIÓN TAILWIND v4: bg-linear-to-l */}
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-[#050505] to-transparent pointer-events-none" />

      {/* Contenedor Animado */}
      <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
        {loopedItems.map((item, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="mr-4 text-purple-500">●</span>
            <span className="whitespace-nowrap">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
