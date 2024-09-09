import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';

import './Home.css';
import axios from 'axios';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import landing from '../../components/Theme/images/landing.gif'
import a2iicon from '../../components/Theme/images/a2iicon.png'
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
    <div style={{ display: 'flex', justifyContent:"space-between", alignItems: 'center', height: '25vh'  }}>
            <img 
                src={landing} 
                alt="product by a2i" 
                style={{ width: '300px', height: 'auto' }} 
            />
        </div>
    <h1>Create Surveys & Polls</h1>
    {/* <p>Create, share, get the responses & collect data</p> */}
      <ButtonGroup variant="contained" aria-label="Large button group">

        <Button onClick={createInstance} value="create">CREATE</Button>
        {/* <Link to = "/creator-login"><Button value="vote-email">   VOTE   </Button></Link> */}
        {/* <Link to = "/org-login"><Button value="vote-oauth">VOTE BY OAUTH</Button></Link> */}
      </ButtonGroup>
  
      
      


  
      <div className='hometext'>
  <p>Create, share, get the responses & analyse data</p>

</div>

<div className="landingLogodiv">
    <img 
        src={a2iicon} 
        alt="Loading..." 
        style={{ width: '50px', height: 'auto' }} 
    />
   </div>

    </div>
    
    
    </ThemeProvider>
    
   
  );
};

export default Home;
