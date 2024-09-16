import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatorLoginPage from './pages/Auth/CreatorLoginPage';
import CreatorSignupPage from './pages/Auth/CreatorSignupPage';
import OrgLoginPage from './pages/Auth/OrgLoginPage';
import SelectedUserLoginPage from './pages/Auth/SelectedUserLoginPage';

import Home from './pages/Home/Home';
// import Header from './components/Common/Header';
// import Footer from './components/Common/Footer';

import ActivatePage from './pages/Auth/ActivatePage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
// import UserHomePage from './pages/Landing/UserHomePage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar/Navbar';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ProfilePage from './pages/Profile/ProfilePage';
import ResetUsernamePage from './pages/Auth/ResetUsernamePage';
import Forms from './pages/FormAdmin/Forms'
import Create from './pages/FormAdmin/Create'
// import RenderReactiveForm from './components/FormAdmin/RenderReactiveForm';
import Fill from './pages/FormAdmin/Fill';
import FormTable from './components/FormAdmin/FormTable';
// import Voters from './pages/FormAdmin/Voters';
import ToastNotification from './components/Common/ToastNotification';
import theme from './components/Theme/theme';
import IndividualResponse from './components/Response/IndividualResponse';
// import ProcessGoogleAuth from './pages/Auth/ProcessGoogleAuth';
// import OAuthCallbackHandler from './pages/Auth/OAuthCallbackHandler';
// import ProcessGAuth from './pages/Auth/ProcessGAuth';
import PublicFormTable from './components/FormAdmin/PublicFormTable';
import ProcessGAuth from './pages/Auth/ProcessGAuth';
import BlankError from './components/Common/BlankError';
function App() {
  return (<>
    <ThemeProvider theme={theme}>
    <CssBaseline />
   
      <div style={{ 
        // border:'solid 2px red' , 
 
        marginBottom:'0px',
        height:'12.8vh'  , background: theme.palette.primary.main,opacity:1, 
        // top:'12.8vh' 
       }}>
      <Navbar />
      </div>
  
      </ThemeProvider>
   
    <Router>
      <div className="App">
        {/* <Header /> */}
        
        <Routes>
          <Route path="/creator-home" exact element={<Home/>} />
          <Route path="/creator-login" element={<CreatorLoginPage/>} />
          <Route path="/creator-signup" element={<CreatorSignupPage/>} />
          {/* <Route path="/org-login" element={<OrgLoginPage/>} /> */}
          <Route path="/selected-user-login" element={<ProcessGAuth />} />
         
         
          <Route path="/blank-error" element={<BlankError/>} />
          <Route path="/auth/activate" element={<ActivatePage/>} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage/>} />
          {/* <Route path="/user-home" element={<UserHomePage/>} /> */}
          <Route path="/user-profile" element={<ProfilePage />} />
          <Route path="/auth/reset-username" element={<ResetUsernamePage />} />
          <Route path="/forms" element={<FormTable/>} />
          <Route path="/live/instance/:hash" element={<Create />} />
          {/* <Route path="/" element={<OAuthCallbackHandler />} /> */}
          <Route path="/:hash" element={<Fill/>}/>
          <Route path="/" exact element={<Home/>} />
          {/* <Route path="/voters" element={<Voters/>}/> */}
          <Route path="/response/:hash/answers/:id" element={<IndividualResponse/>} />
          <Route path="/all-publicforms" element={<PublicFormTable />} />
          {/* <Route path="/:hash/google-oauth2" element={<ProcessGAuth />} /> */}
  
          {/* Add more routes as needed */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
   
    </>);
}

export default App;
