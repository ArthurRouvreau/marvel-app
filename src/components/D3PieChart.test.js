import { render } from '@testing-library/react';
import D3PieChart from './D3PieChart';

describe('D3PieChart', () => {
    test('renders without error', () => {
        render(<D3PieChart data={{}} />);
    });

    test('renders the pie chart with correct data', () => {
        // when
        const data = {
            force: 10,
            intelligence: 20,
            energy: 30,
            speed: 40,
            durability: 50,
            fighting: 60,
        };

        // then
        render(<D3PieChart data={data} />);

        // expect to have a pie chart container
        expect(document.getElementById('pie-container')).toBeInTheDocument();

        // expect to have a svg element
        const svgElement = document.querySelector('svg');
        expect(svgElement).toBeInTheDocument();

        // expect to have a path element for each data
        const pathElements = document.querySelectorAll('path');
        expect(pathElements).toHaveLength(Object.keys(data).length);

        expect(svgElement.getElementById('pie-labels-name-Force')).toBeInTheDocument();
        expect(svgElement.getElementById('pie-labels-name-Intelligence')).toBeInTheDocument();
        expect(svgElement.getElementById('pie-labels-name-Energy')).toBeInTheDocument();
        expect(svgElement.getElementById('pie-labels-name-Speed')).toBeInTheDocument();
        expect(svgElement.getElementById('pie-labels-name-Durability')).toBeInTheDocument();
        expect(svgElement.getElementById('pie-labels-name-Fighting')).toBeInTheDocument();
    });
});