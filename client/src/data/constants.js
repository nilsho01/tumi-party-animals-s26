export const TEAMS = {
  gg: { id: 'gg', name: 'Green Goats',       short: 'GG',  emoji: '🐐', color: '#16a34a' },
  tt: { id: 'tt', name: 'Turquoise Turtles', short: 'TT',  emoji: '🐢', color: '#0891b2' },
  pp: { id: 'pp', name: 'Purple Panthers',   short: 'PP',  emoji: '🐆', color: '#9333ea' },
  pi: { id: 'pi', name: 'Pink Penguins',     short: 'PPi', emoji: '🐧', color: '#db2777' },
};

export const SPORTS = {
  volleyball: { name: 'Volleyball',       icon: '🏐', badge: 'sbadge-volleyball' },
  frisbee:    { name: 'Ultimate Frisbee', icon: '🥏', badge: 'sbadge-frisbee'    },
  dodgeball:  { name: 'Dodgeball',        icon: '🎯', badge: 'sbadge-dodgeball'  },
  tugofwar:   { name: 'Tug of War',       icon: '🪢', badge: 'sbadge-tugofwar'   },
};

// One field per sport — different sports per round.
// refTeam = non-playing team assigned to referee that game (balanced: 3 games each)
export const GAMES = [
  // Round 1 · 11:30–12:00
  { id: 1,  round: 1, time: '11:30', timeEnd: '12:00', sport: 'frisbee',    t1: 'pp', t2: 'gg', field: 'Field B', refTeam: 'pi' },
  { id: 2,  round: 1, time: '11:30', timeEnd: '12:00', sport: 'volleyball', t1: 'pi', t2: 'tt', field: 'Field A', refTeam: 'gg' },
  // Round 2 · 12:00–12:30
  { id: 3,  round: 2, time: '12:00', timeEnd: '12:30', sport: 'dodgeball',  t1: 'pp', t2: 'tt', field: 'Field C', refTeam: 'pi' },
  { id: 4,  round: 2, time: '12:00', timeEnd: '12:30', sport: 'frisbee',    t1: 'pi', t2: 'gg', field: 'Field B', refTeam: 'tt' },
  // Round 3 · 12:30–13:00
  { id: 5,  round: 3, time: '12:30', timeEnd: '13:00', sport: 'dodgeball',  t1: 'pp', t2: 'gg', field: 'Field C', refTeam: 'tt' },
  { id: 6,  round: 3, time: '12:30', timeEnd: '13:00', sport: 'volleyball', t1: 'pi', t2: 'tt', field: 'Field A', refTeam: 'pp' },

  // — Lunch Break 13:00–14:00 —

  // Round 4 · 14:00–14:30
  { id: 7,  round: 4, time: '14:00', timeEnd: '14:30', sport: 'volleyball', t1: 'pp', t2: 'pi', field: 'Field A', refTeam: 'gg' },
  { id: 8,  round: 4, time: '14:00', timeEnd: '14:30', sport: 'frisbee',    t1: 'tt', t2: 'gg', field: 'Field B', refTeam: 'pi' },
  // Round 5 · 14:30–15:00
  { id: 9,  round: 5, time: '14:30', timeEnd: '15:00', sport: 'volleyball', t1: 'pp', t2: 'tt', field: 'Field A', refTeam: 'pi' },
  { id: 10, round: 5, time: '14:30', timeEnd: '15:00', sport: 'dodgeball',  t1: 'pi', t2: 'gg', field: 'Field C', refTeam: 'tt' },
  // Round 6 · 15:00–15:30
  { id: 11, round: 6, time: '15:00', timeEnd: '15:30', sport: 'frisbee',    t1: 'pp', t2: 'pi', field: 'Field B', refTeam: 'gg' },
  { id: 12, round: 6, time: '15:00', timeEnd: '15:30', sport: 'dodgeball',  t1: 'tt', t2: 'gg', field: 'Field C', refTeam: 'pp' },
  // Round 7 · 15:30–16:00
  { id: 13, round: 7, time: '15:30', timeEnd: '16:00', sport: 'volleyball', t1: 'pp', t2: 'gg', field: 'Field A', refTeam: 'pi' },
  { id: 14, round: 7, time: '15:30', timeEnd: '16:00', sport: 'frisbee',    t1: 'pi', t2: 'tt', field: 'Field B', refTeam: 'pp' },
  // Round 8 · 16:00–16:30
  { id: 15, round: 8, time: '16:00', timeEnd: '16:30', sport: 'dodgeball',  t1: 'pp', t2: 'pi', field: 'Field C', refTeam: 'tt' },
  { id: 16, round: 8, time: '16:00', timeEnd: '16:30', sport: 'volleyball', t1: 'tt', t2: 'gg', field: 'Field A', refTeam: 'pi' },
];

export const TOW_MATCHES = [
  { id: 'sf1',   label: 'Semi-Final 1', time: '16:30', timeEnd: '16:40' },
  { id: 'sf2',   label: 'Semi-Final 2', time: '16:40', timeEnd: '16:50' },
  { id: 'third', label: '3rd Place',    time: '16:50', timeEnd: '17:00' },
  { id: 'final', label: 'Final 🏆',     time: '17:00', timeEnd: '17:10' },
];

export function calcStandings(results, towPlacements = [], towBonus = { 1: 4, 2: 3, 3: 2, 4: 1 }) {
  const table = {};
  Object.keys(TEAMS).forEach(id => {
    table[id] = { id, played: 0, w: 0, d: 0, l: 0, pts: 0, gf: 0, ga: 0, towPts: 0 };
  });

  GAMES.forEach(g => {
    const r = results.find(r => r.gameId === g.id);
    if (!r || r.s1 == null || r.s2 == null) return;
    table[g.t1].played++; table[g.t2].played++;
    table[g.t1].gf += +r.s1; table[g.t1].ga += +r.s2;
    table[g.t2].gf += +r.s2; table[g.t2].ga += +r.s1;
    if (+r.s1 > +r.s2) {
      table[g.t1].w++; table[g.t2].l++; table[g.t1].pts += 2;
    } else if (+r.s2 > +r.s1) {
      table[g.t2].w++; table[g.t1].l++; table[g.t2].pts += 2;
    } else {
      table[g.t1].d++; table[g.t2].d++; table[g.t1].pts++; table[g.t2].pts++;
    }
  });

  towPlacements.forEach(p => {
    const bonus = towBonus[p.place] ?? towBonus[String(p.place)] ?? 0;
    if (table[p.teamId]) table[p.teamId].towPts = bonus;
  });

  return Object.values(table)
    .map(t => ({ ...t, total: t.pts + t.towPts }))
    .sort((a, b) => b.total - a.total || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf);
}
