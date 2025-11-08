// RUTA: apps/portfolio-web/src/lib/hooks/use-visitor-data.ts
// VERSIÓN: 1.0 - Handler de Datos del Visitante (Custom Hook)

'use client';

import { useState, useEffect } from 'react';

// 1. Definimos la estructura de datos que nuestro handler devolverá.
export interface VisitorData {
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
  weather: {
    temperature: number;
  };
}

// 2. Este es nuestro handler. Un hook que encapsula toda la lógica.
export function useVisitorData() {
  const [data, setData] = useState<VisitorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // La función auto-ejecutable previene condiciones de carrera
    // y permite el uso de async/await dentro de useEffect.
    (async () => {
      try {
        setIsLoading(true);

        // Consulta de Geolocalización
        const geoResponse = await fetch('http://ip-api.com/json/?fields=city,lat,lon,timezone');
        if (!geoResponse.ok) throw new Error('API Error: Could not retrieve location.');
        const geoData = await geoResponse.json();

        // Consulta de Clima
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoData.lat}&longitude=${geoData.lon}&current_weather=true`);
        if (!weatherResponse.ok) throw new Error('API Error: Could not retrieve weather.');
        const weatherData = await weatherResponse.json();

        // 3. Formateamos y establecemos los datos en una única estructura limpia.
        setData({
          city: geoData.city,
          coordinates: {
            latitude: geoData.lat,
            longitude: geoData.lon,
          },
          timezone: geoData.timezone,
          weather: {
            temperature: Math.round(weatherData.current_weather.temperature),
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        console.error("Visitor Data Handler Error:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []); // El array vacío asegura que esto se ejecute solo una vez.

  // 4. El hook devuelve un objeto con el estado de la consulta.
  return { data, isLoading, error };
}
