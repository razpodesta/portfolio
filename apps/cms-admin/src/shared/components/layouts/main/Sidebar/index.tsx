import React, { FC, ReactElement, useState, memo } from 'react';
import { Icon } from '@contentpi/ui';
import { getDirection } from '@contentpi/core';
import { STAGE_LINK, ASSET_LINK, LOGOUT_LINK, I18N_LINK } from '@constants/links';
import ModelSidebar from '@dashboard/components/Models/ModelSidebar';
import ContentSidebar from '@dashboard/components/Content/ContentSidebar';
import Link from '@ui/Link';
import AppIcon from '@dashboard/components/MyApps/AppIcon';
import Logo from '../Logo';
import type { Dictionary } from '../../../../../lib/schemas/dictionary.schema';

// --- INICIO DE LA REFACTORIZACIÓN ARQUITECTÓNICA ---

// Se exportan los tipos para que los componentes hijos puedan consumirlos.
export interface ModelData { id: string; identifier: string; modelName: string; }
export interface EnumerationData { id: string; identifier: string; enumerationName: string; }
export interface AppData {
  id: string;
  appName: string;
  icon: string;
  models?: ModelData[];
  enumerations?: EnumerationData[];
}

export interface RouterParams {
  language: string;
  appId?: string;
  stage: string;
  model?: string;
  enumeration?: string;
  section?: string;
}

interface iProps {
  router: RouterParams;
  app: AppData | null;
  dictionary: Dictionary;
}

const Sidebar: FC<iProps> = ({ router, app, dictionary }): ReactElement => {
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState('');
  const { t } = { t: (key: keyof (typeof dictionary.sidebar)) => dictionary.sidebar[key] };

  const handleOpen = (side: string, isOpen: boolean): void => {
    setSidebar(side);
    setOpen(isOpen);
  };

  const direction = getDirection(router?.language);
  const arrowDir = direction === 'rtl' ? 'left' : 'right';

  return (
    <aside className="relative flex flex-row bg-white shadow-lg z-20">
      {/* Columna principal de iconos */}
      {/* --- INICIO DE LA CORRECCIÓN DE SINTAXIS --- */}
      <div className="w-[75px] h-screen flex flex-col bg-linear-to-b from-gray-900 via-blue-900 to-blue-500 text-white">
      {/* --- FIN DE LA CORRECCIÓN DE SINTAXIS --- */}
        <div className="pt-2.5 flex items-center justify-center">
          <Logo language={router?.language} />
        </div>
        <nav className="mt-5">
          <ul>
            {app && (
              <li className="h-[60px] flex items-center justify-center mt-5">
                <Link href={STAGE_LINK(router).href} as={STAGE_LINK(router).as} className="w-[60px] block hover:bg-transparent">
                  <AppIcon app={app} hideName />
                </Link>
              </li>
            )}
            <li className="h-[60px] flex items-center justify-center" onClick={(): void => handleOpen('model', true)}>
              <a title={t('models')} className="w-[45px] h-10 flex items-center justify-center text-base rounded-md hover:bg-white/20">
                <Icon type="layers" library="feather" />
              </a>
            </li>
            <li className="h-[60px] flex items-center justify-center" onClick={(): void => handleOpen('content', true)}>
              <a title={t('content')} className="w-[45px] h-10 flex items-center justify-center text-base rounded-md hover:bg-white/20">
                <Icon type="edit" library="feather" />
              </a>
            </li>
            <li className="h-[60px] flex items-center justify-center">
              <Link href={I18N_LINK(router).as} title={t('i18n')} className="w-[45px] h-10 flex items-center justify-center text-base rounded-md hover:bg-white/20">
                <Icon type="g-translate" library="material" fill="white" />
              </Link>
            </li>
            <li className="h-[60px] flex items-center justify-center">
              <Link href={ASSET_LINK(router).as} title={t('assets')} className="w-[45px] h-10 flex items-center justify-center text-base rounded-md hover:bg-white/20">
                <Icon type="image" library="feather" />
              </Link>
            </li>
            <li className="h-[60px] flex items-center justify-center">
              <a href={`${LOGOUT_LINK(router)}?redirectTo=/dashboard`} title={t('logout')} className="w-[45px] h-10 flex items-center justify-center text-base rounded-md hover:bg-white/20">
                <Icon type="power" library="feather" />
              </a>
            </li>
          </ul>
        {/* --- INICIO DE LA CORRECCIÓN DE JSX --- */}
        </nav>
        {/* --- FIN DE LA CORRECCIÓN DE JSX --- */}
        <div className={`absolute bottom-2.5 ${direction === 'rtl' ? 'right-[15px]' : 'left-[19px]'} cursor-pointer`}>
          <span title="Carlos Santana" className="w-10 h-10 inline-block bg-blue-400 rounded-full text-center leading-10 font-light">CS</span>
        </div>
      </div>

      {/* Panel Desplegable */}
      <div className={`absolute top-0 h-full w-[225px] bg-white transition-transform duration-300 ease-in-out ${direction === 'rtl' ? 'right-[75px]' : 'left-[75px]'} ${open ? 'translate-x-0' : (direction === 'rtl' ? 'translate-x-full' : '-translate-x-full')} ${direction === 'rtl' ? 'border-l-2' : 'border-r-2'} border-gray-100`}>
        <div className="h-[60px] w-full flex items-center justify-end pr-4">
          <button onClick={(): void => handleOpen('', false)} className="w-[45px] h-10 flex items-center justify-center bg-gray-100 rounded-lg group">
            <Icon type={`fas fa-arrow-${arrowDir}`} className="text-gray-600 text-sm" />
          </button>
        </div>
        <div className="mt-2.5">
          {app && sidebar === 'model' && <ModelSidebar app={app} router={router} dictionary={dictionary.sidebar} />}
          {app && sidebar === 'content' && <ContentSidebar app={app} router={router} />}
        </div>
      </div>
    </aside>
  );
};
// --- FIN DE LA REFACTORIZACIÓN ARQUITECTÓNICA ---

export default memo(Sidebar);
