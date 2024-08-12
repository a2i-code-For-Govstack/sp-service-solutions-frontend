// src/services/dataService.js
// SAME AS BEFORE
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/data';

export const createForm = async (hash, formData, token) => {
    // alert("create form trigger")
    console.log(hash , formData, token , "in data service ")
  const response = await axios.post(`${BASE_URL}/${hash}/form/`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateform = async (hash, formData, formId, token) => {
  console.log("form data is ", formData);
  try {
    const response = await axios.patch(
      `${BASE_URL}/${hash}/form/${formId}`, 
      formData, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (hash, formId, questionId, token) => {
  await axios.delete(`${BASE_URL}/${hash}/form/${formId}/question/${questionId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const getForm = async (hash, token) => {
  const response = await axios.get(`${BASE_URL}/${hash}/form/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const addQuestionToForm = async (hash, formId, questionData) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/${hash}/form/${formId}/question`, questionData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        window.showToast('success', 'Question successfully created');
      }
    } catch (error) {
      window.showToast('error', 'Retry with proper question');
    }
  };

  export const updateQuestion = async (hash, formId, questionId, field) => {
    
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.showToast('error', 'Please login');
      return;
    }
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    try {
      const response = await axios.patch(`${BASE_URL}/${hash}/form/${formId}/question/${questionId}`, field, config);
      window.showToast('success', 'Question edited successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating question:', error);
      window.showToast('error', 'Error in updating question');
      // throw error;
    }
  };

  export const fetchFormData = async (hash, socialToken) => {
    console.log("in fetch form data api")
    const response = await axios.get(`${BASE_URL}/${hash}/voter/get-data`, {
        params: { access: socialToken }
    });
    return response.data;
};

export const submitForm = async (formData, hash) => {
  console.log(formData , "in api submit form")
  const socialToken = sessionStorage.getItem('voting_token');
  try {
      const response = await axios.post(`${BASE_URL}/${hash}/voter/post-data`, formData, {
          params: { access: socialToken }
      });
      return response.data;
  } catch (error) {
      if (error.response) {
          throw new Error(error.response.data.detail || 'An error occurred');
      }
      throw error;
  }
};
export const getResponses = async (hash) => {
  // alert("working")
  const token = sessionStorage.getItem('token');
  const response = await axios.get(`${BASE_URL}/${hash}/responses`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return response.data;
};

export const deleteResponse = async (hash, id) => {
  const token = sessionStorage.getItem('token');
  await axios.delete(`${BASE_URL}/${hash}/responses/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
};

//individual respone 
export const getIndividualResponses = async (hash, id, token) => {
  const response = await axios.get(`${BASE_URL}/${hash}/responses/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};