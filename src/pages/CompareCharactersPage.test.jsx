import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CompareCharactersPage from './CompareCharactersPage';
import { useLoaderData } from 'react-router';

// Mock ResizeObserver to prevent errors during tests
global.ResizeObserver = class ResizeObserver {
  observe() {
    // Do nothing
  }
  unobserve() {
    // Do nothing
  }
  disconnect() {
    // Do nothing
  }
};

// Simuler les données des personnages
const mockCharacters = [
    { name: "Captain America", capacities: { force: 4, intelligence: 3, durability: 3, energy: 1, speed: 2 } },
    { name: "Beast", capacities: { force: 5, intelligence: 8, durability: 6, energy: 6, speed: 1 } },
];

// Mocking useLoaderData pour retourner les personnages simulés
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLoaderData: jest.fn(),
}));

describe('CompareCharactersPage', () => {
    beforeEach(() => {
        useLoaderData.mockReturnValue(mockCharacters);
    });

    test('renders correctly with default characters', () => {
        render(
            <MemoryRouter initialEntries={['/compare']}>
                <CompareCharactersPage />
            </MemoryRouter>
        );

        // Vérifier que les personnages par défaut sont sélectionnés
        const select1 = screen.getByLabelText(/select character 1/i);
        const select2 = screen.getByLabelText(/select character 2/i);

        expect(select1.value).toBe('0'); // "Captain America" est le premier personnage
        expect(select2.value).toBe('1'); // "Beast" est le deuxième personnage

        // Vérifier que la légende affiche bien les deux personnages
        const legendItems = screen.getAllByText(/Captain America|Beast/i);
        expect(legendItems).toHaveLength(2);  // La légende doit contenir les deux personnages

        // Vérifier que le graphique radar est affiché
        const radarChart = screen.getByTestId('radar-chart'); // Assurez-vous que radar-chart a un data-testid
        expect(radarChart).toBeInTheDocument();
    });

    test('updates character selection and radar chart on change', () => {
        render(
            <MemoryRouter initialEntries={['/compare']}>
                <CompareCharactersPage />
            </MemoryRouter>
        );

        // Sélectionner un autre personnage pour Character 1
        const select1 = screen.getByLabelText(/select character 1/i);
        fireEvent.change(select1, { target: { value: '1' } }); // Sélectionner "Beast"

        // Sélectionner un autre personnage pour Character 2
        const select2 = screen.getByLabelText(/select character 2/i);
        fireEvent.change(select2, { target: { value: '0' } }); // Sélectionner "Captain America"

        // Vérifier que la légende a bien été mise à jour
        const legendItems = screen.getAllByText(/Beast|Captain America/i);
        expect(legendItems[0]).toHaveTextContent('Beast');
        expect(legendItems[1]).toHaveTextContent('Captain America');

        // Vérifier que le graphique radar a été mis à jour
        const radarChart = screen.getByTestId('radar-chart');
        expect(radarChart).toBeInTheDocument();
    });
});
