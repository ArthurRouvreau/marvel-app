import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterDetailPage from './CharacterDetailPage';
import { useLoaderData } from 'react-router';
import { formatModifiedDate } from './date';

// Mock the useLoaderData hook
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLoaderData: jest.fn(),
}));

describe('CharacterDetailPage', () => {
    const character = {
        name: 'Thor',
        description: 'God of Thunder',
        modified: '2023-10-01T00:00:00Z', // Format ISO 8601 valide
        thumbnail: { path: 'path/to/image', extension: 'jpg' },
        capacities: {
            force: 5,
            intelligence: 8,
            durability: 6,
            energy: 6,
            speed: 1,
            fighting: 3
        }
    };

    beforeEach(() => {
        // Mock the useLoaderData hook to return the character data
        useLoaderData.mockReturnValue(character);
    });

    test('renders CharacterDetailPage component', async () => {
        render(
            <MemoryRouter>
                <CharacterDetailPage />
            </MemoryRouter>
        );

        // Wait for document title to be updated
        await waitFor(() => {
            expect(document.title).toBe('Thor | Marvel App');
        });

        // Verify the name of the character
        const nameElement = screen.getByText(character.name);
        expect(nameElement).toBeInTheDocument();

        // Verify the character's description
        const descriptionElement = screen.getByText(character.description);
        expect(descriptionElement).toBeInTheDocument();

        // Format the date to check that it is displayed correctly
        const formattedDate = formatModifiedDate(character.modified);

        // Verify the modified date is correctly formatted and displayed
        const modifiedElement = screen.getByText(formattedDate);
        expect(modifiedElement).toBeInTheDocument();

        // Verify the character's image
        const imageElement = screen.getByAltText(character.name);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'path/to/image/standard_large.jpg');

        // Verify headings and content for "Capacities", "Using D3", and "Using Recharts"
        const h2CapacitiesElement = screen.getByRole('heading', { level: 2, name: 'Capacities' });
        expect(h2CapacitiesElement).toBeInTheDocument();

        const h3D3Element = screen.getByRole('heading', { level: 3, name: 'Using D3' });
        expect(h3D3Element).toBeInTheDocument();

        const h3RechartsElement = screen.getByRole('heading', { level: 3, name: 'Using Recharts' });
        expect(h3RechartsElement).toBeInTheDocument();

        // Verify if the pie chart container is present
        expect(document.getElementById('pie-container')).toBeInTheDocument();

        // Verify if the Recharts wrapper div is present
        expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument();
    });
});
