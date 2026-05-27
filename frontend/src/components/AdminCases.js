import React, { useState, useEffect } from 'react';
import { supabase, supabaseAdmin } from '../lib/supabaseClient';
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

const getCategoryTag = (text) => {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (lower.includes('officer')) return { label: 'OFFICER', bg: 'bg-blue-600 text-white font-extrabold shadow-sm border border-blue-400' };
  if (lower.includes('family')) return { label: 'FAMILY', bg: 'bg-pink-600 text-white font-extrabold shadow-sm border border-pink-400' };
  if (lower.includes('volunteer')) return { label: 'VOLUNTEER', bg: 'bg-amber-600 text-white font-extrabold shadow-sm border border-amber-400' };
  return null;
};

const AdminCases = () => {
  const [cases, setCases] = useState([]);
  const [filter, setFilter] = useState('unidentified'); // 'unidentified' | 'investigating' | 'identified' | 'all'
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all'); // 'all' | '24h' | 'week' | 'month' | 'custom'
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const syncOfflineReports = async () => {
    try {
      const offlineReports = JSON.parse(localStorage.getItem('citizen_offline_reports') || '[]');
      if (offlineReports.length === 0) return;

      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:5001'
        : (process.env.REACT_APP_API_URL || 'https://avyakta-backend.onrender.com');

      const remainingReports = [];

      for (const report of offlineReports) {
        if (!report.id) {
          try {
            const response = await fetch(`${apiUrl}/api/cases/report`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                location: report.location,
                date_of_sighting: report.date_of_sighting,
                description: report.description,
                contact_info: report.contact_info,
                additional_info: report.additional_info,
                photo_url: report.photo_url,
                gender: report.gender,
                approximate_age: report.approximate_age,
                height_cm: report.height_cm,
                clothing: report.clothing,
                identifying_marks: report.identifying_marks
              })
            });

            if (response.ok) {
              const resData = await response.json();
              if (resData.success) {
                console.log(`Synced offline report: ${report.case_id}`);
                continue;
              }
            }
          } catch (uploadErr) {
            console.warn(`Failed to sync offline report ${report.case_id}:`, uploadErr);
          }
        }
        remainingReports.push(report);
      }

      localStorage.setItem('citizen_offline_reports', JSON.stringify(remainingReports));
    } catch (e) {
      console.error('Error syncing offline reports:', e);
    }
  };

  const fetchCases = async () => {
    setLoading(true);
    setError('');
    await syncOfflineReports();
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
      // Fallback attempt to backend server
      try {
        const apiUrl = window.location.hostname === 'localhost'
          ? 'http://localhost:5001'
          : (process.env.REACT_APP_API_URL || 'https://avyakta-backend.onrender.com');
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
      // Guarantee offline citizen database entries are synchronized with active admin lists
      try {
        const offlineReports = JSON.parse(localStorage.getItem('citizen_offline_reports') || '[]');
        if (offlineReports.length > 0) {
          setCases(prev => {
            const existingIds = new Set(prev.map(c => c.case_id));
            const freshItems = offlineReports.filter(c => !existingIds.has(c.case_id));
            let merged = [...freshItems, ...prev];
            if (filter !== 'all') {
              merged = merged.filter(c => c.status === filter);
            }
            return merged;
          });
        }
      } catch (storageMergeErr) {}
    }
  };

  useEffect(() => { fetchCases(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (id, status) => {
    setError('');
    const apiUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:5001'
      : (process.env.REACT_APP_API_URL || 'https://avyakta-backend.onrender.com');

    try {
      // 1. Try to update via the Backend API (Secure & handles RLS bypass on server)
      const res = await fetch(`${apiUrl}/api/cases/update-status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const resData = await res.json();
      if (!resData.success) {
        throw new Error(resData.message || 'Failed to update case status via backend');
      }

      // Successful update
      if (filter !== 'all') {
        setCases(prev => prev.filter(c => c.id !== id));
      } else {
        setCases(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      }
      
      showToast(status === 'identified' ? '✅ Case marked as identified!' : status === 'investigating' ? '🔍 Case under investigation' : '❌ Case rejected');
    } catch (err) {
      console.warn('Backend API update failed, falling back to direct Supabase client:', err);
      
      // 2. Fallback to direct client-side update
      try {
        const { error: sbErr } = await supabaseAdmin
          .from('orphan_cases')
          .update({ status })
          .eq('id', id);

        if (sbErr) throw sbErr;

        if (filter !== 'all') {
          setCases(prev => prev.filter(c => c.id !== id));
        } else {
          setCases(prev => prev.map(c => c.id === id ? { ...c, status } : c));
        }
        
        showToast(status === 'identified' ? '✅ Case marked as identified!' : status === 'investigating' ? '🔍 Case under investigation' : '❌ Case rejected');
      } catch (fallbackErr) {
        console.error('All update routes failed:', fallbackErr);
        setError('Error updating status. Please verify your backend server connection or disable RLS in Supabase.');
      }
    }
  };

  const getFilteredCases = () => {
    return cases.filter(c => {
      // 1. Text Search (Case ID, Contact Info, Description)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const caseIdMatch = c.case_id && c.case_id.toLowerCase().includes(query);
        const contactMatch = c.contact_info && c.contact_info.toLowerCase().includes(query);
        const descriptionMatch = c.description && c.description.toLowerCase().includes(query);
        const nameMatch = c.name && c.name.toLowerCase().includes(query);
        
        if (!caseIdMatch && !contactMatch && !descriptionMatch && !nameMatch) {
          return false;
        }
      }

      // 2. Location Search
      if (locationSearch.trim()) {
        const locQuery = locationSearch.toLowerCase();
        const locationMatch = c.location && c.location.toLowerCase().includes(locQuery);
        if (!locationMatch) return false;
      }

      // 3. Date Range Filter
      if (dateRange !== 'all') {
        const createdAt = new Date(c.created_at || c.date_of_sighting);
        const now = new Date();
        
        if (dateRange === '24h') {
          const limit = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          if (createdAt < limit) return false;
        } else if (dateRange === 'week') {
          const limit = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (createdAt < limit) return false;
        } else if (dateRange === 'month') {
          const limit = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (createdAt < limit) return false;
        } else if (dateRange === 'custom') {
          if (customStartDate) {
            const start = new Date(customStartDate);
            start.setHours(0, 0, 0, 0);
            if (createdAt < start) return false;
          }
          if (customEndDate) {
            const end = new Date(customEndDate);
            end.setHours(23, 59, 59, 999);
            if (createdAt > end) return false;
          }
        }
      }

      return true;
    });
  };

  const hasActiveFilters = searchTerm || locationSearch || dateRange !== 'all';

  const handleResetFilters = () => {
    setSearchTerm('');
    setLocationSearch('');
    setDateRange('all');
    setCustomStartDate('');
    setCustomEndDate('');
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

        {/* Advanced Filters */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">⚡ Advanced Search & Filters</h3>
            {hasActiveFilters && (
              <button 
                onClick={handleResetFilters}
                className="text-xs font-bold text-indigo-300 hover:text-white transition-colors flex items-center gap-1"
              >
                ✕ Clear All Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-indigo-200">🔍 Search</label>
              <input
                type="text"
                placeholder="Search by Case ID, Contact, Description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/20 transition-all"
              />
            </div>

            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-indigo-200">📍 Location</label>
              <input
                type="text"
                placeholder="Filter by city, state, landmark..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/20 transition-all"
              />
            </div>

            {/* Date Range Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-indigo-200">📅 Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-indigo-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-indigo-800 transition-all"
              >
                <option value="all">All Time</option>
                <option value="24h">Last 24 Hours</option>
                <option value="week">This Week</option>
                <option value="month">Last 30 Days</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>
            
          </div>

          {/* Custom Date Range Inputs */}
          {dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-indigo-200">From Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-indigo-200">To Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>
          )}
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
        ) : getFilteredCases().length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <ClockIcon style={{ width: '1rem', height: '1rem', color: '#A5B4FC' }} aria-hidden="true" />
              <span className="text-indigo-200 text-sm">No matching cases found for the selected filters</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {getFilteredCases().map(c => (
              <div key={c.id} className="rounded-2xl p-6 transition-all hover:scale-[1.005]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Case Image */}
                  <div className="w-full lg:w-32 h-32 flex-shrink-0 relative group">
                    {c.photo_url ? (
                      <div 
                        onClick={() => setSelectedImage(c.photo_url)}
                        className="w-full h-full relative cursor-pointer overflow-hidden rounded-xl border border-white/10 block"
                        title="Click to view fullscreen preview"
                      >
                        <img 
                          src={c.photo_url} 
                          alt="Case Thumbnail" 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = 'https://images.unsplash.com/photo-1544502062-f82887f03d1c?auto=format&fit=crop&w=300&q=80'; 
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-white/5 rounded-xl flex flex-col items-center justify-center border border-white/10 p-2 text-center">
                        <span className="text-2xl opacity-40 mb-1">👤</span>
                        <span className="text-[10px] font-bold text-indigo-300 tracking-wider uppercase block">No Image Provided</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 break-words overflow-hidden">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h3 className="font-mono text-white text-lg font-bold truncate max-w-full">{c.case_id}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold tracking-wide shrink-0"
                        style={{
                          background: c.status === 'identified' ? '#D1FAE5' : c.status === 'rejected' ? '#FEE2E2' : c.status === 'investigating' ? '#DBEAFE' : '#FEF3C7',
                          color:      c.status === 'identified' ? '#065F46' : c.status === 'rejected' ? '#991B1B' : c.status === 'investigating' ? '#1E40AF' : '#92400E',
                        }}>
                        {c.status.toUpperCase()}
                      </span>
                      {(() => {
                        const tag = getCategoryTag(c.description || '') || getCategoryTag(c.additional_info || '');
                        if (!tag) return null;
                        return (
                          <span className={`text-[10px] px-2 py-0.5 rounded tracking-wider shrink-0 ${tag.bg}`}>
                            {tag.label}
                          </span>
                        );
                      })()}
                      {c.report_type === 'anonymous' && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-100 text-purple-800 shrink-0">
                          Anonymous
                        </span>
                      )}
                    </div>

                    <blockquote className="text-indigo-100 text-sm leading-relaxed mb-3 italic border-l-2 pl-3 break-words"
                      style={{ borderColor: '#6366F1' }}>
                      "{c.description}"
                    </blockquote>

                    <div className="flex flex-wrap gap-3 text-xs mt-4 overflow-hidden" style={{ color: '#A5B4FC' }}>
                      {c.location && (
                        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded truncate max-w-full">
                          <MapPinIcon style={{ width: '0.8rem', height: '0.8rem', flexShrink: 0 }} aria-hidden="true" />
                          <span className="truncate">{c.location}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded shrink-0">
                        <CalendarIcon style={{ width: '0.8rem', height: '0.8rem', flexShrink: 0 }} aria-hidden="true" />
                        Logged: {formatDate(c.created_at)}
                      </span>
                      {c.contact_info && (
                        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-green-300 truncate max-w-full">
                          <ChatBubbleOvalLeftEllipsisIcon style={{ width: '0.8rem', height: '0.8rem', flexShrink: 0 }} aria-hidden="true" />
                          <span className="truncate">{c.contact_info}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:w-44 mt-4 lg:mt-0 shrink-0">
                    {c.status === 'unidentified' && (
                      <button onClick={() => updateStatus(c.id, 'investigating')}
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/30"
                        style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#fff' }}
                        aria-label="Investigate">
                        <MagnifyingGlassIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
                        Investigate
                      </button>
                    )}
                    {(c.status === 'unidentified' || c.status === 'investigating') && (
                      <button onClick={() => updateStatus(c.id, 'identified')}
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/30"
                        style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', color: '#fff' }}
                        aria-label="Resolve">
                        <DocumentCheckIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
                        Mark Identified
                      </button>
                    )}
                    {c.status === 'unidentified' && (
                      <button onClick={() => updateStatus(c.id, 'rejected')}
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/30"
                        style={{ background: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)', color: '#fff' }}
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

        {/* Fullscreen Lightbox Modal Preview */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white rounded-full p-2 transition-colors z-10"
                title="Close fullscreen preview"
              >
                <XCircleIcon className="w-8 h-8" />
              </button>
              <img 
                src={selectedImage} 
                alt="Fullscreen Case Preview" 
                className="w-full h-auto max-h-[85vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminCases;
