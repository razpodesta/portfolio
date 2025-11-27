// RUTA: apps/portfolio-web/next.config.js
// VERSIÓN: 3.2 - Optimized Build
// @ts-check
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  output: 'standalone',
  // --- MEJORA CRÍTICA: Transpilación directa de librerías locales ---
  // Esto permite eliminar Rollup y builds intermedios.
  transpilePackages: [
    '@metashark-cms/ui',
    '@metashark-cms/core',
    '@razpodesta/protocol-33',
    '@razpodesta/auth-shield'
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: '*.supabase.co' }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = composePlugins(withNx)(nextConfig);
