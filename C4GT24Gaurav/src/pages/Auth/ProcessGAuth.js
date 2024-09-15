import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProcessGAuth() {
  const location = useLocation();
  const hash = sessionStorage.getItem('hash');

  // Function to extract query parameters
  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      access: params.get('access'),
    };
  };

  const { access } = getQueryParams(location.search);

  useEffect(() => {
    if (access) {
      sessionStorage.setItem('voting_token', access);
      window.location.href = `${window.location.origin}/${hash}`;
    } else {
      alert('Verification failed');
    }
  }, [access, hash]);

  return (
    <div class="Denycontainer">
  <p> Verifying Please wait .....</p>
</div>
  );
}
