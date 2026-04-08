import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GAMES, TEAMS } from '../data/constants';
import { useApp } from '../context/AppContext';
import { TeamBadge, SportBadge } from '../components/TeamBadge';
import ScoreModal from '../components/ScoreModal';

export default function Game() {
  const { id } = useParams();
  const game = GAMES.find(g => g.id === parseInt(id));
  const { getResult, clearResult, isAdmin, isRef } = useApp();
  const [showModal, setShowModal] = useState(false);

  if (!game) return (
    <div className="page"><div className="alert alert-error">Game not found.</div></div>
  );

  const r = getResult(game.id);
  const t1 = TEAMS[game.t1], t2 = TEAMS[game.t2];
  const roundGames = GAMES.filter(g => g.round === game.round && g.id !== game.id);

  const resultLabel = () => {
    if (!r) return null;
    if (+r.s1 > +r.s2) return <span className="res-win">🏆 {t1.name} wins</span>;
    if (+r.s2 > +r.s1) return <span className="res-win">🏆 {t2.name} wins</span>;
    return <span className="res-draw">🤝 Draw</span>;
  };

  return (
    <div className="page">
      <div className="mb-4">
        <Link to="/schedule" className="text-muted text-sm btn btn-ghost btn-sm">← Schedule</Link>
      </div>

      {/* Main game card */}
      <div className="card mb-6 text-center">
        <div className="mb-3"><SportBadge sport={game.sport} /></div>
        <div className="text-muted text-sm mb-6">
          Round {game.round} · {game.time}–{game.timeEnd} · {game.field}
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
          {/* Team 1 */}
          <div className="text-center">
            <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '.5rem' }}>{t1.emoji}</div>
            <Link to={`/team/${game.t1}`}><TeamBadge id={game.t1} large /></Link>
          </div>

          {/* Score */}
          <div style={{ padding: '0 1rem' }}>
            {r
              ? <div className="score-big">{r.s1} : {r.s2}</div>
              : <div className="score-pending">– : –</div>
            }
            {r && <div className="mt-3 text-sm">{resultLabel()}</div>}
          </div>

          {/* Team 2 */}
          <div className="text-center">
            <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '.5rem' }}>{t2.emoji}</div>
            <Link to={`/team/${game.t2}`}><TeamBadge id={game.t2} large /></Link>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3 flex-wrap">
          {(isAdmin || isRef) && (
            <button className="btn btn-warning" onClick={() => setShowModal(true)}>
              🟡 {r ? 'Edit Result' : 'Enter Result'}
            </button>
          )}
          {isAdmin && r && (
            <button className="btn btn-ghost btn-sm" onClick={() => {
              if (confirm('Delete this result?')) clearResult(game.id);
            }}>
              🗑️ Delete
            </button>
          )}
          {!isAdmin && !isRef && (
            <p className="text-muted text-sm">
              Log in as <a href="/referees" style={{ color: 'var(--primary)', fontWeight: 600 }}>referee</a> to enter results.
            </p>
          )}
        </div>
      </div>

      {/* Entry log */}
      {r && (
        <div className="entry-log mb-6">
          <div className="font-bold text-xs mb-2" style={{ color: 'var(--primary)' }}>📋 Referee</div>
          <div className="flex items-center gap-2 flex-wrap">
            {r.refTeam && r.refTeam !== 'admin' && TEAMS[r.refTeam] && (
              <span
                className="tbadge"
                style={{
                  background: TEAMS[r.refTeam].color + '20',
                  color: TEAMS[r.refTeam].color,
                  border: `1px solid ${TEAMS[r.refTeam].color}40`,
                  fontSize: '.75rem',
                }}
              >
                {TEAMS[r.refTeam].emoji} {TEAMS[r.refTeam].name}
              </span>
            )}
            <strong>{r.tutor || '–'}</strong>
          </div>
          {r.ts && (
            <div className="text-xs mt-1 text-muted">
              {new Date(r.ts).toLocaleString('en-GB')}
            </div>
          )}
        </div>
      )}

      {/* Other games this round */}
      {roundGames.length > 0 && (
        <div className="card">
          <div className="section-title mb-4">Simultaneous Games (Round {game.round})</div>
          <div className="flex flex-col gap-3">
            {roundGames.map(g => (
              <Link key={g.id} to={`/game/${g.id}`} className="game-card">
                <div className="flex items-center justify-between gap-2">
                  <span className={`sbadge sbadge-${g.sport}`}>{g.field}</span>
                  <div className="flex items-center gap-3">
                    <span className={`tbadge tbadge-${g.t1}`}>{TEAMS[g.t1].emoji} {TEAMS[g.t1].short}</span>
                    <span className="font-bold text-muted">vs</span>
                    <span className={`tbadge tbadge-${g.t2}`}>{TEAMS[g.t2].emoji} {TEAMS[g.t2].short}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {showModal && <ScoreModal game={game} onClose={() => setShowModal(false)} />}
    </div>
  );
}
