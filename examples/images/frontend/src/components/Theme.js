import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FD5750',
    },
    secondary: {
      main: '#818181',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'black',
          minHeight: '100vh',
          padding: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          background: '#4caf50',
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: `1px solid #222222`,
        },
        input: {
          padding: '8px 10px',
          fontSize: 12,

          '&::placeholder': {
            color: '#818181',
            fontWeight: 500,
          },
        },
        notchedOutline: {
          border: 'none',
        },
      },
    },
  },
});
