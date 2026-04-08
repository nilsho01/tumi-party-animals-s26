import { useState } from 'react';
import { TEAMS } from '../data/constants';
import { TeamBadge, SportBadge } from './TeamBadge';
import { useApp } from '../context/AppContext';

export default function ScoreModal({ game, onClose }) {
  const { isAdmin, isRef, refName, refTeamId, verifyRef, saveResult, getResult } = useApp();
  const existing = getResult(game.id);
  const authenticated = isAdmin || isRef;

  const [refTeam, setRefTeam]   = useState(existing?.refTeam || (isRef ? refTeamId : game.refTeam) || '');
  const [tutor, setTutor]       = useState(existing?.tutor   || (isRef ? refName   : '') || '');
  const [password, setPassword] = useState('');
  const [s1, setS1]             = useState(existing?.s1 ?? '');
  const [s2, setS2]             = useState(existing?.s2 ?? '');
  const [error, setError]       = useState('');
  const [saving, setSaving]     = useState(false);

  const submit = async () => {
    setError('');
    if (!authenticated) {
      if (!refTeam)      return setError('Please select your team.');
      if (!tutor.trim()) return setError('Please enter the tutor name.');
      if (!password)     return setError('Please enter the referee password.');
    }
    if (s1 === '' || s2 === '') return setError('Please enter both scores.');

    try {
      setSaving(true);
      if (!authenticated) {
        const ok = await verifyRef(password);
        if (!ok) { setSaving(false); return setError('Wrong password.'); }
      }
      const finalRefTeam = isRef ? (refTeamId || refTeam || 'admin') : (refTeam || 'admin');
      const finalTutor   = isRef ? (refName   || tutor  || 'Referee') : (tutor || 'Admin');
      await saveResult(game.id, +s1, +s2, finalRefTeam, finalTutor);
      onClose();
    } catch {
      setError('Failed to save. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="modal-ov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">
          {existing ? 'Edit Result' : 'Enter Result'}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Game info */}
        <div className="card-inner mb-4 text-center">
          <div className="mb-2"><SportBadge sport={game.sport} /></div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <TeamBadge id={game.t1} />
            <span className="text-muted font-bold">vs</span>
            <TeamBadge id={game.t2} />
          </div>
          <div className="text-xs text-muted mt-1">{game.time} · {game.field}</div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {isAdmin && <div className="alert alert-info">Admin mode — no password required.</div>}
        {isRef && !isAdmin && (
          <div className="alert alert-info" style={{ alignItems: 'center' }}>
            <span>Referee: </span>
            {refTeamId && (
              <span
                className="tbadge"
                style={{
                  background: TEAMS[refTeamId]?.color + '20',
                  color: TEAMS[refTeamId]?.color,
                  border: `1px solid ${TEAMS[refTeamId]?.color}40`,
                  fontSize: '.75rem',
                }}
              >
                {TEAMS[refTeamId]?.emoji} {TEAMS[refTeamId]?.name}
              </span>
            )}
            {refName && <strong style={{ marginLeft: '.3rem' }}>{refName}</strong>}
          </div>
        )}

        {/* Referee info (only for unauthenticated) */}
        {!authenticated && (
          <>
            <div className="form-group">
              <label className="form-label">Your Team</label>
              <select className="form-input" value={refTeam} onChange={e => setRefTeam(e.target.value)}>
                <option value="">– please select –</option>
                {Object.values(TEAMS).map(t => (
                  <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Tutor Name</label>
              <input
                className="form-input" type="text"
                placeholder="e.g. Ms. Smith"
                value={tutor} onChange={e => setTutor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Referee Password</label>
              <input
                className="form-input" type="password"
                placeholder="Password..."
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
              />
            </div>
          </>
        )}

        {/* Score entry */}
        <div className="form-group">
          <label className="form-label">Score</label>
          <div className="flex items-center gap-3 justify-center">
            <div className="text-center" style={{ flex: 1 }}>
              <div className="text-xs text-muted mb-1">{TEAMS[game.t1].emoji} {TEAMS[game.t1].name}</div>
              <input
                className="form-input score-inp" type="number"
                min="0" max="99" value={s1}
                onChange={e => setS1(e.target.value)}
              />
            </div>
            <span className="font-black text-2xl text-muted">:</span>
            <div className="text-center" style={{ flex: 1 }}>
              <div className="text-xs text-muted mb-1">{TEAMS[game.t2].emoji} {TEAMS[game.t2].name}</div>
              <input
                className="form-input score-inp" type="number"
                min="0" max="99" value={s2}
                onChange={e => setS2(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="btn btn-success w-full" onClick={submit} disabled={saving}>
            {saving ? 'Saving…' : '✓ Save Result'}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
