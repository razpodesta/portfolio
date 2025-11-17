// RUTA: apps/portfolio-web/src/components/ui/VisitorHud.tsx
// VERSIÓN: 6.0 - Componente simplificado. La visibilidad es controlada
//              externamente por el Context y el scroll.

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { MapPin, Thermometer, Clock, Globe, Loader, AlertCircle, X, GripVertical } from 'lucide-react';
import { useVisitorData } from '../../lib/hooks/use-visitor-data';
import { useWidget } from '../../lib/contexts/WidgetContext';

const WIDGET_POSITION_KEY = 'visitorWidgetPosition';

function decimalToDMS(decimal: number, type: 'lat' | 'lon'): string {
    const absDecimal = Math.abs(decimal);
    const degrees = Math.floor(absDecimal);
    const minutes = Math.floor((absDecimal - degrees) * 60);
    const seconds = Math.round(((absDecimal - degrees) * 60 - minutes) * 60);
    const direction = type === 'lat' ? (decimal >= 0 ? 'N' : 'S') : (decimal >= 0 ? 'E' : 'W');
    return `${degrees}°${minutes}'${seconds}" ${direction}`;
}

export function VisitorHud() {
  const { data, isLoading, error } = useVisitorData();
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const { isWidgetVisible, toggleWidgetVisibility } = useWidget();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const storedPosition = localStorage.getItem(WIDGET_POSITION_KEY);
    if (storedPosition) {
      const { x: savedX, y: savedY } = JSON.parse(storedPosition);
      x.set(savedX);
      y.set(savedY);
    }
  }, [x, y]);

  function handleDragEnd() {
    const newPosition = { x: x.get(), y: y.get() };
    localStorage.setItem(WIDGET_POSITION_KEY, JSON.stringify(newPosition));
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (data?.timezone) {
      timerId = setInterval(() => {
        const visitorTime = new Date().toLocaleTimeString('en-GB', { timeZone: data.timezone });
        setCurrentTime(visitorTime);
      }, 1000);
    }
    return () => { if (timerId) clearInterval(timerId) };
  }, [data?.timezone]);

  return (
    <AnimatePresence>
      {isWidgetVisible && (
        <motion.div
          drag
          onDragEnd={handleDragEnd}
          style={{ x, y }}
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-28 right-4 z-40 w-60 cursor-grab rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-sm text-gray-300 shadow-2xl shadow-black/40 backdrop-blur-lg active:cursor-grabbing"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-700/50">
            <div className="flex items-center gap-2">
              <GripVertical size={18} className="text-zinc-500" />
              <p className="font-bold text-white tracking-widest text-xs">[VISITOR_DATA]</p>
            </div>
            <button
              onClick={toggleWidgetVisibility}
              className="p-1 rounded-full text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-white"
              aria-label="Cerrar widget"
            >
              <X size={16} />
            </button>
          </div>

          {isLoading && <div className="flex items-center gap-2 animate-pulse"><Loader size={16} className="animate-spin" /> LOCATING...</div>}
          {error && <div className="flex items-center gap-2 text-red-400"><AlertCircle size={16} /> UNAVAILABLE</div>}
          {data && !isLoading && (
            <div className="space-y-2 font-mono text-xs">
              <p className="flex items-center gap-2"><MapPin size={14} /> {data.city}</p>
              <p className="flex items-center gap-2"><Globe size={14} /> {`${decimalToDMS(data.coordinates.latitude, 'lat')}, ${decimalToDMS(data.coordinates.longitude, 'lon')}`}</p>
              <p className="flex items-center gap-2"><Thermometer size={14} /> {data.weather.temperature}°C</p>
              <p className="flex items-center gap-2"><Clock size={14} /> {currentTime}</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
