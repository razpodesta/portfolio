// RUTA: apps/portfolio-web/src/data/ai-gallery.ts
// VERSIÓN: 2.0 - Inventario de Activos con IDs de Internacionalización

export interface AiGalleryAsset {
  id: string; // Clave para buscar la traducción en el diccionario
  image: string;
  category: 'Typography' | 'Product' | 'Architecture' | 'Abstract';
}

export const aiGalleryData: AiGalleryAsset[] = [
  {
    id: 'neon-typography',
    image: '/images/ai-gallery/razbits-neon-typography.jpg',
    category: 'Typography'
  },
  {
    id: 'editorial-fashion',
    image: '/images/ai-gallery/aesthetic-editorial-fashion.jpg',
    category: 'Typography'
  },
  {
    id: 'tech-badge',
    image: '/images/ai-gallery/tech-badge-v2.jpg',
    category: 'Typography'
  },
  {
    id: 'transparent-gadget',
    image: '/images/ai-gallery/transparent-tech-gadget.jpg',
    category: 'Product'
  },
  {
    id: 'luxury-perfume',
    image: '/images/ai-gallery/luxury-perfume-gold.jpg',
    category: 'Product'
  },
  {
    id: 'concept-car',
    image: '/images/ai-gallery/concept-car-detail.jpg',
    category: 'Product'
  },
  {
    id: 'concrete-workspace',
    image: '/images/ai-gallery/minimalist-concrete-workspace.jpg',
    category: 'Architecture'
  },
  {
    id: 'cyberpunk-street',
    image: '/images/ai-gallery/cyberpunk-city-street.jpg',
    category: 'Architecture'
  },
  {
    id: 'abstract-geometry',
    image: '/images/ai-gallery/abstract-architectural-geometry.jpg',
    category: 'Architecture'
  },
  {
    id: 'fluid-shapes',
    image: '/images/ai-gallery/fluid-iridescent-shapes.jpg',
    category: 'Abstract'
  },
  {
    id: 'mechanical-insect',
    image: '/images/ai-gallery/mechanical-insect-macro.jpg',
    category: 'Abstract'
  },
  {
    id: 'neural-network',
    image: '/images/ai-gallery/data-visualization-art.jpg',
    category: 'Abstract'
  }
];
