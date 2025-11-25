// RUTA: apps/portfolio-web/src/lib/fonts.ts
// VERSIÓN: 2.0 - Corrección de Origen de Fuentes (Local vs Google)
// DESCRIPCIÓN: Mapea identificadores de diseño a instancias de fuentes.
//              Separa estrictamente fuentes de Google Fonts de fuentes locales (Fontshare).

import {
  Playfair_Display,
  Cinzel,
  Space_Grotesk,
  Merriweather,
  Syne,
  Bodoni_Moda,
  Italiana,
  Inter,
  Montserrat,
  DM_Sans,
  Open_Sans,
  Manrope,
  Lora,
  Tenor_Sans
} from 'next/font/google';
import localFont from 'next/font/local';

// --- 1. Fuentes Locales (Branding Core & Arquetipos Premium) ---
// Estas fuentes NO están en Google Fonts. Se cargan desde /public/fonts/
// Asegúrate de que los archivos .woff2 existan en esa ruta.

const fontClash = localFont({
  src: '../../public/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash',
  display: 'swap',
  fallback: ['sans-serif'],
});

const fontCabinet = localFont({
  src: '../../public/fonts/CabinetGrotesk-Variable.woff2',
  variable: '--font-cabinet',
  display: 'swap',
  fallback: ['sans-serif'],
});

const fontSatoshi = localFont({
  src: '../../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  fallback: ['sans-serif'],
});

// --- 2. Fuentes de Google (Arquetipos Standard) ---
// Configuramos subsets y variables CSS para optimización.

const fontPlayfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const fontCinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap'
});

const fontSpace = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap'
});

const fontMerriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap'
});

const fontSyne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap'
});

const fontBodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap'
});

const fontItaliana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italiana',
  display: 'swap'
});

// Body Fonts (Google)
const fontInter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fontMontserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const fontDmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm', display: 'swap' });
const fontOpenSans = Open_Sans({ subsets: ['latin'], variable: '--font-open', display: 'swap' });
const fontManrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const fontLora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });
const fontTenor = Tenor_Sans({ weight: '400', subsets: ['latin'], variable: '--font-tenor', display: 'swap' });

// --- 3. Mapa Maestro ---
// La clave debe coincidir EXACTAMENTE con los valores en tus JSONs (project_details.json)

export const fontMap: Record<string, { className: string, variable: string }> = {
  // Headings - Locales
  'Clash Display': fontClash,
  'Cabinet Grotesk': fontCabinet,

  // Headings - Google
  'Playfair Display': fontPlayfair,
  'Cinzel': fontCinzel,
  'Space Grotesk': fontSpace,
  'Merriweather': fontMerriweather,
  'Syne': fontSyne,
  'Bodoni Moda': fontBodoni,
  'Italiana': fontItaliana,

  // Bodies - Locales
  'Satoshi': fontSatoshi,

  // Bodies - Google
  'Inter': fontInter,
  'Lato': fontInter, // Fallback a Inter si no se carga Lato
  'Montserrat': fontMontserrat,
  'DM Sans': fontDmSans,
  'Open Sans': fontOpenSans,
  'Manrope': fontManrope,
  'Lora': fontLora,
  'Tenor Sans': fontTenor,
};

/**
 * Recupera la clase CSS de la fuente basada en el nombre definido en el JSON.
 * Implementa un fallback de seguridad a 'Inter' si la fuente no se encuentra.
 *
 * @param fontName Nombre de la fuente (ej: "Clash Display")
 * @returns string Clase CSS de Next.js (ej: "__className_12345")
 */
export function getFontClassName(fontName: string): string {
  const font = fontMap[fontName];
  if (!font) {
    console.warn(`[FontManager] Fuente no encontrada: "${fontName}". Usando fallback.`);
    return fontInter.className;
  }
  return font.className;
}
