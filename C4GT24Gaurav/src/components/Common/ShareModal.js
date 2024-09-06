import React from 'react';
import { Modal, Box, Button, IconButton, Typography, TextField } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  ContentCopy as ContentCopyIcon
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

const ShareModal = ({ open, handleClose, shareUrl , hash }) => {
  const readyToPostMessage = "Check this out: ";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMessage = encodeURIComponent(readyToPostMessage + shareUrl);
  const encoded_hash = encodeURIComponent(hash);
  //  const hash = "aldskdsfkmm"
  const shareLinks = {
    facebook: `https://facebook.com/sharer.php?u=https://sp.lsb.gov.bd}`,
    // https://facebook.com/sharer.php?u=http://www.google.com/${encodedMessage}
    twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
   linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodedMessage}`,
    email: `mailto:?subject=${encodeURIComponent("Check this out")}&body=${encodedMessage}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}`,
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    
    window.showToast('success','Link copied to clipboard!');
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="share-modal-title">
      <Box sx={style}>
        <Typography id="share-modal-title" variant="h6" component="h2">
          Share this Form
        </Typography>
        <Box mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Shareable Link"
            value={shareUrl}
            InputProps={{
              endAdornment: (
                <IconButton onClick={copyToClipboard} edge="end">
                  <ContentCopyIcon />
                </IconButton>
              ),
              readOnly: true,
            }}
          />
        </Box>
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
