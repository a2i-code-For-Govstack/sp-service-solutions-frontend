// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getResponses , getForm } from '../../services/dataService';
// import { getResponses, getForm } from '../api'; // Assume the API functions are correctly imported
// import SingleCorrectChart from '../components/SingleCorrectChart';
import SingleCorrectChart from './SingleCorrectChart';
import MultipleCorrectChart from './MultipleCorrectChart';
// import MultipleCorrectChart from '../components/MultipleCorrectChart';

export default function Dashboard() {
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const fetchData = async () => {
      const hash = window.location.pathname.split('/')[2]; // Get hash from URL
      const token = sessionStorage.getItem('token'); // Get token from session storage

      try {
        const responsesData = await getResponses(hash);
        setResponses(responsesData);

        const formData = await getForm(hash, token);
        setForm(formData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateVotingPercentage = () => {
    // Placeholder function for voting percentage calculation
    return (responses.length / 100) * 100; // Example calculation
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">Dashboard</Typography>
          <Typography>Date: {date}</Typography>
          <Typography>Total Responses: {responses.length}</Typography>
          <Typography>Voting Percentage: {calculateVotingPercentage()}%</Typography>
        </CardContent>
      </Card>
      
      {form.map(question => {
        const questionResponses = responses
          .filter(response => response.answers.some(answer => answer.field === question.id))
          .flatMap(response => response.answers.filter(answer => answer.field === question.id));
        
        const groupedResponses = questionResponses.reduce((acc, { value }) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(groupedResponses).map(([value, count]) => ({
          value,
          count,
        }));

        return (
          <div key={question.id}>
          <SingleCorrectChart question={question.text} data={chartData} />
            {question.type === 'multioption-singleanswer' ? (
              <SingleCorrectChart question={question.text} data={chartData} />
            ) : (
              <MultipleCorrectChart question={question.text} data={chartData} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// import React from 'react'

// export default function Dashboard() {
//   return (
//     <div>Dashboard</div>
//   )
// }

