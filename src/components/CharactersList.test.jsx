import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CharactersList } from './CharactersList';
import { formatModifiedDate } from './date';

test('renders the correct number of list items when characters are provided', () => {
    const characters = [
        { id: '1', name: 'Thor', modified: '2020-03-11T10:18:57-0400' },
        { id: '2', name: 'Captain America', modified: '2020-04-04T19:01:59-0400' },
    ];

    render(<CharactersList characters={characters} />, { wrapper: BrowserRouter });

    // Get the list items and verify the number of list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(characters.length);

    // Verify each character's name and link
    characters.forEach(character => {
        const linkElement = screen.getByText(character.name);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.closest('a')).toHaveAttribute('href', `/characters/${character.id}`);
        
        // Format the date for comparison
        const formattedDate = formatModifiedDate(character.modified);
        
        // Check if part of the formatted date is correctly displayed
        const dateElement = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'small' && content.includes(formattedDate);
        });
        expect(dateElement).toBeInTheDocument();
    });
});
