import { useState } from 'react';
import { GAMES, TEAMS, calcStandings } from '../data/constants';
import { useApp } from '../context/AppContext';
import { TeamBadge, TeamBadgeShort, SportBadge } from '../components/TeamBadge';
import ScoreModal from '../components/ScoreModal';

function nowRound() {
  const now  = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const slots = [
    { round: 1, from: 11*60+30, to: 12*60    },
    { round: 2, from: 12*60,    to: 12*60+30 },
    { round: 3, from: 12*60+30, to: 13*60    },
    { round: 4, from: 14*60,    to: 14*60+30 },
    { round: 5, from: 14*60+30, to: 15*60    },
    { round: 6, from: 15*60,    to: 15*60+30 },
    { round: 7, from: 15*60+30, to: 16*60    },
    { round: 8, from: 16*60,    to: 16*60+30 },
  ];
  return slots.find(s => mins >= s.from && mins < s.to)?.round || null;
}

// ── Login screen ───────────────────────────────────────
function AdminLogin() {
  const { login } = useApp();
  const [pw, setPw]       = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy]   = useState(false);

  const submit = async () => {
    if (!pw) return setError('Please enter a password.');
    setBusy(true);
    const ok = await login(pw).catch(() => false);
    if (!ok) { setError('Wrong password.'); setBusy(false); }
  };

  return (
    <div className="page" style={{ maxWidth: 380, margin: '4rem auto' }}>
      <div className="card text-center">
        <div style={{ fontSize: '2.75rem', marginBottom: '.875rem' }}>⚙️</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '.3rem' }}>Admin Login</h1>
        <p className="text-muted text-sm mb-6">Organisers only</p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-group text-left">
          <label className="form-label">Admin Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Enter password..."
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            autoFocus
          />
        </div>
        <button className="btn btn-primary w-full" onClick={submit} disabled={busy}>
          {busy ? 'Checking…' : 'Log in'}
        </button>
      </div>
    </div>
  );
}

