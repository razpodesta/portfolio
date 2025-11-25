// RUTA: apps/portfolio-web/src/lib/gamification/types.ts
// VERSIÓN: 1.0 - Contrato de Frontend
// DESCRIPCIÓN: Tipos de datos para el consumo de la API de Gamificación.

import type { House, Rarity } from '@razpodesta/protocol-33';

export type Artifact = {
  id: string;
  slug: string;
  name: string;
  description: string;
  house: House;
  rarity: Rarity;
  baseValue: number;
  visualData?: {
    modelUrl?: string;
    thumbnail?: string;
    mainColor?: string;
  };
};

export type InventoryItem = {
  id: string;
  acquiredAt: string; // GraphQL envía fechas como strings ISO
  isEquipped: boolean;
  artifact: Artifact;
  metadata?: Record<string, unknown>;
};

export type UserGamificationProfile = {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  progressPercent: number;
  inventory: InventoryItem[];
};

export type GamificationProfileResponse = {
  getMyProfile: UserGamificationProfile;
};

export type CodexResponse = {
  getCodex: Artifact[];
};
