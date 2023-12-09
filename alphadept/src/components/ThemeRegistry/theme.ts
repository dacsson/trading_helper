import { Roboto } from 'next/font/google';
import { Open_Sans} from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const sans = Open_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light'
  },
  typography: {
    fontFamily: sans.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#696969',
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: '#05B958',
              color: '#fсfсfс',
              padding: "13px",
              paddingLeft: "35px",
              paddingRight: "35px",
              borderRadius: 15
            }),
        }),
        contained: {
          "&:hover": {
            backgroundColor: "#655EBC"
          }
        },
        text: {
          color: "#2B2B2B",
        }
      },
    },
  },
});

export default theme;
