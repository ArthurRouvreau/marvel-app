import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const RadarChartComponent = ({ character1, character2 }) => {
    const data = [
        {
            subject: 'Force', character1: character1.capacities.force, character2: character2.capacities.force,
        },
        {
            subject: 'Intelligence', character1: character1.capacities.intelligence, character2: character2.capacities.intelligence,
        },
        {
            subject: 'Durability', character1: character1.capacities.durability, character2: character2.capacities.durability,
        },
        {
            subject: 'Energy', character1: character1.capacities.energy, character2: character2.capacities.energy,
        },
        {
            subject: 'Speed', character1: character1.capacities.speed, character2: character2.capacities.speed,
        },
        {
            subject: 'Fighting', character1: character1.capacities.fighting, character2: character2.capacities.fighting,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name={character1.name} dataKey="character1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name={character2.name} dataKey="character2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default RadarChartComponent;