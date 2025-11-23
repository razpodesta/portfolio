// RUTA: apps/portfolio-web/src/app/layout.tsx
// VERSIÓN: 2.0 - Corrección de Hidratación (Theme Compatibility)
// DESCRIPCIÓN: Layout raíz técnico. Se añade 'suppressHydrationWarning' para evitar
//              conflictos con 'next-themes', que modifica los atributos del <html>
//              en el cliente, causando discrepancias con el SSR.

import React from 'react';
import { i18n } from '@/config/i18n.config';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Establecemos el idioma por defecto y suprimimos advertencias de hidratación
    // para permitir que 'next-themes' inyecte clases (dark/light) sin errores.
    <html lang={i18n.defaultLocale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
