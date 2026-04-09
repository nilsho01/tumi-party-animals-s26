import { Link } from 'react-router-dom';
import { GAMES, SPORTS, TOW_MATCHES } from '../data/constants';
import GameCard from '../components/GameCard';

function nowRound() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const slots = [
    { round: 1, from: 11*60+30, to: 12*60      },
    { round: 2, from: 12*60,    to: 12*60+30   },
    { round: 3, from: 12*60+30, to: 13*60      },
    { round: 4, from: 14*60,    to: 14*60+30   },
    { round: 5, from: 14*60+30, to: 15*60      },
    { round: 6, from: 15*60,    to: 15*60+30   },
    { round: 7, from: 15*60+30, to: 16*60      },
    { round: 8, from: 16*60,    to: 16*60+30   },
    { round: 9, from: 16*60+30,    to: 17*60   },
  ];
  return slots.find(s => mins >= s.from && mins < s.to)?.round || null;
}

function isTowLive() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= 16*60+30 && mins < 17*60+10;
}

export default function Schedule() {
  const curRound = nowRound();
  const towLive  = isTowLive();
  const towStart = TOW_MATCHES[0].time;
  const towEnd   = TOW_MATCHES[TOW_MATCHES.length - 1].timeEnd;

  return (
    <div className="page">
      <h1 className="page-title">📅 Schedule</h1>
      <p className="page-sub">9 Rounds · Each team plays 6 games · Volleyball, Frisbee, Dodgeball + Tug of War</p>

  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(r => {
        const games = GAMES.filter(g => g.round === r);
        const g0 = games[0];
        const isLive = curRound === r;
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
                    {isLive && (
                      <span className="pill" style={{ background:'#fef9c3', color:'#854d0e', borderColor:'#fde047' }}>
                        🔴 Live
                      </span>
                    )}
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

      {/* Tug of War – nacheinander */}
      <div className="schedule-round">
        <div className="round-hdr">
          <div className="round-num" style={{ background:'#f3e8ff', borderColor:'#d8b4fe', color:'#6b21a8' }}>🪢</div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold">{towStart} – {towEnd}</span>
              <span className="sbadge sbadge-tugofwar">🪢 Tug of War</span>
              {towLive && (
                <span className="pill" style={{ background:'#fef9c3', color:'#854d0e', borderColor:'#fde047' }}>
                  🔴 Live
                </span>
              )}
            </div>
            <div className="text-xs text-muted">
              Bracket Tournament · {TOW_MATCHES.map(m => `${m.label} ${m.time}`).join(' · ')}
            </div>
          </div>
          <Link to="/tow" className="btn btn-outline btn-sm ml-auto">Details →</Link>
        </div>
      </div>
    </div>
  );
}