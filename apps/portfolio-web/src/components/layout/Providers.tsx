// RUTA: oh-hoteis/src/components/layout/Providers.tsx
'use client'; // Directiva obligatoria para usar hooks y contexto de React.

import React from 'react';
import { ThemeProvider } from 'next-themes';

// Este componente envuelve la aplicación con proveedores que necesitan ejecutarse en el cliente.
// Es una buena práctica para separar la lógica de cliente de los Server Components.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"       // Aplica el tema como una clase en la etiqueta <html>
      defaultTheme="system"   // Usa el tema del sistema operativo como predeterminado
      enableSystem            // Permite que el tema cambie si el usuario cambia su SO
      disableTransitionOnChange // Evita parpadeos al cambiar de página
    >
      {children}
    </ThemeProvider>
  );
}
