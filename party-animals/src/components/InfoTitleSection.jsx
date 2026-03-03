import { Box, Grid, Stack, Typography } from "@mui/material";

export default function InfoTilesSection() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Tile>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: 18, sm: 20 } }}>
              Target audience
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}>
              📌 This program is intended for <b>international (exchange) students</b> who have <b>very recently arrived</b> in Munich and will attend university at campuses in and around Munich. 
              If you study in Straubing or have lived in Munich for more than one semester, this might not be ideal for you.
            </Typography>
          </Tile>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" sx={{ mt: 1, color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}>
            If you e.g. attend Straubing Campus or have been living in Munich for more than a semester, attending this program might not be ideal for you. We want to prioritise those, who are still looking to establish friendships and connections with others.
            The events are also mostly located in Munich and can run from early morning until late night. We want to ensure, that traveling to and from these events in a timely fashion is possible, especially at those times of day.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} pt={2}>
          <Tile>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: 18, sm: 20 } }}>
              Code of Conduct
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}>
              ❗ Any rude or antisocial behaviour towards tutors or other participants can lead to sanctions up to full expulsion from the remaining program without refund.
            </Typography>
          </Tile>
        </Grid>

        <Grid item xs={12} md={4}>
          <Tile>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: 18, sm: 20 } }}>
              Alcohol
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}>
              🍻 There will be chances to drink, but <b>never an obligation</b>. Alcohol‑free alternatives will always be available.
            </Typography>
          </Tile>
        </Grid>
      </Grid>
    </Box>
  );
}

/* Reusable tile */
function Tile({ children }) {
  return (
    <Stack
      spacing={1}
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: (t) =>
          t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        boxShadow: (t) =>
          `0 1px 2px rgba(0,0,0,${t.palette.mode === "dark" ? 0.28 : 0.08})`,
      }}
    >
      {children}
    </Stack>
  );
}
