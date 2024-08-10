import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from '@mui/material';
import { getForm, getIndividualResponses } from '../../services/dataService';  // Import your API functions

const IndividualResponse = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="surveyView">
      <h2 style={{ color: 'black', fontWeight: 300 }}>Survey Answers</h2>
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
            <label style={{ fontWeight: '400', color: 'black' }}>
              {field.title}
              {field.required && <span className="err"> * </span>}
            </label>
            {field.type === 'short-text' || field.type === 'number' ? (
              <TextField
                style={{ marginTop: '.5em ' }}
                type={field.type === 'number' ? 'number' : 'text'}
                value={getAnswerForField(field.id)}
                variant="standard"
                disabled
              />
            ) : field.type === 'long-text' ? (
              <TextField
                style={{ marginTop: '.5em ' }}
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
