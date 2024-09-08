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
    marginLeft:'-100px',
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
          mb:0,
          width:1,
          // border:'solid 2px blue',
          pb:2
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              // bgcolor:
              //   theme.palette.mode === 'light'
              //     ? 'rgba(255, 255, 255, 0.4)'
              //     : 'rgba(0, 0, 0, 0.4)',
              bgcolor:'white',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
            //   border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
                // border: 'solid , 2px ,black'
              }}
            >
              <img
                src={
                  'https://a2i.gov.bd/wp-content/uploads/2022/08/a2i-Logo-100px.png'
                }

                // style={{backgroundColor:'green'}}
                // src={logo}
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                      color="secondary"
                      variant="outlined"
                      component="a"
                      onClick={handleBack}
                      
                    //   target="_blank"
                      sx={{ width: '100%' , marginRight: '6%' , 
                        fontWeight: 550, 
                     borderColor:theme.palette.secondColor.main }}
                    >
                      Back
                    </Button>
                    <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      onClick={()=>{
                        window.location.href = '/creator-home';
                      }}
                      // href='/creator-home'
                    //   target="_blank"
                      sx={{ width: '100%' ,   marginRight: '6%' , paddingLeft:'16%' , paddingRight:'16%' ,
                      
                      fontWeight: 550, 
                      borderColor:theme.palette.secondColor.main 
                      // fontSize: '0.8em', 
                       }}
                    >
                      Create
                    </Button>
                    {/* <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      href='/user-profile'
                    //   target="_blank"
                      sx={{ width: '100%'  , marginRight: '6%' }}
                    >
                      Vote
                    </Button> */}
                    <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      onClick={()=>{
                        window.location.href = '/forms';
                      }}
                      
                      // href='/forms'
                    //   target="_blank"
                      sx={{ width: '100%'  , marginRight: '6%' , paddingLeft:'16%' , paddingRight:'16%'  , 
                        fontWeight: 550, borderColor:theme.palette.secondColor.main }}
                    >
                      MyForms
                    </Button>
                    <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      // href='user-profile'
                      onClick={()=>{
                        window.location.href = '/user-profile';
                      }}
                    //   target="_blank"
                      sx={{ width: '100%' , marginRight: '6%' , paddingLeft:'16%' , paddingRight:'16%' , 
                        fontWeight: 550, borderColor:theme.palette.secondColor.main  }}
                    >
                      Profile
                    </Button>
               
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                // alignItems: 'center',
                // border:'solid 20px red'
              }}
            >
              {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}

              {loggedIn ? (
                <Button
                   color="secondary"
                  variant="text"
                  size="small"
                  onClick={handleLogout}
                >
                 Logout
                </Button>
              ) : (<>
                <Button
                   color="secondary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/creator-login"
                >
                  Sign in
                </Button>
                <Button
                       color="secondary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/creator-signup"
                    >
                      Sign up
                    </Button>
                </>
              )}
              
                 
                   
              
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                 color="secondary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    width: '70vw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    // flexGrow: 1,
                    display:'flex',
                    flexDirection:'column',
                    // alignItems:'center',
                    // justifyContent:'center'
                  }}
                >
                  
                  <MenuItem >
                    Profile
                  </MenuItem>
                 
                  <Divider />
                
                  <MenuItem>
                  {loggedIn ? (
                <Button
                   color="secondary"
                  variant="text"
                  size="small"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (<>
                <Button
                   color="secondary"
                  variant="text"
                  size="small"
                  component="a"
                  onClick={()=>{
                        window.location.href = "/creator-login";
                      }}
                  // href="/creator-login"
                >
                  Sign in
                </Button>
                <Button
                       color="secondary"
                  variant="text"
                  size="small"
                  component="a"
                  onClick={()=>{
                        window.location.href = "/creator-signup";
                      }}
                  // href="/creator-signup"
                    >
                      Sign up
                    </Button>
                </>
              )}
                    
              
                  
                  </MenuItem>
                  <Divider />
                  <Box style={{display:'flex', flexDirection:'column'}}>
              <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      onClick={handleBack}
                    //   target="_blank"
                      sx={{ width: '100%' , marginRight: '6%' }}
                    >
                      Back
                    </Button>
                    <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      onClick={()=>{
                        window.location.href = '/creator-home';
                      }}
                      // href='/creator-home'
                    //   target="_blank"
                      sx={{ width: '100%' ,   marginRight: '6%' }}
                    >
                      Create
                    </Button>
                    {/* <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      onClick={()=>{
                        window.location.href = "/user-profile";
                      }}
                      // href='user-profile'
                    //   target="_blank"
                      sx={{ width: '100%'  , marginRight: '6%' }}
                    >
                      Vote
                    </Button> */}
                    <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      onClick={()=>{
                        window.location.href = "/forms";
                      }}
                      // href='/forms'
                    //   target="_blank"
                      sx={{ width: '100%'  , marginRight: '6%' , paddingLeft:'16%' , paddingRight:'16%' }}
                    >
                      MyForms
                    </Button>
                    <Button
                       color="secondary"
                      variant="outlined"
                      component="a"
                      onClick={()=>{
                        window.location.href = '/user-profile';
                      }}
                      // href='user-profile'
                    //   target="_blank"
                      sx={{ width: '100%' , marginRight: '6%' }}
                    >
                      Profile
                    </Button>
               
              </Box>

                </Box>
                
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;
