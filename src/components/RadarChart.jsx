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

    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart outerRadius="80%" data={data} data-testid="radar-chart">
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                {/* Radar pour le premier personnage */}
                <Radar 
                    name={character1.name} 
                    dataKey="character1" 
                    stroke={color1} 
                    fill={color1} 
                    fillOpacity={0.6}  // S'assurer que la zone est remplie avec la couleur
                />
                {/* Radar pour le deuxième personnage */}
                <Radar 
                    name={character2.name} 
                    dataKey="character2" 
                    stroke={color2} 
                    fill={color2} 
                    fillOpacity={0.6}  // S'assurer que la zone est remplie avec la couleur
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default RadarChartComponent;