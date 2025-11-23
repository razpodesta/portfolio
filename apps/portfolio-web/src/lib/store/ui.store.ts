// RUTA: apps/portfolio-web/src/lib/store/ui.store.ts
// VERSIÓN: 1.0 - Store Soberano de UI
// DESCRIPCIÓN: Gestión de estado global para la interfaz de usuario con persistencia automática.
//              Reemplaza a WidgetContext con una arquitectura atómica y de alto rendimiento.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. Contrato de Estado (Interface Estricta)
interface UIState {
  // Estado del Visitor HUD
  isVisitorHudVisible: boolean;
  toggleVisitorHud: () => void;
  setVisitorHudVisibility: (visible: boolean) => void;

  // Estado del Menú Móvil (Preparado para expansión)
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

// 2. Creación del Store con Middleware de Persistencia
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // --- Visitor HUD Logic ---
      isVisitorHudVisible: true, // Valor inicial por defecto
      toggleVisitorHud: () =>
        set((state) => ({ isVisitorHudVisible: !state.isVisitorHudVisible })),
      setVisitorHudVisibility: (visible: boolean) =>
        set({ isVisitorHudVisible: visible }),

      // --- Mobile Menu Logic ---
      isMobileMenuOpen: false,
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'portfolio-ui-storage', // Clave única en localStorage
      storage: createJSONStorage(() => localStorage), // Motor de almacenamiento explícito
      // Optimización: Solo persistimos la preferencia del HUD.
      // El estado del menú móvil debe reiniciarse al recargar.
      partialize: (state) => ({
        isVisitorHudVisible: state.isVisitorHudVisible,
      }),
    }
  )
);
