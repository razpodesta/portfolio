// RUTA: apps/portfolio-web/src/lib/route-guard.ts
// VERSIÓN: 4.0 - Sincronizado con el Manifiesto de Rutas v1.0
// DESCRIPCIÓN: Se actualiza el array `publicPaths` para incluir todas las nuevas
//              rutas públicas definidas en el manifiesto, asegurando que el
//              middleware no las bloquee incorrectamente.

import { NextResponse, type NextRequest } from 'next/server';
import { type Locale } from '../config/i18n.config';

// ===================================================================================
// TIPOS Y CONFIGURACIÓN CENTRALIZADA
// ===================================================================================

type UserRole = 'user' | 'admin';

interface UserSession {
  isAuthenticated: boolean;
  role: UserRole | null;
}

const routeConfig = {
  // --- INICIO DE LA ACTUALIZACIÓN ---
  // Se añaden todas las nuevas rutas y sus posibles sub-rutas.
  publicPaths: [
    '/',
    '/login',
    '/unauthorized',
    '/quien-soy',
    '/mision-y-vision',
    '/contacto',
    '/blog', // Incluye /blog y /blog/[slug], /blog/categorias/[category] etc.
    '/servicios', // Incluye todas las sub-rutas de servicios
    '/cocreacion',
    '/sistema-de-diseno',
  ],
  // --- FIN DE LA ACTUALIZACIÓN ---
  adminPaths: ['/admin'],
};

// ===================================================================================
// SIMULACIÓN DE OBTENCIÓN DE SESIÓN (Sin cambios)
// ===================================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSession(_request: NextRequest): UserSession {
  // --- SIMULACIÓN ---
  const isAuthenticated = false;
  const role: UserRole = 'user';
  // --- FIN DE SIMULACIÓN ---

  if (!isAuthenticated) {
    return { isAuthenticated: false, role: null };
  }

  return { isAuthenticated: true, role };
}

// ===================================================================================
// LÓGICA DEL GUARDIÁN OPTIMIZADA (Sin cambios)
// ===================================================================================

export function routeGuard(request: NextRequest, locale: Locale): NextResponse | null {
  const { pathname } = request.nextUrl;
  const session = getSession(request);

  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.substring(`/${locale}`.length) || '/'
    : pathname;

  const isPublic = routeConfig.publicPaths.some((p) => pathnameWithoutLocale.startsWith(p));
  const isAdminPath = routeConfig.adminPaths.some((p) => pathnameWithoutLocale.startsWith(p));

  if (isPublic) {
    return null;
  }

  if (!session.isAuthenticated) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminPath && session.role !== 'admin') {
    const unauthorizedUrl = new URL(`/${locale}/unauthorized`, request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  return null;
}
