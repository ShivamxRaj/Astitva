import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const AdminCases = () => {
  const [cases, setCases] = useState([]);
  const [filter, setFilter] = useState('unidentified'); // 'unidentified' | 'investigating' | 'identified' | 'all'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchCases = async () => {
    setLoading(true);
    setError('');
    try {
      let query = supabase.from('orphan_cases').select('*').order('created_at', { ascending: false });
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error: err } = await query;
      if (err) throw err;
      
      setCases(data || []);
    } catch (err) {
      console.error('Supabase fetch error:', err);
      // Fallback attempt to live cloud backend server
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://avyakta-backend.onrender.com';
        const res = await fetch(`${apiUrl}/api/cases/all`);
        if (res.ok) {
          const data = await res.json();
          let filteredData = data;
          if (filter !== 'all') {
            filteredData = data.filter(c => c.status === filter);
          }
          setCases(filteredData || []);
          setError(''); // Cleared if fallback succeeds
          return;
        }
      } catch (fallbackErr) {
        console.error('Fallback fetch error:', fallbackErr);
      }
      setError('Failed to load cases. Please verify your Supabase keys on Vercel, or execute this command in your Supabase SQL Editor: alter table orphan_cases disable row level security;');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCases(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (id, status) => {
    try {
      const { error: err } = await supabase
        .from('orphan_cases')
        .update({ status })
        .eq('id', id);

      if (err) throw err;

      if (filter !== 'all') {
        setCases(prev => prev.filter(c => c.id !== id));
      } else {
        setCases(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      }
      
      showToast(status === 'identified' ? '✅ Case marked as identified!' : status === 'investigating' ? '🔍 Case under investigation' : '❌ Case rejected');
    } catch (err) {
      console.error('Update error:', err);
      setError('Error updating status. Please disable RLS on orphan_cases table in Supabase.');
      
      // Fallback update
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://avyakta-backend.onrender.com';
        await fetch(`${apiUrl}/api/cases/update-status/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
      } catch (e) {}
    }
  };

  const stats = {
    pending:  cases.filter(c => c.status === 'unidentified').length,
    investigating: cases.filter(c => c.status === 'investigating').length,
    resolved: cases.filter(c => c.status === 'identified').length,
  };

  const FILTERS = [
    { key: 'unidentified',  label: '⏳ Unidentified' },
    { key: 'investigating', label: '🔍 Investigating' },
    { key: 'identified', label: '✅ Identified' },
    { key: 'rejected', label: '❌ Rejected' },
    { key: 'all',      label: '📋 All' },
  ];

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #2A1B6B 0%, #100F40 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">

        {/* Navigation between Admin Pages */}
        <div className="flex items-center justify-center mb-6 gap-3 flex-wrap">
          <div className="bg-white/10 p-1 rounded-xl flex gap-1 border border-white/20">
            <button 
              onClick={() => navigate('/admin/cases')}
              className="px-5 py-2 rounded-lg font-bold text-sm bg-white text-indigo-900 shadow"
            >
              Cases / Reports
            </button>
            <button 
              onClick={() => navigate('/admin/ratings')}
              className="px-5 py-2 rounded-lg font-bold text-sm text-indigo-200 hover:bg-white/10 transition-all"
            >
              Feedback / Ratings
            </button>
            <button 
              onClick={() => navigate('/admin/contacts')}
              className="px-5 py-2 rounded-lg font-bold text-sm text-indigo-200 hover:bg-white/10 transition-all"
            >
              Contact Messages
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/20"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' }}
            aria-label="Logout"
          >
            <ArrowRightOnRectangleIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
            Logout
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-merriweather font-bold text-white mb-2">
            Admin — Cases Management
          </h1>
          <p className="text-indigo-200 text-sm">Review, investigate, and resolve reported missing cases.</p>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-white font-semibold shadow-2xl animate-fade-in"
            style={{ background: '#2A1B6B', border: '1px solid rgba(255,255,255,0.2)' }}>
            {toast}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl text-red-300 text-sm text-center"
            style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)' }}>
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Unidentified',         value: stats.pending, color: '#F59E0B' },
            { label: 'Investigating',   value: stats.investigating,    color: '#3B82F6' },
            { label: 'Identified',        value: stats.resolved,     color: '#27AE60' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-indigo-200">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: filter === f.key ? '#fff' : 'rgba(255,255,255,0.1)',
                color:      filter === f.key ? '#2A1B6B' : '#C7D2FE',
                border:     '1px solid rgba(255,255,255,0.2)',
              }}>
              {f.label}
            </button>
          ))}
          <button onClick={fetchCases}
            className="ml-auto px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all hover:bg-white/20"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#C7D2FE', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ArrowPathIcon style={{ width: '0.9rem', height: '0.9rem' }} aria-hidden="true" />
            Refresh
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-indigo-300/30 border-t-indigo-300 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-indigo-200 text-sm">Loading cases...</p>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <ClockIcon style={{ width: '1rem', height: '1rem', color: '#A5B4FC' }} aria-hidden="true" />
              <span className="text-indigo-200 text-sm">No {filter} cases found</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.map(c => (
              <div key={c.id} className="rounded-2xl p-6 transition-all hover:scale-[1.005]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Case Image */}
                  <div className="w-full lg:w-32 h-32 flex-shrink-0">
                    {c.photo_url ? (
                      <img 
                        src={c.photo_url} 
                        alt="Case" 
                        className="w-full h-full object-cover rounded-xl border border-white/10"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                        <span className="text-2xl opacity-50">👤</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-mono text-white text-lg font-bold">{c.case_id}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: c.status === 'identified' ? '#D1FAE5' : c.status === 'rejected' ? '#FEE2E2' : c.status === 'investigating' ? '#DBEAFE' : '#FEF3C7',
                          color:      c.status === 'identified' ? '#065F46' : c.status === 'rejected' ? '#991B1B' : c.status === 'investigating' ? '#1E40AF' : '#92400E',
                        }}>
                        {c.status.toUpperCase()}
                      </span>
                      {c.report_type === 'anonymous' && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-purple-100 text-purple-800">
                          Anonymous
                        </span>
                      )}
                    </div>

                    <blockquote className="text-indigo-100 text-sm leading-relaxed mb-3 italic border-l-2 pl-3"
                      style={{ borderColor: '#6366F1' }}>
                      "{c.description}"
                    </blockquote>

                    <div className="flex flex-wrap gap-4 text-xs mt-4" style={{ color: '#A5B4FC' }}>
                      {c.location && (
                        <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                          <MapPinIcon style={{ width: '0.8rem', height: '0.8rem' }} aria-hidden="true" />
                          {c.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                        <CalendarIcon style={{ width: '0.8rem', height: '0.8rem' }} aria-hidden="true" />
                        Logged: {formatDate(c.created_at)}
                      </span>
                      {c.contact_info && (
                        <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-green-300">
                          <ChatBubbleOvalLeftEllipsisIcon style={{ width: '0.8rem', height: '0.8rem' }} aria-hidden="true" />
                          {c.contact_info}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 lg:flex-col lg:w-40 mt-4 lg:mt-0">
                    {c.status === 'unidentified' && (
                      <button onClick={() => updateStatus(c.id, 'investigating')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-semibold text-xs transition-all hover:opacity-90"
                        style={{ background: '#3B82F6', color: '#fff' }}
                        aria-label="Investigate">
                        <MagnifyingGlassIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
                        Investigate
                      </button>
                    )}
                    {(c.status === 'unidentified' || c.status === 'investigating') && (
                      <button onClick={() => updateStatus(c.id, 'identified')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-semibold text-xs transition-all hover:opacity-90"
                        style={{ background: '#27AE60', color: '#fff' }}
                        aria-label="Resolve">
                        <DocumentCheckIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
                        Mark Identified
                      </button>
                    )}
                    {c.status === 'unidentified' && (
                      <button onClick={() => updateStatus(c.id, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-semibold text-xs transition-all hover:opacity-90"
                        style={{ background: 'rgba(192,57,43,0.8)', color: '#fff' }}
                        aria-label="Reject">
                        <XCircleIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
                        Reject (Spam)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminCases;
