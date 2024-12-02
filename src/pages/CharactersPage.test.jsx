import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersPage from './CharactersPage';
import { DEFAULT_ORDER, DEFAULT_ORDERBY } from '../api/characters-api';

// Mock the useLoaderData hook to provide character data for the test
const characters = [
    { id: "1", name: "Thor", modified: '2023-10-01T00:00:00Z' }, // Assurez-vous que la date est bien formée
    { id: "2", name: "Captain America", modified: '2023-10-01T00:00:00Z' }
];

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLoaderData: () => characters, // Mocking useLoaderData to return our test data
}));

describe('CharactersPage', () => {

    test('renders CharactersPage component', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <CharactersPage />
            </MemoryRouter>
        );

        // Verify the document title
        expect(document.title).toBe('Marvel App');

        // Verify the heading 'Marvel Characters' is present
        const h2Element = screen.getByRole('heading', { level: 2, name: "Marvel Characters" });
        expect(h2Element).toBeInTheDocument();

        // Verify that both characters are displayed
        characters.forEach(character => {
            const characterElement = screen.getByText(character.name);
            expect(characterElement).toBeInTheDocument();
        });

        // Verify that the number of characters is displayed
        const numberOfCharactersElement = screen.getByText(`There are ${characters.length} characters`);
        expect(numberOfCharactersElement).toBeInTheDocument();
    });

    test('renders CharactersPage component with order and orderBy from search params', () => {
        const order = 'desc';
        const orderBy = 'modified';

        render(
            <MemoryRouter initialEntries={[`/?order=${order}&orderBy=${orderBy}`]}>
                <CharactersPage />
            </MemoryRouter>
        );

        // Verify that the 'order' and 'orderBy' params are correctly reflected in the select inputs
        const orderBySelectElement = screen.getByTestId('orderBy');
        expect(orderBySelectElement).toHaveValue(orderBy);

        const orderSelectElement = screen.getByTestId('order');
        expect(orderSelectElement).toHaveValue(order);
    });

    test('renders CharactersPage component with order and orderBy when the select changes', async () => {
        const order = 'desc';
        const orderBy = 'modified';

        render(
            <MemoryRouter initialEntries={[`/?order=${DEFAULT_ORDER}&orderBy=${DEFAULT_ORDERBY}`]}>
                <CharactersPage />
            </MemoryRouter>
        );

        // Verify that the default order and orderBy values are selected
        const orderBySelectElement = screen.getByTestId('orderBy');
        expect(orderBySelectElement).toHaveValue(DEFAULT_ORDERBY);

        const orderSelectElement = screen.getByTestId('order');
        expect(orderSelectElement).toHaveValue(DEFAULT_ORDER);

        // When the order select changes
        fireEvent.change(orderSelectElement, { target: { value: order } });

        // Verify the order value has been updated
        expect(orderSelectElement).toHaveValue(order);

        // When the orderBy select changes
        fireEvent.change(orderBySelectElement, { target: { value: orderBy } });

        // Verify the orderBy value has been updated
        expect(orderBySelectElement).toHaveValue(orderBy);
    });
});
