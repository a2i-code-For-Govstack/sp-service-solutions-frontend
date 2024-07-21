import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import getLPTheme from './getLPTheme';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Navbar from '../../components/Navbar/Navbar';
import CreatorLoginPage from '../Auth/CreatorLoginPage';
function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const Home = () => {
  
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const createInstance = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        alert('Please login');
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


  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
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
