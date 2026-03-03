import { Box, Container, Typography } from "@mui/material";

export default function Section({ id, title, subtitle, children, sx }) {
  return (
    <Box id={id} sx={{ py: { xs: 6, md: 10 }, borderBottom: "1px solid rgba(255,255,255,0.08)", ...sx }}>
      <Container maxWidth="lg">
        {title && <Typography variant="h4" sx={{ fontWeight: 800 }}>{title}</Typography>}
        {subtitle && (
          <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
            {subtitle}
          </Typography>
        )}
        <Box sx={{ mt: 4 }}>{children}</Box>
      </Container>
    </Box>
  );
}
