import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#2e6ef2" },
    secondary: { main: "#ff2ebd" },
    success: { main: "#27f59f" },
    warning: { main: "#ffe45e" },
    background: {
      default: "#0b1220",
      paper: "rgba(15, 23, 42, 0.7)",
    },
    text: {
      primary: "#E6EAF2",
      secondary: "#A9B1C6",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: -0.5 },
    h2: { fontWeight: 800, letterSpacing: -0.3 },
    h3: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 14 },
});

export default theme;
