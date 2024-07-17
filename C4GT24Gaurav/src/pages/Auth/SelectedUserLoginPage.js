import React from 'react';
import SelectedUserLogin from '../../components/Auth/SelectedUserLogin';
import OrgLogin from '../../components/Auth/OrgLogin';
import { initiateGoogleLogin , voterLogin } from '../../services/liveService';
import { useParams } from 'react-router-dom';
const SelectedUserLoginPage = () => {
    const { hash } = useParams();
    const handleUserLogin = async (username, password) => {
        try {
            const { access } = await voterLogin(hash, username, password);
            // Handle successful login (e.g., store token in local storage)
            console.log('Login successful. Access token:', access);
        } catch (error) {
            // Handle login errors (e.g., display error message)
            console.error('Login error:', error);
        }
    };


    const handleGoogleLogin = async () => {
        const baseUrl = 'http://localhost:8000/api/v1/live';
        const instanceHash = 'cb8a3eea72b145aa'; // this should be dynamic based on your logic
        const redirectUri = 'http://localhost:3000';
        
        try {
            const response = await initiateGoogleLogin(baseUrl, instanceHash, redirectUri);
            const { authorization_url } = response;
            window.location.href = authorization_url;
           
        } catch (error) {
            console.error('Error initiating Google login:', error);
        }
    };

    

  

    return (
        <div>
            <h3>User Login</h3>
            <SelectedUserLogin onLogin={handleUserLogin} />
            <OrgLogin onGoogleLogin={handleGoogleLogin} />
           
        </div>
    );
};

export default SelectedUserLoginPage;
