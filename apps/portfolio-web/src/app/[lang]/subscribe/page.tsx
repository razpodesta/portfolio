// RUTA: apps/portfolio-web/src/app/[lang]/subscribe/page.tsx

import { getDictionary } from '../../../dictionaries/get-dictionary';
import { type Locale } from '../../../config/i18n.config';
// A futuro, crearías un componente de cliente para el formulario
// import { SubscriptionForm } from '@/components/forms/SubscriptionForm';

export default async function SubscribePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  // const translations = dictionary.subscribe_page;

  return (
    <div className="container mx-auto py-20">
      <div className="max-w-md mx-auto text-center">
        <h1 className="font-display text-4xl font-bold">Suscríbete</h1>
        <p className="mt-2 text-zinc-400">Ingresa tu email para unirte a la comunidad.</p>

        {/* Aquí renderizarías el formulario real, que sería un Client Component */}
        {/* <SubscriptionForm translations={translations} /> */}
        <div className="mt-8 p-4 border border-dashed border-zinc-700 rounded-lg">
          <p className="text-sm text-zinc-500">Placeholder para el formulario de suscripción.</p>
        </div>
      </div>
    </div>
  );
}
