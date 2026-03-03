import { Box } from "@mui/material";

export default function TrailerSection() {
  return (
    <Box component="section" sx={{ py: { xs: 4, sm: 6 } }}>
      {/* 16:9 Ratio-Container. Für 9:16: pt auf 177.78% ändern */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 960,           // optional: maximale Breite
          mx: "auto",
          pt: "56.25%",            // 16:9 = 9/16*100 -> 56.25%
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "black",
          boxShadow: 3,
        }}
      >
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          {/* Passe die Quellen an (public/ oder import) */}
          <source src="/Side.mp4" type="video/mp4" />
          {/* Optional zusätzlich:
          <source src="/videos/party-animals-trailer.webm" type="video/webm" />
          */}
        </Box>
      </Box>
    </Box>
  );
}
