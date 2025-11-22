// RUTA: apps/portfolio-web/src/lib/nav-links.ts
// VERSIÓN: 17.0 - Rutas Auditadas y Anclaje de IA
// DESCRIPCIÓN: Define la estructura de navegación. Las rutas internas asumen
//              que el componente consumidor (Header) inyectará el prefijo /[lang].

import type { ComponentType } from 'react';
import {
  Code, Users, Rss, MessageSquare, Mail, Database, ShoppingBag, Sparkles,
  Blocks, TrendingUp, MousePointerClick, User, Target,
  Component, Palette, Brush, Wand2, Image, Video, Music,
  AudioWaveform, Layers3, Server, FileText, ShieldCheck, Scale, Cpu,
  Library
} from 'lucide-react';
import {
  SiNextdotjs, SiReact, SiTailwindcss, SiSvelte, SiNx,
  SiNodedotjs, SiNestjs, SiPostgresql, SiMongodb, SiShopify,
  SiWoocommerce, SiPrestashop, SiVtex, SiGoogleads, SiMeta,
  SiWhatsapp, SiTiktok, SiSpotify
} from '@icons-pack/react-simple-icons';
import { socialLinks } from './social-links';

// ===================================================================================
// DEFINICIÓN DE TIPOS
// ===================================================================================

export interface NavLink {
  labelKey: string;
  href?: string;
  Icon?: ComponentType<{ size?: number; className?: string; }>;
  children?: NavItem[];
  isNested?: boolean;
}

export interface NavSeparator { isSeparator: true; }
export interface NavSocialSection { isSocial: true; links: typeof socialLinks; }
export type NavItem = NavLink | NavSeparator | NavSocialSection;

// ===================================================================================
// SUB-MENÚS (Nivel 3 - Nietos)
// ===================================================================================

const databasesChildren: NavItem[] = [
  { labelKey: 'postgresql', href: '#', Icon: SiPostgresql },
  { labelKey: 'mongodb', href: '#', Icon: SiMongodb },
];

const paidAdsChildren: NavItem[] = [
  { labelKey: 'google_ads', href: '#', Icon: SiGoogleads },
  { labelKey: 'meta_ads', href: '#', Icon: SiMeta },
  { labelKey: 'whatsapp_ads', href: '#', Icon: SiWhatsapp },
  { labelKey: 'tiktok_ads', href: '#', Icon: SiTiktok },
  { labelKey: 'spotify_ads', href: '#', Icon: SiSpotify },
];

const ecommerceChildren: NavItem[] = [
  { labelKey: 'shopify', href: '#', Icon: SiShopify },
  { labelKey: 'woocommerce', href: '#', Icon: SiWoocommerce },
  { labelKey: 'prestashop', href: '#', Icon: SiPrestashop },
  { labelKey: 'vtex', href: '#', Icon: SiVtex },
];

// 🟢 CORRECCIÓN DE ENLACE: Apunta al ID del nuevo componente en la Home
const contentCreationChildren: NavItem[] = [
    { labelKey: 'imagenes', href: '/#ai-visual-synth', Icon: Image },
    { labelKey: 'videos', href: '#', Icon: Video },
    { labelKey: 'musica', href: '#', Icon: Music },
    { labelKey: 'jingles', href: '#', Icon: AudioWaveform },
];

// ===================================================================================
// SUB-MENÚS (Nivel 2 - Hijos)
// ===================================================================================

const aboutChildren: NavItem[] = [
  { labelKey: 'quien_soy', href: '/quien-soy', Icon: User },
  { labelKey: 'mision_vision', href: '/mision-y-vision', Icon: Target },
  { labelKey: 'curriculum', href: '/curriculum', Icon: FileText },
  { labelKey: 'cocreacion', href: '/cocreacion', Icon: Users },
];

const frontendChildren: NavItem[] = [
  { labelKey: 'nextjs', href: '/servicios/frontend/nextjs', Icon: SiNextdotjs },
  { labelKey: 'react', href: '/servicios/frontend/react', Icon: SiReact },
  { labelKey: 'tailwind_css', href: '/servicios/frontend/tailwind-css', Icon: SiTailwindcss },
  { labelKey: 'svelte', href: '/servicios/frontend/svelte', Icon: SiSvelte },
  { isSeparator: true },
  { labelKey: 'web_components', href: '#', Icon: Component },
  { labelKey: 'styling_strategies', href: '#', Icon: Palette },
];

