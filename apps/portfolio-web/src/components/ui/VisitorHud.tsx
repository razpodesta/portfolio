// RUTA: apps/portfolio-web/src/components/ui/VisitorHud.tsx
// VERSIÓN: 12.0 - Zustand Powered & Hydration Safe
// DESCRIPCIÓN: Widget visual conectado al store global. Implementa lógica de
//              montaje diferido para respetar la persistencia del usuario sin
//              errores de hidratación.

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  MapPin, Thermometer, Clock, Globe, Loader, AlertCircle, X,
  GripVertical, Network, CloudSun, CloudRain, Cloud, Sun, ScanFace, Info
} from 'lucide-react';
import { useVisitorData } from '../../lib/hooks/use-visitor-data';
// useWidget eliminado
import { useUIStore } from '../../lib/store/ui.store'; // <-- ZUSTAND IMPORT
import type { Dictionary } from '../../lib/schemas/dictionary.schema';

const WIDGET_POSITION_KEY = 'visitorWidgetPosition';

function decimalToDMS(decimal: number, type: 'lat' | 'lon'): string {
    if (!decimal) return '--';
    const absDecimal = Math.abs(decimal);
    const degrees = Math.floor(absDecimal);
    const minutes = Math.floor((absDecimal - degrees) * 60);
    const direction = type === 'lat' ? (decimal >= 0 ? 'N' : 'S') : (decimal >= 0 ? 'E' : 'W');
    return `${degrees}°${minutes}' ${direction}`;
}

function getWeatherStatus(code: number) {
  if (code <= 3) return { type: 'sunny', icon: Sun };
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { type: 'rainy', icon: CloudRain };
  return { type: 'cloudy', icon: Cloud };
}

type VisitorHudProps = {
  dictionary: Dictionary['visitor_hud'] | undefined;
};

export function VisitorHud({ dictionary }: VisitorHudProps) {
  // 1. HOOKS
  const { data, isLoading, error } = useVisitorData();
  const [currentTime, setCurrentTime] = useState('--:--');

  // --- ZUSTAND INTEGRATION ---
  const isWidgetVisible = useUIStore((state) => state.isVisitorHudVisible);
  const toggleWidgetVisibility = useUIStore((state) => state.toggleVisitorHud);
  // ---------------------------

  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Hidratación Segura
  useEffect(() => {
    setMounted(true);
  }, []);

  // Restaurar posición
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPosition = localStorage.getItem(WIDGET_POSITION_KEY);
      if (storedPosition) {
        try {
          const { x: savedX, y: savedY } = JSON.parse(storedPosition);
          x.set(savedX);
          y.set(savedY);
        } catch (e) {
          console.error("Error widget pos", e);
        }
      }
    }
  }, [x, y]);

  // Reloj
  useEffect(() => {
    if (!data?.timezone) return;
    const updateClock = () => {
      const timeString = new Date().toLocaleTimeString('en-GB', {
        timeZone: data.timezone,
        hour: '2-digit', minute: '2-digit'
      });
      setCurrentTime(timeString);
    };
    const rafId = requestAnimationFrame(updateClock);
    const timerId = setInterval(updateClock, 1000);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(timerId);
    };
  }, [data?.timezone]);

  // Memoización de Clima
  const weatherInfo = useMemo(() => {
    if (!data?.weather) return { label: '...', icon: CloudSun, color: 'text-zinc-400' };
    const status = getWeatherStatus(data.weather.weathercode);
    let label = '';
    let color = '';
    if (dictionary) {
      if (status.type === 'sunny') { label = dictionary.weather_sunny; color = 'text-yellow-400'; }
      else if (status.type === 'rainy') { label = dictionary.weather_rainy; color = 'text-blue-400'; }
      else { label = dictionary.weather_cloudy; color = 'text-gray-400'; }
    }
    return { label, icon: status.icon, color };
  }, [data, dictionary]);

  function handleDragEnd() {
    const newPosition = { x: x.get(), y: y.get() };
    localStorage.setItem(WIDGET_POSITION_KEY, JSON.stringify(newPosition));
  }

  // 3. GUARDIAS
  if (!dictionary) return null;
  // Evitamos renderizar en el servidor o antes de que Zustand hidrate para prevenir saltos
  if (!mounted) return null;

  // 4. RENDERIZADO
  return (
    <AnimatePresence>
      {isWidgetVisible && (
        <motion.div
          drag
          onDragEnd={handleDragEnd}
          style={{ x, y }}
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
          className="fixed top-24 right-4 z-40 w-72 cursor-grab rounded-2xl border border-zinc-800 bg-zinc-950/95 p-0 text-zinc-300 shadow-2xl shadow-black/80 backdrop-blur-xl active:cursor-grabbing sm:top-28 overflow-hidden"
        >
          {/* Header Proactivo */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-purple-400">
              <ScanFace size={16} />
              <span className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-white">
                {dictionary.label_visitor_info}
              </span>
            </div>
            <button
              onClick={toggleWidgetVisibility}
              className="p-1 rounded-full text-zinc-500 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <Loader size={20} className="animate-spin text-purple-500" />
                <span className="font-mono text-[10px] animate-pulse">{dictionary.status_calibrating}</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center gap-2 text-red-400 py-2">
                <AlertCircle size={16} /> <span className="text-xs font-bold">{dictionary.status_error}</span>
              </div>
            ) : (
              <>
                {/* Fila 1: Ciudad y Hora */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <MapPin size={10} /> {dictionary.label_location}
                        </p>
                        <p className="font-bold text-white text-sm truncate">{data?.city}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-end gap-1">
                           {dictionary.label_time} <Clock size={10} />
                        </p>
                        <p className="font-mono font-bold text-white text-sm">{currentTime}</p>
                    </div>
                </div>

                <div className="h-px bg-zinc-800/50 w-full" />

                {/* Fila 2: Clima y Coordenadas */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    {/* Clima Detallado */}
                    <div className="flex items-center gap-3">
                         <weatherInfo.icon size={24} className={weatherInfo.color} />
                         <div>
                             <p className="text-[9px] font-bold text-zinc-400 uppercase">{weatherInfo.label}</p>
                             <p className="text-sm font-bold text-white">{data?.weather.temperature}°C</p>
                         </div>
                    </div>

                    {/* Coordenadas */}
                    <div className="text-right">
                         <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">{dictionary.coords_format}</p>
                         <p className="font-mono text-[10px] text-zinc-400">
                            {decimalToDMS(data?.coordinates.latitude || 0, 'lat')}
                         </p>
                         <p className="font-mono text-[10px] text-zinc-400">
                            {decimalToDMS(data?.coordinates.longitude || 0, 'lon')}
                         </p>
                    </div>
                </div>

                {/* Fila 3: IP Centrada */}
                <div className="bg-zinc-900/80 rounded-lg p-2 text-center border border-zinc-800">
                    <p className="text-[8px] text-zinc-500 uppercase tracking-[0.2em] mb-1">{dictionary.label_ip_visitor}</p>
                    <p className="font-mono text-xs text-purple-300 font-bold tracking-wide">{data?.ip}</p>
                </div>
              </>
            )}
          </div>

          {/* Footer de Créditos */}
          <div className="bg-zinc-950 border-t border-zinc-900 py-2 px-4 text-center">
              <p className="text-[8px] text-zinc-600 font-medium flex items-center justify-center gap-1">
                 <Info size={8} /> {dictionary.footer_credits}
              </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
