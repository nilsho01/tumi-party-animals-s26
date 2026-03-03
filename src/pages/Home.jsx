import { Box, Grid, Typography, Button, Card, CardMedia, CardContent, Stack, Tooltip, Chip, Link, Divider, Avatar } from "@mui/material";
import MotionFadeIn from "../components/MotionFadeIn";
import Section from "../components/Section";
import Badge from "../components/Badge";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import FestivalIcon from "@mui/icons-material/Festival";
import WeeklySchedule from "../components/WeeklySchedule";
import HeroVideo from "../components/HeroVideo";
import IntroSection from "../components/IntroSection";
import WhatIsPartyAnimals from "../components/WhatIsPartyAnimals";
import TutorsSection from "../components/TutorSection";
import CostsSection from "../components/CostSection";
import SignUpSection from "../components/SignUpSection";
import InfoTilesSection from "../components/InfoTitleSection";
import TrailerSection from "../components/TrailerSection";
import ESNSection from "../components/ESNSection";

export default function Home() {
  return (
    // Startet unter der Topbar: 64px (xs) / 72px (md)
    <Box component="main" sx={{ position: "relative"}}>
      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "fixed",
            left: `${(i * 7 + 10) % 100}vw`,
            top: `${(i * 19 + 14) % 100}vh`,
            bgcolor: i % 3 === 0 ? "#ff2ebd" : i % 3 === 1 ? "#27f59f" : "#4b8bff",
            width: 8,
            height: 8,
            borderRadius: 9999,
            filter: "blur(1px)",
            opacity: 0.6,
            animation: "drift 22s linear infinite",
            animationDelay: `${i * 0.7}s`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Video-Hero mit verbessertem Text-Layout und Fade */}
      <HeroVideo />

      {/* Intro unterhalb des Videos */}
      <IntroSection />

      

      {/* What is Party Animals */}
      <Section id="what" title="What is Party Animals?">
        <WhatIsPartyAnimals />
      </Section>

      {/* Prospective Schedule */}
      <Section id="schedule" title="Prospective 7-Day Schedule" subtitle="Hover over events for details and images.">
        <WeeklySchedule />
      </Section>

      <Section id="tutors" title="Who are the tutors?">
        <TutorsSection />
      </Section>

      <Section id="costs" title="Costs">
        <CostsSection />
      </Section>

      <Section id="info" title="Any thing else to consider?">
        <InfoTilesSection />
        </Section>

      <Section id="signup" title="Sign-up">
        <SignUpSection />
      </Section>

      <TrailerSection />


      <ESNSection />
    </Box>
  );
}
