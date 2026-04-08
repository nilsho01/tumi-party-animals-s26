import { TEAMS } from '../data/constants';

export function TeamBadge({ id, large }) {
  const t = TEAMS[id];
  if (!t) return null;
  return (
    <span
      className={`tbadge tbadge-${id}`}
      style={large ? { fontSize: '1rem', padding: '.45rem 1rem' } : {}}
    >
      {t.emoji} {t.name}
    </span>
  );
}

export function TeamBadgeShort({ id }) {
  const t = TEAMS[id];
  if (!t) return null;
  return <span className={`tbadge tbadge-${id}`}>{t.emoji} {t.short}</span>;
}

export function SportBadge({ sport }) {
  const icons = { volleyball: '🏐', frisbee: '🥏', dodgeball: '🎯', tugofwar: '🪢' };
  const names = { volleyball: 'Volleyball', frisbee: 'Ultimate Frisbee', dodgeball: 'Dodgeball', tugofwar: 'Tug of War' };
  return (
    <span className={`sbadge sbadge-${sport}`}>
      {icons[sport]} {names[sport]}
    </span>
  );
}
