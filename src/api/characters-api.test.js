import { getCharacters, getCharacterById } from './characters-api';
import characters from '../data/characters.json';

// FILE: src/api/characters-api.test.js

jest.mock('../data/characters.json', () => ([
    { id: 1, name: 'Character One' },
    { id: 2, name: 'Character Two' },
    { id: 3, name: 'Character Three' }
]));

describe('getCharacters', () => {
    it('should return the list of characters', () => {
        const result = getCharacters();
        expect(result).toEqual(characters);
    });
});

describe('getCharacterById', () => {
    it('should return the character with the given id', () => {
        const result = getCharacterById(1);
        expect(result).toEqual({ id: 1, name: 'Character One' });
    });

    it('should throw an error if the character with the given id is not found', () => {
        expect(() => getCharacterById(999)).toThrow('Character with id 999 not found');
    });
});