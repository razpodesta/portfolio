// RUTA: apps/portfolio-web/tailwind.config.js
// VERSIÓN: De Élite con Theming y Tipografía de Autor

const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Habilita el modo oscuro basado en una clase, crucial para next-themes
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // 1. REGISTRO DE TIPOGRAFÍA DE AUTOR
      // Hacemos que Tailwind reconozca nuestras fuentes personalizadas.
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        display: ['var(--font-display)', ...fontFamily.sans],
      },
      // 2. SISTEMA DE COLORES BASADO EN VARIABLES (THEMING)
      // Definimos colores semánticos que obtendrán su valor de variables CSS.
      // Esto permite crear temas de forma increíblemente fácil.
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      // 3. EFECTOS ADICIONALES PARA LA ESTÉTICA
      // Añadimos una sombra de texto para mejorar la legibilidad sobre imágenes.
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    // Plugin para añadir la utilidad de text-shadow
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    },
  ],
};
