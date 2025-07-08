import React, { useState, useEffect } from 'react';

const RecentFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({
    totalRatings: 0,
    averageRating: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedback();
    fetchStats();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/ratings/approved');
      const result = await response.json();
      
      if (result.success) {
        setFeedback(result.data);
      } else {
        setError('Failed to load feedback');
      }
    } catch (error) {
      setError('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/ratings/stats');
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating
            ? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(255,255,0,0.4)]'
            : 'text-gray-500'
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <div className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
          <span className="text-gray-300 text-sm">Loading feedback...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-400/20 rounded-full">
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (feedback.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <span className="text-gray-300 text-sm">No feedback available yet</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">{stats.totalRatings}</div>
          <div className="text-sm text-gray-300">Total Ratings</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">{stats.averageRating}</div>
          <div className="text-sm text-gray-300">Average Rating</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
          <div className="flex justify-center gap-1 mb-2">
            {renderStars(Math.round(stats.averageRating))}
          </div>
          <div className="text-sm text-gray-300">Overall Score</div>
        </div>
      </div>

      {/* Recent Feedback Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedback.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                {item.location && (
                  <p className="text-xs text-gray-400">{item.location}</p>
                )}
              </div>
              <div className="flex gap-1">
                {renderStars(item.rating)}
              </div>
            </div>

            {/* Comment */}
            {item.comment && (
              <blockquote className="text-gray-300 text-sm leading-relaxed mb-4 italic">
                "{item.comment}"
              </blockquote>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{formatDate(item.createdAt)}</span>
              <span className="text-purple-400">★ {item.rating}/5</span>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Distribution */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Rating Distribution</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating] || 0;
            const percentage = stats.totalRatings > 0 ? (count / stats.totalRatings) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-16">
                  <span className="text-sm text-gray-300">{rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentFeedback; 