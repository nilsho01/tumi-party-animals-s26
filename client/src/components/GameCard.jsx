import { Link } from 'react-router-dom';
import { TEAMS } from '../data/constants';
import { TeamBadgeShort, SportBadge } from './TeamBadge';
import { useApp } from '../context/AppContext';

export default function GameCard({ game, highlight }) {
  const { getResult } = useApp();
  const r = getResult(game.id);

  return (
    <Link
      to={`/game/${game.id}`}
      className={`game-card${highlight ? ' live' : ''}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <SportBadge sport={game.sport} />
        <div className="flex items-center gap-2">
          {highlight && <span className="pill" style={{ background: '#fef9c3', color: '#854d0e', borderColor: '#fde047' }}>🔴 Live</span>}
          <span className="text-xs text-muted">{game.time} · {game.field}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <TeamBadgeShort id={game.t1} />
        {r
          ? <span className="font-black text-xl" style={{ letterSpacing: '.05em' }}>{r.s1} : {r.s2}</span>
          : <span className="text-muted font-bold text-sm">–  :  –</span>
        }
        <TeamBadgeShort id={game.t2} />
      </div>
      {r && (
        <div className="mt-2 text-xs text-muted text-right">
          Entered by {r.tutor || '–'}
        </div>
      )}
    </Link>
  );
}
