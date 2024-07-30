import React from 'react';
import { Modal, Box, Button, IconButton, Typography } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon
} from '@mui/icons-material';

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

const ShareModal = ({ open, handleClose, shareUrl }) => {
  const shareLinks = {
    facebook: `https://www.facebook.com`,
    twitter: `https://twitter.com`,
    linkedin: `https://www.linkedin.com`,
    email: `mailto:?subject=Check%20this%20out&body=${shareUrl}`,
    whatsapp: `https://api.whatsapp.com`
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="share-modal-title">
      <Box sx={style}>
        <Typography id="share-modal-title" variant="h6" component="h2">
          Share this Form
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-around">
          <IconButton
            color="primary"
            component="a"
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="a"
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="a"
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="a"
            href={shareLinks.email}
            target="_blank"
            rel="noopener noreferrer"
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="a"
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
          </IconButton>
        </Box>
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleClose} size="small">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShareModal;
