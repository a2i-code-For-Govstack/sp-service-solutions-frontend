import React, { useState } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';
import { addUser } from '../../services/liveService'; // Adjust the path as necessary

const UserAddModal = ({ open, onClose, hash }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await addUser(firstName, lastName, email, password, hash);
      onClose();
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, backgroundColor: 'white', margin: 'auto', marginTop: '20vh', width: '300px', borderRadius: '8px' }}>
        <h2>Add User</h2>
        <TextField
          size="small"
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          style={{ marginTop: '16px' }}
        >
          Add User
        </Button>
      </Box>
    </Modal>
  );
};

export default UserAddModal;
