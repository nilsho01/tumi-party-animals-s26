import { Box, Typography, Card, CardContent, Tooltip, Chip, CardMedia } from "@mui/material";
import MotionFadeIn from "./MotionFadeIn";

// Icons
import ExploreIcon from "@mui/icons-material/Explore";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import CelebrationIcon from "@mui/icons-material/Celebration";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MovieIcon from "@mui/icons-material/Movie";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SportsBarIcon from "@mui/icons-material/SportsBar";

const days = [
  { key: "Mon", label: "Monday 06.04." },
  { key: "Tue", label: "Tuesday 07.04." },
  { key: "Wed", label: "Wednesday 08.04." },
  { key: "Thu", label: "Thursday 09.04." },
  { key: "Fri", label: "Friday 10.04." },
  { key: "Sat", label: "Saturday 11.04." },
  { key: "Sun", label: "Sunday 12.04." },
];

const slots = [
  { key: "Morning", label: "Morning", range: "08:00–12:00" },
  { key: "Afternoon", label: "Afternoon", range: "12:00–18:00" },
  { key: "Evening", label: "Evening", range: "18:00–22:00" },
  { key: "Night", label: "Night", range: "22:00–late" },
];

// Type mapping with color, icon and card background tint
const TYPE = {
  KICKOFF:        { color: "secondary", icon: <CelebrationIcon />,       bg: "#8c9eff" },
  WELCOME:        { color: "primary",   icon: <EmojiPeopleIcon />,       bg: "#90caf9" },
  GROCERY_COOK_GROUP:{ color: "success",icon: <LocalGroceryStoreIcon />, bg: "#a5d6a7" },
  SPORTS_DAY:     { color: "primary",   icon: <SportsMartialArtsIcon />, bg: "#81d4fa" },
  BEERLYMPICS:    { color: "warning",   icon: <EmojiEventsIcon />,       bg: "#ffcc80" },
  KIOSK_CRAWL:    { color: "secondary", icon: <SportsBarIcon />,         bg: "#b39ddb" },
  KARAO_POTLUCK:  { color: "secondary", icon: <RestaurantIcon />,        bg: "#f48fb1" },
  FLAG_FLUNKY:    { color: "secondary", icon: <FlagCircleIcon />,        bg: "#ce93d8" },
  TU_FILM:        { color: "primary",   icon: <MovieIcon />,             bg: "#80cbc4" },
  PUB_CRAWL:      { color: "primary",   icon: <NightlifeIcon />,         bg: "#9575cd" },
  CITY_RALLY:     { color: "secondary", icon: <ExploreIcon />,           bg: "#90caf9" },
  CLOSING:        { color: "primary",   icon: <CelebrationIcon />,       bg: "#aed581" },
};

// Stock images (Unsplash)
const IMG = {
  kickoff: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
  welcome: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  groceries: "https://images.unsplash.com/photo-1514517220036-098f5c07f5d1?q=80&w=1600&auto=format&fit=crop",
  cooking: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop",
  group: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
  sports: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1600&auto=format&fit=crop",
  beerlympics: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop",
  kiosk: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1600&auto=format&fit=crop",
  karaoke: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1600&auto=format&fit=crop",
  film: "https://images.unsplash.com/photo-1517106630245-e0814b0f7e8f?q=80&w=1600&auto=format&fit=crop",
  pubcrawl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop",
  cityrally: "https://images.unsplash.com/photo-1465420961937-e0eba4dda244?q=80&w=1600&auto=format&fit=crop",
  closing: "https://images.unsplash.com/photo-1532634896-26909d0d3c67?q=80&w=1600&auto=format&fit=crop",
};

// Events per your plan (with row span across time slots)
const events = [
  // Monday 06.04.
  { day: 0, start: 1, span: 1, title: "Kick-off", type: TYPE.KICKOFF, img: undefined, details: "Welcome Event. Meet yout teammates and your tutors. Learn about the program and get your team shirts." },
  { day: 0, start: 2, span: 1, title: "Ice breakers, Flag customising & Flunkyball", type: TYPE.FLAG_FLUNKY, img: undefined, details: "Get to know your team mates, create your team flag, and play Flunkyball." },
  { day: 0, start: 3, span: 1, title: "PA Kickoff Party", type: TYPE.PUB_CRAWL, img: undefined, details: "Dance, meet, and vibe together with the other teams." },

  // Tuesday 07.04.
  { day: 1, start: 1, span: 1, title: "Welcome Event", type: TYPE.WELCOME, img: undefined, details: "Official welcome Event from the Global Office." },
  { day: 1, start: 2, span: 1, title: "Kiosk Crawl", type: TYPE.KIOSK_CRAWL, img: undefined, details: "get to know the best kiosks around the University and try the famous different Munich beers." },
  { day: 1, start: 3, span: 1, title: "TU Film", type: TYPE.TU_FILM, img: undefined, details: "Watch a movie at Campus at der tu film, our own student cinema on campus." },

  // Wednesday 08.04.
  { day: 2, start: 0, span: 3, title: "Groceries + Cooking time", type: TYPE.GROCERY_COOK_GROUP, img: undefined, details: "Here you have time for yourself. Cook a famous dish from you home country for the potluck in the evening." },
  { day: 2, start: 3, span: 1, title: "Potluck + Karaoke (C2)", type: TYPE.KARAO_POTLUCK, img: undefined, details: "Start trying all the delicious dishes from all around the world and sing along to your favorite songs at our own campus bar in Garching!" },

  // Thursday 09.04.
  { day: 3, start: 1, span: 2, title: "Sports Day", type: TYPE.SPORTS_DAY, img: undefined, details: "Outdoor games like Volleyball, Spikeball and more with friendly rivalry." },

  // Friday 10.04.
  { day: 4, start: 1, span: 2, title: "Beerlympics", type: TYPE.BEERLYMPICS, img: undefined, details: "Compete for in our main Event. Experience friendly rivalry for the ultimate title of Party Animalsvin games like Flunkyball, Flipcup and Crate run!" },

  // Saturday 11.04.
  { day: 5, start: 0, span: 3, title: "Group Time", type: TYPE.GROCERY_COOK_GROUP, img: undefined, details: "You and your Tutors have the free choice what you want to do today!" },
  { day: 5, start: 3, span: 1, title: "Pub Crawl", type: TYPE.PUB_CRAWL, img: undefined, details: "Get to know some Bars at one of Munichs bar districts, Müncher Freiheit." },

  // Sunday 12.04.
  { day: 6, start: 1, span: 2, title: "City Rally", type: TYPE.CITY_RALLY, img: undefined, details: "Scavenger hunt across the city and win the last points to get the ultimate Party Animals title." },
  { day: 6, start: 3, span: 1, title: "Closing Ceremony + chill at Pinawiese", type: TYPE.CLOSING, img: undefined, details: "Wrap-up ceremony and chill at the beautiful Pinawiese." },
];

