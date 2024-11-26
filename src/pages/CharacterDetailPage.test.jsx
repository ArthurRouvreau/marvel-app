import { render, screen } from '@testing-library/react';
import CharacterDetailPage from './CharacterDetailPage';
import { BrowserRouter } from 'react-router-dom';

// fix for ResizeObserver not being defined in Jest
const { ResizeObserver } = window;

beforeEach(() => {
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn()
    }));
});

afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
});

// end fix for ResizeObserver not being defined in Jest

const character = {
    id: "1",
    name: "Thor",
    description: "Thor description",
}

// mock the useLoaderData hook, so that we can test the CharacterDetailPage component
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'), // use actual for all non-hook parts
    useLoaderData: () => {
        return character;
    },
}));

describe('CharacterDetailPage', () => {

    test('render CharacterDetailPage component', () => {
        // when

        // then
        render(<CharacterDetailPage />, { wrapper: BrowserRouter });

        // expect the document title to be "Thor | Marvel App"
        expect(document.title).toBe(`${character.name} | Marvel App`);

        // expect to have a heading with the character name
        const h2Element = screen.getByRole('heading', { level: 2, name: character.name });
        expect(h2Element).toBeInTheDocument();

        // expect to have a paragraph with the character description
        const pElement = screen.getByText(character.description);
        expect(pElement).toBeInTheDocument();

        // expect to have a heading with the text "Capacities"
        const h2CapacitiesElement = screen.getByRole('heading', { level: 2, name: 'Capacities' });
        expect(h2CapacitiesElement).toBeInTheDocument();

        // expect to have a heading with the text "Using D3"
        const h3D3Element = screen.getByRole('heading', { level: 3, name: 'Using D3' });
        expect(h3D3Element).toBeInTheDocument();

        // expect to have a heading with the text "Using Recharts"
        const h3RechartsElement = screen.getByRole('heading', { level: 3, name: 'Using Recharts' });
        expect(h3RechartsElement).toBeInTheDocument();

        // expect to have a div with the id "pie-container"
        expect(document.getElementById('pie-container')).toBeInTheDocument();

        // expect to a an div with class "recharts-wrapper"
        expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument();
    });
});