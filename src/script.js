function getCharacters() {
    fetch('src/data/characters.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const charactersList = document.getElementById('characters');
            charactersList.innerHTML = ''; // Clear existing content
            
            data.forEach(character => {
                const li = document.createElement('li');
                li.textContent = `${character.id}: ${character.name}`; // Display id and name
                charactersList.appendChild(li);

                const hr = document.createElement('hr');
                charactersList.appendChild(hr);
            });
        })
        .catch(error => console.error('Error fetching characters:', error));
}

// Call the function to fetch and display characters
getCharacters();
