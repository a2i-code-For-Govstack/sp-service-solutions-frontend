import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from '@mui/material';
import { getForm, getIndividualResponses } from '../../services/dataService';  // Import your API functions
import loader from '../Theme/images/loader.gif'
const IndividualResponse = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hash , id } = useParams();
  const [responseId, setId] = useState(0);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    setId(id);
    const openAnswers = async () => {
      console.log("Fetching data for hash:", hash, "and responseId:", responseId);
      setLoading(true);
      try {
        const formResponse = await getForm(hash, token);
        console.log("Form response:", formResponse);
        const responsesResponse = await getIndividualResponses(hash, responseId, token);
        console.log("Individual responses:", responsesResponse);
        setQuestions(formResponse[0].fields);
        setAnswers(responsesResponse.answers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    openAnswers();
  }, [hash, responseId, token]);

  const getAnswerForField = (fieldId) => {
    const answer = answers.find(a => a.field === fieldId);
    return answer ? answer.value : '';
  };

  if (loading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <img 
                src={loader} 
                alt="Loading..." 
                style={{ width: '50px', height: 'auto' }} 
            />
        </div>
    );
}

  return (
    <div className="surveyView">
      <h2 style={{color:'black', fontSize:"25px" }}>Survey Answers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        questions.map((field, index) => (
          <div
            key={index}
            style={{
              border: '1px solid grey',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '50%',
              minWidth: 300,
              padding: '2.5em 2em 2.5em 2em',
              background: 'white',
              borderRadius: '7px',
              margin: '1em 0em 1em 0em',
            }}
          >
            <label style={{ fontWeight: "400", color: "black",  whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '100%' }}>
              {field.title}
              {field.required && <span className="err"> * </span>}
            </label>
            {field.type === 'short-text' || field.type === 'number' ? (
              <TextField
                style={{ marginTop: '.5em ' , whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '100%' }}
                type={field.type === 'number' ? 'number' : 'text'}
                value={getAnswerForField(field.id)}
                variant="standard"
                disabled
              />
            ) : field.type === 'long-text' ? (
              <TextField
                style={{ marginTop: '.5em ' ,whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '100%' }}
                value={getAnswerForField(field.id)}
                variant="standard"
                multiline
                placeholder="long answer here"
                disabled
              />
            ) : field.type === 'multioption-singleanswer' ? (
              <FormControl component="fieldset">
                <RadioGroup
                  name={field.title.replace(' ', '')}
                  value={getAnswerForField(field.id)}
                  disabled
                >
                  {field.options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={option}
                      control={<Radio />}
                      label={option}
                      disabled
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : field.type === 'multioption-multianswer' ? (
              <FormControl component="fieldset">
                <FormGroup disabled>
                  {field.options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={<Checkbox checked={getAnswerForField(field.id).includes(option)} />}
                      label={option}
                      disabled
                    />
                  ))}
                </FormGroup>
              </FormControl>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default IndividualResponse;
