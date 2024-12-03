import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import RadarChart from '../components/RadarChart'; // Importer le composant RadarChart de Recharts

const CompareCharactersPage = () => {
    const characters = useLoaderData();  // Charger la liste des personnages

    // Initialiser les options pour les menus déroulants
    const options = characters.map((character, index) => ({
        value: index,
        label: character.name,
    }));

    // Défini les options sélectionnées par défaut
    const [option1, setOption1] = useState(options[0]);
    const [option2, setOption2] = useState(options[1]);

    const handleCharacterChange = (index, selectedOption) => {
        if (index === 1) {
            setOption1(selectedOption);
        } else {
            setOption2(selectedOption);
        }
    };

    return (
        <div>
            <h2>Compare Characters</h2>
            <div style={{ display: 'flex' }}>
                <div>
                    <label>Select Character 1</label>
                    <select
                        value={option1.value}
                        onChange={(e) => handleCharacterChange(1, options[e.target.value])}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Character 2</label>
                    <select
                        value={option2.value}
                        onChange={(e) => handleCharacterChange(2, options[e.target.value])}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <h3>Character Comparison</h3>
            <RadarChart character1={characters[option1.value]} character2={characters[option2.value]} />
        </div>
    );
};

export default CompareCharactersPage;