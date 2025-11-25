// RUTA: apps/portfolio-web/src/components/shared/IconLibraryExplorer.tsx
// VERSIÓN: 16.0 - Linter Compliance (CreateElement Pattern)
// DESCRIPCIÓN: Se utiliza React.createElement para la instanciación dinámica,
//              satisfaciendo las reglas estáticas del linter. Se elimina basura de ESLint.

'use client';

import React, { useState, useMemo, type ComponentType, Suspense, lazy } from 'react';
import { Search, ExternalLink, Copy, Check, X, ArrowUp, ArrowDown, HelpCircle, Terminal, BookOpen, Github, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Dictionary } from '@/lib/schemas/dictionary.schema';
import * as SimpleIcons from '@icons-pack/react-simple-icons';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export interface LibraryAsset {
  id: string;
  name: string;
  categories?: string[];
  category?: string;
  url: string;
  tags?: string[];
}

interface IconLibraryExplorerProps {
  assets: LibraryAsset[];
  dictionary: Dictionary['lucide_page'] | Dictionary['technologies_page'];
  accentColor?: string;
  libraryType: 'lucide' | 'simple-icons';
}

// --- UTILIDAD: Conversor PascalCase a kebab-case ---
const toKebabCase = (str: string) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

// --- CACHÉ DE COMPONENTES LAZY (NIVEL DE MÓDULO) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconCache = new Map<string, React.LazyExoticComponent<ComponentType<any>>>();

const getLazyLucideIcon = (name: string) => {
  const kebabName = toKebabCase(name);
  const iconName = kebabName as keyof typeof dynamicIconImports;

  if (!iconCache.has(iconName)) {
    const importFn = dynamicIconImports[iconName];
    if (!importFn) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iconCache.set(iconName, lazy(importFn) as unknown as React.LazyExoticComponent<ComponentType<any>>);
  }
  return iconCache.get(iconName) || null;
};

// --- COMPONENTE DE ICONO LUCIDE (OPTIMIZADO PARA LINTER) ---
const LucideIconLazy = ({ name, className }: { name: string; className?: string }) => {
  // 1. RESOLUCIÓN DIRECTA: La estabilidad está garantizada por el caché del módulo.
  //    No usamos useMemo aquí para evitar la heurística de "creación en render" del linter.
  const IconComponent = getLazyLucideIcon(name);

  // 2. GUARDIA
  if (!IconComponent) {
    return <HelpCircle className={className} />;
  }

  // 3. INSTANCIACIÓN SEGURA: Usamos createElement para evitar la sintaxis JSX <Component />
  //    con una referencia dinámica, lo que satisface la regla react-hooks/static-components.
  return (
    <Suspense fallback={<div className={`animate-pulse bg-zinc-800 rounded-md ${className}`} />}>
      {React.createElement(IconComponent, { className })}
    </Suspense>
  );
};

// --- MODALES ---

interface LibraryHelpModalProps {
  onClose: () => void;
  libraryType: 'lucide' | 'simple-icons';
  dictionary: Dictionary['lucide_page'] | Dictionary['technologies_page'];
  accentColor: string;
}

