// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";


const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#f064fa", // default background
          textTransform: "none", // optional: keeps normal casing
          "&:hover": {
            backgroundColor: "var(--hover-red-color)", // darker hover shade
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
            borderColor: "var(--hover-red-color)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--hover-red-color)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--hover-red-color)",
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
            color: "var(--hover-red-color)",
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
