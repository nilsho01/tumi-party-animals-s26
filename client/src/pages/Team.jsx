import { useParams, Link } from 'react-router-dom';
import { GAMES, TEAMS } from '../data/constants';
import { useApp } from '../context/AppContext';
import GameCard from '../components/GameCard';

export default function Team() {
  const { id } = useParams();
  const team = TEAMS[id];
  const { getResult } = useApp();

  if (!team) return (
    <div className="page">
      <div className="alert alert-error">Team not found.</div>
    </div>
  );

  const games  = GAMES.filter(g => g.t1 === id || g.t2 === id);
  const past   = games.filter(g => getResult(g.id));
  const future = games.filter(g => !getResult(g.id));

  let w = 0, d = 0, l = 0, gf = 0, ga = 0;
  past.forEach(g => {
    const r = getResult(g.id);
    const myS  = g.t1 === id ? +r.s1 : +r.s2;
    const oppS = g.t1 === id ? +r.s2 : +r.s1;
    gf += myS; ga += oppS;
    if (myS > oppS) w++;
    else if (myS < oppS) l++;
    else d++;
  });

  return (
    <div className="page">
      {/* Team Header */}
      <div className="team-page-header mb-8"
        style={{
          background: `linear-gradient(135deg, ${team.color}18, ${team.color}08)`,
          border: `1.5px solid ${team.color}33`,
        }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div style={{ fontSize: '4.5rem', lineHeight: 1 }}>{team.emoji}</div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: team.color }}>{team.name}</h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {Object.values(TEAMS).filter(t => t.id !== id).map(t => (
                <Link key={t.id} to={`/team/${t.id}`} className="pill">{t.emoji} {t.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-8">
        <div className="stat-card">
          <div className="stat-val">{past.length}</div>
          <div className="stat-lbl">Played</div>
        </div>
        <div className="stat-card">
          <div className="stat-val res-win">{w}</div>
          <div className="stat-lbl">Wins</div>
        </div>
        <div className="stat-card">
          <div className="stat-val res-draw">{d}</div>
          <div className="stat-lbl">Draws</div>
        </div>
        <div className="stat-card">
          <div className="stat-val res-loss">{l}</div>
          <div className="stat-lbl">Losses</div>
        </div>
      </div>

      <div className="grid-2 gap-6">
        {future.length > 0 && (
          <div>
            <div className="section-hdr">
              <div className="section-title">⏳ Upcoming Games</div>
            </div>
            <div className="flex flex-col gap-3">
              {future.map(g => <GameCard key={g.id} game={g} />)}
            </div>
          </div>
        )}
        {past.length > 0 && (
          <div>
            <div className="section-hdr">
              <div className="section-title">✅ Past Games</div>
            </div>
            <div className="flex flex-col gap-3">
              {past.map(g => <GameCard key={g.id} game={g} />)}
            </div>
          </div>
        )}
      </div>

      {games.length === 0 && (
        <div className="alert alert-info">No games found.</div>
      )}
    </div>
  );
}
