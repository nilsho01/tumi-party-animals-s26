import { Box, Typography, Button, Stack } from "@mui/material";
import MotionFadeIn from "./MotionFadeIn";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 2000); // 2s Delay
    return () => clearTimeout(t);
  }, []);

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Video startet ganz oben ohne jeglichen Offset */}
      <Box sx={{ position: "relative", height: { xs: 620, md: 920 } }}>
        {/* Video-Layer */}
        <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Lesbarkeits-Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.10) 85%)",
            }}
          />
          {/* Sanfter Fade zum Seitenhintergrund unten */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: { xs: 160, md: 240 },
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.70) 100%)",
              pointerEvents: "none",
            }}
          />
        </Box>

        {/* Text erscheint nach 5s mit softer Animation */}
        <Box sx={{ position: "absolute", inset: 0, zIndex: 2, px: { xs: 2, md: 4 } }}>
          <Stack
            spacing={2}
            sx={{
              position: "absolute",
              top: "55%",
              left: { xs: 16, md: 32 },
              maxWidth: 920,
              width: "calc(100% - 32px)",
              color: "#fff",
              textShadow: "0 2px 24px rgba(0,0,0,0.55)",
              opacity: showText ? 1 : 0,
              transformOrigin: "center",
              transition: "opacity 800ms ease-out, transform 800ms ease-out",
              transform: showText ? "translateY(-50%)" : "translateY(-45%)",
              pointerEvents: showText ? "auto" : "none",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.5px" }}
            >
              ESN TUMi • Party Animals
            </Typography>

            <Typography
              variant="h5"
              sx={{ color: "rgba(255,255,255,0.92)", lineHeight: 1.35 }}
            >
              April 2026 — Welcome week meets nightlife. Explore, bond, and celebrate across Munich.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Button variant="contained" color="secondary" size="large" href="#schedule">
                View Schedule
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="#tickets"
                sx={{
                  fontWeight: 700,
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(255,255,255,0.10)",
                  borderColor: "rgba(255,255,255,0.45)",
                  ":hover": { backgroundColor: "rgba(255,255,255,0.18)" },
                }}
              >
                Apply now!
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Weiterer Fade in den Seitenhintergrund */}
      <Box
        sx={{
          height: { xs: 48, md: 72 },
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.00) 100%)",
        }}
      />
    </Box>
  );
}
