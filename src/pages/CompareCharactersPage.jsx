import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import RadarChart from '../components/RadarChart';  // Importer le composant RadarChart de Recharts

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
            <h2>Compare characters</h2>
            <div className="compare-container">
                <div className="compare-select">
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
                <span className="compare-with-text">with</span> {/* Texte 'with' */}
                <div className="compare-select">
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

            <RadarChart 
                character1={characters[option1.value]} 
                character2={characters[option2.value]} 
                color1="#8884d8"  // Bleu pour le premier personnage
                color2="#82ca9d"  // Vert pour le deuxième personnage
            />

            {/* Légende sous le graphique */}
            <div className="legend-container">
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: "#8884d8" }}></div>
                    <span>{characters[option1.value].name}</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: "#82ca9d" }}></div>
                    <span>{characters[option2.value].name}</span>
                </div>
            </div>
        </div>
    );
};

export default CompareCharactersPage;