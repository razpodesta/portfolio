// RUTA: apps/portfolio-web/src/lib/nav-links.ts
// VERSIÓN: 10.1 - Completo y sin Abreviaciones.
// DESCRIPCIÓN: Versión final que consolida toda la oferta de servicios bajo un
//              único menú desplegable, restaurando Frontend/Backend y añadiendo
//              Branding y Contenidos.

import type { ComponentType } from 'react';
import {
  Code, Users, Rss, MessageSquare, Mail, Database, ShoppingBag, Sparkles,
  Blocks, TrendingUp, MousePointerClick, User, Target, Scale, ShieldCheck,
  LayoutTemplate, Component, Palette, Brush, Wand2, Image, Video, Music, AudioWaveform, Layers3, Server
} from 'lucide-react';
import {
  SiNextdotjs, SiReact, SiTailwindcss, SiSvelte, SiNx,
  SiNodedotjs, SiNestjs, SiPostgresql, SiMongodb, SiShopify,
  SiWoocommerce, SiPrestashop, SiVtex, SiGoogleads, SiMeta,
  SiWhatsapp, SiTiktok, SiSpotify
} from '@icons-pack/react-simple-icons';
import { socialLinks } from './social-links';

// ===================================================================================
// DEFINICIÓN DE TIPOS UNIFICADOS
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
// DEFINICIÓN DE SUB-ESTRUCTURAS MODULARES
// ===================================================================================

const aboutChildren: NavItem[] = [
  { labelKey: 'quien_soy', href: '/quien-soy', Icon: User },
  { labelKey: 'mision_vision', href: '/mision-y-vision', Icon: Target },
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

const databasesChildren: NavItem[] = [
  { labelKey: 'postgresql', href: '#', Icon: SiPostgresql },
  { labelKey: 'mongodb', href: '#', Icon: SiMongodb },
];
const backendChildren: NavItem[] = [
  { labelKey: 'nx_monorepo', href: '#', Icon: SiNx },
  { labelKey: 'nodejs', href: '#', Icon: SiNodedotjs },
  { labelKey: 'nestjs', href: '#', Icon: SiNestjs },
  { labelKey: 'databases', Icon: Database, children: databasesChildren },
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

const contentCreationChildren: NavItem[] = [
    { labelKey: 'imagenes', href: '#', Icon: Image },
    { labelKey: 'videos', href: '#', Icon: Video },
    { labelKey: 'musica', href: '#', Icon: Music },
    { labelKey: 'jingles', href: '#', Icon: AudioWaveform },
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

const contactChildren: NavItem[] = [
  { labelKey: 'contacto_directo', href: '/contacto', Icon: Mail },
  { labelKey: 'whatsapp', href: 'https://wa.me/YOUR_NUMBER', Icon: SiWhatsapp },
  { isSeparator: true },
  { isSocial: true, links: socialLinks },
];

// ===================================================================================
// ESTRUCTURA PRINCIPAL DE NAVEGACIÓN (CONSUMIDA POR EL HEADER)
// ===================================================================================

export const mainNavStructure: NavLink[] = [
  { labelKey: 'sobre_mi', children: aboutChildren, isNested: true, Icon: User },
  { labelKey: 'servicios', Icon: Blocks, children: servicesChildren, isNested: true },
  { labelKey: 'proyectos', href: '/#projects', Icon: Code },
  { labelKey: 'blog', href: '/blog', Icon: Rss },
  { labelKey: 'sistema_de_diseno', href: '/sistema-de-diseno', Icon: LayoutTemplate },
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
