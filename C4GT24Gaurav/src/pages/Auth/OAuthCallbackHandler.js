import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { handleGoogleCallback } from '../../services/liveService';

const OAuthCallbackHandler = () => {
    const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (code && state) {
        try {
          // const response = await axios.post(
          //     "http://localhost/repo/api/v1/oauth/callback",
          //     {
          //         code,
          //         state,
          //     }
          // );
          // console.log("Received auth token:", response.data.Authorization);
          // setMessage(response.data.Authorization);
          // window.history.replaceState({}, document.title, "/");
          const storedHash = sessionStorage.getItem("hash");
          if (storedHash) {
            try {
              const { access } = await handleGoogleCallback(
                storedHash,
                state,
                code
              );
              sessionStorage.setItem("voting_token", access);
              window.location.href = `/${storedHash}`;
              sessionStorage.removeItem("hash"); // Remove hash from session storage
            } catch (error) {
              console.error("Google OAuth callback error:", error);
            }
          }
        } catch (error) {
          console.error("Error handling OAuth callback:", error);
        }
      } else {
        setMessage("");
      }
    };

    handleCallback();
  }, []);

  return <div>   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
  Verifying, please wait...
</div></div>;
};

export default OAuthCallbackHandler;
