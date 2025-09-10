// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from '@mui/x-data-grid/themeAugmentation';


const theme = createTheme({
  components: {
    MuiPickersSectionList: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "var(--hover-color)",
            color: "var(--text-primary-color)",
          },
          "&.Mui-selected": {
            backgroundColor: "var(--dark-grey-border)",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "var(--dark-grey-border)",
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: "inherit",
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "var(--text-primary-color)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          border: '1.5px solid var(--dark-grey-border)',
          backgroundColor: "black",
          backgroundImage: "var(--background-image)",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "var(--dark-grey-border)",
          },
        },
      },
    },

    // For variant filled
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
          borderRadius: 6,
          "&:hover": {
            backgroundColor: "red",
          },
          "&.Mui-focused": {
            backgroundColor: "#444",
          },
        },
        input: {
          color: "red",
        },
      },
    },

    // For variant outline
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--dark-grey-border)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--dark-grey-border)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--blue-color)",
          },
        },
        input: {
          color: "white",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-focused": {
            color: "white",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "white",
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: "rgb(148, 160, 184)",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
  // </StrictMode>,
);
