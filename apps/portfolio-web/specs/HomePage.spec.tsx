// RUTA: oh-hoteis/specs/HomePage.spec.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/[lang]/page'; // Importamos la página del portal

// Necesitamos mockear el componente HotelCard, ya que es un Client Component con animaciones
// y no es el foco de esta prueba unitaria.
jest.mock('@/components/ui/HotelCard', () => ({
  HotelCard: jest.fn(({ hotel }) => (
    <div data-testid={`hotel-card-${hotel.id}`}>{hotel.name}</div>
  )),
}));

describe('HomePage (Portal Principal)', () => {
  it('deve renderizar o título principal e os cards dos hotéis', () => {
    // Definimos los parámetros que la página espera recibir
    const mockParams = {
      lang: 'pt-BR' as const,
    };

    render(<HomePage params={mockParams} />);

    // Verificamos que el título del portal esté en el documento.
    const heading = screen.getByRole('heading', {
      name: /Qual o seu próximo destino?/i,
    });
    expect(heading).toBeInTheDocument();

    // Verificamos que se renderice una tarjeta para cada hotel.
    // Usamos los IDs de nuestro archivo hotels-data.ts.
    expect(screen.getByTestId('hotel-card-ohc')).toHaveTextContent('Open House Canasvieiras');
    expect(screen.getByTestId('hotel-card-vcg')).toHaveTextContent('Villa Chalés Gramado');
  });
});
