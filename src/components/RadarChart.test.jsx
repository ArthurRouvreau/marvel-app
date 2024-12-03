import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RadarChartComponent from './RadarChart';  // Importer le composant RadarChart

// Simuler les données des personnages
const mockCharacters = [
    { name: "Captain America", capacities: { force: 4, intelligence: 3, durability: 3, energy: 1, speed: 2, fighting: 2 } },
    { name: "Beast", capacities: { force: 5, intelligence: 8, durability: 6, energy: 6, speed: 1, fighting: 3 } },
];

describe('RadarChartComponent', () => {
    test('renders radar chart correctly with given data', () => {
        render(
            <RadarChartComponent 
                character1={mockCharacters[0]} 
                character2={mockCharacters[1]} 
                color1="#8884d8"  // Bleu pour le premier personnage
                color2="#82ca9d"  // Vert pour le deuxième personnage
            />
        );

        // Vérifier que le graphique radar est bien affiché
        const radarChart = screen.getByTestId('radar-chart'); // Assurez-vous que radar-chart a un data-testid
        expect(radarChart).toBeInTheDocument();

        // Vérifier que les personnages sont correctement affichés dans le graphique
        expect(screen.getByText('Captain America')).toBeInTheDocument();
        expect(screen.getByText('Beast')).toBeInTheDocument();

        // Vérifier que les capacités sont bien représentées sur le graphique
        const forceText = screen.getByText('Force');
        expect(forceText).toBeInTheDocument();
        
        const intelligenceText = screen.getByText('Intelligence');
        expect(intelligenceText).toBeInTheDocument();

        // Vérifier que les couleurs associées sont bien présentes
        const legendItems = screen.getAllByText(/Captain America|Beast/i);
        expect(legendItems).toHaveLength(2);  // La légende doit contenir les deux personnages

        // Vérifier la couleur de chaque personnage dans la légende
        expect(legendItems[0]).toHaveStyle({ color: "#8884d8" });
        expect(legendItems[1]).toHaveStyle({ color: "#82ca9d" });
    });

    test('renders radar chart with correct data for zero values', () => {
        // Ajouter un test pour les cas avec des valeurs à zéro
        const charactersWithZeroValues = [
            { name: "Captain America", capacities: { force: 0, intelligence: 0, durability: 0, energy: 0, speed: 0, fighting: 0 } },
            { name: "Beast", capacities: { force: 5, intelligence: 8, durability: 6, energy: 6, speed: 1, fighting: 3 } },
        ];

        render(
            <RadarChartComponent 
                character1={charactersWithZeroValues[0]} 
                character2={charactersWithZeroValues[1]} 
                color1="#8884d8"  
                color2="#82ca9d"
            />
        );

        // Vérifier que les capacités de "Captain America" avec des valeurs zéro sont affichées
        const radarChart = screen.getByTestId('radar-chart');
        expect(radarChart).toBeInTheDocument();

        // Vous pouvez également ajouter une vérification pour que la zone du premier personnage soit très claire (opacité faible)
    });
});
