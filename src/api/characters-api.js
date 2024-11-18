import characters from '../data/characters.json'

/**
 * List of characters
 * @returns {Array} characters
 */
export const getCharacters = () => {
    return characters;
}

/**
 * Get a character by id
 * @param {number} id
 * @returns {Object} character
 */
export const getCharacterById = (id) => {
    const character = characters.find(character => character.id === id);
    if (!character) {
        throw new Error(`Character with id ${id} not found`);
    }
    return character;
}