// ── Main admin panel ───────────────────────────────────
function AdminPanel() {
  const {
    results, towData, settings,
    logout, clearResult, saveSettings,
  } = useApp();

  const DEFAULT_BONUS = { 1: 4, 2: 3, 3: 2, 4: 1 };
  const currentBonus = settings.towBonus
    ? { 1: settings.towBonus[1] ?? settings.towBonus['1'] ?? 4,
        2: settings.towBonus[2] ?? settings.towBonus['2'] ?? 3,
        3: settings.towBonus[3] ?? settings.towBonus['3'] ?? 2,
        4: settings.towBonus[4] ?? settings.towBonus['4'] ?? 1 }
    : DEFAULT_BONUS;

  const [editGame, setEditGame]         = useState(null);
  const [settingsForm, setSettingsForm] = useState({
    eventName: settings.eventName || '',
    eventDate: settings.eventDate || '',
    adminPw:   settings.adminPw   || '',
    refPw:     settings.refPw     || '',
    towBonus:  currentBonus,
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const standings  = calcStandings(results, towData.placements, currentBonus);
  const curRound   = nowRound();
  const played     = results.length;
  const medals     = ['🥇', '🥈', '🥉', '4th'];
  const rankClass  = i => i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-o';

  const handleSaveSettings = async () => {
    await saveSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>Full control over results and settings</p>
        </div>
        <button className="btn btn-ghost" onClick={logout}>Log out</button>
      </div>

      {/* Live banner */}
      {curRound && (
        <div className="alert alert-warn mb-6">
          🔴 <strong>Round {curRound} is live right now!</strong> — {GAMES.filter(g => g.round === curRound).length} games running
        </div>
      )}

      {/* Quick stats */}
      <div className="grid-4 mb-6">
        <div className="stat-card">
          <div className="stat-val">{played}</div>
          <div className="stat-lbl">Results Entered</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">{GAMES.length - played}</div>
          <div className="stat-lbl">Remaining</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">{curRound ?? '–'}</div>
          <div className="stat-lbl">Current Round</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">{towData.placements?.length ?? 0}/4</div>
          <div className="stat-lbl">TOW Placements</div>
        </div>
      </div>

      {/* ── Overall Standings ── */}
      <div className="card mb-6">
        <div className="section-hdr mb-4">
          <div className="section-title">🏆 Overall Standings</div>
          <span className="text-xs text-muted">Visible to admins only</span>
        </div>
        <div className="table-wrap">
          <table className="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>Goals</th>
                <th>GD</th>
                <th>Pts</th>
                <th>TOW</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((t, i) => (
                <tr key={t.id}>
                  <td>
                    <span className={`rank-badge ${rankClass(i)}`}>
                      {i < 3 ? medals[i] : i + 1}
                    </span>
                  </td>
                  <td><TeamBadge id={t.id} /></td>
                  <td>{t.played}</td>
                  <td className="res-win font-bold">{t.w}</td>
                  <td className="res-draw">{t.d}</td>
                  <td className="res-loss">{t.l}</td>
                  <td className="text-muted">{t.gf}:{t.ga}</td>
                  <td className={t.gf - t.ga >= 0 ? 'res-win' : 'res-loss'}>
                    {t.gf - t.ga > 0 ? '+' : ''}{t.gf - t.ga}
                  </td>
                  <td>{t.pts}</td>
                  <td style={{ color: '#d97706', fontWeight: 700 }}>+{t.towPts}</td>
                  <td className="font-black" style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>
                    {t.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── All Game Results ── */}
      <div className="card mb-6">
        <div className="section-title mb-4">All Game Results</div>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Rd.</th>
                <th>Time</th>
                <th>Sport</th>
                <th>Team 1</th>
                <th style={{ textAlign: 'center' }}>Score</th>
                <th>Team 2</th>
                <th>Ref Team</th>
                <th>Entered by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {GAMES.map(g => {
                const r    = results.find(r => r.gameId === g.id);
                const refT = TEAMS[g.refTeam];
                const isLive = curRound === g.round;
                return (
                  <tr key={g.id} style={isLive && !r ? { background: '#fefce8' } : undefined}>
                    <td className="font-bold">
                      {g.round}
                      {isLive && !r && (
                        <span style={{ marginLeft: '.3rem', fontSize: '.65rem', color: '#b45309', fontWeight: 700 }}>
                          🔴
                        </span>
                      )}
                    </td>
                    <td className="text-sm text-muted" style={{ whiteSpace: 'nowrap' }}>{g.time}</td>
                    <td><SportBadge sport={g.sport} /></td>
                    <td><TeamBadgeShort id={g.t1} /></td>
                    <td style={{ textAlign: 'center', fontWeight: 900, whiteSpace: 'nowrap' }}>
                      {r ? `${r.s1} : ${r.s2}` : <span className="text-muted">–:–</span>}
                    </td>
                    <td><TeamBadgeShort id={g.t2} /></td>
                    <td>
                      <span
                        className="tbadge"
                        style={{
                          background: refT.color + '20',
                          color: refT.color,
                          border: `1px solid ${refT.color}40`,
                          fontSize: '.7rem',
                        }}
                      >
                        {refT.emoji} {refT.short}
                      </span>
                    </td>
                    <td className="text-xs text-muted">{r?.tutor || '–'}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn btn-warning btn-sm" onClick={() => setEditGame(g)}>✏️</button>
                      {r && (
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ marginLeft: '.25rem' }}
                          onClick={() => confirm('Delete this result?') && clearResult(g.id)}
                        >🗑️</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Settings ── */}
      <div className="card mb-6">
        <div className="section-title mb-4">Settings</div>
        {settingsSaved && <div className="alert alert-success">✓ Saved!</div>}
        <div className="grid-2 gap-4">
          <div className="form-group">
            <label className="form-label">Event Name</label>
            <input
              className="form-input"
              value={settingsForm.eventName}
              onChange={e => setSettingsForm(p => ({ ...p, eventName: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Event Date</label>
            <input
              className="form-input"
              type="date"
              value={settingsForm.eventDate}
              onChange={e => setSettingsForm(p => ({ ...p, eventDate: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Referee Password</label>
            <input
              className="form-input"
              type="text"
              value={settingsForm.refPw}
              onChange={e => setSettingsForm(p => ({ ...p, refPw: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Admin Password</label>
            <input
              className="form-input"
              type="text"
              value={settingsForm.adminPw}
              onChange={e => setSettingsForm(p => ({ ...p, adminPw: e.target.value }))}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-2" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </div>

      {/* ── TOW Bonus Points ── */}
      <div className="card mb-6">
        <div className="section-title mb-1">🪢 Tug of War — Placement Points</div>
        <p className="text-muted text-sm mb-4">
          TOW bracket starts at <strong>16:30</strong> · SF1 16:30 · SF2 16:40 · 3rd Place 16:50 · Final 17:00
        </p>
        <div className="grid-4 gap-4">
          {[1, 2, 3, 4].map(place => (
            <div key={place} className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">{['🥇','🥈','🥉','4th'][place-1]} {place}. Place</label>
              <input
                type="number"
                min="0"
                max="20"
                className="form-input"
                value={settingsForm.towBonus?.[place] ?? DEFAULT_BONUS[place]}
                onChange={e => setSettingsForm(p => ({
                  ...p,
                  towBonus: { ...(p.towBonus || DEFAULT_BONUS), [place]: +e.target.value }
                }))}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-3">Click "Save Settings" above to apply changes.</p>
      </div>

      {/* ── Danger Zone ── */}
      <div className="card mb-6" style={{ borderColor: '#fecaca', background: '#fff5f5' }}>
        <div className="section-title mb-1" style={{ color: 'var(--danger)' }}>Danger Zone</div>
        <p className="text-muted text-sm mb-4">All results will be permanently deleted and cannot be recovered.</p>
        <button
          className="btn btn-danger"
          onClick={async () => {
            if (!confirm('WARNING: Delete all results? This cannot be undone.')) return;
            await Promise.all(GAMES.map(g => clearResult(g.id)));
          }}
        >
          Reset All Results
        </button>
      </div>

      {editGame && <ScoreModal game={editGame} onClose={() => setEditGame(null)} />}
    </div>
  );
}

export default function Admin() {
  const { isAdmin } = useApp();
  return isAdmin ? <AdminPanel /> : <AdminLogin />;
}