const LibraryHelpModal = ({ onClose, libraryType, dictionary, accentColor }: LibraryHelpModalProps) => {
    const libInfo = libraryType === 'lucide'
    ? { name: 'Lucide React', url: 'https://lucide.dev', repo: 'https://github.com/lucide-icons/lucide' }
    : { name: 'Simple Icons', url: 'https://simpleicons.org', repo: 'https://github.com/simple-icons/simple-icons' };

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-zinc-900 p-8 rounded-2xl max-w-md w-full border border-zinc-800 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`w-12 h-12 rounded-full bg-${accentColor}-900/30 flex items-center justify-center mb-4 border border-${accentColor}-500/30`}>
                <BookOpen size={24} className={`text-${accentColor}-400`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{dictionary?.library_help_title || 'Ayuda'} - {libInfo.name}</h3>
            <p className="text-zinc-400 mb-6 text-sm leading-relaxed text-justify">{dictionary?.library_help_desc}</p>

            <div className="space-y-3 mb-6">
                <a href={libInfo.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors group">
                    <span className="flex items-center gap-3 text-zinc-300 font-medium text-sm"><Info size={16} className={`text-${accentColor}-500`} /> {dictionary?.btn_docs || 'Documentación'}</span>
                    <ExternalLink size={14} className="text-zinc-600 group-hover:text-white" />
                </a>
                <a href={libInfo.repo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors group">
                    <span className="flex items-center gap-3 text-zinc-300 font-medium text-sm"><Github size={16} className={`text-${accentColor}-500`} /> {dictionary?.btn_repo || 'Repositorio'}</span>
                    <ExternalLink size={14} className="text-zinc-600 group-hover:text-white" />
                </a>
            </div>

            <button onClick={onClose} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-medium transition-colors">Cerrar</button>
        </div>
    </div>
)};

interface InstallModalProps {
    asset: LibraryAsset;
    onClose: () => void;
    libraryType: 'lucide' | 'simple-icons';
    dictionary: Dictionary['lucide_page'] | Dictionary['technologies_page'];
    accentColor: string;
}

const InstallModal = ({ asset, onClose, libraryType, dictionary, accentColor }: InstallModalProps) => {
    const installCmd = libraryType === 'lucide' ? 'pnpm add lucide-react' : 'pnpm add @icons-pack/react-simple-icons';
    const importCode = libraryType === 'lucide' ? `import { ${asset.id} } from 'lucide-react';` : `import { ${asset.id} } from '@icons-pack/react-simple-icons';`;
    const usageCode = `<${asset.id} size={24} className="text-${accentColor}-500" />`;
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, key: string) => {
      navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    };

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-zinc-900 p-6 rounded-2xl max-w-lg w-full border border-zinc-800 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{asset.name}</h3>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{libraryType}</span>
                </div>
                <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-2"><Terminal size={14} className="text-blue-400" /><h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">{dictionary?.modal_install_title || 'Instalación'}</h4></div>
                    <div className="bg-black rounded-lg p-3 border border-zinc-800 flex justify-between items-center group hover:border-zinc-700 transition-colors">
                        <code className="text-sm text-zinc-300 font-mono">{installCmd}</code>
                        <button onClick={() => handleCopy(installCmd, 'install')} className="text-zinc-500 hover:text-white transition-colors">{copied === 'install' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}</button>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2"><Terminal size={14} className={`text-${accentColor}-400`} /><h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">{dictionary?.modal_usage_title || 'Uso'}</h4></div>
                    <div className="bg-black rounded-lg p-4 border border-zinc-800 space-y-3 group hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start"><code className="text-sm text-purple-300 font-mono break-all">{importCode}</code><button onClick={() => handleCopy(importCode, 'import')} className="text-zinc-500 hover:text-white shrink-0 ml-3 pt-1">{copied === 'import' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}</button></div>
                        <div className="h-px bg-zinc-800 w-full" />
                        <div className="flex justify-between items-start"><code className="text-sm text-blue-300 font-mono break-all">{usageCode}</code><button onClick={() => handleCopy(usageCode, 'usage')} className="text-zinc-500 hover:text-white shrink-0 ml-3 pt-1">{copied === 'usage' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}</button></div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end">
                <button onClick={onClose} className={`px-6 py-2 bg-${accentColor}-600 hover:bg-${accentColor}-500 rounded-lg text-white font-bold text-sm transition-colors`}>{dictionary?.modal_close || 'Cerrar'}</button>
            </div>
        </div>
    </div>
)};


