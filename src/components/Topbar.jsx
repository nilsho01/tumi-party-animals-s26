import { AppBar, Toolbar, Button, Stack, Typography, Container, Link, Box } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import GroupsIcon from "@mui/icons-material/Groups";

export default function Topbar() {
    return (
        <AppBar position="sticky" color="transparent" elevation={0}
            sx={{ backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                        <CelebrationIcon sx={{ color: "#ff2ebd" }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Party Animals</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>· April 2025</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{
                                ml: 2,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: "rgba(46,110,242,0.12)",
                                border: "1px solid rgba(46,110,242,0.35)",
                            }}
                        >
                            <Box
                                component="img"
                                src="/esn.png"
                                alt="ESN Logo"
                                loading="lazy"
                                sx={{ width: 20, height: 20, objectFit: "contain", display: "block" }}
                            />
                            <Link
                                href="https://www.instagram.com/tumi.esn/"
                                color="primary"
                                underline="hover"
                                sx={{ fontWeight: 700 }}
                            >
                                ESN TUMi
                            </Link>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Button color="inherit" href="#schedule">Schedule</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://forms.cloud.microsoft/e/yiyscNTv9W"
                            sx={{ borderRadius: 2, px: 2.5, boxShadow: "0 0 24px rgba(46,110,242,0.35)" }}
                        >
                            Apply now
                        </Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
