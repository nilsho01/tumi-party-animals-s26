export default function Rules() {
  return (
    <div className="page">
      <h1 className="page-title">Rules</h1>
      <p className="page-sub">Official rules for PA Sports Day 2026 — all sports</p>

      {/* General */}
      <div className="rules-sport mb-6">
        <h2>🏆 General Tournament Rules</h2>
        <ul>
          <li>Each team plays 6 games: 2× Volleyball, 2× Ultimate Frisbee, 2× Dodgeball.</li>
          <li>Win = 2 points · Draw = 1 point · Loss = 0 points.</li>
          <li>Tug of War placement adds bonus points: 1st +4 · 2nd +3 · 3rd +2 · 4th +1.</li>
          <li>Tiebreaker: total points → goal difference → goals scored.</li>
          <li>Each round, the non-playing team acts as referee for one game.</li>
          <li>Results must be entered immediately after each game by the referee team.</li>
          <li>Disputes are decided by the organising team — their decision is final.</li>
          <li>Fair play and respect for all participants is expected at all times.</li>
        </ul>
      </div>

      {/* Volleyball */}
      <div className="rules-sport">
        <h2><span className="sbadge sbadge-volleyball">🏐 Volleyball</span></h2>
        <ul>
          <li>6 players per side on court at any time.</li>
          <li>Rally scoring — a point is awarded on every rally regardless of who served.</li>
          <li>First team to reach <strong>25 points</strong> wins, with a minimum 2-point lead. If the score reaches 24:24, play continues until one team leads by 2.</li>
          <li>If time is called before 25 points: the team leading wins. If tied, the next point wins.</li>
          <li>Maximum <strong>3 touches</strong> per side before the ball must cross the net.</li>
          <li>Consecutive touches by the same player are not allowed (except after a block).</li>
          <li>The ball must not touch the ground on your side. Catching or carrying the ball is not allowed.</li>
          <li>Players may not touch the net during play.</li>
          <li>Serves that hit the net and land in are valid (let serve allowed).</li>
        </ul>
      </div>

      {/* Ultimate Frisbee */}
      <div className="rules-sport">
        <h2><span className="sbadge sbadge-frisbee">🥏 Ultimate Frisbee</span></h2>
        <ul>
          <li>7 players per side on field at any time.</li>
          <li>Score by catching the frisbee in the opposing team's end zone.</li>
          <li>The player holding the frisbee <strong>cannot run</strong>. They have a maximum of <strong>10 seconds</strong> to pass.</li>
          <li>If the frisbee hits the ground, goes out of bounds, or is intercepted, possession changes.</li>
          <li>No physical contact — this is a non-contact sport. Fouls result in a turnover or re-throw.</li>
          <li>After a goal is scored, teams switch end zones. The scoring team restarts from the back of their end zone.</li>
          <li>First team to <strong>7 points</strong> wins, or the team with the most points when time is called.</li>
          <li>Spirit of the Game: players are expected to call their own fouls honestly.</li>
        </ul>
      </div>

      {/* Dodgeball */}
      <div className="rules-sport">
        <h2><span className="sbadge sbadge-dodgeball">🎯 Dodgeball</span></h2>
        <ul>
          <li>6 players per side at the start of each round.</li>
          <li>Eliminate players by hitting them with a ball (below the shoulders).</li>
          <li>Head shots do not count and the thrower is out.</li>
          <li>If you <strong>catch</strong> a ball thrown at you, the thrower is eliminated and one of your out players returns.</li>
          <li>Players hit by a ball, or whose ball is caught, must leave the court immediately.</li>
          <li>Players may not cross the centre line during play.</li>
          <li>Balls that bounce off the floor before hitting a player do not count as a hit.</li>
          <li>The team with the last player(s) standing wins the round. Play best of 3 rounds, or most rounds won when time is called.</li>
          <li>If time is called mid-round: the team with more players on court wins that round.</li>
        </ul>
      </div>

      {/* Tug of War */}
      <div className="rules-sport">
        <h2><span className="sbadge sbadge-tugofwar">🪢 Tug of War</span></h2>
        <ul>
          <li>Each team fields a maximum of <strong>8 players</strong> per pull.</li>
          <li>The rope has a centre marker and two markers 4 metres from the centre.</li>
          <li>A team wins a pull by pulling the rope until their opponents' marker crosses the centre line.</li>
          <li>Best of 3 pulls — first team to win 2 pulls advances.</li>
          <li>Players must hold the rope only, not wrap it around their body.</li>
          <li>The tournament follows a semi-final / final / 3rd-place bracket.</li>
          <li>Semi-final seedings are determined by the admin based on regular game standings.</li>
          <li>Placement points: 1st = +4 · 2nd = +3 · 3rd = +2 · 4th = +1 (added to overall standings).</li>
        </ul>
      </div>

      {/* Schedule summary */}
      <div className="card mt-6" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
        <div className="section-title mb-3" style={{ color: '#166534' }}>📅 Day Schedule</div>
        <div style={{ display: 'grid', gap: '.5rem', fontSize: '.875rem' }}>
          {[
            ['11:00 – 11:30', 'Setup & Warm-up'],
            ['11:30 – 12:00', 'Round 1 — Volleyball (Field A) · Frisbee (Field B)'],
            ['12:00 – 12:30', 'Round 2 — Volleyball (Field A) · Dodgeball (Field B)'],
            ['12:30 – 13:00', 'Round 3 — Frisbee (Field A) · Dodgeball (Field B)'],
            ['13:00 – 14:00', '🍔 Lunch Break'],
            ['14:00 – 14:30', 'Round 4 — Volleyball (Field A) · Frisbee (Field B)'],
            ['14:30 – 15:00', 'Round 5 — Volleyball (Field A) · Dodgeball (Field B)'],
            ['15:00 – 15:30', 'Round 6 — Frisbee (Field A) · Dodgeball (Field B)'],
            ['15:30 – 15:45', 'Tug of War — Semi-Finals'],
            ['16:00 – 16:15', 'Tug of War — Final & 3rd Place'],
            ['16:15 – 16:30', 'Awards Ceremony'],
            ['16:30 – 17:00', 'Cleanup'],
          ].map(([time, label]) => (
            <div key={time} className="flex gap-3" style={{ borderBottom: '1px solid #d1fae5', paddingBottom: '.4rem' }}>
              <span style={{ minWidth: 145, fontWeight: 600, color: '#15803d' }}>{time}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
