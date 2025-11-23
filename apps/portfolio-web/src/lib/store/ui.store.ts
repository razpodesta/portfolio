// RUTA: apps/portfolio-web/src/lib/store/ui.store.ts
// VERSIÓN: 1.0 - Store Soberano de UI
// DESCRIPCIÓN: Gestión de estado global utilizando Zustand.
//              Implementa persistencia automática en LocalStorage para preferencias de usuario.
//              Reemplaza completamente a WidgetContext.tsx.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. Contrato de Estado (State Contract)
interface UIState {
  // --- Estado: Visitor HUD ---
  isVisitorHudVisible: boolean;
  toggleVisitorHud: () => void;
  setVisitorHudVisibility: (visible: boolean) => void;

  // --- Estado: Menú Móvil (Preparado para expansión) ---
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

// 2. Implementación del Store
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Lógica HUD
      isVisitorHudVisible: true, // Valor por defecto
      toggleVisitorHud: () =>
        set((state) => ({ isVisitorHudVisible: !state.isVisitorHudVisible })),
      setVisitorHudVisibility: (visible: boolean) =>
        set({ isVisitorHudVisible: visible }),

      // Lógica Menú Móvil
      isMobileMenuOpen: false,
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
    }),
    {
      name: 'portfolio-ui-preference', // Clave única en localStorage
      storage: createJSONStorage(() => localStorage), // Motor de almacenamiento
      // Optimización: Solo persistimos la preferencia del HUD.
      // El menú móvil siempre debe empezar cerrado al recargar.
      partialize: (state) => ({ isVisitorHudVisible: state.isVisitorHudVisible }),
    }
  )
);
