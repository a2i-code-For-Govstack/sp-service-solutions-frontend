// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#ff0000', // Red
    // },
    // secondary: {
    //   main: '#00ff00', // Green
    // },
    firstColor: {
        main: '#CEE5FD', // Red
      },
      secondColor: {
        main: '#CEE5FD', // Green
      },
  },
  typography: {
    fontFamily: 'Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
        //   '--primary-color': '#ff0011',
        //   '--secondary-color': '#00ff00',
        '--first-color':  '#CEE5FD',
        '--second-color': '#CEE5FD',
        },
        // body: {
        //   backgroundColor: '#f4f4f4',
        //   margin: 0,
        //   padding: 0,
        //   boxSizing: 'border-box',
        // },
      },
    },
  },
});

export default theme;
