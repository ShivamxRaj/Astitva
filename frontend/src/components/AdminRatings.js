import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { supabase as sb } from '../lib/supabaseClient';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  StarIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const renderStars = (rating) =>
  [...Array(5)].map((_, i) => (
    <StarIcon
      key={i}
      style={{
        width: '1rem', height: '1rem', display: 'inline',
        color: i < rating ? '#FBBF24' : '#4B5563',
        fill: i < rating ? '#FBBF24' : 'none',
      }}
      aria-hidden="true"
    />
  ));

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const AdminRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [filter, setFilter] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchRatings = async () => {
    setLoading(true);
    setError('');
    let query = sb.from('ratings').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);

    const { data, error: err } = await query;
    if (err) { setError('Failed to load ratings: ' + err.message); }
    else { setRatings(data || []); }
    setLoading(false);
  };

  useEffect(() => { fetchRatings(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (id, status) => {
    const { error: err } = await supabase
      .from('ratings')
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq('id', id);

    if (err) { setError(err.message); return; }
    setRatings(prev => prev.filter(r => r.id !== id));
    showToast(status === 'approved' ? '✅ Rating approved!' : '❌ Rating rejected.');
  };

  const stats = {
    pending:  ratings.filter(r => r.status === 'pending').length,
    high:     ratings.filter(r => r.rating >= 4).length,
    low:      ratings.filter(r => r.rating <= 2).length,
  };

  const FILTERS = [
    { key: 'pending',  label: '⏳ Pending' },
    { key: 'approved', label: '✅ Approved' },
    { key: 'rejected', label: '❌ Rejected' },
    { key: 'all',      label: '📋 All' },
  ];

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #0F2440 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">

        {/* Navigation between Admin Pages */}
        <div className="flex items-center justify-center mb-6 gap-3 flex-wrap">
          <div className="bg-white/10 p-1 rounded-xl flex gap-1 border border-white/20">
            <button 
              onClick={() => navigate('/admin/cases')}
              className="px-5 py-2 rounded-lg font-bold text-sm text-blue-200 hover:bg-white/10 transition-all"
            >
              Cases / Reports
            </button>
            <button 
              onClick={() => navigate('/admin/ratings')}
              className="px-5 py-2 rounded-lg font-bold text-sm bg-white text-blue-900 shadow"
            >
              Feedback / Ratings
            </button>
            <button 
              onClick={() => navigate('/admin/contacts')}
              className="px-5 py-2 rounded-lg font-bold text-sm text-blue-200 hover:bg-white/10 transition-all"
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
            Admin — Ratings Management
          </h1>
          <p className="text-blue-200 text-sm">Review, approve, or reject user feedback submissions</p>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-white font-semibold shadow-2xl animate-fade-in"
            style={{ background: '#1B3A6B', border: '1px solid rgba(255,255,255,0.2)' }}>
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
            { label: 'Pending',         value: stats.pending, color: '#F59E0B' },
            { label: 'High (4–5★)',      value: stats.high,    color: '#27AE60' },
            { label: 'Low (1–2★)',       value: stats.low,     color: '#C0392B' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-blue-200">{s.label}</div>
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
                color:      filter === f.key ? '#1B3A6B' : '#BEE3F8',
                border:     '1px solid rgba(255,255,255,0.2)',
              }}>
              {f.label}
            </button>
          ))}
          <button onClick={fetchRatings}
            className="ml-auto px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all hover:bg-white/20"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#BEE3F8', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ArrowPathIcon style={{ width: '0.9rem', height: '0.9rem' }} aria-hidden="true" />
            Refresh
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-blue-300/30 border-t-blue-300 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-blue-200 text-sm">Loading ratings...</p>
          </div>
        ) : ratings.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <ClockIcon style={{ width: '1rem', height: '1rem', color: '#93C5FD' }} aria-hidden="true" />
              <span className="text-blue-200 text-sm">No {filter} ratings found</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {ratings.map(r => (
              <div key={r.id} className="rounded-2xl p-6 transition-all hover:scale-[1.005]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-bold text-white text-lg">{r.name}</h3>
                      <span className="flex gap-0.5">{renderStars(r.rating)}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: r.status === 'approved' ? '#D1FAE5' : r.status === 'rejected' ? '#FEE2E2' : '#FEF3C7',
                          color:      r.status === 'approved' ? '#065F46' : r.status === 'rejected' ? '#991B1B' : '#92400E',
                        }}>
                        {r.status}
                      </span>
                    </div>

                    {r.comment && (
                      <blockquote className="text-blue-100 text-sm leading-relaxed mb-3 italic border-l-2 pl-3"
                        style={{ borderColor: '#2E7D9C' }}>
                        "{r.comment}"
                      </blockquote>
                    )}

                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: '#93C5FD' }}>
                      {r.location && (
                        <span className="flex items-center gap-1">
                          <MapPinIcon style={{ width: '0.8rem', height: '0.8rem' }} aria-hidden="true" />
                          {r.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <CalendarIcon style={{ width: '0.8rem', height: '0.8rem' }} aria-hidden="true" />
                        {formatDate(r.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Actions (only for pending) */}
                  {r.status === 'pending' && (
                    <div className="flex gap-3 lg:flex-col lg:w-36">
                      <button onClick={() => updateStatus(r.id, 'approved')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                        style={{ background: '#27AE60', color: '#fff' }}
                        aria-label="Approve rating">
                        <CheckCircleIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
                        Approve
                      </button>
                      <button onClick={() => updateStatus(r.id, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                        style={{ background: 'rgba(192,57,43,0.8)', color: '#fff' }}
                        aria-label="Reject rating">
                        <XCircleIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Setup hint when no table yet */}
        {error && error.includes('relation') && (
          <div className="mt-6 p-4 rounded-xl text-sm"
            style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#FDE68A' }}>
            <p className="font-bold mb-1">⚠️ Supabase table not found!</p>
            <p>Create a <code>ratings</code> table in Supabase SQL Editor (instructions sent above).</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminRatings;