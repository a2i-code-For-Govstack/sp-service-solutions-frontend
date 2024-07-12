import axios from 'axios';

// Define the base URL for your API
const baseURL = 'http://localhost:8000/api/v1/auth';

//CREATOR LOGIN PAGE 
// Login function
export const login = async (username, password) => {
  const filledFormDataLogin = {
    username: username,
    password: password,
  };

  try {
    const response = await axios.post(`${baseURL}/jwt/create`, filledFormDataLogin, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
        const token = response.data.access;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('first_name', response.data.first_name);
        sessionStorage.setItem('last_name', response.data.last_name);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('id', response.data.id);
        sessionStorage.setItem('is_active',response.data.is_active);
        sessionStorage.setItem('is_deactivated',response.data.is_deactivated);
        alert("HAPPY JOURNEY , YOU ARE LOGGED IN");
        window.location.href = '/'; 
      }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
        alert(`Error in login: ${error.response.data.detail}`);
      } else {
        alert(
          "Error in login, please give your username and password correctly"
        );
      }
      console.error("Error during login:", error);
    // throw error;
  }
};

// Forgot password function
export const forgotPassword = async (email) => {
  const filledFormDataReset = {
    email: email,
  };

  try {
    const response = await axios.post(`${baseURL}/users/reset_password/`, filledFormDataReset, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

// Forgot username function
export const forgotUsername = async (email) => {
  const filledUsernameReset = {
    email: email,
  };

  try {
    const response = await axios.post(`${baseURL}/users/reset_username/`, filledUsernameReset, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

//CREATOR SIGN UP PAGE
// Signup function
export const signup = async (firstName, lastName, userName, email, password) => {
    const filledFormData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: userName,
      password: password,
    };
  
    try {
      const response = await axios.post(`${baseURL}/users/`, filledFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.status;
    } catch (error) {
      throw error;
    }
  };


  // Resend activation function
export const resendActivation = async (email) => {
    try {
      const response = await axios.post(`${baseURL}/users/resend_activation/`, { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.status;
    } catch (error) {
      throw error;
    }
  };


// Activate account function
export const activate = async (uid, token) => {
    try {
      const response = await axios.post(`${baseURL}/users/activation/`, {
        uid,
        token,
      });
      return response.status;
    } catch (error) {
      throw error;
    }
  };

// Update profile function
  export const updateProfile = async (firstName, lastName, token) => {
    const updatedUserData = {
      first_name: firstName,
      last_name: lastName,
    };
  
    try {
      const response = await axios.patch(`${baseURL}/users/me/`, updatedUserData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status;
    } catch (error) {
      throw error;
    }
  };
  
  // Delete account function
  export const deleteAccount = async (currentPassword, token) => {
    try {
      const response = await axios.delete(`${baseURL}/users/me/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          current_password: currentPassword,
        },
      });
      return response.status;
    } catch (error) {
      throw error;
    }
  };