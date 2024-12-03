import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const RadarChartComponent = ({ character1, character2, color1, color2 }) => {
    // S'assurer que les capacités sont valides et non nulles
    const data = [
        { subject: 'Force', character1: character1.capacities.force, character2: character2.capacities.force },
        { subject: 'Intelligence', character1: character1.capacities.intelligence, character2: character2.capacities.intelligence },
        { subject: 'Durability', character1: character1.capacities.durability, character2: character2.capacities.durability },
        { subject: 'Energy', character1: character1.capacities.energy, character2: character2.capacities.energy },
        { subject: 'Speed', character1: character1.capacities.speed, character2: character2.capacities.speed },
        { subject: 'Fighting', character1: character1.capacities.fighting, character2: character2.capacities.fighting }
    ];

    // Fonction pour appliquer une couleur claire si la capacité est égale à 0
    const getOpacity = (value) => (value === 0 ? 0.1 : 0.6); // Faible opacité pour les capacités à 0

    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart outerRadius="80%" data={data} data-testid="radar-chart"> {/* Ajout du data-testid ici */}
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                {/* Radar pour le premier personnage */}
                <Radar 
                    name={character1.name} 
                    dataKey="character1" 
                    stroke={color1} 
                    fill={color1} 
                    fillOpacity={data.map(item => getOpacity(item.character1))}  // Utilisation de la fonction getOpacity pour chaque capacité
                />
                {/* Radar pour le deuxième personnage */}
                <Radar 
                    name={character2.name} 
                    dataKey="character2" 
                    stroke={color2} 
                    fill={color2} 
                    fillOpacity={data.map(item => getOpacity(item.character2))}  // Utilisation de la fonction getOpacity pour chaque capacité
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default RadarChartComponent;
