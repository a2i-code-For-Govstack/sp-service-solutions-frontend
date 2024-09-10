import React from 'react';
import SelectedUserLogin from '../../components/Auth/SelectedUserLogin';
import OrgLogin from '../../components/Auth/OrgLogin';
import { initiateGoogleLogin, voterLogin, getGoogleAuthUrl, handleGoogleCallback } from '../../services/liveService';
// import { getGoogleAuthUrl , handleGoogleCallback } from '../../services/liveService';
import { useParams , useLocation } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const SelectedUserLoginPage = () => {
    const { hash } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
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
   

    useEffect(() => {
        // Extract state and code from the URL after Google redirects back
        const params = new URLSearchParams(window.location.search);
        const state = params.get('state');
        const code = params.get('code');
    
        if (state && code) {
          // Use the extracted state and code to handle OAuth callback
          const hashFromStorage = sessionStorage.getItem('hash'); // Get saved hash from sessionStorage
    
          handleGoogleCallback(hashFromStorage, state, code)
            .then((data) => {
              const accessToken = data.access_token;
              sessionStorage.setItem('google_auth_voting_token', accessToken); // Store the token in session storage
              window.location.reload();
            })
            .catch((error) => {
              console.error('OAuth callback error:', error);
            });
        }
      }, [location.search]);
    

   
//   useEffect(() => {
//     // Check if the URL contains state and code, indicating a callback from Google
//     const urlParams = new URLSearchParams(location.search);
//     const state = urlParams.get('state');
//     const code = urlParams.get('code');
//     alert("part1")
//     if (state && code) {
//       handleGoogleOAuthCallback(state, code);
//     }
//   }, [location.search]);
const handleGoogleLogin = async () => {
  try {
    const authUrl = await getGoogleAuthUrl(hash);
    sessionStorage.setItem('hash', hash); // Save hash to session storage
    window.location.href = authUrl;
  } catch (error) {
    console.error("Google login error:", error);
  }
};

//   const handleGoogleOAuthCallback = async (state, code) => {
//     const storedHash = sessionStorage.getItem('hash');
//     if (storedHash) {
//       try {
//         await handleGoogleCallback(state, code);
//         const hash = sessionStorage.getItem('hash');
//         window.location.href = `/${hash}`;
//         sessionStorage.removeItem('hash'); // Remove hash from session storage
//         // Redirect to original page
//       } catch (error) {
//         console.error("Google OAuth callback error:", error);
//       }
//     }
//   };

   
    return (
        <div>
            {/* <h3>User Login</h3> */}
            <SelectedUserLogin onLogin={handleUserLogin} />
            <OrgLogin onGoogleLogin={handleGoogleLogin} />
           
        </div>
    );
};

export default SelectedUserLoginPage;
