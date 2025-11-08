// RUTA: apps/portfolio-web/src/lib/projects-data.ts
// VERSIÓN: Migrada a Portafolio

import type { Project } from './types';

export const projectsData: Project[] = [
  {
    id: 'project-01',
    title: 'Plataforma Hotelera "OH Hoteis"',
    description: 'Plataforma web de élite para una cadena hotelera, con sistema de reservas, i18n y optimización SEO avanzada.',
    imageUrl: '/projects/project-hoteis.jpg', // RECUERDA: Añadir tus imágenes en /public/projects/
    liveUrl: '#',
    codeUrl: '#',
    tags: ['Next.js', 'TypeScript', 'Zod', 'i18n', 'Tailwind CSS'],
  },
  {
    id: 'project-02',
    title: 'E-commerce de Vanguardia',
    description: 'Tienda online de alto rendimiento con pasarela de pago, gestión de inventario y un diseño completamente responsivo.',
    imageUrl: '/projects/project-ecommerce.jpg',
    liveUrl: '#',
    codeUrl: '#',
    tags: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
  },
  {
    id: 'project-03',
    title: 'Dashboard de Análisis de Datos',
    description: 'Aplicación interactiva para la visualización de datos en tiempo real, construida con D3.js y React.',
    imageUrl: '/projects/project-dashboard.jpg',
    liveUrl: '#',
    tags: ['React', 'D3.js', 'Websockets'],
  },
];
