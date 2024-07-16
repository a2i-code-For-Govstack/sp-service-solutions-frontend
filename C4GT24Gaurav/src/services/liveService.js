// src/services/instanceService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/live';

const api = axios.create({
  baseURL: BASE_URL,
});

const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const updateInstance = async (hash, instanceData) => {
  try {
    const response = await api.patch(`/instance/${hash}/`, instanceData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchInstanceData = async (hash) => {
  try {
    const response = await api.get(`/instance/${hash}/`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const getInstances = async () => {
  const storedToken = sessionStorage.getItem('token');
  if (!storedToken) {
    throw new Error('Please login to access this page.');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}/instance`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching instances:', error);
    throw error;
  }
};


export const deleteInstance = async (hash) => {
    try {
      const response = await axios.delete(`${BASE_URL}/instance/${hash}/`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

   //for user list upload 

export const uploadFile = async (file, fileType, hash) => {
  
  const url = fileType === 'CSV' 
    ? `${BASE_URL}/instance/CSV/${hash}/` 
    : `${BASE_URL}/instance/JSON/${hash}/`;

  const formData = new FormData();
  formData.append('file', file);

  const token = sessionStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(url, formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const token = sessionStorage.getItem('token');

export const getUsers = async (hash) => {
    try {
        const response = await axios.get(`${BASE_URL}/instance/CSV/${hash}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
      
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const deleteUser = async (hash , username) => {
    try {
        await axios.delete(`${BASE_URL}/instance/CSV/${hash}/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
       
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

//FOR GOOGLE AUTH 
export const initiateGoogleLogin = async (baseUrl, instanceHash, redirectUri) => {
  try {
      const response = await axios.get(`${baseUrl}/${instanceHash}/google-oauth2/?redirect_uri=${redirectUri}`);
      return response.data;
  } catch (error) {
      throw new Error('Failed to initiate Google login');
  }
};

export const handleGoogleAuthResponse = async ( instanceHash, state, code) => {
  console.log(state,code,"in service")
  try {
      const response = await axios.post(`${BASE_URL}/${instanceHash}/google-oauth2/?state=${state}&code=${code}`);
      return response.data;
  } catch (error) {
      throw new Error('Failed to handle Google auth response');
  }
};