import { Link } from 'react-router-dom';
import { GAMES, SPORTS } from '../data/constants';
import GameCard from '../components/GameCard';

function nowRound() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const slots = [
    { round: 1, from: 11*60+30, to: 12*60 },  { round: 2, from: 12*60, to: 12*60+30 },
    { round: 3, from: 12*60+30, to: 13*60 },  { round: 4, from: 14*60, to: 14*60+30 },
    { round: 5, from: 14*60+30, to: 15*60 },  { round: 6, from: 15*60, to: 15*60+30 },
  ];
  return slots.find(s => mins >= s.from && mins < s.to)?.round || null;
}

export default function Schedule() {
  const curRound = nowRound();

  return (
    <div className="page">
      <h1 className="page-title">📅 Schedule</h1>
      <p className="page-sub">6 Rounds · Each team plays 6 games · 2× Volleyball, 2× Frisbee, 2× Dodgeball</p>

      {[1, 2, 3, 4, 5, 6].map(r => {
        const games = GAMES.filter(g => g.round === r);
        const g0 = games[0];
        const isLive = curRound === r;
        // Collect unique sports for this round
        const sports = [...new Set(games.map(g => g.sport))];
        return (
          <div key={r}>
            {r === 4 && (
              <div className="lunch-break">
                🍔 Lunch Break · 13:00 – 14:00
              </div>
            )}
            <div className="schedule-round">
              <div className="round-hdr">
                <div className={`round-num${isLive ? ' live' : ''}`}>{r}</div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold">{g0.time} – {g0.timeEnd}</span>
                    {sports.map(s => (
                      <span key={s} className={`sbadge sbadge-${s}`}>
                        {SPORTS[s].icon} {SPORTS[s].name}
                      </span>
                    ))}
                    {isLive && <span className="pill" style={{ background:'#fef9c3', color:'#854d0e', borderColor:'#fde047' }}>🔴 Live</span>}
                  </div>
                  <div className="text-xs text-muted">Round {r}</div>
                </div>
              </div>
              <div className="grid-2">
                {games.map(g => <GameCard key={g.id} game={g} highlight={isLive} />)}
              </div>
            </div>
          </div>
        );
      })}

      {/* TOW entry */}
      <div className="schedule-round">
        <div className="round-hdr">
          <div className="round-num" style={{ background:'#f3e8ff', borderColor:'#d8b4fe', color:'#6b21a8' }}>🪢</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">15:30 – 16:30</span>
              <span className="sbadge sbadge-tugofwar">🪢 Tug of War</span>
            </div>
            <div className="text-xs text-muted">Bracket Tournament</div>
          </div>
          <Link to="/tow" className="btn btn-outline btn-sm ml-auto">Details →</Link>
        </div>
      </div>
    </div>
  );
}
