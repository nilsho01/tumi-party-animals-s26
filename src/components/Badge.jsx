import { Chip } from "@mui/material";

export default function Badge({ label, color = "pink" }) {
  const map = {
    pink: { bg: "rgba(255,46,189,0.15)", color: "#ff2ebd", border: "rgba(255,46,189,0.4)" },
    green: { bg: "rgba(39,245,159,0.15)", color: "#27f59f", border: "rgba(39,245,159,0.4)" },
    yellow: { bg: "rgba(255,228,94,0.15)", color: "#ffe45e", border: "rgba(255,228,94,0.4)" },
    blue: { bg: "rgba(46,110,242,0.2)", color: "#d9ecff", border: "rgba(46,110,242,0.4)" },
  };
  const s = map[color] ?? map.pink;
  return (
    <Chip
      label={label}
      variant="outlined"
      sx={{
        bgcolor: s.bg, color: s.color, borderColor: s.border,
        borderRadius: 999, fontWeight: 600
      }}
    />
  );
}
