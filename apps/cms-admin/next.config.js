// RUTA: apps/cms-admin/next.config.js
// VERSIÓN: 3.0 - TypeScript Compliant (Nx 22+)
// DESCRIPCIÓN: Se elimina la propiedad 'svgr' obsoleta del objeto 'nx' para
//              satisfacer la interfaz 'WithNxOptions' y eliminar el error ts(2353).
//              Se mantienen las configuraciones críticas de transpilación y dominios de imágenes.

// @ts-check
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // La propiedad 'svgr' ha sido eliminada porque ya no es válida en Nx 22+.
    // El manejo de SVG se realiza ahora a través de la configuración de Webpack o plugins.
  },

  // CRÍTICO PARA MONOREPO: Permite que Next.js compile los paquetes compartidos
  // escritos en TypeScript que residen en la carpeta 'packages/'.
  transpilePackages: ['@contentpi/ui', '@contentpi/core', '@contentpi/utils'],

  images: {
    remotePatterns: [
      // Permite avatares de servicio externo
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      // Permite imágenes desde el Storage de Supabase (Producción)
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },

  // Desactivamos la etiqueta de 'use client' en consola durante el desarrollo para limpieza
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Compatibilidad: Desactivamos el modo estricto si hay librerías legacy (opcional, según necesidad)
  reactStrictMode: true,
};

module.exports = composePlugins(withNx)(nextConfig);
