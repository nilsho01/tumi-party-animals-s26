import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "./theme";
import Home from "./pages/Home";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          backgroundColor: "#0b1220",
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(255,46,189,0.12), transparent 40%)," +
            "radial-gradient(ellipse at 80% 20%, rgba(39,245,159,0.10), transparent 40%)," +
            "radial-gradient(ellipse at 50% 90%, rgba(75,139,255,0.15), transparent 40%)",
          backgroundAttachment: "fixed",
        },
        ".glow": { boxShadow: "0 0 30px rgba(75,139,255,0.35)" },
        ".glass": {
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
        },
        ".particle": {
          position: "absolute",
          width: 8, height: 8, borderRadius: 9999,
          filter: "blur(1px)",
          opacity: 0.6,
          animation: "drift 22s linear infinite",
        },
        "@keyframes drift": {
          "0%": { transform: "translateY(0) translateX(0)" },
          "100%": { transform: "translateY(-120vh) translateX(20vw)" },
        },
      }} />
      <Topbar />
      <Home />
      <Footer />
    </ThemeProvider>
  );
}
