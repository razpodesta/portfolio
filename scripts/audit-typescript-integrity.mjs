// RUTA: scripts/audit-typescript-integrity.mjs
// VERSIÓN: 3.3 - Linter Fix & Metrics
// DESCRIPCIÓN: Se implementa el uso de la variable 'filesChecked' para métricas
//              reales, solucionando las advertencias de ESLint.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

/**
 * Lee y parsea JSON/JSONC de forma robusta.
 * Utiliza el motor de JS para interpretar el objeto, tolerando comentarios y comas finales.
 */
function readConfig(filePath) {
  try {
    const absolutePath = path.resolve(ROOT_DIR, filePath);
    if (!fs.existsSync(absolutePath)) return undefined;

    const content = fs.readFileSync(absolutePath, 'utf8');
    // new Function es más seguro que eval() directo, pero permite
    // parsear la sintaxis relajada de los archivos de configuración TS.
    return new Function('return ' + content)();
  } catch (error) {
    return { __error: error.message };
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

const COMMON_RULES = [
  { key: 'extends', match: (val) => val && typeof val === 'string' && val.includes('tsconfig.base.json'), desc: 'Debe heredar de tsconfig.base.json' }
];

const TARGETS = [
  {
    path: 'tsconfig.base.json',
    type: 'ROOT',
    rules: [
      { key: 'compilerOptions.strict', value: true, desc: 'Modo Estricto Obligatorio' },
      { key: 'compilerOptions.noImplicitAny', value: true, desc: 'Prohibido any implícito' },
      { key: 'compilerOptions.moduleResolution', value: 'nodenext', desc: 'Estándar NodeNext para Base' },
      { key: 'compilerOptions.paths', check: (v) => v && typeof v === 'object' && Object.keys(v).length >= 5, desc: 'Alias centrales definidos' }
    ]
  },
  {
    path: 'apps/portfolio-web/tsconfig.json',
    type: 'FRONTEND',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.moduleResolution', value: 'bundler', desc: 'Next.js 15 requiere "bundler"' },
      { key: 'compilerOptions.noEmit', value: true, desc: 'Next.js maneja la emisión' }
    ]
  },
  {
    path: 'apps/cms-admin/tsconfig.json',
    type: 'FRONTEND',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.moduleResolution', value: 'bundler', desc: 'Next.js Pages requiere "bundler"' },
      { key: 'compilerOptions.baseUrl', value: 'src', desc: 'Legacy support: baseUrl src' }
    ]
  },
  {
    path: 'apps/cms-api/tsconfig.json',
    type: 'BACKEND',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.moduleResolution', value: 'nodenext', desc: 'Backend moderno requiere "nodenext"' },
      { key: 'compilerOptions.experimentalDecorators', value: true, desc: 'Sequelize requiere decoradores' }
    ]
  },
  {
    path: 'packages/protocol-33/tsconfig.json',
    type: 'LIBRARY',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.moduleResolution', value: 'nodenext', desc: 'Librería pura requiere "nodenext"' },
      { key: 'compilerOptions.declaration', value: true, desc: 'Debe generar tipos .d.ts' }
    ]
  },
  {
    path: 'packages/auth-shield/tsconfig.json',
    type: 'LIBRARY',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.moduleResolution', value: 'nodenext', desc: 'Librería pura requiere "nodenext"' }
    ]
  },
  {
    path: 'packages/testing-utils/tsconfig.json',
    type: 'LIBRARY',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.types', check: (v) => Array.isArray(v) && v.includes('jest'), desc: 'Debe incluir tipos de Jest' }
    ]
  },
  {
    path: 'packages/cms/ui/tsconfig.json',
    type: 'REACT-LIB',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.moduleResolution', value: 'bundler', desc: 'Librería React requiere "bundler"' },
      { key: 'compilerOptions.jsx', value: 'react-jsx', desc: 'JSX Transform moderno' }
    ]
  },
  {
    path: 'packages/cms/core/tsconfig.json',
    type: 'LIBRARY',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.moduleResolution', value: 'nodenext', desc: 'Core requiere "nodenext"' }
    ]
  },
  {
    path: 'tests/tsconfig.json',
    type: 'TEST',
    rules: [
      ...COMMON_RULES,
      { key: 'compilerOptions.types', check: (v) => Array.isArray(v) && v.includes('jest') && v.includes('node'), desc: 'Contexto global de tipos de prueba' }
    ]
  }
];

async function runAudit() {
  console.log(`\n${C.cyan}${C.bold}🛡️  SISTEMA DE AUDITORÍA DE INTEGRIDAD TYPESCRIPT v3.3${C.reset}`);
  console.log(`${C.dim}    Verificando sincronización del ecosistema...${C.reset}\n`);

  let totalErrors = 0;
  let filesChecked = 0;

  for (const target of TARGETS) {
    const config = readConfig(target.path);

    if (config === undefined) {
      console.log(`${C.red}✖ [MISSING] ${target.path}${C.reset}`);
      totalErrors++;
      continue;
    }

    if (config.__error) {
      console.log(`${C.red}✖ [INVALID] ${target.path}${C.reset}`);
      console.log(`   ${C.red}↳ ${config.__error}${C.reset}`);
      totalErrors++;
      continue;
    }

    // --- CORRECCIÓN: Incrementamos el contador de archivos verificados ---
    filesChecked++;

    console.log(`${C.blue}INFO${C.reset} Auditando ${C.bold}${target.path}${C.reset} (${target.type})`);

    let fileErrors = 0;

    for (const rule of target.rules) {
      const actualValue = getNestedValue(config, rule.key);
      let passed = false;

      if (rule.check) {
        passed = rule.check(actualValue);
      } else if (rule.match) {
        passed = rule.match(actualValue, target.path);
      } else {
        passed = actualValue === rule.value;
      }

      if (!passed) {
        fileErrors++;
        console.log(`   ${C.red}✖ Fallo en regla: ${rule.desc}${C.reset}`);
        console.log(`     ${C.yellow}Propiedad:${C.reset} ${rule.key}`);
        console.log(`     ${C.green}Esperado :${C.reset} ${rule.value || '(Criterio custom)'}`);
        console.log(`     ${C.red}Recibido :${C.reset} ${JSON.stringify(actualValue)}`);
      }
    }

    if (fileErrors > 0) {
      totalErrors += fileErrors;
      console.log(`   ${C.red}⚠ Se encontraron ${fileErrors} desviaciones.${C.reset}\n`);
    }
  }

  console.log(`${C.dim}--------------------------------------------------${C.reset}`);

  if (totalErrors === 0) {
    // --- CORRECCIÓN: Usamos filesChecked en el log final ---
    console.log(`${C.green}${C.bold}✨ ÉXITO TOTAL: Ecosistema Sincronizado (${filesChecked} archivos verificados).${C.reset}\n`);
    process.exit(0);
  } else {
    // --- CORRECCIÓN: Usamos filesChecked en el log de error ---
    console.log(`${C.red}${C.bold}💥 FALLO: ${totalErrors} errores detectados en ${filesChecked} archivos auditados.${C.reset}\n`);
    process.exit(1);
  }
}

runAudit();
