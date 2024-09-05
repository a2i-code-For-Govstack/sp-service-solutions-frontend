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
  const [downloadFormat, setDownloadFormat] = useState('');
  const [file, setFile] = useState(null);
  const { hash } = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleDownloadFormatChange = (event) => {
    const selectedFormat = event.target.value;
    setDownloadFormat(selectedFormat);
    handleDownload(selectedFormat);
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

  const handleDownload = (format) => {
    const fileMap = {
      'Download CSV': '/sample.csv',
      'Download JSON': '/sample.json',
    };

    const link = document.createElement('a');
    link.href = fileMap[format];
    link.download = fileMap[format].substring(1); // remove leading '/'
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <MenuItem value="" disabled>Select file type to upload</MenuItem>
          <MenuItem value="CSV">CSV</MenuItem>
          <MenuItem value="JSON">JSON</MenuItem>
        </Select>
        <h2>Download File Format</h2>
        <Select
          value={downloadFormat}
          onChange={handleDownloadFormatChange}
          displayEmpty
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled>Download File Format</MenuItem>
          <MenuItem value="Download CSV">Download CSV Format</MenuItem>
          <MenuItem value="Download JSON">Download JSON Format</MenuItem>
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
