import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { updateInstance } from '../../services/liveService';  // Make sure to adjust the path
import { useTheme } from '@mui/material/styles';

export default function SelectedDomain({ allowedDomain = [], hashpage }) {
  // If allowedDomain is undefined or empty, use an empty string
  const [domains, setDomains] = useState(allowedDomain.length ? allowedDomain.join(', ') : '');

  // Handle updating the domains
  const handleUpdateDomains = async () => {
    const domainArray = domains.split(',').map(domain => domain.trim());  // Convert comma-separated string to array
    console.log("domainarray" , domainArray)
    const instanceData = {
      instance_auth_type: 2,  // Always keep this as 2
      allowed_domains: domainArray
    };

    try {
        
      // Make PATCH request using updateInstance function
      const response = await updateInstance(hashpage, instanceData);
    //   console.log('Instance updated successfully:', response);
      window.showToast('success','Domains updated successfully ');
      // Add any success feedback, like a toast notification
    } catch (error) {
        window.showToast('error','Domains updating request failed');
      console.error('Error updating instance:', error);
      // Handle error feedback, like a toast notification
    }
  };

  return (
    <div style={{ width:'98%', display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Org Domains that can login"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder='for xyz@gov.in and pqr@iitkgp.in, Just give comma separated domains like gov.in,iitkgp.in'
        size='small'
        sx={{ flex: 1 }}
        value={domains}
        onChange={(e) => setDomains(e.target.value)}  // Update the state when user types
      />
      <Button 
        variant="contained" 
        color="primary" 
        size="small"
        style={{ margin: '0 10px' }}
        onClick={handleUpdateDomains}  // Trigger the update when button is clicked
      >
        Update
      </Button>
    </div>
  );
}
