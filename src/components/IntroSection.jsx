import { Box, Button, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import MotionFadeIn from "./MotionFadeIn";
import Badge from "./Badge";

const heroImages = [
  "/Big2.png",
  "/Big1.jpg",
    "/Big3.jpeg",
];

const IntroSection = () => {
  return (
    <Box sx={{ position: "relative", overflow: "hidden", zIndex: 1 }}>
        <Box sx={{ maxWidth: "lg", mx: "auto", px: 2, py: { xs: 6, md: 8 } }}>
          <MotionFadeIn>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Badge label="ESN TUMi" color="pink" />
              <Badge label="Apr 6–12, 2026" color="green" />
              <Badge label="6 Teams · 120 Students" color="yellow" />
            </Stack>

            <Typography sx={{ mt: 1.5, maxWidth: 760, color: "text.secondary", fontSize: 18 }}>
              The first weeks of your exchange are key: between paperwork and settling in, you’ll dive into a new culture and meet people who could become lifelong friends. You’ll share experiences and explore together. Want to start this adventure with a group of like‑minded people?
            </Typography>
            <Typography sx={{ mt: 1.5, maxWidth: 760, color: "text.primary", fontSize: 18, fontWeight: 600 }}>
              Party Animals is a 10-day Introduction Program for new incoming international students organised by ESN TUMi from April 6th to 12th. There are 6 groups of 20 international students each, who are accompanied by 4 tutors during their introduction to Munich’s student (night) life.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                href="https://forms.cloud.microsoft/e/yiyscNTv9W"
                sx={{ px: 3 }}
              >
                Sign up now
              </Button>
              <Button variant="outlined" color="inherit" href="#what">
                Learn more
              </Button>
            </Stack>
          </MotionFadeIn>

          {/* Image strip */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {heroImages.map((src, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <MotionFadeIn delay={0.1 * idx}>
                  <Card
                    sx={{
                      overflow: "hidden",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CardMedia component="img" image={src} alt="Party scene" sx={{ height: 420, objectFit: "cover" }} />
                  </Card>
                </MotionFadeIn>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
  );
}

export default IntroSection;