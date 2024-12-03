import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CompareCharactersPage from './CompareCharactersPage';

// Simuler ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Simuler des données de personnages
const mockCharacters = [
  { id: "1", name: "Thor", capacities: { force: 7, intelligence: 8, durability: 6, energy: 6, speed: 4, fighting: 5 } },
  { id: "2", name: "Captain America", capacities: { force: 6, intelligence: 7, durability: 7, energy: 6, speed: 5, fighting: 6 } }
];

// Simuler le hook useLoaderData pour retourner les personnages
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLoaderData: () => mockCharacters
}));

describe('CompareCharactersPage', () => {

    test('renders correctly with default characters', () => {
        render(
          <MemoryRouter>
            <CompareCharactersPage />
          </MemoryRouter>
        );
    
        // Vérifier que les personnages sont dans les menus déroulants
        const selectElements = screen.getAllByRole('combobox');
        expect(selectElements).toHaveLength(2);
        expect(selectElements[0]).toHaveValue('0'); // "Thor"
        expect(selectElements[1]).toHaveValue('1'); // "Captain America"
    
        // Vérifier que la légende affiche bien les noms des personnages
        const legendItems = screen.getAllByText((content) =>
          content.includes('Thor') || content.includes('Captain America')
        );
        expect(legendItems).toHaveLength(2); // Vérifier qu'il y a deux éléments de légende
    
        // Vérifier que le graphique radar est affiché (composant RadarChart)
        const radarChart = screen.getByTestId('radar-chart');
        expect(radarChart).toBeInTheDocument();
    });    

    test('updates character selection and radar chart on change', () => {
        render(
          <MemoryRouter>
            <CompareCharactersPage />
          </MemoryRouter>
        );
    
        // Sélectionner le deuxième personnage dans le premier menu déroulant
        const selectElements = screen.getAllByRole('combobox');
        fireEvent.change(selectElements[0], { target: { value: '1' } }); // Passer à "Captain America"
    
        // Vérifier que le premier personnage sélectionné est "Captain America"
        expect(selectElements[0]).toHaveValue('1'); // "Captain America"
    
        // Vérifier que la légende a bien été mise à jour
        const legendItems = screen.getAllByText((content) =>
          content.includes('Thor') || content.includes('Captain America')
        );
        expect(legendItems[0]).toHaveTextContent('Captain America');
        expect(legendItems[1]).toHaveTextContent('Thor');
      });    

});
