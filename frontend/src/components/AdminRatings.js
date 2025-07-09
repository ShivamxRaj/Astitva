import React, { useState, useEffect } from 'react';

const AdminRatings = () => {
  const [pendingRatings, setPendingRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPendingRatings();
  }, []);

  const fetchPendingRatings = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/ratings/admin/pending');
      const result = await response.json();
      
      if (result.success) {
        setPendingRatings(result.data);
      } else {
        setError('Failed to load pending ratings');
      }
    } catch (error) {
      setError('Failed to load pending ratings');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (ratingId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/ratings/admin/approve/${ratingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage('Rating approved successfully!');
        // Remove from pending list
        setPendingRatings(prev => prev.filter(rating => rating._id !== ratingId));
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to approve rating');
      }
    } catch (error) {
      setError('Failed to approve rating');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating
            ? 'text-yellow-400'
            : 'text-gray-500'
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading pending ratings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Admin Ratings Management
            </h1>
            <p className="text-gray-300">
              Review and approve user feedback submissions
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="max-w-md mx-auto mb-8 bg-green-500/10 border border-green-400/20 rounded-2xl p-4 text-center">
              <p className="text-green-400 font-medium">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-md mx-auto mb-8 bg-red-500/10 border border-red-400/20 rounded-2xl p-4 text-center">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{pendingRatings.length}</div>
              <div className="text-sm text-gray-300">Pending Reviews</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {pendingRatings.filter(r => r.rating >= 4).length}
              </div>
              <div className="text-sm text-gray-300">High Ratings (4-5★)</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {pendingRatings.filter(r => r.rating <= 2).length}
              </div>
              <div className="text-sm text-gray-300">Low Ratings (1-2★)</div>
            </div>
          </div>

          {/* Pending Ratings */}
          {pendingRatings.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-gray-300">No pending ratings to review</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingRatings.map((rating) => (
                <div
                  key={rating._id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Rating Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-white text-lg mb-1">
                            {rating.name}
                          </h3>
                          {rating.location && (
                            <p className="text-sm text-gray-400">{rating.location}</p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {renderStars(rating.rating)}
                        </div>
                      </div>

                      {rating.comment && (
                        <blockquote className="text-gray-300 text-sm leading-relaxed mb-4 italic border-l-2 border-purple-400 pl-4">
                          "{rating.comment}"
                        </blockquote>
                      )}

                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>Submitted: {formatDate(rating.createdAt)}</span>
                        <span>IP: {rating.ipAddress}</span>
                        {rating.userAgent && (
                          <span className="hidden lg:inline">
                            Device: {rating.userAgent.substring(0, 50)}...
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 lg:w-48">
                      <button
                        onClick={() => handleApprove(rating._id)}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          // For now, just remove from list (in production, you'd want to mark as rejected)
                          setPendingRatings(prev => prev.filter(r => r._id !== rating._id));
                        }}
                        className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-200 font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Refresh Button */}
          <div className="text-center mt-8">
            <button
              onClick={fetchPendingRatings}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">🔄</span>
                Refresh Pending Ratings
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRatings; 