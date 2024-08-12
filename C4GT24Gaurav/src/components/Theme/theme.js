// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#019444', // green important for main buttons on page also used by default in mui components 
    },
    secondary: {
      main: '#019444', // Green
    },
    firstColor: {
        main: '#019444', // green 
      },
      secondColor: {
        main: '#FFFFFF', //  white 
      },
  },
  typography: {
    fontFamily: 'Roboto',
    button: {
      fontFamily: 'Roboto',
      textTransform: 'none'
    }
  },
  
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
        //   '--primary-color': '#ff0011',
          // '--secondary-color': '#00ff00',
        '--first-color':  '#019444',
        '--second-color': '#FFFFFF',
        },
        body: {
          // backgroundColor: '#f4f4f4',
          // margin: 0,
          // padding: 0,
          // boxSizing: 'border-box',
          // color:'#FFFFFF'
        }
       
      },
    },
  },
});

export default theme;
