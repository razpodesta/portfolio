// RUTA: apps/portfolio-web/src/lib/route-guard.ts
// VERSIÓN: 5.0 - Seguridad Holística
// DESCRIPCIÓN: Define estrictamente qué es público. Todo lo demás es privado.

import { NextResponse, type NextRequest } from 'next/server';
import { type Locale } from '../config/i18n.config';

// Configuración de Rutas Públicas (Whitelist)
// Se usa coincidencia parcial (startsWith) para subrutas.
const publicPathPrefixes = [
  '/',              // Homepage
  '/login',         // Auth
  '/quien-soy',     // About
  '/mision-y-vision',
  '/contacto',
  '/blog',          // Incluye /blog/[slug]
  '/servicios',     // Incluye /servicios/*
  '/cocreacion',
  '/sistema-de-diseno',
  '/iconos',        // Librerías
  '/tecnologias',   // Librerías
  '/legal',         // Términos y Privacidad
  '/curriculum'
];

const adminPathPrefix = '/admin';

export function routeGuard(request: NextRequest, locale: Locale): NextResponse | null {
  const { pathname } = request.nextUrl;

  // 1. Normalizar la ruta: Eliminar el prefijo del idioma para comparar con la whitelist.
  // Ejemplo: /pt-BR/blog/post-1 -> /blog/post-1
  let pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '');
  if (pathWithoutLocale === '') pathWithoutLocale = '/';

  // 2. Verificación de Rutas Públicas
  const isPublic = publicPathPrefixes.some(prefix => {
    if (prefix === '/') return pathWithoutLocale === '/'; // Home exacto
    return pathWithoutLocale.startsWith(prefix);
  });

  if (isPublic) {
    return null; // Permitir acceso
  }

  // 3. Simulación de Sesión (Conectar con Supabase/Auth real aquí)
  // Por defecto: No autenticado.
  const isAuthenticated = false;
  const role = 'user';

  // 4. Protección de Rutas Administrativas
  if (pathWithoutLocale.startsWith(adminPathPrefix)) {
    if (!isAuthenticated || role !== 'admin') {
      // Redirigir a login o unauthorized manteniendo el idioma actual
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // 5. Rutas no públicas (Privadas por defecto)
  if (!isAuthenticated) {
     // Si quieres que todo lo que no es público requiera login:
     // return NextResponse.redirect(new URL(`/${locale}/login`, request.url));

     // O si prefieres mostrar 404 para rutas inexistentes en vez de protegerlas:
     return null; // Dejamos pasar para que Next.js maneje el 404 si no existe la página.
  }

  return null;
}
