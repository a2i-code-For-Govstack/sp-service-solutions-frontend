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