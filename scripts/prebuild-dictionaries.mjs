// RUTA: /scripts/prebuild-dictionaries.mjs
// VERSIÓN: 4.0 - Sincronizado con la Navegabilidad Completa.
// DESCRIPCIÓN: Se añaden las nuevas asignaciones para 'contact_page',
//              'design_system_page', 'cocreation_page' y 'legal' a la
//              cadena de ensamblaje de diccionarios.

import fs from 'fs/promises';
import path from 'path';

const locales = ['en-US', 'es-ES', 'pt-BR'];
const messagesBaseDir = path.resolve('apps/portfolio-web/src/messages');
const outputDir = path.resolve('apps/portfolio-web/src/dictionaries');

const dictionaryStructure = [
  // Estructura existente...
  { key: 'header', path: 'header' },
  { key: 'nav-links', path: 'header' },
  { key: 'hero', path: 'homepage.hero' },
  { key: 'about', path: 'homepage.about_section' },
  { key: 'value_proposition', path: 'homepage.value_proposition_section' },
  { key: 'contact', path: 'homepage.contact' },
  { key: 'history', path: 'homepage.history_section' },
  { key: 'footer', path: 'footer' },
  { key: 'language_switcher', path: 'language_switcher' },
  { key: 'not_found', path: 'not_found' },
  { key: 'quien_soy', path: 'quien_soy' },
  { key: 'mission_vision', path: 'mission_vision' },
  { key: 'blog_page', path: 'blog_page' },

  // --- NUEVAS ASIGNACIONES ---
  { key: 'contact_page', path: 'contact_page' },
  { key: 'design_system_page', path: 'design_system_page' },
  { key: 'cocreation_page', path: 'cocreation_page' },
  { key: 'legal', path: 'legal' },
];

// El resto de la lógica del script (setNestedValue, assembleDictionaries) permanece sin cambios.

function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!keys[i]) continue;
    current[keys[i]] = current[keys[i]] || {};
    current = current[keys[i]];
  }
  const lastKey = keys[keys.length - 1];
  if (lastKey) {
    current[lastKey] = { ...current[lastKey], ...value };
  } else {
    Object.assign(obj, value);
  }
}

async function assembleDictionaries() {
  console.log('🚀 [Pre-build] Iniciando ensamblaje de diccionarios desde mensajes atómicos...');
  try {
    await fs.rm(outputDir, { recursive: true, force: true });
    await fs.mkdir(outputDir, { recursive: true });
    for (const locale of locales) {
      const localeDir = path.join(messagesBaseDir, locale);
      const finalDictionary = {};
      console.log(`\n🔎 Procesando idioma: ${locale}`);
      for (const mapping of dictionaryStructure) {
        const filePath = path.join(localeDir, `${mapping.key}.json`);
        try {
          const fileContent = await fs.readFile(filePath, 'utf-8');
          const messageObject = JSON.parse(fileContent);
          setNestedValue(finalDictionary, mapping.path, messageObject);
          console.log(`  ✅ Ensamblado: ${mapping.key}.json -> ${mapping.path}`);
        } catch (e) {
          console.error(`  ❌ Error: No se pudo leer o parsear el archivo ${mapping.key}.json para el idioma ${locale}.`);
          throw e;
        }
      }
      const outputPath = path.join(outputDir, `${locale}.json`);
      await fs.writeFile(outputPath, JSON.stringify(finalDictionary, null, 2));
      const relativePath = path.relative(process.cwd(), outputPath);
      console.log(`  ✨ Diccionario final para '${locale}' generado correctamente en: ${relativePath}`);
    }
    console.log('\n🎉 [Pre-build] ¡Todos los diccionarios fueron generados con éxito!');
  } catch (error) {
    console.error('\n💥 [Pre-build] Error crítico durante el ensamblaje. Proceso detenido.', error.message);
    process.exit(1);
  }
}

assembleDictionaries();
