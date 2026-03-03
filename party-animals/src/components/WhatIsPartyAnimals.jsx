import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import MotionFadeIn from "./MotionFadeIn";

// Hinweis: Lege das Video unter public/videos/party-animals-vertical.mp4
// oder importiere es aus /src/assets:
// import verticalVideo from "../assets/party-animals-vertical.mp4";

const WhatIsPartyAnimals = () => {
  return (
    <MotionFadeIn>
      {/* Äußeres Layout: links Content (8/12), rechts Video (4/12). Auf xs/sm untereinander */}
      <Grid container spacing={4} alignItems="center">
        {/* Linke Seite: Überschrift + Intro + Bild/Text-Content */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                A pre-planned programme with lots of events
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: 16, sm: 18 },
                  lineHeight: 1.6,
                }}
              >
                Join the adventure with Party Animals, where 120 exchange students (in six teams) embark on an
                exhilarating 10-day journey through Munich and beyond! Experience the vibrant student scene of Munich!
                Belt out your favourite tunes at our{" "}
                <Typography component="span" variant="inherit" sx={{ color: "secondary.main", fontWeight: 600, fontSize: "inherit" }}>
                  karaoke night
                </Typography>{" "}
                and venture for an unforgettable{" "}
                <Typography component="span" variant="inherit" sx={{ color: "secondary.main", fontWeight: 600, fontSize: "inherit" }}>
                  opening party
                </Typography>
                . Explore Munich in a{" "}
                <Typography component="span" variant="inherit" sx={{ color: "secondary.main", fontWeight: 600, fontSize: "inherit" }}>
                  City Rally
                </Typography>
                . Build up a great team during{" "}
                <Typography component="span" variant="inherit" sx={{ color: "secondary.main", fontWeight: 600, fontSize: "inherit" }}>
                  Group Days and Sport Day
                </Typography>{" "}
                and engage in friendly rivalry as you compete in various team challenges, leading up to the epic finale:
                the legendary{" "}
                <Typography component="span" variant="inherit" sx={{ color: "secondary.main", fontWeight: 600, fontSize: "inherit" }}>
                  "Beerlympics
                </Typography>
                . With your team, claim the coveted title of the ultimate "Party Animals" and revel in the glory and
                bragging rights that accompany such a prestigious honour.{" "}
                <Typography component="span" variant="inherit" sx={{ color: "text.primary", fontWeight: 800, fontSize: "inherit" }}>
                  Get ready for the adventure of a lifetime!
                </Typography>
              </Typography>
            </Stack>

            {/* Optional: Bild/Teaser-Card-Bereich */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: 20, sm: 22 } }}>
                Bonding with your teammates
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}>
                Our program jump-starts your social life in Munich from day one. Moving to a new country can feel
                overwhelming. Thats where we come in, making it easier to meet new people and connect.
              </Typography>

              <Typography sx={{ color: "text.secondary", mt: 1.5, fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}>
                In a carefully curated group af 20 like-minded participants supported by 4 dedicated tutors, we’ll build
                a strong sense of community throughout the seven-day Party Animals journey. You’ll spend most of your
                time with your group, but there will sill be plenty of chances to mingle with others.
              </Typography>

              <Typography sx={{ color: "text.secondary", mt: 1.5, fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}>
                In this supportive setting, you’ll form your first circle of friends in Munich. Dive into Party Animals
                and let the friendships begin!
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {/* Rechte Seite: EIN hochkantiges Video (9:16). Fällt bei xs/sm unter den Text */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              // 9:16 Aspect Ratio: 16/9 * 100 = 177.78% padding-top -> invertiert genutzt
              pt: "177.78%",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              bgcolor: "black",
            }}
          >
            <Box
              component="video"
              src="Side.mp4" // falls importiert
              // Wenn aus public: Pfad relativ zur Domain
              // z. B. /videos/party-animals-vertical.mp4
              // Wichtig: Datei ohne Leerzeichen benennen
              autoPlay
              muted
              loop
              playsInline
              controls
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              {/* Fallback-Quellen mit Typangabe */}
              <source src="/Side.mp4" type="video/mp4" />
              {/* Optional zusätzliches Format
              <source src="/videos/party-animals-vertical.webm" type="video/webm" />
              */}
            </Box>
          </Box>

          {/* Optional: kleiner Hinweistext */}
          {/* <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Highlights from Party Animals
          </Typography> */}
        </Grid>
      </Grid>
    </MotionFadeIn>
  );
};

export default WhatIsPartyAnimals;
