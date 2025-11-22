// RUTA: apps/cms-admin/next.config.js
// @ts-check
const { composePlugins, withNx } = require('@nx/next');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} **/
const nextConfig = {
  nx: {},
  // Compatibilidad con React 17 (necesario temporalmente durante la migración)
  reactStrictMode: false,
};

module.exports = composePlugins(withNx)(nextConfig);
