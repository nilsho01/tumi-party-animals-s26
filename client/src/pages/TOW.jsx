import { useState } from 'react';
import { TEAMS } from '../data/constants';
import { useApp } from '../context/AppContext';
import { TeamBadge, TeamBadgeShort } from '../components/TeamBadge';

export default function TOW() {
  const { towData, isAdmin, saveTOWBracket, saveTOWResult, saveTOWPlacement } = useApp();
  const { bracket, results, placements } = towData;

  const [bracketEdit, setBracketEdit] = useState({ ...bracket });
  const [towModal, setTowModal]       = useState(null); // { matchId, t1, t2 }
  const [towWinner, setTowWinner]     = useState('');
  const [saving, setSaving]           = useState(false);

  const getWinner = (matchId) => results.find(r => r.matchId === matchId)?.winner;
  const getPlace  = (teamId)  => placements.find(p => p.teamId === teamId)?.place;

  const sf1w = getWinner('sf1');
  const sf2w = getWinner('sf2');
  const sf1l = [bracket.sf1t1, bracket.sf1t2].find(t => t !== sf1w);
  const sf2l = [bracket.sf2t1, bracket.sf2t2].find(t => t !== sf2w);
  const finalT1 = sf1w || null, finalT2 = sf2w || null;
  const thirdT1 = sf1l || null, thirdT2 = sf2l || null;

  const openModal = (matchId, t1, t2) => {
    if (!t1 || !t2) return alert('Please set the semi-final pairings first.');
    setTowModal({ matchId, t1, t2 });
    setTowWinner(getWinner(matchId) || '');
  };

  const submitTOW = async () => {
    if (!towWinner) return alert('Please select a winner.');
    setSaving(true);
    await saveTOWResult(towModal.matchId, towWinner);
    setTowModal(null);
    setSaving(false);
  };

  const BracketMatch = ({ matchId, t1, t2, label, time }) => {
    const winner = getWinner(matchId);
    const isTbd = !t1 || !t2;
    return (
      <div className={`bracket-match${winner ? ' winner' : ''}${isTbd ? ' tbd' : ''}`}>
        <div className="text-xs text-muted mb-2 font-bold">{label} · {time}</div>
        <div className="flex flex-col gap-2">
          {[t1, t2].map((tid, i) => (
            <div key={i} className={`flex items-center justify-between gap-2 ${winner === tid ? 'font-bold' : ''}`}>
              {tid ? <TeamBadgeShort id={tid} /> : <span className="text-muted text-sm">TBD</span>}
              {winner === tid && <span className="text-xs res-win">🏆</span>}
            </div>
          ))}
        </div>
        {isAdmin && (
          <button
            className="btn btn-warning btn-sm w-full mt-3"
            onClick={() => openModal(matchId, t1, t2)}
            disabled={isTbd}
          >
            Result
          </button>
        )}
      </div>
    );
  };

  const medals = ['🥇', '🥈', '🥉', '4.'];
  const bonusPts = [4, 3, 2, 1];

  return (
    <div className="page">
      <h1 className="page-title">🪢 Tug of War</h1>
      <p className="page-sub">
        Tug of War tournament · Semi-Finals → Final &amp; 3rd Place match<br />
        Placement points count towards the overall standings: 1st = +4 · 2nd = +3 · 3rd = +2 · 4th = +1
      </p>

      <div className="alert alert-info mb-6">
        Semi-final pairings will be set by the admin after the regular games (Seed 1 vs 4, Seed 2 vs 3).
      </div>

      {/* Bracket */}
      <div className="card mb-6">
        <div className="section-title mb-4">Bracket</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr', gap: '1rem', alignItems: 'center', overflowX: 'auto' }}>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-xs font-bold text-muted mb-1">SEMI-FINALS · 15:30</div>
              <BracketMatch matchId="sf1" t1={bracket.sf1t1} t2={bracket.sf1t2} label="SF 1" time="15:30" />
            </div>
            <BracketMatch matchId="sf2" t1={bracket.sf2t1} t2={bracket.sf2t2} label="SF 2" time="15:30" />
          </div>
          <div className="text-center text-muted" style={{ fontSize: '1.5rem' }}>→</div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-xs font-bold text-muted mb-1">FINAL · 16:00</div>
              <BracketMatch matchId="final" t1={finalT1} t2={finalT2} label="Final" time="16:00" />
            </div>
            <div>
              <div className="text-xs font-bold text-muted mb-1">3RD PLACE · 16:00</div>
              <BracketMatch matchId="third" t1={thirdT1} t2={thirdT2} label="3rd Place" time="16:00" />
            </div>
          </div>
        </div>
      </div>

      {/* Placements */}
      {placements.length > 0 && (
        <div className="card mb-6">
          <div className="section-title mb-4">🏆 Final Placements</div>
          <div className="grid-4">
            {[1, 2, 3, 4].map(place => {
              const p = placements.find(p => p.place === place);
              return (
                <div key={place} className="stat-card">
                  <div style={{ fontSize: '2rem' }}>{medals[place - 1]}</div>
                  <div className="mt-2">{p ? <TeamBadge id={p.teamId} /> : <span className="text-muted">TBD</span>}</div>
                  <div className="stat-lbl mt-1">+{bonusPts[place - 1]} pts</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Admin controls */}
      {isAdmin && (
        <>
          <div className="card mb-4" style={{ borderColor: '#fde68a', background: '#fffbeb' }}>
            <div className="section-title mb-4">⚙️ Set Semi-Final Pairings</div>
            <div className="grid-2 gap-4">
              {[['sf1t1', 'sf1t2', 'SF 1'], ['sf2t1', 'sf2t2', 'SF 2']].map(([k1, k2, lbl]) => (
                <div key={lbl}>
                  <div className="form-label">{lbl}</div>
                  <select className="form-input mb-2" value={bracketEdit[k1]} onChange={e => setBracketEdit(p => ({ ...p, [k1]: e.target.value }))}>
                    {Object.values(TEAMS).map(t => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
                  </select>
                  <select className="form-input" value={bracketEdit[k2]} onChange={e => setBracketEdit(p => ({ ...p, [k2]: e.target.value }))}>
                    {Object.values(TEAMS).map(t => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button className="btn btn-primary mt-4" onClick={() => saveTOWBracket(bracketEdit)}>
              💾 Save Pairings
            </button>
          </div>

          <div className="card" style={{ borderColor: '#fde68a', background: '#fffbeb' }}>
            <div className="section-title mb-4">⚙️ Set Placements Manually</div>
            <div className="grid-4">
              {[1, 2, 3, 4].map(place => {
                const cur = placements.find(p => p.place === place)?.teamId || '';
                return (
                  <div key={place}>
                    <div className="form-label">{medals[place - 1]} Place</div>
                    <select
                      className="form-input"
                      value={cur}
                      onChange={e => saveTOWPlacement(e.target.value || null, place)}
                    >
                      <option value="">– none –</option>
                      {Object.values(TEAMS).map(t => (
                        <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* TOW Result Modal */}
      {towModal && (
        <div className="modal-ov" onClick={e => e.target === e.currentTarget && setTowModal(null)}>
          <div className="modal">
            <div className="modal-title">
              🪢 Enter Result
              <button className="modal-close" onClick={() => setTowModal(null)}>✕</button>
            </div>
            <div className="flex justify-center gap-3 mb-4 flex-wrap">
              <TeamBadge id={towModal.t1} /> <span className="text-muted font-bold">vs</span> <TeamBadge id={towModal.t2} />
            </div>
            <div className="form-group">
              <label className="form-label">Winner</label>
              <select className="form-input" value={towWinner} onChange={e => setTowWinner(e.target.value)}>
                <option value="">– please select –</option>
                <option value={towModal.t1}>{TEAMS[towModal.t1]?.emoji} {TEAMS[towModal.t1]?.name}</option>
                <option value={towModal.t2}>{TEAMS[towModal.t2]?.emoji} {TEAMS[towModal.t2]?.name}</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="btn btn-success w-full" onClick={submitTOW} disabled={saving}>✅ Save</button>
              <button className="btn btn-ghost" onClick={() => setTowModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
