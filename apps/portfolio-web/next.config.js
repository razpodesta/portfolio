// RUTA: apps/portfolio-web/next.config.js
// VERSIÓN: 3.0 - TypeScript Compliant (Nx 22+) & Production Ready
// DESCRIPCIÓN: Se elimina la propiedad obsoleta 'svgr' para cumplir con la interfaz 'WithNxOptions'.
//              Se mantiene la configuración de imágenes y salida standalone para Docker/Vercel.

// @ts-check
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // svgr has been removed as it is deprecated in recent Nx versions
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      // Permitir imágenes del CMS (Supabase Storage)
      { protocol: 'https', hostname: '*.supabase.co' }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Optimización para reducir ruido en consola durante desarrollo
  devIndicators: {
    appIsrStatus: false,
  },
};

module.exports = composePlugins(withNx)(nextConfig);
