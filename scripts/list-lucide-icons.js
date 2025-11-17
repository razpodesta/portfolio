// RUTA: /scripts/list-lucide-icons.js
// VERSIÓN: 4.0 - Definitiva. Extrae los nombres de los iconos directamente de los
//              archivos del paquete 'lucide-react', sin requerir 'lucide'.

const fs = require('fs');
const path = require('path');

/**
 * Convierte una cadena de kebab-case a PascalCase.
 * Ejemplo: 'activity-heart' se convierte en 'ActivityHeart'.
 * @param {string} str La cadena en kebab-case.
 * @returns {string} La cadena convertida a PascalCase.
 */
function kebabToPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

/**
 * Función principal que localiza, lee, procesa y guarda la lista de iconos.
 */
async function generateIconList() {
  try {
    console.log("🚀 Iniciando la extracción de iconos desde 'lucide-react'...");

    // Construimos la ruta directamente a la carpeta que contiene los archivos de los iconos.
    // Esta es la fuente de verdad en el paquete 'lucide-react'.
    const iconsDirectoryPath = path.join(process.cwd(), 'node_modules', 'lucide-react', 'dist', 'esm', 'icons');

    console.log(`🔎 Leyendo directorio de iconos desde la ruta explícita:`);
    console.log(iconsDirectoryPath);

    if (!fs.existsSync(iconsDirectoryPath)) {
      console.error(`\n❌ Error Crítico: No se pudo encontrar el directorio de iconos en la ruta esperada.`);
      console.error("Esto puede ocurrir si 'lucide-react' no está instalado correctamente o si su estructura interna ha cambiado.");
      console.error("Por favor, ejecuta 'pnpm install' para asegurar que las dependencias estén en su lugar.");
      return;
    }

    // Leemos todos los nombres de archivo del directorio.
    const files = fs.readdirSync(iconsDirectoryPath);

    // Procesamos la lista de archivos para obtener los nombres de los componentes.
    const componentNames = files
      // Nos aseguramos de procesar solo los archivos de iconos (archivos .js).
      .filter(file => file.endsWith('.js') && file !== 'index.js')
      // Quitamos la extensión '.js' del nombre del archivo.
      .map(file => file.slice(0, -3))
      // Convertimos el nombre de 'kebab-case' a 'PascalCase'.
      .map(kebabToPascalCase)
      // Ordenamos la lista alfabéticamente para que sea fácil de consultar.
      .sort();

    // Definimos la ruta del archivo de salida en la raíz del proyecto.
    const outputPath = path.join(process.cwd(), 'lucide-icons-list.txt');
    fs.writeFileSync(outputPath, componentNames.join('\n'));

    console.log(`\n✅ ¡Éxito! Se encontraron ${componentNames.length} iconos en 'lucide-react'.`);
    console.log(`📋 La lista completa ha sido guardada en: ${outputPath}`);
    console.log("\n✨ Muestra de los primeros 15 iconos:");
    console.log(componentNames.slice(0, 15).join(', '));

  } catch (error) {
    console.error("\n❌ Ocurrió un error inesperado durante la ejecución del script:");
    console.error(error.message);
  }
}

// Ejecutamos la función.
generateIconList();
