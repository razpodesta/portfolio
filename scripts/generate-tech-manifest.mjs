/**
 * @file Generador de Manifiesto Tecnológico (Simple Icons) - V4.0 (Multi-Category)
 * @description Clasificación heurística multi-etiqueta. Permite que una tecnología
 *              pertenezca a múltiples categorías (ej: Next.js -> Frontend, Backend).
 */
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR_APP = path.join(process.cwd(), 'apps', 'portfolio-web', 'src', 'data');
const OUTPUT_DIR_REPORT = path.join(process.cwd(), 'reports', 'asset-inventories');
const ICONS_SOURCE = path.join(process.cwd(), 'node_modules', '@icons-pack', 'react-simple-icons', 'icons');

// Reglas de Clasificación (Expandidas)
const CATEGORY_RULES = {
  Frontend: [
    'react', 'vue', 'angular', 'svelte', 'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind',
    'bulma', 'mui', 'chakra', 'framer', 'three', 'webgl', 'vite', 'webpack', 'rollup', 'parcel',
    'babel', 'eslint', 'prettier', 'jquery', 'ajax', 'dom', 'jamstack', 'astro', 'gatsby',
    'next', 'nuxt', 'remix', 'qwik', 'solid', 'alpine', 'lit', 'stencil', 'foundation', 'shadcn',
    'radix', 'axios', 'swr', 'tanstack', 'zod', 'formik', 'javascript', 'typescript'
  ],
  Backend: [
    'node', 'express', 'nest', 'fastify', 'koa', 'django', 'flask', 'fastapi', 'rails', 'spring',
    'laravel', 'symfony', 'asp', 'dotnet', 'phoenix', 'fiber', 'gin', 'echo', 'graphql', 'apollo',
    'trpc', 'prisma', 'sequelize', 'typeorm', 'mongoose', 'jwt', 'auth0', 'clerk', 'firebase',
    'supabase', 'appwrite', 'pocketbase', 'strapi', 'ghost', 'wordpress', 'drupal', 'nginx',
    'apache', 'caddy', 'redis', 'kafka', 'rabbitmq', 'next', 'nuxt', 'remix', 'python', 'php', 'java', 'go', 'rust'
  ],
  Database: [
    'sql', 'mysql', 'maria', 'postgres', 'mongo', 'couch', 'cassandra', 'dynamo', 'neo4j',
    'arangodb', 'redis', 'elastic', 'sqlite', 'realm', 'fauna', 'planetscale', 'neon', 'turso',
    'influx', 'timescale', 'cockroach', 'snowflake', 'bigquery', 'supabase', 'firebase'
  ],
  DevOps: [
    'git', 'github', 'gitlab', 'bitbucket', 'docker', 'kubernetes', 'helm', 'terraform', 'ansible',
    'chef', 'puppet', 'jenkins', 'circleci', 'travis', 'actions', 'azure', 'aws', 'googlecloud',
    'digitalocean', 'heroku', 'vercel', 'netlify', 'railway', 'flyio', 'render', 'bash', 'linux',
    'ubuntu', 'debian', 'arch', 'centos', 'fedora', 'nixos', 'prometheus', 'grafana', 'datadog',
    'newrelic', 'splunk', 'elk'
  ],
  Languages: [
    'javascript', 'typescript', 'python', 'java', 'cplusplus', 'csharp', 'ruby', 'php', 'go',
    'rust', 'swift', 'kotlin', 'scala', 'elixir', 'haskell', 'clojure', 'lua', 'perl', 'r',
    'julia', 'dart', 'solidity', 'bash', 'shell'
  ],
  Design: [
    'figma', 'adobe', 'sketch', 'invision', 'framer', 'blender', 'unity', 'unreal', 'godot',
    'inkscape', 'gimp', 'canva', 'dribbble', 'behance', 'unsplash', 'svg', 'ui', 'ux'
  ],
  AI: [
    'openai', 'gpt', 'copilot', 'midjourney', 'huggingface', 'tensorflow', 'pytorch', 'keras',
    'scikit', 'pandas', 'numpy', 'jupyter', 'kaggle', 'langchain', 'pinecone', 'llama', 'anthropic', 'claude'
  ],
  Ecommerce: [
    'shopify', 'woocommerce', 'magento', 'bigcommerce', 'stripe', 'paypal', 'klarna', 'adyen',
    'square', 'gumroad', 'amazon', 'vtex', 'prestashop'
  ],
  Social: [
    'facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'twitch', 'tiktok', 'discord',
    'slack', 'telegram', 'whatsapp', 'messenger', 'zoom', 'teams'
  ]
};

// Función para asignar MÚLTIPLES categorías
function guessCategories(name) {
  const lowerName = name.toLowerCase();
  const categories = new Set();

  for (const [category, keywords] of Object.entries(CATEGORY_RULES)) {
    if (keywords.some(k => lowerName.includes(k))) {
      categories.add(category);
    }
  }

  if (categories.size === 0) {
    categories.add('Other');
  }

  return Array.from(categories);
}

// Función para generar tags de búsqueda
function generateTags(name, categories) {
  const tags = [name, name.toLowerCase(), ...categories.map(c => c.toLowerCase())];
  return tags;
}

async function generateTechManifest() {
  console.log('\n🚀 [TECH MINER v4] Iniciando clasificación multi-categoría...');

  if (!fs.existsSync(ICONS_SOURCE)) {
    console.error('❌ Error: @icons-pack/react-simple-icons no encontrado.');
    process.exit(1);
  }

  try {
    const files = fs.readdirSync(ICONS_SOURCE);

    const icons = files
      .filter(file => /\.(mjs|cjs|js)$/.test(file) && !file.startsWith('index'))
      .map(file => file.replace(/\.(mjs|cjs|js)$/, ''))
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(iconName => {
        const cleanName = iconName.startsWith('Si') ? iconName.slice(2) : iconName;

        // Lógica Multicategoría
        const categories = guessCategories(cleanName);
        const tags = generateTags(cleanName, categories);

        return {
          id: iconName,
          name: cleanName,
          categories: categories, // Ahora es un Array
          tags: tags,
          url: `https://www.google.com/search?q=${cleanName}+official+website`
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    // Crear directorios
    if (!fs.existsSync(OUTPUT_DIR_APP)) fs.mkdirSync(OUTPUT_DIR_APP, { recursive: true });
    if (!fs.existsSync(OUTPUT_DIR_REPORT)) fs.mkdirSync(OUTPUT_DIR_REPORT, { recursive: true });

    // Guardar JSON
    fs.writeFileSync(path.join(OUTPUT_DIR_APP, 'technologies.json'), JSON.stringify(icons, null, 2));

    // Guardar Reporte TXT (mostrando todas las categorías)
    const reportContent = icons.map(i => `${i.id} | ${i.name} | [${i.categories.join(', ')}]`).join('\n');
    fs.writeFileSync(path.join(OUTPUT_DIR_REPORT, 'simple-icons-manifest.txt'), reportContent);

    console.log(`✅ Total indexado: ${icons.length} iconos.`);
    console.log(`✨ Clasificación inteligente completada.`);

  } catch (error) {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  }
}

generateTechManifest();
