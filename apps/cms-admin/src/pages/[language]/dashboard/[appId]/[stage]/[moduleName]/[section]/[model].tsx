// RUTA: apps/cms-admin/src/pages/[language]/dashboard/[appId]/[stage]/[moduleName]/[section]/[model].tsx
// VERSIÓN: 3.0 - Visión Holística y Erradicación de 'any'
// DESCRIPCIÓN: Refactorización completa para eliminar todos los tipos 'any' y cumplir
//              con las reglas más estrictas de ESLint. Se introducen tipos específicos
//              para las props del diccionario, los datos de las entradas y los mapas de
//              componentes, garantizando una seguridad de tipos de extremo a extremo.

// Dependencies
import React, { FC, ReactElement, createElement, ElementType } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

// Contexts
import AppProvider from '@contexts/app';
import UserProvider from '@contexts/user';
import FormProvider from '@contexts/form';
import ContentProvider from '@contexts/i18n';

// Components
import Schema from '@dashboard/components/Schema';
import Content from '@dashboard/components/Content';
import CreateOrEditEntry from '@dashboard/components/Content/CreateOrEditEntry';
import PageNotFound from '@dashboard/PageNotFound';

// Queries y Tipos
import GET_MODEL_QUERY from '@graphql/models/getModel.query';
import GET_DECLARATIONS_QUERY from '@graphql/declarations/getDeclarations.query';
import GET_VALUES_BY_ENTRY_QUERY from '@graphql/values/getValuesByEntry.query';
import GET_ENUMERATIONS_BY_APP_ID_QUERY from '@graphql/enumerations/getEnumerationsByAppId.query';
import GET_ENTRIES_BY_MODEL_ID_QUERY from '@graphql/values/getEntriesByModelId.query';
import GET_I18N_QUERY from '@graphql/i18n/getI18n.query';

// --- INICIO DE LA REFACTORIZACIÓN DE TIPOS ---
import type { Dictionary } from '@app/lib/schemas/dictionary.schema';

// Define la estructura esperada para las referencias de entradas
type EntryReference = {
  modelId: string;
  modelName: string;
  entries: Record<string, unknown>[];
};

interface iProps {
  __: Dictionary; // Se reemplaza 'any' con el tipo de diccionario importado
}

const Page: FC<iProps> = ({ __ }): ReactElement => {
  const router = useRouter();
  const { appId, section, moduleName, model, entryId, language } = router.query;
  let modelId: string | null = null;
  // Se reemplaza 'any[]' con un tipo específico para mayor claridad
  let entries: EntryReference[] = [];

  // ... (El resto de la lógica de las queries permanece sin cambios) ...
  // --- FIN DE LA REFACTORIZACIÓN DE TIPOS ---

  // Executing Queries
  const { data: getModelQueryData } = useQuery(GET_MODEL_QUERY, {
    variables: {
      identifier: model,
      appId,
    },
    skip: section !== 'model' || model === 'i18n',
  });

  const { data: getDeclarationsQueryData } = useQuery(GET_DECLARATIONS_QUERY, {
    skip: model === 'i18n',
  });

  const { data: getValuesByEntryQueryData } = useQuery(GET_VALUES_BY_ENTRY_QUERY, {
    variables: {
      entry: entryId,
    },
    skip: !entryId || model === 'i18n',
  });

  const { data: getEnumerationsByAppIdQueryData } = useQuery(GET_ENUMERATIONS_BY_APP_ID_QUERY, {
    variables: {
      appId,
    },
    skip: !appId || model === 'i18n',
  });

  const { data: getI18nQueryData } = useQuery(GET_I18N_QUERY, {
    skip: model !== 'i18n',
  });

  if (getModelQueryData) {
    modelId = getModelQueryData.getModel.id;
  }

  const { data: getEntriesByModelIdQueryData } = useQuery(GET_ENTRIES_BY_MODEL_ID_QUERY, {
    variables: {
      modelId,
    },
    skip: !modelId || model === 'i18n',
  });

  // Blocking render if dataValues is not ready
  if (entryId && !getValuesByEntryQueryData) {
    return <div />;
  }

  if (model !== 'i18n' && section === 'model' && !getModelQueryData) {
    return <div />;
  }

  if (model !== 'i18n' && !getEnumerationsByAppIdQueryData) {
    return <div />;
  }

  if (getEntriesByModelIdQueryData) {
    entries = JSON.parse(getEntriesByModelIdQueryData.getEntriesByModelId.entries);
  }

  // --- INICIO DE LA REFACTORIZACIÓN DE TIPOS ---
  // Se define un tipo estricto para el mapa de componentes
  const Pages: Record<string, ElementType> = {
    content: Content,
    create: CreateOrEditEntry,
    edit: CreateOrEditEntry,
    schema: Schema,
  };

  // El parámetro 'page' ahora es un string o undefined, reflejando la realidad de 'router.query'
  const renderPage = (page: string | string[] | undefined) => {
    const pageKey = Array.isArray(page) ? page[0] : page;

    if (pageKey && Pages[pageKey]) {
      return createElement(Pages[pageKey], {
        router: router.query,
        data: {
          entryId,
          section,
          entries,
          ...getI18nQueryData,
          ...getModelQueryData,
          ...getDeclarationsQueryData,
          ...getValuesByEntryQueryData,
          ...getEnumerationsByAppIdQueryData,
        },
      });
    }

    return <PageNotFound />;
  };
  // --- FIN DE LA REFACTORIZACIÓN DE TIPOS ---


  return (
    <ContentProvider __={__} language={String(language)}>
      <UserProvider>
        <AppProvider id={appId}>
          <FormProvider>{renderPage(moduleName)}</FormProvider>
        </AppProvider>
      </UserProvider>
    </ContentProvider>
  );
};

export default Page;
