// src/components/MultipleCorrectChart.js
import React from 'react';
import {  PieChart} from '@mui/x-charts';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
const MultipleCorrectChart = ({ question, data }) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h3>{question}</h3>
      <PieChart width={400} height={200}>
        <PieChart
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))} */}
        </PieChart>
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
    </div>
  );
};

MultipleCorrectChart.propTypes = {
  question: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
};

export default MultipleCorrectChart;
