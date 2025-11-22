// RUTA: scripts/prebuild-portfolio-web.mjs
// VERSIÓN: 2.0 - Mapeo Inteligente de Homepage
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES = ['en-US', 'es-ES', 'pt-BR'];
const SOURCE_DIR = path.join(__dirname, '../apps/portfolio-web/src/messages');
const DEST_DIR = path.join(__dirname, '../apps/portfolio-web/src/dictionaries');

// Lista de archivos permitidos para procesar
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
  'ai_gallery_section' // <-- NUEVO ARCHIVO AÑADIDO
];

// MAPEO ESTRUCTURAL CRÍTICO
// Define dónde se inyecta cada archivo dentro del objeto diccionario final.
// Si no está aquí, se asume que va a la raíz con su propio nombre.
const FILE_MAPPING = {
  'hero': ['homepage', 'hero'],
  'about': ['homepage', 'about_section'],
  'value_proposition': ['homepage', 'value_proposition_section'],
  'contact': ['homepage', 'contact'], // Ojo: contact se usa en root y homepage, aquí definimos su inyección en homepage si se requiere, o la estructura asume reutilización.
  // CORRECCIÓN: En tu esquema actual, 'contact' está en la raíz (footer contact info) y en homepage (section).
  // Asumiremos que el archivo 'contact.json' alimenta la sección de homepage por el esquema.
  'history': ['homepage', 'history_section'],
  'ai_gallery_section': ['homepage', 'ai_gallery_section'] // <-- MAPEO CRÍTICO AÑADIDO
};

// Función auxiliar para asignar valores anidados
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
    // Asegurar que el directorio de destino existe
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

          // Lógica de Mapeo
          if (FILE_MAPPING[file]) {
            setNestedValue(dictionary, FILE_MAPPING[file], jsonContent);
          } else {
            // Si no hay mapeo, va a la raíz
            dictionary[file] = jsonContent;
          }

          console.log(`  ✅ Integrado: ${file}.json`);
          processedCount++;
        } catch (error) {
          if (error.code === 'ENOENT') {
            console.log(`  ⚪ [Omitido] ${file}.json (No existe para este idioma)`);
          } else {
            console.error(`  ❌ Error procesando ${file}.json:`, error.message);
            throw error;
          }
        }
      }

      // Escribir el diccionario final
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
