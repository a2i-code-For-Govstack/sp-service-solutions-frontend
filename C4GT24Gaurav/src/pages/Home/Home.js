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
import { createInstance } from '../../services/liveService'

const Home = () => {
  
  // const [mode, setMode] = React.useState('light');
  



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
