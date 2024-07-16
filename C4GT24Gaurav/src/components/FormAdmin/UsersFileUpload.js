// PageB.js
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
import { uploadFile } from '../../services/liveService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UsersFileUpload({ open, onClose }) {
  const [fileType, setFileType] = useState('');
  const [file, setFile] = useState(null);
  const { hash } = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleUpload = async () => {
    if (file && fileType) {
      try {
        const response = await uploadFile(file, fileType, hash);
        alert(response.message || response.detail);
      } catch (error) {
        alert('Error uploading file');
      }
    } else {
      alert('Please select a file and file type');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <h2>Upload File</h2>
        <Select
          value={fileType}
          onChange={handleFileTypeChange}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>Select file type</MenuItem>
          <MenuItem value="CSV">CSV</MenuItem>
          <MenuItem value="JSON">JSON</MenuItem>
        </Select>
        <TextField
          type="file"
          onChange={handleFileChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleUpload}>
          Upload
        </Button>
      </Box>
    </Modal>
  );
}
