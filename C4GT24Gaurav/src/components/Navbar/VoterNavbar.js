import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
// import ToggleColorMode from './ToggleColorMode';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import logo from "../Theme/a2i-logo-lottie.gif"

const oldlogoStyle = {
  width: '90px',
  height: 'auto',
  cursor: 'pointer',
  // border:'solid 2px black',
  marginBottom:'28px',
  marginLeft:'5px',

};




function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(!!sessionStorage.getItem('token'));
  console.log(loggedIn , "here")


 

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setLoggedIn(false);
    window.location.href = "/creator-home";
  };

 
  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };
  const theme = useTheme();
  const logoStyle = {
    width: '69px',
    height: 'auto',
    cursor: 'pointer',
    // border:'solid 2px black',
    marginBottom:'10px',
    // marginLeft:'-100px',
    marginRight:'40px',
    backgroundColor:theme.palette.firstColor.main,
   
    // border:'solid 2px grey'
  };
  console.log(theme)
  return (
    <div >
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          // bgcolor: 'transparent',
          backgroundImage: 'none',
          backgroundColor: theme.palette.firstColor.main,
          mt: 0,
          pt:2,
          mb:1,
          width:1,
          height: 0.1,
          // border:'solid 2px blue',
          display:'flex',
        //   justifyContent:'center',
        alignItems:'center',

          pb:2
        }}
      >
  
        
          
            
              <img
                src={
                  'https://a2i.gov.bd/wp-content/uploads/2022/08/a2i-Logo-100px.png'
                }

                // style={{backgroundColor:'green'}}
                // src={logo}
                onClick={()=>{
                        window.location.href = "/creator-home";
                      }}
                style={logoStyle}
                href="/creator-home"
                alt="logo of sitemark"
              />
      
      </AppBar>
    </div>
  );
}

// Navbar.propTypes = {
//   mode: PropTypes.oneOf(['dark', 'light']).isRequired,
//   toggleColorMode: PropTypes.func.isRequired,
// };

export default Navbar;
