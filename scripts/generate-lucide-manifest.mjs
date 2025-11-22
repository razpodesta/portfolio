/**
 * @file Generador Unificado de Manifiesto Lucide.
 * @description Extrae metadatos de 'lucide-react', genera la DB JSON y reporte TXT.
 *              Incluye lógica de deduplicación para evitar colisiones de React Keys.
 * @version 8.2 - Deduplicación de IDs
 */
import fs from 'fs';
import path from 'path';

function kebabToPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function generateTags(filename) {
  const cleanName = filename.replace(/-/g, ' ');
  const parts = filename.split('-');
  return [filename, cleanName, ...parts, kebabToPascalCase(filename)];
}

async function generateLucideManifest() {
  console.log("\n💎 [LUCIDE MINER] Iniciando extracción de iconos...");

  const ICONS_SOURCE = path.join(process.cwd(), 'node_modules', 'lucide-react', 'dist', 'esm', 'icons');
  const OUTPUT_DATA_DIR = path.join(process.cwd(), 'apps', 'portfolio-web', 'src', 'data');
  const OUTPUT_REPORT_DIR = path.join(process.cwd(), 'reports', 'asset-inventories');
  const JSON_OUTPUT_PATH = path.join(OUTPUT_DATA_DIR, 'lucide-icons.json');
  const TXT_OUTPUT_PATH = path.join(OUTPUT_REPORT_DIR, 'lucide-icons-list.txt');

  if (!fs.existsSync(ICONS_SOURCE)) {
    console.error(`❌ ERROR: No se encontró 'lucide-react' en node_modules.`);
    process.exit(1);
  }

  try {
    const files = fs.readdirSync(ICONS_SOURCE);

    // Set para rastrear IDs únicos y evitar colisiones como "ArrowDown01"
    const seenIds = new Set();

    const icons = files
      .filter(file => file.endsWith('.js') && file !== 'index.js')
      .map(file => {
        const cleanName = file.slice(0, -3);
        const pascalName = kebabToPascalCase(cleanName);

        return {
          id: pascalName,
          name: pascalName,
          category: 'General',
          tags: generateTags(cleanName),
          url: `https://lucide.dev/icons/${cleanName}`
        };
      })
      // --- FILTRO DE DEDUPLICACIÓN ---
      .filter(icon => {
        if (seenIds.has(icon.id)) {
          return false; // Si ya existe, lo saltamos
        }
        seenIds.add(icon.id);
        return true; // Si es nuevo, lo agregamos
      })
      // -------------------------------
      .sort((a, b) => a.name.localeCompare(b.name));

    if (!fs.existsSync(OUTPUT_DATA_DIR)) fs.mkdirSync(OUTPUT_DATA_DIR, { recursive: true });
    if (!fs.existsSync(OUTPUT_REPORT_DIR)) fs.mkdirSync(OUTPUT_REPORT_DIR, { recursive: true });

    fs.writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(icons, null, 2));
    fs.writeFileSync(TXT_OUTPUT_PATH, icons.map(i => `${i.id} | ${i.url}`).join('\n'));

    const relativeJson = path.relative(process.cwd(), JSON_OUTPUT_PATH);

    console.log(`✅ Extracción completada: ${icons.length} iconos únicos procesados.`);
    console.log(`   💾 DB guardada en: ${relativeJson}`);
    console.log(`✨ [LUCIDE MINER] Finalizado correctamente.\n`);

  } catch (error) {
    console.error("💥 Error fatal:", error.message);
    process.exit(1);
  }
}

generateLucideManifest();
