import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { prepareData } from './chart-utils';

const RechartsPieChart = ({ data }) => {
    // Prepare the data
    let transformedData = prepareData(data);

    // Define the colors
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <PieChart width={300} height={224} >
            <Pie dataKey="value" cx={100} cy={100} data={transformedData} innerRadius={40} outerRadius={80} label>
                {
                    transformedData.map((entry) => <Cell key={`cell-${entry.name}`} fill={COLORS[transformedData.indexOf(entry) % COLORS.length]} />)
                }
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

RechartsPieChart.propTypes = {
    data: PropTypes.shape({
        force: PropTypes.number,
        intelligence: PropTypes.number,
        energy: PropTypes.number,
        speed: PropTypes.number,
        durability: PropTypes.number,
        fighting: PropTypes.number,
    }),
};

export default RechartsPieChart;