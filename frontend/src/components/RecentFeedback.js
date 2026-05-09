import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { StarIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const renderStars = (rating) =>
  [...Array(5)].map((_, i) => (
    <StarIcon key={i} style={{
      width: '0.9rem', height: '0.9rem', display: 'inline',
      color: i < rating ? '#FBBF24' : '#6B7280',
      fill: i < rating ? '#FBBF24' : 'none',
    }} aria-hidden="true" />
  ));

const timeAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7)  return `${diff} days ago`;
  return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
};

const RecentFeedback = () => {
  const [feedback, setFeedback]   = useState([]);
  const [stats, setStats]         = useState({ total: 0, avg: 0, dist: { 1:0,2:0,3:0,4:0,5:0 } });
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      // Approved reviews for display
      const { data: fb, error: fbErr } = await supabase
        .from('ratings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(9);

      if (fbErr) { setError('Failed to load feedback'); setLoading(false); return; }

      // All approved for stats
      const { data: all } = await supabase
        .from('ratings')
        .select('rating')
        .eq('status', 'approved');

      if (all && all.length > 0) {
        const dist = { 1:0,2:0,3:0,4:0,5:0 };
        let sum = 0;
        all.forEach(r => { dist[r.rating] = (dist[r.rating] || 0) + 1; sum += r.rating; });
        setStats({ total: all.length, avg: (sum / all.length).toFixed(1), dist });
      }

      setFeedback(fb || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-8">
      <div className="w-6 h-6 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="text-center py-6">
      <span className="text-sm px-4 py-2 rounded-full"
        style={{ background: 'rgba(192,57,43,0.15)', color: '#FCA5A5', border: '1px solid rgba(192,57,43,0.3)' }}>
        {error}
      </span>
    </div>
  );

  if (feedback.length === 0) return (
    <div className="text-center py-8">
      <span className="text-sm px-5 py-2 rounded-full"
        style={{ background: 'rgba(255,255,255,0.06)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.1)' }}>
        No approved reviews yet — be the first!
      </span>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Reviews', value: stats.total },
          { label: 'Average Rating', value: `${stats.avg} / 5` },
          { label: 'Overall',
            value: <span className="flex justify-center gap-0.5">{renderStars(Math.round(Number(stats.avg)))}</span> },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-center"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedback.map((item, i) => (
          <div key={item.id || i}
            className="rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300"
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', animationDelay:`${i*80}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                {item.location && (
                  <p className="flex items-center gap-1 text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                    <MapPinIcon style={{ width:'0.75rem', height:'0.75rem' }} aria-hidden="true" />
                    {item.location}
                  </p>
                )}
              </div>
              <span className="flex gap-0.5">{renderStars(item.rating)}</span>
            </div>
            {item.comment && (
              <blockquote className="text-sm leading-relaxed mb-3 italic" style={{ color:'#D1D5DB' }}>
                "{item.comment}"
              </blockquote>
            )}
            <div className="flex items-center gap-1 text-xs" style={{ color:'#6B7280' }}>
              <CalendarDaysIcon style={{ width:'0.75rem', height:'0.75rem' }} aria-hidden="true" />
              {timeAgo(item.created_at)}
            </div>
          </div>
        ))}
      </div>

      {/* Rating Distribution */}
      <div className="rounded-2xl p-6"
        style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }}>
        <h4 className="text-sm font-semibold text-white mb-4">Rating Distribution</h4>
        <div className="space-y-2">
          {[5,4,3,2,1].map(r => {
            const count = stats.dist[r] || 0;
            const pct   = stats.total > 0 ? (count / stats.total) * 100 : 0;
            return (
              <div key={r} className="flex items-center gap-3">
                <span className="text-xs text-gray-300 w-4">{r}</span>
                <StarIcon style={{ width:'0.8rem', height:'0.8rem', color:'#FBBF24', fill:'#FBBF24' }} aria-hidden="true" />
                <div className="flex-1 h-2 rounded-full" style={{ background:'rgba(255,255,255,0.1)' }}>
                  <div className="h-2 rounded-full transition-all duration-700"
                    style={{ width:`${pct}%`, background:'linear-gradient(90deg,#FBBF24,#F59E0B)' }} />
                </div>
                <span className="text-xs w-6 text-right" style={{ color:'#9CA3AF' }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentFeedback;