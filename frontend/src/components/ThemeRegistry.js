'use client';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// A new, modern dark theme inspired by wegic.ai
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A962FF', // Vibrant Purple
    },
    secondary: {
      main: '#EF6AAD', // Vibrant Pink
    },
    background: {
      default: '#030409', // Very dark blue/black
      paper: '#12131F',   // A slightly lighter dark blue for surfaces
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B8C4', // Lighter gray for better contrast
    },
    divider: 'rgba(170, 150, 255, 0.2)', // A faint purple divider
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: `var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    h4: {
      fontWeight: 700,
      fontSize: '2.2rem',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
        },
        contained: {
          boxShadow: '0 0 15px rgba(169, 98, 255, 0.3)',
          '&:hover': {
            boxShadow: '0 0 25px rgba(169, 98, 255, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          backgroundColor: 'rgba(18, 19, 31, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(170, 150, 255, 0.15)',
          '&:hover': {
            borderColor: 'rgba(170, 150, 255, 0.4)',
            transform: 'translateY(-3px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          padding: '1rem 0',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#12131F',
          border: '1px solid rgba(170, 150, 255, 0.2)',
          backgroundImage: 'none', // removes any potential gradients from theme
        },
      },
    },
    MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(170, 150, 255, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(170, 150, 255, 0.5)',
            },
          },
        },
      },
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 