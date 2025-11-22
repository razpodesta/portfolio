// Dependencies
import React, { FC, createContext, ReactElement } from 'react';

// Configuration
import { isLocal } from '@config';

// --- INICIO DE LA REFACTORIZACIÓN ARQUITECTÓNICA ---

// 1. Se define una firma de tipo estricta para la función de traducción.
//    Garantiza que el valor de retorno es siempre un `string`.
type Translator = (key1: string, key2?: string, key3?: string) => string;

// 2. La interfaz del contexto ahora usa tipos explícitos y seguros.
interface iI18nContext {
  __: Record<string, string>;
  t: Translator;
  language: string;
}

interface iProps {
  __: Record<string, string>;
  language: string;
  children: ReactElement;
}

// 3. El valor por defecto del contexto se alinea con la nueva interfaz estricta.
export const I18nContext = createContext<iI18nContext>({
  __: {},
  t: (key: string) => key, // Devuelve la clave como fallback, garantizando un string.
  language: 'en-US',
});

const I18nProvider: FC<iProps> = ({
  __,
  language = 'en-US',
  children,
}): ReactElement => {
  const t: Translator = (key1, key2 = '', key3 = '') => {
    let finalKey = key1;
    if (key2) {
      finalKey += ` ${key2}`;
    }
    if (key3) {
      finalKey += key3 === '?' || key3 === '!' ? key3 : ` ${key3}`;
    }

    if (isLocal() && !__[finalKey] && language !== 'en-US') {
      console.log(`"${finalKey}": "",`);
    }

    // 4. La lógica asegura que siempre se devuelve un string, ya sea la traducción o la clave misma.
    return __[finalKey] || finalKey;
  };

  const context = {
    __,
    language,
    t,
  };

  return <I18nContext.Provider value={context}>{children}</I18nContext.Provider>;
};
// --- FIN DE LA REFACTORIZACIÓN ARQUITECTÓNICA ---

export default I18nProvider;
