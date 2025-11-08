// RUTA: apps/portfolio-web/src/components/ui/VisitorHud.tsx
// VERSIÓN: 2.1 - Corregido el patrón de limpieza en useEffect

'use client';

import { useState, useEffect } from 'react';
import { MapPin, Thermometer, Clock, Loader, AlertCircle } from 'lucide-react';
import { useVisitorData } from '../../lib/hooks/use-visitor-data';

export function VisitorHud() {
  const { data, isLoading, error } = useVisitorData();
  const [currentTime, setCurrentTime] = useState('--:--:--');

  // --- INICIO DE LA CORRECCIÓN: Patrón de useEffect robusto ---
  useEffect(() => {
    // 1. Declaramos la variable del temporizador fuera de la condición.
    let timerId: NodeJS.Timeout | undefined;

    // 2. Si tenemos la zona horaria, iniciamos el temporizador.
    if (data?.timezone) {
      timerId = setInterval(() => {
        const visitorTime = new Date().toLocaleTimeString('en-GB', {
          timeZone: data.timezone,
        });
        setCurrentTime(visitorTime);
      }, 1000);
    }

    // 3. Devolvemos SIEMPRE una función de limpieza.
    // Esta función se ejecutará cuando el componente se desmonte o `data.timezone` cambie.
    return () => {
      // 4. Solo intentamos limpiar el temporizador si fue creado.
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [data?.timezone]); // La dependencia es correcta.
  // --- FIN DE LA CORRECCIÓN ---

  if (isLoading) {
    return (
      <div className="absolute -top-8 right-0 text-right font-mono text-sm text-gray-300">
        <p className="flex items-center justify-end gap-2 animate-pulse">
          <Loader size={14} className="animate-spin" /> Localizando...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute -top-8 right-0 text-right font-mono text-sm text-red-400">
        <p className="flex items-center justify-end gap-2">
          <AlertCircle size={14} /> No disponible
        </p>
      </div>
    );
  }

  return (
    <div className="absolute -top-8 right-0 text-right font-mono text-sm text-gray-300 space-y-1">
      <p className="flex items-center justify-end gap-2">
        <MapPin size={14} /> {data?.city}
      </p>
      <p className="flex items-center justify-end gap-2">
        <Thermometer size={14} /> {data?.weather.temperature}°C
      </p>
      <p className="flex items-center justify-end gap-2">
        <Clock size={14} /> {currentTime}
      </p>
    </div>
  );
}
