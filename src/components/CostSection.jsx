import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import DirectionsTransitRoundedIcon from "@mui/icons-material/DirectionsTransitRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function CostsSection() {
  return (
    <Box>
      <Grid
        container
        spacing={3}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          bgcolor: (t) =>
            t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: (t) =>
            `0 6px 24px rgba(0,0,0,${t.palette.mode === "dark" ? 0.35 : 0.08})`,
        }}
      >
        {/* Header */}
        <Grid item xs={12}>
          <Stack spacing={1.25}>
            {/* Price badge */}
            <Chip
              icon={<EuroRoundedIcon />}
              label="The price for this event is 79€."
              color="default"
              sx={{
                alignSelf: "flex-start",
                fontWeight: 900,
                fontSize: { xs: "1.2rem", sm: "1.4rem" },
                px: 1,
                height: 44,
                borderRadius: 2,
                bgcolor: (t) =>
                  t.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
              }}
            />
          </Stack>
        </Grid>

        {/* What’s included */}
        <Grid item xs={12}>
          <Stack spacing={1.5}>
            <Feature
              icon={<LocalActivityRoundedIcon color="primary" />}
              title="Included"
            >
              Our package includes merchandise and entry to all planned events,
              including beverages for Flunkyball at the kickoff and Beerlympics.
            </Feature>

            <Feature
              icon={<DirectionsTransitRoundedIcon color="primary" />}
              title="Public transport tip"
            >
              Get your student Deutschland‑Ticket for 43€ per month. It covers
              local and regional transport (U‑Bahn, trams, buses, regional
              trains) — super useful during Party Animals.
            </Feature>
          </Stack>
        </Grid>

        {/* Not all-inclusive callout */}
        <Grid item xs={12}>
          <Callout
            icon={<WarningAmberRoundedIcon color="warning" />}
            title="Important: not all‑inclusive"
            bullets={[
              "Some events may involve extra expenses (e.g., drinks from the bar).",
              "Groups may choose optional activities (e.g., restaurants, bowling) that incur additional costs.",
              "We’ll spend time outside — plan for extra lunch costs or bring your own food.",
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

/* Building blocks (JS) */

function Feature({ icon, title, children }) {
  return (
    <Stack
      direction="row"
      spacing={1.75}
      sx={{
        p: 2.25,
        borderRadius: 2,
        bgcolor: (t) =>
          t.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <IconCircle>{icon}</IconCircle>
      <BoxText title={title}>{children}</BoxText>
    </Stack>
  );
}

function Callout({ icon, title, bullets }) {
  return (
    <Stack
      spacing={1.5}
      sx={{
        p: 2.25,
        borderRadius: 2,
        bgcolor: (t) =>
          t.palette.mode === "dark" ? "rgba(255,170,0,0.08)" : "rgba(255,170,0,0.10)",
        border: "1px solid",
        borderColor: (t) =>
          t.palette.mode === "dark" ? "rgba(255,170,0,0.30)" : "rgba(255,170,0,0.35)",
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <IconCircle>{icon}</IconCircle>
        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: 18, sm: 20 } }}>
          {title}
        </Typography>
      </Stack>
      <ul style={{ margin: 0, paddingLeft: 22 }}>
        {bullets.map((b) => (
          <li key={b}>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}
            >
              {b}
            </Typography>
          </li>
        ))}
      </ul>
    </Stack>
  );
}

function Tag({ children }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1,
        py: 0.6,
        borderRadius: 2,
        bgcolor: (t) =>
          t.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        border: "1px solid",
        borderColor: "divider",
        fontSize: 14, // up from 13
        fontWeight: 600,
      }}
    >
      <CheckCircleRoundedIcon fontSize="small" color="success" />
      {children}
    </Box>
  );
}

function IconCircle({ children }) {
  return (
    <Box
      sx={{
        width: 40, // up from 36
        height: 40, // up from 36
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        bgcolor: (t) =>
          t.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

function BoxText({ title, children }) {
  return (
    <Stack spacing={0.6}>
      <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: 18, sm: 20 } }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}
      >
        {children}
      </Typography>
    </Stack>
  );
}
