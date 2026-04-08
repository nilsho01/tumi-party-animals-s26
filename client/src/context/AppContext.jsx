import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [results, setResults]           = useState([]);
  const [settings, setSettings]         = useState({ eventName: 'PA Sports Day 2026', eventDate: '' });
  const [towData, setTowData]           = useState({ bracket: {sf1t1:'gg',sf1t2:'tt',sf2t1:'pp',sf2t2:'pi'}, results: [], placements: [] });
  const [refAssignments, setRefAssignments] = useState([]);
  const [isAdmin, setIsAdmin]           = useState(() => sessionStorage.getItem('sd_admin') === '1');
  const [isRef,   setIsRef]             = useState(() => sessionStorage.getItem('sd_ref')   === '1');
  const [refName, setRefName]           = useState(() => sessionStorage.getItem('sd_ref_name') || '');
  const [refTeamId, setRefTeamId]       = useState(() => sessionStorage.getItem('sd_ref_team') || '');
  const [loading, setLoading]           = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [resRes, setRes, towRes, refRes] = await Promise.all([
        axios.get('/api/results'),
        axios.get('/api/settings'),
        axios.get('/api/tow'),
        axios.get('/api/refs'),
      ]);
      setResults(resRes.data);
      setSettings(setRes.data);
      setTowData(towRes.data);
      setRefAssignments(refRes.data);
    } catch (e) {
      console.error('Fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Admin auth
  const login = useCallback(async (password) => {
    const res = await axios.post('/api/auth', { type: 'admin', password });
    if (res.data.ok) {
      sessionStorage.setItem('sd_admin', '1');
      setIsAdmin(true);
      const full = await axios.get('/api/settings/full');
      setSettings(full.data);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('sd_admin');
    setIsAdmin(false);
  }, []);

  // Ref auth
  const loginRef = useCallback(async (password, name, teamId) => {
    const res = await axios.post('/api/auth', { type: 'ref', password });
    if (res.data.ok) {
      sessionStorage.setItem('sd_ref', '1');
      sessionStorage.setItem('sd_ref_name', name || '');
      sessionStorage.setItem('sd_ref_team', teamId || '');
      setIsRef(true);
      setRefName(name || '');
      setRefTeamId(teamId || '');
      return true;
    }
    return false;
  }, []);

  const logoutRef = useCallback(() => {
    sessionStorage.removeItem('sd_ref');
    sessionStorage.removeItem('sd_ref_name');
    sessionStorage.removeItem('sd_ref_team');
    setIsRef(false);
    setRefName('');
    setRefTeamId('');
  }, []);

  // Legacy helper used by ScoreModal when not logged in
  const verifyRef = useCallback(async (password) => {
    const res = await axios.post('/api/auth', { type: 'ref', password });
    return res.data.ok;
  }, []);

  // Results
  const saveResult = useCallback(async (gameId, s1, s2, refTeam, tutor) => {
    const res = await axios.put(`/api/results/${gameId}`, { s1, s2, refTeam, tutor });
    setResults(prev => {
      const filtered = prev.filter(r => r.gameId !== gameId);
      return [...filtered, res.data];
    });
  }, []);

  const clearResult = useCallback(async (gameId) => {
    await axios.delete(`/api/results/${gameId}`);
    setResults(prev => prev.filter(r => r.gameId !== gameId));
  }, []);

  // Settings
  const saveSettings = useCallback(async (data) => {
    const res = await axios.put('/api/settings', data);
    setSettings(res.data);
  }, []);

  // TOW
  const saveTOWBracket = useCallback(async (data) => {
    const res = await axios.put('/api/tow/bracket', data);
    setTowData(prev => ({ ...prev, bracket: res.data }));
  }, []);

  const saveTOWResult = useCallback(async (matchId, winner) => {
    const res = await axios.put(`/api/tow/results/${matchId}`, { winner });
    setTowData(prev => {
      const filtered = prev.results.filter(r => r.matchId !== matchId);
      return { ...prev, results: [...filtered, res.data] };
    });
  }, []);

  const saveTOWPlacement = useCallback(async (teamId, place) => {
    await axios.put(`/api/tow/placements/${teamId}`, { place });
    setTowData(prev => {
      const filtered = prev.placements.filter(p => p.teamId !== teamId && p.place !== place);
      return { ...prev, placements: place ? [...filtered, { teamId, place }] : filtered };
    });
  }, []);

  // Refs
  const saveRef = useCallback(async (slotId, name) => {
    const res = await axios.put(`/api/refs/${slotId}`, { name });
    setRefAssignments(prev => {
      const filtered = prev.filter(r => r.slotId !== slotId);
      return [...filtered, res.data];
    });
  }, []);

  const getResult = useCallback((gameId) => results.find(r => r.gameId === gameId) || null, [results]);
  const getRef = useCallback((slotId) => refAssignments.find(r => r.slotId === slotId)?.name || '', [refAssignments]);

  return (
    <Ctx.Provider value={{
      results, settings, towData, refAssignments,
      isAdmin, isRef, refName, refTeamId, loading,
      login, logout,
      loginRef, logoutRef,
      verifyRef,
      saveResult, clearResult,
      saveSettings,
      saveTOWBracket, saveTOWResult, saveTOWPlacement,
      saveRef,
      getResult, getRef,
      refresh: fetchAll,
    }}>
      {children}
    </Ctx.Provider>
  );
}
