import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
  EnvelopeIcon,
  PhoneIcon,
  TagIcon,
  TrashIcon,
  ArrowPathIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'general' | 'report' | 'feedback' | 'emergency'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const res = await fetch(`${apiUrl}/api/contact/all`);
      if (!res.ok) throw new Error('Failed to fetch contact messages from server');
      const data = await res.json();

      let filteredData = data;
      if (filter !== 'all') {
        filteredData = data.filter(m => m.category === filter);
      }
      setMessages(filteredData || []);
    } catch (err) {
      setError('Failed to load contact messages: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const res = await fetch(`${apiUrl}/api/contact/${id}`, { method: 'DELETE' });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to delete message');
      
      setMessages(prev => prev.filter(m => m.id !== id));
      showToast('🗑️ Message deleted successfully');
    } catch (err) {
      setError('Failed to delete message: ' + err.message);
    }
  };

  const stats = {
    total: messages.length,
    emergency: messages.filter(m => m.category === 'emergency').length,
    reports: messages.filter(m => m.category === 'report').length,
  };

  const FILTERS = [
    { key: 'all',       label: '📋 All Messages' },
    { key: 'emergency', label: '🚨 Emergency' },
    { key: 'report',    label: '⚠️ Report Issue' },
    { key: 'general',   label: '💬 General' },
    { key: 'feedback',  label: '💡 Feedback' },
  ];

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'emergency':
        return { bg: '#FEE2E2', text: '#991B1B', label: 'EMERGENCY' };
      case 'report':
        return { bg: '#FEF3C7', text: '#92400E', label: 'REPORT ISSUE' };
      case 'feedback':
        return { bg: '#D1FAE5', text: '#065F46', label: 'FEEDBACK' };
      default:
        return { bg: '#DBEAFE', text: '#1E40AF', label: 'GENERAL' };
    }
  };

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
              className="px-5 py-2 rounded-lg font-bold text-sm text-blue-200 hover:bg-white/10 transition-all"
            >
              Feedback / Ratings
            </button>
            <button 
              onClick={() => navigate('/admin/contacts')}
              className="px-5 py-2 rounded-lg font-bold text-sm bg-white text-blue-900 shadow"
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
            Admin — Contact Messages
          </h1>
          <p className="text-blue-200 text-sm">Review incoming queries, issue reports, and emergency messages from users.</p>
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
            { label: 'Total Messages', value: stats.total,     color: '#3B82F6' },
            { label: 'Emergency',      value: stats.emergency, color: '#EF4444' },
            { label: 'Issue Reports',  value: stats.reports,   color: '#F59E0B' },
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
          <button onClick={fetchMessages}
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
            <p className="text-blue-200 text-sm">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <ClockIcon style={{ width: '1rem', height: '1rem', color: '#93C5FD' }} aria-hidden="true" />
              <span className="text-blue-200 text-sm">No messages found for category: {filter}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(m => {
              const badge = getCategoryBadge(m.category);
              return (
                <div key={m.id} className="rounded-2xl p-6 transition-all hover:scale-[1.005]"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    
                    {/* Message Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-bold text-white text-lg">{m.name}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold tracking-wider"
                          style={{ background: badge.bg, color: badge.text }}>
                          {badge.label}
                        </span>
                        <span className="text-xs text-blue-300 ml-auto flex items-center gap-1">
                          <ClockIcon style={{ width: '0.8rem', height: '0.8rem' }} />
                          {formatDate(m.created_at)}
                        </span>
                      </div>

                      {/* Contact specific links */}
                      <div className="flex flex-wrap gap-4 text-xs font-medium mb-3 pt-1 border-t border-white/5" style={{ color: '#93C5FD' }}>
                        <a href={`mailto:${m.email}`} className="flex items-center gap-1 hover:underline text-blue-200">
                          <EnvelopeIcon style={{ width: '0.85rem', height: '0.85rem' }} />
                          {m.email}
                        </a>
                        <a href={`tel:${m.mobile}`} className="flex items-center gap-1 hover:underline text-green-300">
                          <PhoneIcon style={{ width: '0.85rem', height: '0.85rem' }} />
                          {m.mobile}
                        </a>
                      </div>

                      <blockquote className="text-blue-50 text-sm leading-relaxed italic border-l-2 pl-3 bg-white/5 p-3 rounded-r-lg"
                        style={{ borderColor: badge.text }}>
                        "{m.message}"
                      </blockquote>
                    </div>

                    {/* Delete Action */}
                    <button onClick={() => deleteMessage(m.id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg font-semibold text-xs transition-all hover:bg-red-500 hover:text-white self-end lg:self-center"
                      style={{ background: 'rgba(239,68,68,0.15)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' }}
                      aria-label="Delete message">
                      <TrashIcon style={{ width: '0.9rem', height: '0.9rem' }} />
                      Delete
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminContacts;
