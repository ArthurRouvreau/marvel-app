import { render } from '@testing-library/react';
import RechartsPieChart from './RechartsPieChart';

describe('RechartsPieChart', () => {
    test('renders the pie chart with correct data', () => {
        // when
        const data = {
            force: 80,
            intelligence: 90,
            energy: 70,
            speed: 85,
            durability: 75,
            fighting: 95
        };

        // then
        render(<RechartsPieChart data={data} />);

        // expect to be ok
        expect(true).toBe(true);

        // expect to have a div with the class "recharts-wrapper"
        expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument();
    });

    test(' don\'t fail when data is null', () => {
        // when
        const data = null;

        // then
        render(<RechartsPieChart data={data} />);

        // expect to have a div with the class "recharts-wrapper"
        expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument();

        // expect to be ok
        expect(true).toBe(true);
    });
});