import { Box, Container, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid rgba(255,255,255,0.08)", mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1} sx={{ color: "text.secondary" }}>
          <Typography variant="body2">
            Questions? <Link href="mailto:party.animals@esn-tumi.de" color="primary">party.animals@esn-tumi.de</Link>
            {" · "}Instagram:{" "}
            <Link href="https://www.instagram.com/tumi.esn/" color="primary">@tumi.esn</Link>
            {" · "}More events:{" "}
            <Link href="https://tumi.esn.world/events" color="primary">tumi.esn.world/events</Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
