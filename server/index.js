require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app  = express();
app.use(cors());
app.use(express.json());

// ── JSON file-based "database" ───────────────────────
const DB_FILE = path.join(__dirname, 'db.json');

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return {
      results: [],
      settings: {
        eventName: 'PA Sports Day 2026',
        eventDate: '',
        adminPw:   'admin2025',
        refPw:     'ref2025',
        towBonus:  { '1': 4, '2': 3, '3': 2, '4': 1 },
      },
      towBracket:    { sf1t1: 'gg', sf1t2: 'tt', sf2t1: 'pp', sf2t2: 'pi' },
      towResults:    [],
      towPlacements: [],
      refs:          [],
    };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ── Auth ─────────────────────────────────────────────
app.post('/api/auth', (req, res) => {
  const { type, password } = req.body;
  const db = readDB();
  if (type === 'admin' && password === db.settings.adminPw) return res.json({ ok: true });
  if (type === 'ref'   && password === db.settings.refPw)   return res.json({ ok: true });
  res.status(401).json({ ok: false, error: 'Wrong password.' });
});

// ── Settings ─────────────────────────────────────────
app.get('/api/settings', (req, res) => {
  const { eventName, eventDate } = readDB().settings;
  res.json({ eventName, eventDate });
});

app.get('/api/settings/full', (req, res) => {
  res.json(readDB().settings);
});

app.put('/api/settings', (req, res) => {
  const db = readDB();
  const allowed = ['eventName', 'eventDate', 'adminPw', 'refPw', 'towBonus'];
  allowed.forEach(k => { if (req.body[k] !== undefined) db.settings[k] = req.body[k]; });
  writeDB(db);
  res.json(db.settings);
});

// ── Results ───────────────────────────────────────────
app.get('/api/results', (req, res) => {
  res.json(readDB().results);
});

app.put('/api/results/:gameId', (req, res) => {
  const gameId = parseInt(req.params.gameId);
  const { s1, s2, refTeam, tutor } = req.body;
  const db = readDB();
  db.results = db.results.filter(r => r.gameId !== gameId);
  const entry = { gameId, s1, s2, refTeam, tutor, ts: new Date().toISOString() };
  db.results.push(entry);
  writeDB(db);
  res.json(entry);
});

app.delete('/api/results/:gameId', (req, res) => {
  const gameId = parseInt(req.params.gameId);
  const db = readDB();
  db.results = db.results.filter(r => r.gameId !== gameId);
  writeDB(db);
  res.json({ ok: true });
});

// ── Tug of War ────────────────────────────────────────
app.get('/api/tow', (req, res) => {
  const db = readDB();
  res.json({ bracket: db.towBracket, results: db.towResults, placements: db.towPlacements });
});

app.put('/api/tow/bracket', (req, res) => {
  const db = readDB();
  ['sf1t1','sf1t2','sf2t1','sf2t2'].forEach(k => {
    if (req.body[k]) db.towBracket[k] = req.body[k];
  });
  writeDB(db);
  res.json(db.towBracket);
});

app.put('/api/tow/results/:matchId', (req, res) => {
  const { matchId } = req.params;
  const { winner } = req.body;
  const db = readDB();
  db.towResults = db.towResults.filter(r => r.matchId !== matchId);
  const entry = { matchId, winner };
  db.towResults.push(entry);
  writeDB(db);
  res.json(entry);
});

app.put('/api/tow/placements/:teamId', (req, res) => {
  const { teamId } = req.params;
  const { place }  = req.body;
  const db = readDB();
  db.towPlacements = db.towPlacements.filter(p => p.teamId !== teamId && p.place !== place);
  if (place) {
    const entry = { teamId, place };
    db.towPlacements.push(entry);
    writeDB(db);
    return res.json(entry);
  }
  writeDB(db);
  res.json({ ok: true });
});

// ── Referees ──────────────────────────────────────────
app.get('/api/refs', (req, res) => {
  res.json(readDB().refs);
});

app.put('/api/refs/:slotId', (req, res) => {
  const { slotId } = req.params;
  const { name }   = req.body;
  const db = readDB();
  db.refs = db.refs.filter(r => r.slotId !== slotId);
  const entry = { slotId, name };
  db.refs.push(entry);
  writeDB(db);
  res.json(entry);
});

// ── Start ─────────────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${DB_FILE}`);
});
