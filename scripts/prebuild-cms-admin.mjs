import fs from 'fs/promises';
import path from 'path';

const locales = ['en-US', 'es-ES', 'pt-BR'];
const messagesBaseDir = path.resolve('apps/cms-admin/src/messages');
const outputDir = path.resolve('apps/cms-admin/src/dictionaries');

const dictionaryStructure = [
  { key: 'login', path: 'login_page' },
  { key: 'dashboard', path: 'dashboard_page' },
  { key: 'sidebar', path: 'sidebar' },
  { key: 'content', path: 'content_page' },
];

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
  console.log('🚀 [Pre-build: CMS-Admin] Iniciando ensamblaje de diccionarios...');
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
      console.log(`  ✨ Diccionario final para '${locale}' generado en: ${relativePath}`);
    }
    console.log('\n🎉 [Pre-build: CMS-Admin] ¡Todos los diccionarios fueron generados con éxito!');
  } catch (error) {
    console.error('\n💥 [Pre-build: CMS-Admin] Error crítico durante el ensamblaje. Proceso detenido.', error.message);
    process.exit(1);
  }
}

assembleDictionaries();
