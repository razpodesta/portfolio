// RUTA: apps/cms-api/src/graphql/types/Gamification.ts
// VERSIÓN: 1.0 - Contrato de Gamificación
// DESCRIPCIÓN: Define los tipos públicos para el sistema de reputación.
//              Utiliza la utilidad soberana 'gql' para evitar dependencias externas.

import gql from '../../lib/gql.js';

export default gql`
  # Representación de un Artefacto (Item)
  type Artifact {
    id: UUID!
    slug: String!
    name: String!
    description: String!
    house: String!
    rarity: String!
    baseValue: Int!
    # Datos visuales (SVG path, color, modelo 3D) que vienen de la librería
    visualData: JSON
  }

  # Item en el inventario del usuario
  type InventoryItem {
    id: UUID!
    acquiredAt: Datetime!
    isEquipped: Boolean!
    artifact: Artifact!
    # Metadatos específicos de la instancia (ej: "Minted on Polygon #402")
    metadata: JSON
  }

  # Perfil de Gamificación Agregado
  type UserProfile {
    level: Int!
    currentXp: Int!
    nextLevelXp: Int!
    progressPercent: Float!
    inventory: [InventoryItem!]
  }

  # Extensiones al Query Raíz
  type Query {
    # Devuelve todos los artefactos existentes (El Códice)
    getCodex: [Artifact!]

    # Devuelve el perfil gamificado del usuario autenticado
    getMyProfile: UserProfile!
  }

  # Extensiones a la Mutación Raíz
  type Mutation {
    # Otorga un artefacto a un usuario (Requiere rol Admin o System)
    grantArtifact(userId: UUID!, artifactSlug: String!): InventoryItem!

    # Equipa/Desequipa un artefacto para mostrarlo en el perfil público
    toggleEquipArtifact(inventoryId: UUID!): InventoryItem!
  }
`;
