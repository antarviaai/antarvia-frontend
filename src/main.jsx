// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// --- NEW IMPORTS FOR MATERIAL-UI ---
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// --- A simple, default theme for Antarviahub ---
// We can customize this a lot more later
const theme = createTheme({
  palette: {
    mode: 'dark', // <-- THIS IS THE BIG CHANGE
    primary: {
      main: '#0A84FF', // Blue from your header
    },
    secondary: {
      main: '#6366F1', // Purple from your dashboard
    },
    background: {
      default: '#121212', // Standard dark mode background
      paper: '#1e1e1e',   // Slightly lighter for cards, sidebars, tiles
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* --- ADDED THEME PROVIDERS HERE --- */}
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* This fixes browser inconsistencies */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);