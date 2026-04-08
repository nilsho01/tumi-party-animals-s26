import { Link } from 'react-router-dom';
import { GAMES, TEAMS } from '../data/constants';
import { useApp } from '../context/AppContext';
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
  ];
  return slots.find(s => mins >= s.from && mins < s.to)?.round || null;
}

function isTowLive() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= 16*60+30 && mins < 17*60+10;
}

export default function Home() {
  const { results, settings } = useApp();
  const curRound = nowRound();
  const towLive  = isTowLive();
  const played   = GAMES.filter(g => results.some(r => r.gameId === g.id)).length;
  const nextGame = GAMES.find(g => !results.some(r => r.gameId === g.id));

  const formatDate = d => {
    try { return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <div className="page">
      {/* Hero */}
      <div className="hero mb-8" style={{ backgroundImage: 'url(/sportsday-hero.jpg)' }}>
        {settings.eventDate && <div className="hero-eyebrow">📅 {formatDate(settings.eventDate)}</div>}
        <h1 className="hero-title">{settings.eventName}</h1>
        <p className="hero-sub">4 Teams · Volleyball · Ultimate Frisbee · Dodgeball · Tug of War</p>
        <div className="team-pills">
          {Object.values(TEAMS).map(t => (
            <Link key={t.id} to={`/team/${t.id}`} className="team-pill">
              {t.emoji} {t.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Status banners */}
      {curRound && (
        <div className="alert alert-warn mb-6">
          🔴 <strong>Round {curRound} is live right now!</strong>
        </div>
      )}
      {towLive && (
        <div className="alert alert-warn mb-6">
          🪢 <strong>Tug of War is live right now!</strong>{' '}
          <Link to="/tow" style={{ marginLeft: '0.5rem', fontWeight: 600 }}>View bracket →</Link>
        </div>
      )}
      {nextGame && !curRound && !towLive && (
        <div className="alert alert-info mb-6 flex items-center gap-3">
          <div style={{ flex: 1 }}>
            <strong>Next game:</strong> {nextGame.time} — Round {nextGame.round} · {nextGame.field}
          </div>
          <Link to={`/game/${nextGame.id}`} className="btn btn-primary btn-sm">Details →</Link>
        </div>
      )}
      {played === GAMES.length && (
        <div className="alert alert-success mb-6">
          🎉 <strong>All games complete!</strong>
        </div>
      )}

      {/* Stats */}
      <div className="grid-4 mb-8">
        <div className="stat-card">
          <div className="stat-val">{played}</div>
          <div className="stat-lbl">Games Played</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">{GAMES.length - played}</div>
          <div className="stat-lbl">Remaining</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">{GAMES.length}</div>
          <div className="stat-lbl">Total Games</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">4</div>
          <div className="stat-lbl">Sports</div>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid-2 gap-6">
        <div>
          <div className="section-hdr">
            <div className="section-title">🏆 Standings</div>
            <Link to="/admin" className="text-sm text-muted btn btn-ghost btn-sm">Admin →</Link>
          </div>
          <div className="locked-card">
            <div className="locked-icon">🔒</div>
            <div className="locked-title">Standings Locked</div>
            <div className="locked-sub">Visible to admins only. Contact the organisers for the current ranking.</div>
            <Link to="/admin" className="btn btn-outline btn-sm mt-4">Admin Login →</Link>
          </div>
        </div>

        <div>
          <div className="section-hdr">
            <div className="section-title">Today's Games</div>
            <Link to="/schedule" className="text-sm text-muted btn btn-ghost btn-sm">Full schedule →</Link>
          </div>
          <div className="flex flex-col gap-3">
            {GAMES.slice(0, 6).map(g => (
              <GameCard key={g.id} game={g} highlight={curRound === g.round} />
            ))}
          </div>
        </div>
      </div>

      {/* TOW teaser */}
      <div className="card mt-6" style={{ borderColor: '#d8b4fe', background: '#faf5ff' }}>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '1.75rem' }}>🪢</span>
          <div>
            <div className="font-bold">Tug of War · 16:30 – 17:10</div>
            <div className="text-sm text-muted">
              SF1 16:30 · SF2 16:40 · 3rd Place 16:50 · Final 17:00
            </div>
          </div>
          <Link to="/tow" className="btn btn-outline btn-sm ml-auto">View bracket →</Link>
        </div>
      </div>
    </div>
  );
}