import React from 'react'
import { useEffect } from 'react';
import { handleGoogleCallback } from '../../services/liveService';
import { useParams , useLocation } from 'react-router-dom';
export default function ProcessGoogleAuth() {
    const location = useLocation();
  useEffect(() => {
    // Check if the URL contains state and code, indicating a callback from Google
    const urlParams = new URLSearchParams(location.search);
    const state = urlParams.get('state');
    const code = urlParams.get('code');
    alert("part1")
    if (state && code) {
      handleGoogleOAuthCallback(state, code);
    }
  }, [location.search]);

// const handleGoogleLogin = async () => {
//     try {
//       const authUrl = await getGoogleAuthUrl(hash);
//       sessionStorage.setItem('hash', hash); // Save hash to session storage
//       window.location.href = authUrl;
//     } catch (error) {
//       console.error("Google login error:", error);
//     }
//   };

  const handleGoogleOAuthCallback = async (state, code) => {
    const storedHash = sessionStorage.getItem('hash');
    if (storedHash) {
      try {
       const {access} = await handleGoogleCallback(state, code);
       sessionStorage.setItem('voting_token', access); 
        const hash = sessionStorage.getItem('hash');
        window.href = `/${hash}`;
        sessionStorage.removeItem('hash'); // Remove hash from session storage
        // Redirect to original page
      } catch (error) {
        console.error("Google OAuth callback error:", error);
      }
    }
  };



  return (
    <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , width:'100%' , height:"100%"}}>Verifying please wait</div>
  )
}
