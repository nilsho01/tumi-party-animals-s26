import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GAMES, TEAMS, SPORTS } from '../data/constants';
import { useApp } from '../context/AppContext';
import { TeamBadge, TeamBadgeShort, SportBadge } from '../components/TeamBadge';
import ScoreModal from '../components/ScoreModal';

// ── Login screen ─────────────────────────────────────
function RefLogin() {
  const { loginRef } = useApp();
  const [pw, setPw]         = useState('');
  const [name, setName]     = useState('');
  const [teamId, setTeamId] = useState('');
  const [error, setError]   = useState('');
  const [busy, setBusy]     = useState(false);

  const submit = async () => {
    if (!teamId)      return setError('Please select your team.');
    if (!name.trim()) return setError('Please enter your name.');
    if (!pw)          return setError('Please enter the referee password.');
    setBusy(true);
    const ok = await loginRef(pw, name.trim(), teamId).catch(() => false);
    if (!ok) { setError('Wrong password. Ask an organiser for the referee password.'); setBusy(false); }
  };

  return (
    <div className="page">
      <div className="ref-login-wrap">
        <div className="card">
          <div className="text-center mb-6">
            <div style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>🟡</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '.3rem' }}>Referee Login</h1>
            <p className="text-muted text-sm">Identify yourself and enter the referee password to access the score entry dashboard.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Your Team</label>
            <select className="form-input" value={teamId} onChange={e => setTeamId(e.target.value)} autoFocus>
              <option value="">– select team –</option>
              {Object.values(TEAMS).map(t => (
                <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Ms. Smith"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Referee Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter password..."
              value={pw}
              onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
            />
          </div>

          <button className="btn btn-primary w-full" onClick={submit} disabled={busy}>
            {busy ? 'Checking…' : 'Log in as Referee'}
          </button>

          <div className="mt-4 text-center text-xs text-muted">
            Are you an admin? <Link to="/admin" style={{ color: 'var(--primary)', fontWeight: 600 }}>Admin login →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Ref Dashboard ─────────────────────────────────────
function RefDashboard() {
  const { logoutRef, getResult, refName, refTeamId } = useApp();
  const [editGame, setEditGame] = useState(null);
  const refTeam = TEAMS[refTeamId];

  return (
    <div className="page">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="page-title">Referee Dashboard</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            Logged in as{' '}
            {refTeam && (
              <span className="tbadge" style={{
                background: refTeam.color + '20',
                color: refTeam.color,
                border: `1px solid ${refTeam.color}40`,
                fontSize: '.8rem',
                marginRight: '.25rem',
              }}>
                {refTeam.emoji} {refTeam.name}
              </span>
            )}
            {refName && <strong>{refName}</strong>}
          </p>
        </div>
        <button className="btn btn-ghost" onClick={logoutRef}>Log out</button>
      </div>

      <div className="alert alert-info mb-6">
        Click <strong>"Enter Score"</strong> on any game to submit the result. No password needed — you're already logged in.
      </div>

      {[1, 2, 3, 4, 5, 6, 7, 8].map(r => {
        const games = GAMES.filter(g => g.round === r);
        const g0 = games[0];
        return (
          <div key={r} className="mb-6">
            {r === 4 && (
              <div className="lunch-break mb-4">🍔 Lunch Break · 13:00 – 14:00</div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <div className="round-num">{r}</div>
              <span className="font-bold">{g0.time} – {g0.timeEnd}</span>
              <span className="text-muted text-sm">Round {r}</span>
            </div>
            <div className="flex flex-col gap-2">
              {games.map(g => {
                const result = getResult(g.id);
                const refT = TEAMS[g.refTeam];
                return (
                  <div key={g.id} className={`ref-game-row${result ? ' has-score' : ''}`}>
                    {/* Sport + field */}
                    <div style={{ minWidth: 110 }}>
                      <SportBadge sport={g.sport} />
                      <div className="text-xs text-muted mt-1">{g.field}</div>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center gap-2 flex-wrap" style={{ flex: 1 }}>
                      <TeamBadgeShort id={g.t1} />
                      <span className="text-muted text-sm font-bold">vs</span>
                      <TeamBadgeShort id={g.t2} />
                    </div>

                    {/* Score */}
                    <div style={{ minWidth: 60, textAlign: 'center' }}>
                      {result
                        ? <span className="font-black" style={{ fontSize: '1.15rem' }}>{result.s1}:{result.s2}</span>
                        : <span className="text-muted text-sm">–:–</span>
                      }
                    </div>

                    {/* Assigned ref team */}
                    <div className="text-xs text-muted" style={{ minWidth: 120 }}>
                      <span style={{ opacity: .6 }}>Ref: </span>
                      <span className="tbadge" style={{
                        background: refT?.color + '20',
                        color: refT?.color,
                        border: `1px solid ${refT?.color}40`,
                        fontSize: '.7rem',
                        padding: '.15rem .5rem',
                      }}>
                        {refT?.emoji} {refT?.short}
                      </span>
                    </div>

                    {/* Action */}
                    <button className="btn btn-warning btn-sm" onClick={() => setEditGame(g)}>
                      {result ? 'Edit' : 'Enter Score'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* TOW note */}
      <div className="card" style={{ borderColor: '#d8b4fe', background: '#faf5ff' }}>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '1.75rem' }}>🪢</span>
          <div>
            <div className="font-bold">Tug of War · 16:30 – 17:10</div>
            <div className="text-sm text-muted">
              SF1 16:30 · SF2 16:40 · 3rd Place 16:50 · Final 17:00 — Results are entered by the admin.
            </div>
          </div>
          <Link to="/tow" className="btn btn-outline btn-sm ml-auto">View bracket →</Link>
        </div>
      </div>

      {editGame && <ScoreModal game={editGame} onClose={() => setEditGame(null)} />}
    </div>
  );
}

// ── Admin Ref View (full schedule table) ─────────────
function AdminRefView() {
  const { getRef, saveRef } = useApp();

  const EXTRA_SLOTS = [
    { id: 'setup',      label: 'Setup',             time: '11:00–11:30', sport: null },
    { id: 'tow_sf1',   label: 'TOW – Semi-Final 1', time: '16:30–16:40', sport: 'tugofwar' },
    { id: 'tow_sf2',   label: 'TOW – Semi-Final 2', time: '16:40–16:50', sport: 'tugofwar' },
    { id: 'tow_third', label: 'TOW – 3rd Place',    time: '16:50–17:00', sport: 'tugofwar' },
    { id: 'tow_final', label: 'TOW – Final',         time: '17:00–17:10', sport: 'tugofwar' },
    { id: 'cleanup',   label: 'Cleanup',             time: '17:10–17:30', sport: null },
  ];

  const gameSlots = GAMES.map(g => ({
    id:    String(g.id),
    label: `Round ${g.round} – ${g.field}`,
    time:  `${g.time}–${g.timeEnd}`,
    sport: g.sport,
    game:  g,
  }));

  const allSlots = [EXTRA_SLOTS[0], ...gameSlots, ...EXTRA_SLOTS.slice(1)];

  return (
    <div className="page">
      <h1 className="page-title">Referee Schedule</h1>
      <p className="page-sub">All shifts — assign names below. Referee password is distributed separately.</p>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Shift</th>
                <th>Sport</th>
                <th>Teams</th>
                <th>Assigned Ref Team</th>
                <th>Person (optional)</th>
              </tr>
            </thead>
            <tbody>
              {allSlots.map(slot => {
                const assigned = getRef(slot.id);
                const refT = slot.game ? TEAMS[slot.game.refTeam] : null;
                return (
                  <tr key={slot.id}>
                    <td className="font-bold text-sm" style={{ whiteSpace: 'nowrap' }}>{slot.time}</td>
                    <td className="font-bold">{slot.label}</td>
                    <td>
                      {slot.sport
                        ? <SportBadge sport={slot.sport} />
                        : <span className="text-muted">–</span>}
                    </td>
                    <td>
                      {slot.game
                        ? <div className="flex items-center gap-2 flex-wrap">
                            <TeamBadgeShort id={slot.game.t1} />
                            <span className="text-muted text-xs">vs</span>
                            <TeamBadgeShort id={slot.game.t2} />
                          </div>
                        : <span className="text-muted text-sm">–</span>}
                    </td>
                    <td>
                      {refT
                        ? <span className="tbadge" style={{
                            background: refT.color + '20',
                            color: refT.color,
                            border: `1px solid ${refT.color}40`,
                          }}>
                            {refT.emoji} {refT.name}
                          </span>
                        : <span className="text-muted">–</span>}
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        style={{ minWidth: 160 }}
                        placeholder="Name..."
                        defaultValue={assigned}
                        onBlur={e => saveRef(slot.id, e.target.value.trim())}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-3 mt-6">
        <div className="stat-card">
          <div className="stat-val">{GAMES.length}</div>
          <div className="stat-lbl">Total Games</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">{GAMES.length + EXTRA_SLOTS.length}</div>
          <div className="stat-lbl">Total Shifts</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">3</div>
          <div className="stat-lbl">Refs per Team</div>
        </div>
      </div>
    </div>
  );
}

// ── Entry point ───────────────────────────────────────
export default function Referees() {
  const { isAdmin, isRef } = useApp();
  if (isAdmin) return <AdminRefView />;
  if (isRef)   return <RefDashboard />;
  return <RefLogin />;
}