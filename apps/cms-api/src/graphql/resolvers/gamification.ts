// RUTA: apps/cms-api/src/graphql/resolvers/gamification.ts
// VERSIÓN: 2.0 - Tipado Estricto y Cero Any
// AUTOR: Raz Podestá - MetaShark Tech

import { GraphQLError } from 'graphql';
import { ARTIFACTS, getArtifactById, calculateProgress } from '@razpodesta/protocol-33';
import type {
  GraphQLContext,
  InventoryInstance,
  ArtifactInstance
} from '../../interfaces/types.js';

export default {
  Query: {
    getCodex: () => {
      return ARTIFACTS;
    },

    getMyProfile: async (_: unknown, __: unknown, { user, models }: GraphQLContext) => {
      if (!user) {
        throw new GraphQLError('Autenticación requerida.', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      // Ahora models.Inventory está tipado, TS sabe que existe findAll
      const inventory = await models.Inventory.findAll({
        where: { userId: user.id },
        include: [{ model: models.Artifact, as: 'artifact' }]
      });

      let totalXp = 0;

      // Iteramos con tipado seguro
      inventory.forEach((item: InventoryInstance) => {
        // Acceso seguro a la relación (puede ser undefined si la query falló, aunque aquí forzamos include)
        const artifactSlug = item.artifact?.slug;

        if (artifactSlug) {
          const artifactDef = getArtifactById(artifactSlug);
          if (artifactDef) {
            totalXp += artifactDef.baseValue;
          }
        }
      });

      const progress = calculateProgress(totalXp);

      return {
        ...progress,
        inventory
      };
    }
  },

  Mutation: {
    grantArtifact: async (
      _: unknown,
      { userId, artifactSlug }: { userId: string, artifactSlug: string },
      { models, user }: GraphQLContext
    ) => {
      if (user?.privilege !== 'god' && user?.privilege !== 'admin') {
         throw new GraphQLError('Permisos insuficientes.', { extensions: { code: 'FORBIDDEN' } });
      }

      const artifactDef = getArtifactById(artifactSlug);
      if (!artifactDef) {
        throw new GraphQLError(`El artefacto '${artifactSlug}' no existe en el Protocolo 33.`, {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      const [artifactDb] = await models.Artifact.findOrCreate({
        where: { slug: artifactSlug },
        defaults: {
          slug: artifactSlug,
          house: artifactDef.house,
          rarity: artifactDef.rarity,
          name: { en: artifactDef.name },
          lore: { en: artifactDef.description },
          visualData: {},
          baseValue: artifactDef.baseValue
        }
      });

      const newItem = await models.Inventory.create({
        userId,
        artifactId: artifactDb.id,
        acquiredAt: new Date(),
        isEquipped: false
      });

      return models.Inventory.findByPk(newItem.id, {
        include: [{ model: models.Artifact, as: 'artifact' }]
      });
    },

    toggleEquipArtifact: async (
      _: unknown,
      { inventoryId }: { inventoryId: string },
      { models, user }: GraphQLContext
    ) => {
      if (!user) throw new GraphQLError('Autenticación requerida.', { extensions: { code: 'UNAUTHENTICATED' } });

      const item = await models.Inventory.findByPk(inventoryId);

      if (!item) throw new GraphQLError('Item no encontrado.', { extensions: { code: 'NOT_FOUND' } });
      if (item.userId !== user.id) throw new GraphQLError('No eres dueño de este item.', { extensions: { code: 'FORBIDDEN' } });

      // TypeScript sabe que isEquipped es booleano gracias a InventoryInstance
      item.isEquipped = !item.isEquipped;
      await item.save();

      return models.Inventory.findByPk(item.id, {
        include: [{ model: models.Artifact, as: 'artifact' }]
      });
    }
  },

  // Field Resolvers: Tipado explícito del 'parent'
  Artifact: {
    name: (parent: ArtifactInstance) => {
      const def = getArtifactById(parent.slug);
      return def ? def.name : 'Artefacto Desconocido';
    },
    description: (parent: ArtifactInstance) => {
      const def = getArtifactById(parent.slug);
      return def ? def.description : 'Sin descripción disponible.';
    },
    baseValue: (parent: ArtifactInstance) => {
      const def = getArtifactById(parent.slug);
      return def ? def.baseValue : 0;
    },
    // Datos visuales mockeados o derivados de la librería
    visualData: (parent: ArtifactInstance) => {
        return {
            modelUrl: `/assets/3d/${parent.slug}.glb`,
            thumbnail: `/assets/img/${parent.slug}.png`
        };
    }
  }
};
