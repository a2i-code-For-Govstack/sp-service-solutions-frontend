import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import MultiCorrectChart from './MultiCorrectChart';
// import SingleCorrectChart from './SingleCorrectChart';
import { useParams } from 'react-router-dom';
import { getResponses , getForm} from '../../services/dataService';

export default function Dashboard() {
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);
  const { hash } = useParams(); // You should get this from the URL.
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResponses(hash);
        setResponses(response);
        const formData = await getForm(hash, token);
        setForm(formData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [hash, token]);

  useEffect(() => {
    console.log("form Data", form);
    console.log("response", responses);
  }, [form, responses]);

  const totalResponses = responses.length;
  const votingPercentage = (totalResponses / 100) * 100; // Assuming 100 is the total number of possible responses.

  if (!form) return null;

  return (
    <div style={{ overflowX:'hidden'}}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: "100%", justifyContent: 'space-evenly' }}>
        <Card>
          <CardHeader>
            <CardTitle>Total Responses</CardTitle>
          </CardHeader>
          <CardContent>{totalResponses}</CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Voting Percentage</CardTitle>
          </CardHeader>
          <CardContent>{votingPercentage}%</CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Date</CardTitle>
          </CardHeader>
          <CardContent>{new Date().toLocaleDateString()}</CardContent>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: "100%", justifyContent: 'space-evenly' }}>
        {form.fields.map(question => {
          const answers = responses.map(response => {
            const answer = response.answers.find(a => a.field === question.id);
            return answer ? answer.value : [];
          });
          if (question.type === 'multioption-singleanswer') {
            return <MultiCorrectChart key={question.id} question={question} data={answers} />;
          } else if (question.type === 'multioption-multianswer') {
            return <MultiCorrectChart key={question.id} question={question} data={answers} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

