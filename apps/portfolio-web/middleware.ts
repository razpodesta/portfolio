// RUTA: apps/portfolio-web/middleware.ts
// VERSIÓN: 5.0 - Default pt-BR & Performance

import { NextResponse, type NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n, type Locale } from './src/config/i18n.config';
import { routeGuard } from './src/lib/route-guard';

function getLocale(request: NextRequest): Locale {
  // 1. Prioridad: Cookie de preferencia (si existiera)
  // 2. Negociación de headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    return matchLocale(languages, [...i18n.locales], i18n.defaultLocale) as Locale;
  } catch (e) {
    return i18n.defaultLocale; // Fallback seguro a pt-BR
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignorar archivos estáticos y APIs internas
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Archivos con extensión (imágenes, etc)
  ) {
    return NextResponse.next();
  }

  // 2. Verificar si falta el locale en la ruta
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Si estamos en la raíz '/', forzamos pt-BR por defecto si no hay preferencia
    // O usamos la detección del navegador.
    // Para cumplir "Default pt-BR":
    const locale = pathname === '/' ? i18n.defaultLocale : getLocale(request);

    const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
    // Preservar query params
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
  }

  // 3. Extraer locale actual para el Guardián
  const localeFromPath = pathname.split('/')[1] as Locale;

  // 4. Ejecutar Route Guard
  const guardResponse = routeGuard(request, localeFromPath);
  if (guardResponse) {
    return guardResponse;
  }

  return NextResponse.next();
}

export const config = {
  // Matcher optimizado para excluir estáticos agresivamente
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)'],
};
