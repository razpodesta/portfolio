// RUTA: apps/portfolio-web/middleware.ts
// VERSIÓN: Holística v2.0 - Con Guardián de Rutas Integrado

import { NextResponse, type NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { i18n, type Locale } from './src/config/i18n.config';
import { routeGuard } from './src/lib/route-guard'; // <-- Importamos nuestro guardián

/**
 * Determina el mejor 'locale' soportado basado en las cabeceras 'Accept-Language'.
 */
function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = [...i18n.locales];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale as Locale;
}

/**
 * Middleware principal.
 *
 * Su flujo de responsabilidad es claro y secuencial:
 * 1. Determinar si a la ruta le falta un prefijo de 'locale'.
 * 2. Si falta, redirigir a la URL correcta con el 'locale' detectado.
 * 3. Una vez que la ruta tiene un 'locale', invocar al `routeGuard` para manejar la autorización.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- PASO 1: Gestión de Internacionalización (i18n) ---
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirige si falta el 'locale' en la ruta.
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // SOLUCIÓN AL BUG 404: Usar una redirección explícita y permanente (308).
    // Esto corrige el problema de la página no encontrada en la ruta raíz.
    return NextResponse.redirect(newUrl);
  }

  // --- PASO 2: Invocación del Guardián de Rutas ---
  // Una vez que sabemos que la ruta tiene un 'locale', delegamos la lógica
  // de seguridad y autorización a nuestro guardián.
  const localeFromPath = (pathname.split('/')[1] as Locale) || i18n.defaultLocale;
  const guardResponse = routeGuard(request, localeFromPath);

  // Si el guardián decide que hay que redirigir (porque no hay permisos, etc.),
  // devolvemos su respuesta. De lo contrario, la petición continúa.
  if (guardResponse) {
    return guardResponse;
  }

  // Si todo está en orden, permite que la petición continúe.
  return NextResponse.next();
}

/**
 * Configuración del Matcher.
 * Le dice a Next.js que este middleware se aplique a todas las rutas,
 * EXCEPTO a las que son para archivos estáticos, imágenes o rutas internas de Next.
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
