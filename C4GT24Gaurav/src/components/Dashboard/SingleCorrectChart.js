// src/components/SingleCorrectChart.js
import React from 'react';
// import {  XAxis, YAxis, CartesianGrid} from '@mui/x-charts';
import {BarChart, PieChart, Pie, XAxis,  CartesianGrid,  Legend } from '@mui/x-charts';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
const SingleCorrectChart = ({ question, data }) => {
  // Prepare the data for the bar chart
  const chartData = data.map(item => ({
    name: item.value,
    count: item.count,
  }));

  return (
    <div>
      <h3>{question}</h3>
      <BarChart width={500} height={300} data={chartData}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
        <Tooltip />
        {/* <Legend /> */}
        <BarChart dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

SingleCorrectChart.propTypes = {
  question: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
};

export default SingleCorrectChart;
