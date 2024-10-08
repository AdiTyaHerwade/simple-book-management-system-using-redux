import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
 
  typography: {
    fontFamily: "system-ui !important",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": "system-ui !important",
      },
    },
  },
  components: {
   
   
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          marginRight: "5px",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.0)",
          "& .MuiInputBase-input": {
            color: "black",
          },
        },
      },
    },
    MuiDateField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.0)",
          "& .MuiInputBase-input": {
            color: "white",
          },
        },
      },
    },
    MuiDateCalendar: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.0)",
          "& .MuiInputBase-input": {
            color: "white",
          },
        },
      },
    },
   
  },
  palette: {
    primary: {
      main: "#219ebc",
    },
    secondary: {
      main: "#90e0ef",
    },
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
  <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
