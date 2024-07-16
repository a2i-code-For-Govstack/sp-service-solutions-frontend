import React from 'react';
import GoogleButton from 'react-google-button';

const OrgLogin = ({ onGoogleLogin }) => {
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <GoogleButton onClick={onGoogleLogin} />
        </div>
    );
};

export default OrgLogin;
