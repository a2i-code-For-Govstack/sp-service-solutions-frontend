import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Link, Typography, Container, CssBaseline } from '@mui/material';
import { activate } from '../../services/authService';

const ActivatePage = () => {
  const location = useLocation();

  useEffect(() => {
    const activateAccount = async () => {
      const searchParams = new URLSearchParams(location.search);
      const uid = searchParams.get('uid');
      const token = searchParams.get('token');

      if (uid && token) {
        try {
          const response = await activate(uid, token);
          if (response === 204) {
            alert('Account activated successfully! You can now log in.');
            window.location.href = '/creator-login';
          }
        } catch (error) {
          console.error('Error during account activation:', error);
          // alert('Error or your account is already activated');
        }
      }
    };

    activateAccount();
  }, [location.search]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Your Account Is Activated
        </Typography>
        <Typography component="p" variant="body1" align="center" sx={{ mt: 2 }}>
          Login to enjoy features
        </Typography>
        <Link href="/creator-login" variant="body2">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default ActivatePage;