import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ToastNotification from './components/Common/ToastNotification';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/Theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastNotification />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import theme from './theme';

// ReactDOM.render(
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <App />
//   </ThemeProvider>,
//   document.getElementById('root')
// );
