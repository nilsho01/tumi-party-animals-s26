import { Box, Button, Link, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function SignUpSection() {
  return (
    <Box>
      <Stack spacing={2}>
        {/* Deadline + CTA inline, ohne Kachel */}
        <Typography variant="body1">
          ⌛ Deadline: March 15 — Central European Time (UTC +2).{" "}
        </Typography>

        <Button
                variant="contained"
                color="primary"
                href="https://forms.cloud.microsoft/e/yiyscNTv9W"
                sx={{ px: 3, width: "200px" }}
              >
                Sign up now
              </Button>

        {/* Hinweistext */}
        <Typography sx={{ color: "text.primary" }}>
          Signing up will not guarantee a spot in the program. We use an algorithm to select groups that fit well
          together. Show your personality when you sign up so the algorithm can find the best group for you!
        </Typography>

        {/* Payment */}
        <Typography variant="h6" sx={{ fontWeight: 800, mt: 2 }}>
          Payment
        </Typography>

        <Stack spacing={1}>
          <StepLine
            number="1"
            title="Register for payment"
            body={
              <>
                Follow the link in the email to register for payment.{" "}
                <b>You will only have a limited amount of time to do so!</b> We only unlock people selected as participants
                (those who got the email). Use the same name and email as in your sign‑up form.
              </>
            }
          />
          <StepLine
            number="2"
            title="Wait for manual unlock"
            body={
              <>
                After verification we <b>manually</b> unlock you for payment. You will receive a second email — from that
                moment you have <b>24 hours to complete the payment</b> via the link from the first email. Check your inbox
                regularly!
              </>
            }
          />
        </Stack>

        {/* Wichtig-Hinweise als normaler Textblock */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            Important
          </Typography>
          <ul style={{ margin: 4, paddingLeft: 20 }}>
            <li>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                If you miss a deadline, your spot goes to someone on the waiting list.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Haven't received an email after signing up? You're on our waiting list. We’ll notify you if spots open up.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Please remember: all organizers and tutors are student volunteers — be understanding and respectful.
              </Typography>
            </li>
          </ul>
        </Box>
      </Stack>
    </Box>
  );
}

/* Kleine Hilfskomponente für schlanke Step-Zeilen */
function StepLine({ number, title, body }) {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Typography
        component="span"
        sx={{
          fontWeight: 800,
          color: "text.primary",
          minWidth: 24,
        }}
      >
        {number}.
      </Typography>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.25 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {body}
        </Typography>
      </Box>
    </Box>
  );
}
