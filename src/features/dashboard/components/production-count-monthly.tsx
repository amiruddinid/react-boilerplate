import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, 
    CartesianGrid, Tooltip, Legend } from 'recharts';

const ProductionCountMonthly = () => {
    const [data, setData] = useState([
        {
            "month": "January",
            "count": 1000
        },
        {
            "month": "February",
            "count": 900
        },
        {
            "month": "March",
            "count": 1100
        },
    ])
    return (
        <BarChart
            data={data}
            responsive
            style={{ 
                width: '100%', 
                maxWidth: '700px', 
                maxHeight: '70vh', 
                aspectRatio: 1.618 
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis width="auto"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" activeBar={{
                fill: "red", stroke: 'black'
            }} radius={[10, 10, 0, 0]}/>
        </BarChart>
    );
}

export default ProductionCountMonthly;