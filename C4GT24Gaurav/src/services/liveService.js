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
  if(!file){
    alert("no file")
  }
  
  const url = fileType === 'CSV' 
    ? `${BASE_URL}/instance/CSV/${hash}/` 
    : `${BASE_URL}/instance/JSON/${hash}/`;

  const formData = new FormData();
    formData.append('first_name', 'firstname');
    formData.append('last_name', 'lastname');
    formData.append('username', 'email');
    formData.append('password', 'password');
    formData.append('file', file);
  // const formData = new FormData();
  

  const token = sessionStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': `multipart/form-data`,
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

export const updateUser = async (hash, username, userData) => {
    const token = sessionStorage.getItem('token');
    try {
        const response = await axios.patch(`${BASE_URL}/instance/CSV/${hash}/${username}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            alert('User updated successfully');
        }
    } catch (error) {
        alert('Error in updating user');
    }
};




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



// Function to fetch instance data by hash using POST request
export const fetchInstanceInfo = async (hash) => {
  const hashbody = {
    hash: hash,
  };
  console.log(hash, "in fetch")
  try {
      const response = await axios.post(`${BASE_URL}/instance/info`, hashbody);
      return response.data;
  } catch (error) {
      console.error('Error fetching instance data:', error);
      throw error;
  }
};


//voter login



// Function to handle voter login
export const voterLogin = async (hash, username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/instance/${hash}/login`, {
            username,
            password
        });
        alert("now you can vote")
        return response.data;
        
    } catch (error) {
       
        if (error.response) {
            alert(`Error: ${error.response.data.detail}`);
        } else if (error.request) {
            alert('Network error. Please try again.');
        } else {
            alert('Error occurred while processing your request.');
        }

        // throw error; // Re-throw the error for any further handling
    }
};
