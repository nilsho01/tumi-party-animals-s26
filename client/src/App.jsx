import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Nav      from './components/Nav';
import Home     from './pages/Home';
import Schedule from './pages/Schedule';
import Team     from './pages/Team';
import Game     from './pages/Game';
import TOW      from './pages/TOW';
import Referees from './pages/Referees';
import Admin    from './pages/Admin';
import Rules    from './pages/Rules';

export default function App() {
  return (
    <AppProvider>
      <Nav />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/schedule"   element={<Schedule />} />
        <Route path="/team/:id"   element={<Team />} />
        <Route path="/game/:id"   element={<Game />} />
        <Route path="/tow"        element={<TOW />} />
        <Route path="/referees"   element={<Referees />} />
        <Route path="/rules"      element={<Rules />} />
        <Route path="/admin"      element={<Admin />} />
        <Route path="*"           element={<Home />} />
      </Routes>
    </AppProvider>
  );
}
