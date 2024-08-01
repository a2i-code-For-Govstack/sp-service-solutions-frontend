// src/components/LogoComponent.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from './logo.png'; // Make sure to import your logo

const LogoComponent = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.palette.primary.main}
      color={theme.palette.secondary.main}
      p={2}
    >
      <img src={logo} alt="Logo" style={{ marginRight: '10px' }} />
      <Typography variant="h6">My App</Typography>
    </Box>
  );
};

export default LogoComponent;
