import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Link, Stack, Typography } from "@mui/material";
import MotionFadeIn from "./MotionFadeIn";
import Section from "./Section";

// Beispiel: Pfade anpassen
// Logo: /assets/esn-logo.png (oder import esnLogo from "...")
// Bild: /assets/esn-hero.jpg
const ESNSection = () => {
  return (
    <Section
      id="esn"
      title="Powered by ESN TUMi"
      subtitle="Erasmus Student Network at TUM — by students, for students."
      sx={{ borderBottom: "none", pt: { xs: 4, sm: 6 }, pb: { xs: 4, sm: 6 } }}
    >
      <MotionFadeIn>
        <Grid container spacing={4} alignItems="center">
          {/* Linke Spalte: Logo, Text, Buttons */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2.5}>
              {/* Logo + Name */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  component="img"
                  src="/esn.png"
                  alt="ESN TUMi Logo"
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: "contain",
                    borderRadius: 1,
                    bgcolor: (t) =>
                      t.palette.mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.04)",
                    p: 1,
                  }}
                />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    ESN TUMi
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}
                  >
                    By students, for students. We support international students at TUM with events,
                    trips and a vibrant community.
                  </Typography>
                </Box>
              </Stack>

              {/* Kurzer Teaser */}
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}
              >
                Follow us for updates, discover upcoming events, or reach out to the Party Animals team directly.
              </Typography>

              {/* Buttons */}
              <Stack direction="row" spacing={1.5} flexWrap="wrap">
                <Button
                  component={Link}
                  href="https://www.instagram.com/tumi.esn/"
                  target="_blank"
                  rel="noopener"
                  variant="outlined"
                >
                  Instagram
                </Button>
                <Button
                  component={Link}
                  href="https://tumi.esn.world/events"
                  target="_blank"
                  rel="noopener"
                  variant="outlined"
                >
                  Events
                </Button>
                <Button
                  component={Link}
                  href="mailto:party.animals@esn-tumi.de"
                  variant="contained"
                  color="primary"
                >
                  Write us an email
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* Rechte Spalte: Bildkarte */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: (t) =>
                  `0 10px 30px rgba(0,0,0,${t.palette.mode === "dark" ? 0.35 : 0.12})`,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: (t) =>
                  t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "background.paper",
              }}
            >
              <CardActionArea
                component={Link}
                href="https://tumi.esn.world/"
                target="_blank"
                rel="noopener"
                sx={{ display: "block" }}
              >
                <CardMedia
                  component="img"
                  image="/tumi-grass.jpg"
                  alt="ESN community"
                  sx={{ height: { xs: 220, sm: 280, md: 320 }, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
                    Discover ESN TUMi
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}
                  >
                    Check us out!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </MotionFadeIn>
    </Section>
  );
};

export default ESNSection;
