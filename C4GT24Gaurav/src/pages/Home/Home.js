import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';

import './Home.css';
import axios from 'axios';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';

const Home = () => {
  
  // const [mode, setMode] = React.useState('light');
  


  const createInstance = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        window.showToast('error', 'Please Login');
        return;
      }
      
      const response = await axios.post('http://localhost:8000/api/v1/live/instance/', {
        name: 'Untitled Form',
        description: 'Description',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { hash } = response.data;
      window.location.href = `/live/instance/${hash}`;
    } catch (error) {
      console.error('Error creating instance:', error);
    }
  };

  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
  <CssBaseline />
    {/* <Navbar/> */}
    <div className="home">
    
    <h1>Create Surveys & Polls</h1>
    <p>Create, share, get the responses & collect data</p>
      <ButtonGroup variant="contained" aria-label="Large button group">

        <Button onClick={createInstance} value="create">CREATE</Button>
        {/* <Link to = "/creator-login"><Button value="vote-email">   VOTE   </Button></Link> */}
        {/* <Link to = "/org-login"><Button value="vote-oauth">VOTE BY OAUTH</Button></Link> */}
      </ButtonGroup>
    </div>
   
    
    </ThemeProvider>
    
   
  );
};

export default Home;
