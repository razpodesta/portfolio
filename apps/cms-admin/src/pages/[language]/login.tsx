// Dependencies
import React, { FC, ReactElement } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

// Contexts
import FormProvider from '@contexts/form';
import UserProvider from '@contexts/user';

// Components
import LoginLayout from '@app/users/components/Login/Layout';

// Arquitectura i18n de Élite
import config from '@config';
import { getDictionary } from '../../lib/get-dictionary';

interface iProps {
  currentUrl?: string;
  // El diccionario y el idioma son inyectados por getStaticProps y consumidos por _app.tsx
  // No necesitan ser declarados aquí si no se usan directamente en el componente Page.
}

const Page: FC<iProps> = ({ currentUrl = '' }): ReactElement => (
  <UserProvider>
    <FormProvider>
      <LoginLayout currentUrl={currentUrl} />
    </FormProvider>
  </UserProvider>
);

// --- INICIO DE LA CORRECCIÓN ARQUITECTÓNICA ---
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const language = (params?.language as string) || config.languages.default;
  try {
    // 1. Se obtiene el diccionario.
    const dictionary = await getDictionary(language);

    // 2. Se asigna explícitamente el contenido de `dictionary` a la propiedad `__`.
    //    Esto resuelve tanto el error de variable no definida (TS18004) como el
    //    de variable no utilizada (`no-unused-vars`).
    return {
      props: {
        __: dictionary,
        language,
      },
    };
  } catch (error) {
    console.error(`Error cargando diccionario para login (${language}):`, error);
    return {
      props: {
        __: {},
        language,
        error: true,
      },
    };
  }
};
// --- FIN DE LA CORRECCIÓN ARQUITECTÓNICA ---

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: config.languages.list.map((lang) => ({ params: { language: lang } })),
    fallback: false,
  };
};

export default Page;
