import React from 'react';
import SelectedUserLogin from '../../components/Auth/SelectedUserLogin';
import OrgLogin from '../../components/Auth/OrgLogin';
import { initiateGoogleLogin , voterLogin } from '../../services/liveService';
import { getGoogleAuthUrl , handleGoogleCallback } from '../../services/liveService';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
const SelectedUserLoginPage = () => {
    const { hash } = useParams();
    const handleUserLogin = async (username, password) => {
        try {
            const { access } = await voterLogin(hash, username, password);
            sessionStorage.setItem('voting_token', access); 
            console.log('Login successful. Access token:', access);
            window.location.reload();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const authUrl = await getGoogleAuthUrl(hash);
            window.location.href = authUrl;
             } catch (error) {
            console.error("Google login error:", error);
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
