import React, { useState, useEffect } from 'react';
import { Button, Avatar, Typography, Container, CssBaseline, Grid, TextField, Box, Modal } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { updateProfile, deleteAccount } from '../../services/authService'
import Blank from '../../components/Common/Blank';
const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userData, setUserData] = useState({}); // Store user data
  const [editable, setEditable] = useState(false); // State to toggle edit mode
  const [firstName, setFirstName] = useState(''); // State for editable first name
  const [lastName, setLastName] = useState(''); // State for editable last name
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State to control delete modal
  const [currentPassword, setCurrentPassword] = useState(''); // State for password input in delete modal

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedFirstName = sessionStorage.getItem('first_name');
    const storedLastName = sessionStorage.getItem('last_name');
    const storedEmail = sessionStorage.getItem('email');
    const storedUsername = sessionStorage.getItem('username');

    if (storedToken && storedFirstName && storedLastName && storedEmail && storedUsername) {
      setIsLoggedIn(true);
      setUserData({
        token: storedToken,
        first_name: storedFirstName,
        last_name: storedLastName,
        email: storedEmail,
        username: storedUsername,
      });
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    } else {
      setIsLoggedIn(false);
      setUserData({});
      setFirstName('');
      setLastName('');
    }
  }, []);

  const handleUpdateProfile = () => {
    setEditable(true); // Enable edit mode
  };

  const handleSaveChanges = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await updateProfile(firstName, lastName, token);
      if (response === 200) {
        sessionStorage.setItem('first_name', firstName);
        sessionStorage.setItem('last_name', lastName);
        alert('Profile updated successfully');
        console.log('Profile updated successfully');
        setEditable(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/creator-login';
  };

  const handleDeleteAccount = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await deleteAccount(currentPassword, token);
      if (response === 204) {
        sessionStorage.clear();
        alert('Account deleted successfully');
        window.location.href = '/creator-signup';
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setCurrentPassword('');
  };

  const handlePasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ textAlign: 'center', marginTop: '10%' }}>
        {isLoggedIn ? (
          <>
            <form noValidate onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }} style={{ marginTop: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    disabled={!editable}
                    value={firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    disabled={!editable}
                    value={lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="User Name"
                    disabled
                    value={userData.username || ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    disabled
                    value={userData.email || ''}
                  />
                </Grid>
              </Grid>
              {editable && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 1 }}
                >
                  Save Changes
                </Button>
              )}
            </form>
            {!editable && (
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={handleUpdateProfile}
              >
                Update Profile
              </Button>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 1, mb: 1 }}
              onClick={handleOpenDeleteModal}
            >
              DELETE MY ACCOUNT
            </Button>
            <Modal
              open={deleteModalOpen}
              onClose={handleCloseDeleteModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box sx={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4
              }}>
                <Typography id="modal-title" variant="h6" component="h2">
                  Confirm Account Deletion
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                  Please enter your password to confirm account deletion.
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="currentPassword"
                  label="Password"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={handlePasswordChange}
                  sx={{ mt: 2 }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleDeleteAccount}
                >
                  Send Request
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
          </>
        ) : (<>
          <Blank/>
          </>
        )}
      </div>
    </Container>
  );
};

export default ProfilePage;
{/* <>
<h1>Please login to see profile</h1>
<Button
  type="button"
  variant="contained"
  sx={{ mt: 3, mb: 2 }}
  onClick={handleLoginRedirect}
>
  Login
</Button>
</> */}