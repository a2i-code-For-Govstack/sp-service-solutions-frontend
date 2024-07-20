import React from "react";
import axios from "axios";
import CreatorLogin from "../../components/Auth/CreatorLogin";
import { login, forgotPassword, forgotUsername } from '../../services/authService';

const CreatorLoginPage = () => {
  const handleLogin = async (username, password) => {
    try {
      const response = await login(username,password);
      
    } catch (error) {
      throw error
    }
  };

  const handleForgotPassword = async (email) => {
    
    try {
      const response = await forgotPassword(email);
      if (response === 204) {
        window.showToast('success', 'Password reset link has been sent to your email');
        // alert('Password reset link has been sent to your email');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        window.showToast('error', `Error in sending reset link: ${error.response.data.detail}`);
        
        // alert(`Error in sending reset link: ${error.response.data.detail}`);
      } else {
        window.showToast('error', 'Error in sending reset link, please check your email address');
        
        // alert('Error in sending reset link, please check your email address');
      }
      console.error('Error during password reset:', error);
    }
  };

  const handleForgotUsername = async (email) => {
    try {
      const response = await forgotUsername(email);
      if (response === 204) {
        window.showToast('success', 'UserName link has been sent to your email');
        
        // alert('UserName link has been sent to your email');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // alert(`Error in sending reset link: ${error.response.data.detail}`);
        window.showToast('error', `Error in sending reset link: ${error.response.data.detail}`);
        
      } else {
        // alert("Error in sending reset link, please check your email address");
        window.showToast('error', 'Error in sending reset link, please check your email address');
        
      }
    }
  };

  return (
    <div>
      <CreatorLogin onLogin={handleLogin} onForgotPassword={handleForgotPassword} onForgotUsername={handleForgotUsername} />
    </div>
  );
};

export default CreatorLoginPage;
