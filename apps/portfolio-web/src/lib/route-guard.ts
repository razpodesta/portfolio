// RUTA: apps/portfolio-web/src/lib/route-guard.ts
// VERSIÓN: 3.2 - Corregido error de tipeo en import y linter explícito

import { NextResponse, type NextRequest } from 'next/server';
// --- INICIO DE LA CORRECCIÓN 1: Error de Tipeo ---
// Se corrige 'i1n.config' a 'i18n.config'.
import { type Locale } from '../config/i18n.config';
// --- FIN DE LA CORRECCIÓN 1 ---

// ===================================================================================
// TIPOS Y CONFIGURACIÓN CENTRALIZADA
// ===================================================================================

type UserRole = 'user' | 'admin';

interface UserSession {
  isAuthenticated: boolean;
  role: UserRole | null;
}

const routeConfig = {
  publicPaths: ['/'],
  adminPaths: ['/admin'],
};

// ===================================================================================
// SIMULACIÓN DE OBTENCIÓN DE SESIÓN
// ===================================================================================

/**
 * A FUTURO: Esta función será reemplazada por tu lógica real para obtener
 * la sesión del usuario (ej. decodificando un token JWT de las cookies).
 */
// --- INICIO DE LA CORRERECCIÓN 2: Linter Explícito ---
// Deshabilitamos explícitamente la regla para esta línea. Esto es más robusto
// que solo confiar en la convención del guion bajo.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSession(_request: NextRequest): UserSession {
// --- FIN DE LA CORRECCIÓN 2 ---
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
// LÓGICA DEL GUARDIÁN OPTIMIZADA
// ===================================================================================

export function routeGuard(request: NextRequest, locale: Locale): NextResponse | null {
  const { pathname } = request.nextUrl;
  const session = getSession(request);

  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.substring(`/${locale}`.length) || '/'
    : pathname;

  const isPublic = routeConfig.publicPaths.some((p) => pathnameWithoutLocale.startsWith(p));
  const isAdminPath = routeConfig.adminPaths.some((p) => pathnameWithoutLocale.startsWith(p));

  // REGLAS DE ACCESO (PRINCIPIO DE DENEGACIÓN POR DEFECTO)
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
