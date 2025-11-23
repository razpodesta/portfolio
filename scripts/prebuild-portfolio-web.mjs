// RUTA: scripts/prebuild-portfolio-web.mjs
// VERSIÓN: 4.0 - Inclusión de Visitor HUD
// DESCRIPCIÓN: Script de Node.js actualizado para incluir 'visitor_hud.json'
//              en el proceso de ensamblaje de diccionarios.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de rutas para módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del proyecto
const LOCALES = ['en-US', 'es-ES', 'pt-BR'];
const SOURCE_DIR = path.join(__dirname, '../apps/portfolio-web/src/messages');
const DEST_DIR = path.join(__dirname, '../apps/portfolio-web/src/dictionaries');

// LISTA MAESTRA DE ARCHIVOS A PROCESAR
const FILES = [
  'header',
  'nav-links',
  'hero',
  'about',
  'value_proposition',
  'contact',
  'history',
  'footer',
  'language_switcher',
  'not_found',
  'server_error',
  'maintenance',
  'quien_soy',
  'mission_vision',
  'blog_page',
  'contact_page',
  'design_system_page',
  'cocreation_page',
  'legal',
  'curriculum',
  'technologies_page',
  'lucide_page',
  'ai_gallery_section',
  'visitor_hud' // <--- NUEVO ARCHIVO AÑADIDO AQUÍ
];

// MAPEO ESTRUCTURAL
const FILE_MAPPING = {
  'hero': ['homepage', 'hero'],
  'about': ['homepage', 'about_section'],
  'value_proposition': ['homepage', 'value_proposition_section'],
  'contact': ['homepage', 'contact'],
  'history': ['homepage', 'history_section'],
  'ai_gallery_section': ['homepage', 'ai_gallery_section']
  // 'visitor_hud' no necesita mapeo, irá a la raíz como 'visitor_hud'
};

// Función auxiliar para asignar valores en objetos anidados
function setNestedValue(obj, path, value) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[path[path.length - 1]] = value;
}

async function buildDictionaries() {
  console.log('\n==================================================');
  console.log('🛠️  [i18n BUILDER] INICIANDO ENSAMBLAJE DE DICCIONARIOS');
  console.log('==================================================\n');

  try {
    await fs.mkdir(DEST_DIR, { recursive: true });

    for (const locale of LOCALES) {
      console.log(`🌐 Procesando idioma: [ ${locale} ]`);
      console.log('--------------------------------------------------');

      const dictionary = {};
      let processedCount = 0;

      for (const file of FILES) {
        const filePath = path.join(SOURCE_DIR, locale, `${file}.json`);

        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const jsonContent = JSON.parse(content);

          if (FILE_MAPPING[file]) {
            setNestedValue(dictionary, FILE_MAPPING[file], jsonContent);
          } else {
            dictionary[file] = jsonContent;
          }

          console.log(`  ✅ Integrado: ${file}.json`);
          processedCount++;
        } catch (error) {
          if (error.code === 'ENOENT') {
            console.log(`  ⚪ [Omitido] ${file}.json (No existe para este idioma)`);
          } else {
            console.error(`  ❌ Error crítico procesando ${file}.json:`, error.message);
            throw error;
          }
        }
      }

      const destPath = path.join(DEST_DIR, `${locale}.json`);
      await fs.writeFile(destPath, JSON.stringify(dictionary, null, 2));

      console.log('--------------------------------------------------');
      console.log(`📊 Resumen para ${locale}:`);
      console.log(`   - Archivos procesados: ${processedCount}`);
      console.log(`   ✨ Diccionario generado en: ${destPath}\n`);
    }

    console.log('==================================================');
    console.log('🎉 [i18n BUILDER] PROCESO COMPLETADO CON ÉXITO');
    console.log('==================================================\n');

  } catch (error) {
    console.error('\n❌ [FATAL ERROR] El proceso de construcción falló:');
    console.error(error);
    process.exit(1);
  }
}

buildDictionaries();
