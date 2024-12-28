import { createTheme } from '@mui/material/styles';

const dark = false;

const theme = createTheme({
  palette: {
    mode: dark ? 'dark' : 'light',
    primary: {
      main: dark ? '#61F39F' : '#003B6F',
    },
    secondary: {
      main: dark ? '#01111F' : '#F4F7F9',
    },
    warning: {
      main: '#FFECB3',
      contrastText: '#000',
    },
    success: {
      main: '#61f39f',
      contrastText: '#000',
      dark: '#2e7d32',
    },
    error: {
      main: '#F36161',
    },
    background: {
      default: dark ? '#05192B' : '#ffffff',
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: dark ? '#05192B' : '#ffffff',
          border: `1px solid ${dark ? '#003B6F' : '#EBEBEB'}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation24: {
          background: dark ? '#05192B' : '#ffffff',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: { border: 'unset' },
        virtualScrollerContent: { backgroundColor: dark && '#01111F' },
        selectedRowCount: {
          color: dark ? '#D3D3D3' : '#003B6F',
          fontWeight: 'bold',
        },
        columnHeaderTitle: {
          color: dark ? '#D3D3D3' : '#003B6F',
          fontWeight: 'bold',
        },
        iconSeparator: { display: 'none' },
        columnHeader: { '&:focus-within': { outline: 'none' } },
        cell: { '&:focus-within': { outline: 'none' } },
        row: {
          color: dark ? '#83A6C3' : '#05192B',
          '&.Mui-selected': { backgroundColor: dark ? '#12304A' : '#D0E7FC' },
          '&.Mui-selected:hover': {
            backgroundColor: dark ? '#08233B' : '#EAF5FF',
          },
          '&:hover': { backgroundColor: dark ? '#08233B' : '#EAF5FF' },
        },
        footerContainer: {
          backgroundColor: dark ? '#003B6F' : '#D3D3D3',
          borderRadius: '0 0 0.5rem 0.5rem',
        },
        columnHeaders: {
          backgroundColor: dark ? '#003B6F' : '#D3D3D3',
          borderRadius: '0.5rem 0.5rem 0 0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.active-true': {
            color: '#003B6F',
            background: '#61F39F',
            '& .MuiChip-icon': {
              color: '#003B6F',
            },
          },
          '&.active-false': {
            background: 'transparent',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&.active': {
            border: '1px solid #61F39F',
            backgroundColor: dark ? '#12304A' : '#F4F7F9',
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiPopover: {
      defaultProps: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '&.MuiAlert-arrow': {
            position: 'relative',
          },
          '&.MuiAlert-arrow:after': {
            content: '""',
            left: 30,
            bottom: 0,
            backgroundColor: 'currentColor',
            position: 'absolute',
            width: '1em',
            height: '0.71em',
            marginBottom: '-0.71em',
            transform: 'rotate(45deg)',
            transformOrigin: '100% 0',
          },
        },
        filledInfo: {
          backgroundColor: '#E5EBFD',
          color: '#003b6f',
          '&.MuiAlert-arrow:after': {
            backgroundColor: '#E5EBFD',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#61F39F',
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
  },
});

export default theme;
