// RUTA: apps/cms-admin/src/pages/_app.tsx
// VERSIÓN: 3.1 - Con Importación Definitiva y Alineada a la Arquitectura
// DESCRIPCIÓN: Se corrige la ruta de importación del componente PageNotFound, eliminando
//              el segmento redundante '/components' para que coincida con la configuración
//              del alias en tsconfig.json. Esta es la solución final al error 'Module not found'.

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/apolloClient';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import ContentProvider from '@contexts/i18n';
// --- INICIO DE LA CORRECCIÓN ARQUITECTÓNICA DEFINITIVA ---
import PageNotFound from '@dashboard/PageNotFound';
// --- FIN DE LA CORRECCIÓN ARQUITECTÓNICA DEFINITIVA ---

function App({ Component, pageProps }: AppProps) {
  // Las props personalizadas (__, language, error) ahora vienen de cada página.
  const { __, error, language, initialApolloState } = pageProps;

  const apolloClient = useApollo(initialApolloState || {});
  const viewport =
    'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no';

  if (error) {
    return (
      <ContentProvider __={__ || {}} language={language || 'en-US'}>
        <PageNotFound noLayout />
      </ContentProvider>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content={viewport} />
      </Head>

      <ApolloProvider client={apolloClient}>
        <ContentProvider __={__} language={language}>
          <Component {...pageProps} />
        </ContentProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
