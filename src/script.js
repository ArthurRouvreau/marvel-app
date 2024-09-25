async function getCharacters() {
    try {
        const response = await fetch('http://127.0.0.1:5500/src/data/characters.json');
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        
        const data = await response.json(); // Récupérer l'objet JSON
        console.log(data); // Pour vérifier la structure de l'objet
  
        // Accéder au tableau de personnages
        const characters = data.characters; // Accéder à la clé 'characters'
  
        const characterList = document.getElementById('characters');
        characterList.innerHTML = '';
  
        // Créer un <li> pour chaque personnage et l'ajouter à la liste
        characters.forEach(character => {
            const li = document.createElement('li');
            li.textContent = character.name;
            characterList.appendChild(li);
        });
  
    } catch (error) {
        console.error('Error:', error);
    }
  }
  
  // Appel de la fonction pour récupérer les données
  getCharacters();