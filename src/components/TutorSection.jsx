import { Box, Grid, Stack, Typography } from "@mui/material";

export default function TutorsSection() {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", fontSize: { xs: 16, sm: 18 }, lineHeight: 1.6 }}
      >
        Your group will be supported by a team of{" "}
        <Typography
          component="span"
          variant="inherit"
          sx={{ fontWeight: 800, color: "text.primary", fontSize: "inherit" }}
        >
          four tutors.
        </Typography>{" "}
        Experienced ESN TUMi tutors will lead the way, joined by motivated new tutors (ex
        participants). With this diverse and enthusiastic team, you’ll have all the support you
        need to make the most of Party Animals and make new friends along the way!
      </Typography>
    </Box>
  );
}
