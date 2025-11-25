// RUTA: apps/portfolio-web/src/app/[lang]/perfil/page.tsx
// VERSIÓN: 4.0 - Fully Typed & Integrated
// DESCRIPCIÓN: Consumo de diccionario nativo sin hacks ni fallbacks manuales.

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

// Rutas relativas de 3 niveles (Correctas)
import { type Locale } from '../../../config/i18n.config';
import { getDictionary } from '../../../lib/get-dictionary';
import { getMyGamificationProfile } from '../../../lib/gamification/actions';
import { ArtifactCard } from '../../../components/gamification/ArtifactCard';
import { LevelProgressBar } from '../../../components/gamification/LevelProgressBar';
import { BlurText } from '../../../components/razBits/BlurText';
import { FadeIn } from '../../../components/ui/FadeIn';

// Simulación de sesión
const IS_AUTHENTICATED = true;

type ProfilePageProps = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata(props: ProfilePageProps): Promise<Metadata> {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  // Acceso tipado seguro
  return {
    title: dictionary.profile_page.page_title,
    robots: { index: false, follow: false },
  };
}

export default async function ProfilePage(props: ProfilePageProps) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  if (!IS_AUTHENTICATED) {
    redirect(`/${lang}/login`);
  }

  const profile = await getMyGamificationProfile();

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="font-display text-2xl text-red-500">Error de Conexión Neural</h1>
          <p className="text-zinc-500">No se pudo cargar el perfil del Protocolo 33.</p>
        </div>
      </main>
    );
  }

  // SIN FALLBACKS: Ahora confiamos plenamente en el diccionario generado
  const t = dictionary.profile_page;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <div className="container mx-auto px-4 py-24">

        {/* Header de Perfil */}
        <div className="mb-16 flex flex-col items-center gap-8">
          <BlurText
            text={t.welcome_title}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          />

          <LevelProgressBar
            currentLevel={profile.level}
            currentXp={profile.currentXp}
            nextLevelXp={profile.nextLevelXp}
            progressPercent={profile.progressPercent}
            labels={{ level: t.level_label, xp: t.xp_label }}
          />
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent mb-16" />

        {/* Grid de Inventario */}
        <section>
          <h3 className="mb-8 text-center font-display text-2xl font-bold text-white">
            {t.inventory_title}
          </h3>

          {profile.inventory.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
              <p className="text-zinc-500">{t.empty_inventory_message}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {profile.inventory.map((item, index) => (
                <FadeIn key={item.id} delay={index * 0.1}>
                  <ArtifactCard
                    artifact={item.artifact}
                    isEquipped={item.isEquipped}
                    className="h-full"
                  />
                </FadeIn>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
