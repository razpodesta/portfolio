// RUTA: apps/portfolio-web/next.config.js
// VERSIÓN: 3.1 - Deprecation Fix
// @ts-check
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Svgr eliminado previamente
  },
  output: 'standalone',
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
  // devIndicators eliminado por deprecación en Next.js 15
};

module.exports = composePlugins(withNx)(nextConfig);