const backendChildren: NavItem[] = [
  { labelKey: 'nx_monorepo', href: '#', Icon: SiNx },
  { labelKey: 'nodejs', href: '#', Icon: SiNodedotjs },
  { labelKey: 'nestjs', href: '#', Icon: SiNestjs },
  { labelKey: 'databases', Icon: Database, children: databasesChildren },
];

const servicesChildren: NavItem[] = [
  { labelKey: 'frontend', Icon: Layers3, children: frontendChildren },
  { labelKey: 'backend', Icon: Server, children: backendChildren },
  { isSeparator: true },
  { labelKey: 'ecommerce', Icon: ShoppingBag, children: ecommerceChildren },
  { labelKey: 'seo_positioning', href: '/servicios/posicionamiento-seo', Icon: TrendingUp },
  { labelKey: 'paid_traffic', Icon: MousePointerClick, children: paidAdsChildren },
  { isSeparator: true },
  { labelKey: 'branding_marca', href: '#', Icon: Brush },
  { labelKey: 'creacion_contenidos', Icon: Wand2, children: contentCreationChildren },
  { isSeparator: true },
  { labelKey: 'custom_solutions', href: '/servicios/soluciones-a-medida', Icon: Sparkles },
];

// 🟢 CORRECCIÓN DE ENLACES DE RECURSOS: Rutas absolutas (sin lang) correctas
const resourcesChildren: NavItem[] = [
  { labelKey: 'lucide_icons', href: '/iconos/lucide', Icon: Sparkles },
  { labelKey: 'tech_icons', href: '/tecnologias', Icon: Cpu }, // Corregido según filetree
];

const contactChildren: NavItem[] = [
  { labelKey: 'contacto_directo', href: '/contacto', Icon: Mail },
  { labelKey: 'whatsapp', href: 'https://wa.me/554892123079', Icon: SiWhatsapp },
  { isSeparator: true },
  { isSocial: true, links: socialLinks },
];

// ===================================================================================
// ESTRUCTURA PRINCIPAL DE NAVEGACIÓN (HEADER)
// ===================================================================================

export const mainNavStructure: NavLink[] = [
  { labelKey: 'sobre_mi', children: aboutChildren, isNested: true, Icon: User },
  { labelKey: 'servicios', Icon: Blocks, children: servicesChildren, isNested: true },
  { labelKey: 'recursos', Icon: Library, children: resourcesChildren },
  { labelKey: 'proyectos', href: '/#projects', Icon: Code },
  { labelKey: 'blog', href: '/blog', Icon: Rss },
  { labelKey: 'contacto', children: contactChildren, Icon: MessageSquare },
];

// ===================================================================================
// ESTRUCTURA DE NAVEGACIÓN (FOOTER)
// ===================================================================================

const footerNavColumn: NavLink[] = [
  { labelKey: 'quien_soy', href: '/quien-soy' },
  { labelKey: 'mision_vision', href: '/mision-y-vision' },
  { labelKey: 'proyectos', href: '/#projects' },
  { labelKey: 'blog', href: '/blog' },
  { labelKey: 'curriculum', href: '/curriculum' },
  { labelKey: 'tech_icons', href: '/tecnologias' },
  { labelKey: 'contacto', href: '/contacto' },
];

const footerServicesColumn: NavLink[] = [
  { labelKey: 'frontend', href: '/servicios/frontend' },
  { labelKey: 'backend', href: '/servicios/backend' },
  { labelKey: 'ecommerce', href: '/servicios/ecommerce' },
  { labelKey: 'seo_positioning', href: '/servicios/posicionamiento-seo' },
];

const footerLegalColumn: NavLink[] = [
  { labelKey: 'politica_privacidad', href: '/legal/politica-de-privacidad', Icon: ShieldCheck },
  { labelKey: 'terminos_servicio', href: '/legal/terminos-de-servicio', Icon: Scale },
];

export const footerNavStructure = [
  { columnKey: 'column_nav_title', links: footerNavColumn },
  { columnKey: 'column_services_title', links: footerServicesColumn },
  { columnKey: 'column_legal_title', links: footerLegalColumn },
];
