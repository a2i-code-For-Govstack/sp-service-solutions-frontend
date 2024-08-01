import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../pages/Home/Home.css';
import axios from 'axios';

import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material/styles';

// import CreatorLoginPage from '../Auth/CreatorLoginPage';
import { useTheme } from '@mui/material/styles';



const Blank = () => {
  


  const handleLoginRedirect = () => {
    window.location.href = '/creator-login';
  };

  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
  <CssBaseline />
    {/* <Navbar/> */}
    <div className="home">
    
    <h1>SignIn Required</h1>
    <p>Create, share, get the responses & data</p>
      <ButtonGroup variant="contained" aria-label="Large button group">

        <Button onClick={handleLoginRedirect} value="create">LogIn</Button>
        {/* <Link to = "/creator-login"><Button value="vote-email">   VOTE   </Button></Link> */}
        {/* <Link to = "/org-login"><Button value="vote-oauth">VOTE BY OAUTH</Button></Link> */}
      </ButtonGroup>
    </div>
   
    
    </ThemeProvider>
    
   
  );
};

export default Blank;
