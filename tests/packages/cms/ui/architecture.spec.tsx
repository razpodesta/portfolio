// RUTA: tests/packages/cms/ui/architecture.spec.tsx
import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@portfolio/testing-utils';
// Importamos desde la definición del paquete, no rutas relativas
import { MetasharkCmsUi } from '@metashark-cms/ui';

describe('Architecture Integrity: CMS UI Library', () => {
  it('should render library components using shared testing utils', () => {
    render(<MetasharkCmsUi />);
    // Basado en el contenido actual del componente en el snapshot
    expect(screen.getByText(/Welcome to MetasharkCmsUi!/i)).toBeInTheDocument();
  });
});
