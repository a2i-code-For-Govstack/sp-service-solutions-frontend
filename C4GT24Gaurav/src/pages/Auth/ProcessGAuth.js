import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { handleGoogleCallback } from '../../services/liveService';

export default function ProcessGAuth() {
  const location = useLocation();

  useEffect(() => {
    // Check if the URL contains state and code, indicating a callback from Google
    const urlParams = new URLSearchParams(location.search);
    const state = urlParams.get('state');
    const code = urlParams.get('code');

    if (state && code) {
      handleGoogleOAuthCallback(state, code);
    }
  }, [location.search]);

  const handleGoogleOAuthCallback = async (state, code) => {
    const storedHash = sessionStorage.getItem('hash');
    if (storedHash) {
      try {
        const { access } = await handleGoogleCallback(storedHash, state, code);
        sessionStorage.setItem('voting_token', access);
        window.location.href = `/${storedHash}`;
        sessionStorage.removeItem('hash'); // Remove hash from session storage
      } catch (error) {
        console.error("Google OAuth callback error:", error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      Verifying, please wait...
    </div>
  );
}