// Helpers
const CELL_H = 120; // fixed row height for perfect alignment

function byCell(day, row) {
  return events.filter(e => e.day === day && e.start === row);
}

export default function WeeklySchedule() {
  return (
    <MotionFadeIn>
      <Box sx={{ overflowX: "auto" }}>
        {/* Table-like CSS Grid */}
        <Box
          sx={{
            minWidth: 1100,
            display: "grid",
            gridTemplateColumns: `200px repeat(${days.length}, 1fr)`,
            gridTemplateRows: `56px repeat(${slots.length}, ${CELL_H}px)`,
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 2,
            overflow: "hidden",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          {/* Header: Time */}
          <Box
            sx={{
              gridColumn: "1 / 2",
              gridRow: "1 / 2",
              display: "flex",
              alignItems: "center",
              px: 2,
              fontWeight: 800,
              borderRight: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            Time
          </Box>

          {/* Header: Days */}
          {days.map((d, i) => (
            <Box
              key={d.key}
              sx={{
                gridColumn: `${i + 2} / ${i + 3}`,
                gridRow: "1 / 2",
                display: "flex",
                alignItems: "center",
                px: 2,
                fontWeight: 800,
                borderRight: i < days.length - 1 ? "1px solid rgba(255,255,255,0.14)" : "none",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              {d.label}
            </Box>
          ))}

          {/* Left time labels */}
          {slots.map((s, r) => (
            <Box
              key={s.key}
              sx={{
                gridColumn: "1 / 2",
                gridRow: `${r + 2} / ${r + 3}`,
                borderTop: "1px solid rgba(255,255,255,0.14)",
                borderRight: "1px solid rgba(255,255,255,0.14)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 2,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{s.label}</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>{s.range}</Typography>
            </Box>
          ))}

          {/* Cells + Events */}
          {slots.map((s, r) =>
            days.map((d, c) => (
              <Box
                key={`${r}-${c}`}
                sx={{
                  gridColumn: `${c + 2} / ${c + 3}`,
                  gridRow: `${r + 2} / ${r + 3}`,
                  borderTop: "1px solid rgba(255,255,255,0.14)",
                  borderRight: c < days.length - 1 ? "1px solid rgba(255,255,255,0.14)" : "none",
                  position: "relative",
                }}
              >
                {/* Empty cell placeholder keeps consistent height */}
                <Box sx={{ height: "100%", p: 1 }} />

                {/* Events starting in this cell */}
                {byCell(c, r).map((ev, idx) => (
                  <Tooltip
                    key={idx}
                    arrow
                    title={
                      <Box sx={{ maxWidth: 300 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{ev.title}</Typography>
                        {ev.details && (
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>{ev.details}</Typography>
                        )}
                        {ev.img && (
                          <CardMedia
                            component="img"
                            image={ev.img}
                            alt={ev.title}
                            sx={{ mt: 1, borderRadius: 1, height: 120, objectFit: "cover" }}
                          />
                        )}
                      </Box>
                    }
                  >
                    <Card
                      sx={{
                        position: "absolute",
                        left: 8,
                        right: 8,
                        top: 8,
                        height: `calc(${CELL_H * ev.span}px - 16px)`,
                        // colored card background based on type
                        background: ev.type?.bg
                          ? `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.18)), ${ev.type.bg}`
                          : "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                        border: "1px solid",
                        borderColor: ev.type?.bg ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.22)",
                        boxShadow: "0 6px 18px rgba(0,0,0,.25)",
                        color: ev.type?.bg ? "rgba(0,0,0,0.9)" : "inherit",
                        transition: "transform .2s ease, box-shadow .2s ease",
                        "&:hover": { transform: "translateY(-2px)", boxShadow: "0 10px 28px rgba(0,0,0,0.35)" },
                      }}
                    >
                      <CardContent sx={{ py: 1, px: 1.25 }}>
                        <Chip
                          icon={ev.type?.icon ?? <ExploreIcon />}
                          label={ev.title}
                          color={ev.type?.color ?? "default"}
                          variant="outlined"
                          sx={{
                            fontWeight: 700,
                            borderColor: "rgba(0,0,0,0.25)",
                            backgroundColor: "rgba(255,255,255,0.7)",
                            "& .MuiChip-label": { color: "rgba(0,0,0,0.9)" },
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Tooltip>
                ))}
              </Box>
            ))
          )}
        </Box>
      </Box>
      <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
        Prospective plan — final schedule and locations will be confirmed closer to the start.
      </Typography>
    </MotionFadeIn>
  );
}
