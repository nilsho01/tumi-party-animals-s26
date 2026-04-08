import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TEAMS } from '../data/constants';
import { useApp } from '../context/AppContext';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { isAdmin, isRef, settings } = useApp();

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
        🏆 <span>{settings.eventName || 'Sports Day'}</span>
      </Link>

      <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li>
          <NavLink to="/" end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={() => setOpen(false)}>
            Home
          </NavLink>
        </li>

        <li className="nav-dd">
          <button className="nav-link">Teams ▾</button>
          <div className="nav-dd-panel">
            {Object.values(TEAMS).map(t => (
              <Link key={t.id} to={`/team/${t.id}`} className="nav-dd-item" onClick={() => setOpen(false)}>
                <span className="nav-dot" style={{ background: t.color }} />
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>
        </li>

        <li>
          <NavLink to="/schedule" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={() => setOpen(false)}>
            Schedule
          </NavLink>
        </li>
        <li>
          <NavLink to="/tow" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={() => setOpen(false)}>
            Tug of War
          </NavLink>
        </li>
        <li>
          <NavLink to="/referees" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={() => setOpen(false)}>
            {isRef && !isAdmin ? 'Referees ✓' : 'Referees'}
          </NavLink>
        </li>
        <li>
          <NavLink to="/rules" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={() => setOpen(false)}>
            Rules
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={() => setOpen(false)}>
            {isAdmin ? 'Admin ✓' : 'Admin'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