export function IconLibraryExplorer({ assets, dictionary, accentColor = 'purple', libraryType }: IconLibraryExplorerProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(60);
  const [selectedAsset, setSelectedAsset] = useState<LibraryAsset | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const simpleIconsMap = useMemo(() => {
    if (libraryType !== 'simple-icons') return new Map();
    const componentEntries = Object.entries(SimpleIcons).filter(
      ([, value]) => typeof value === 'function'
    );

    type SimpleIconComponent = ComponentType<React.SVGProps<SVGSVGElement> & { title?: string; hex?: string }>;

    return new Map<string, SimpleIconComponent>(
      componentEntries as [string, SimpleIconComponent][]
    );
  }, [libraryType]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set<string>();
    assets.forEach(a => {
        if (a.categories) {
            a.categories.forEach(c => cats.add(c));
        } else if (a.category) {
            cats.add(a.category);
        } else {
            cats.add('Other');
        }
    });
    return ['all', ...Array.from(cats).sort()];
  }, [assets]);

  const filteredAssets = useMemo(() => {
    const term = search.toLowerCase();
    return assets.filter(asset => {
      const matchesSearch =
        asset.name.toLowerCase().includes(term) ||
        asset.id.toLowerCase().includes(term) ||
        (asset.tags && asset.tags.some(tag => tag.toLowerCase().includes(term)));

      const assetCats = asset.categories || (asset.category ? [asset.category] : ['Other']);
      const matchesCategory = activeCategory === 'all' || assetCats.some(cat => cat.toLowerCase() === activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, assets]);

  const visibleAssets = filteredAssets.slice(0, visibleCount);

  const getCategoryLabel = (catKey: string): string => {
    const key = `category_${catKey.toLowerCase()}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dictionary as any)[key] || catKey;
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  return (
    <div className="relative min-h-screen bg-black text-white">
      <AnimatePresence>
        {selectedAsset && <InstallModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} libraryType={libraryType} dictionary={dictionary} accentColor={accentColor} />}
        {showHelp && <LibraryHelpModal onClose={() => setShowHelp(false)} libraryType={libraryType} dictionary={dictionary} accentColor={accentColor} />}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-black/85 backdrop-blur-xl border-b border-zinc-800 shadow-2xl pt-4 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full max-w-4xl mx-auto">
                <div className="relative grow group">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" />
                <input
                    type="text"
                    placeholder={dictionary?.search_placeholder || 'Buscar...'}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setVisibleCount(60); }}
                    className={`w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-3 pl-12 pr-10 text-sm text-white placeholder-zinc-500 focus:border-${accentColor}-500 focus:outline-none focus:ring-1 focus:ring-${accentColor}-500 transition-all shadow-inner`}
                />
                {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"><X size={16} /></button>}
                </div>
                <button onClick={() => setShowHelp(true)} className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-${accentColor}-500/50 transition-all`} title={dictionary?.library_help_btn || 'Ayuda'}><HelpCircle size={20} /></button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(60); }}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                    activeCategory === cat
                      ? `bg-${accentColor}-600 text-white border-${accentColor}-500 shadow-lg shadow-${accentColor}-900/50`
                      : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
             <p className="text-center text-[10px] text-zinc-600 uppercase tracking-wider">
                {dictionary?.showing_results
                  ? dictionary.showing_results.replace('{count}', visibleAssets.length.toString()).replace('{total}', filteredAssets.length.toString())
                  : `${visibleAssets.length} / ${filteredAssets.length}`}
             </p>
          </div>
        </div>
      </div>

      {/* Grid de Iconos */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          <AnimatePresence mode='popLayout'>
            {visibleAssets.map((asset) => {
              let IconElement;

              if (libraryType === 'lucide') {
                IconElement = <LucideIconLazy name={asset.id} className="w-8 h-8 text-zinc-400 group-hover:text-white" />;
              } else {
                const SimpleIcon = simpleIconsMap.get(asset.id) || HelpCircle;
                // LIMPIEZA: El comentario eslint-disable ha sido eliminado permanentemente.
                IconElement = <SimpleIcon className="w-8 h-8 text-zinc-400 group-hover:text-white" width={32} height={32} />;
              }

              return (
                <motion.div
                  layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={asset.id}
                  className="group relative aspect-square"
                >
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/20 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/60 overflow-hidden relative"
                  >
                    <div className="z-10 transition-all duration-300 transform group-hover:scale-125 group-hover:-translate-y-3 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                        {IconElement}
                    </div>
                    <span className="w-full truncate px-3 text-center text-[10px] font-medium text-zinc-500 transition-opacity duration-300 group-hover:opacity-0 absolute bottom-4 font-mono">
                      {asset.name}
                    </span>
                    <div className={`absolute inset-x-0 bottom-0 pt-8 pb-3 flex flex-col items-center justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-t from-${accentColor}-900/80 to-transparent`}>
                         <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-white mb-1">
                            {dictionary?.view_details || 'Ver'} <ExternalLink size={10} />
                         </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {visibleCount < filteredAssets.length && (
          <div className="flex justify-center py-20">
            <button onClick={() => setVisibleCount(prev => prev + 60)} className={`group relative px-8 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold transition-all hover:bg-zinc-800 hover:text-white hover:border-${accentColor}-500/50 active:scale-95`}>
              <span>{dictionary?.load_more_button || 'Cargar Más'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Scroll Controls */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
         <button onClick={scrollToTop} className={`p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-zinc-400 hover:text-white hover:border-${accentColor}-500 hover:bg-${accentColor}-600/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 transform hover:scale-110`} aria-label={dictionary?.scroll_top || 'Arriba'} title={dictionary?.scroll_top || 'Arriba'}><ArrowUp size={20} /></button>
         <button onClick={scrollToBottom} className={`p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-zinc-400 hover:text-white hover:border-${accentColor}-500 hover:bg-${accentColor}-600/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 transform hover:scale-110`} aria-label={dictionary?.scroll_bottom || 'Abajo'} title={dictionary?.scroll_bottom || 'Abajo'}><ArrowDown size={20} /></button>
      </div>
    </div>
  );
}
