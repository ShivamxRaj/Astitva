import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { StarIcon, MapPinIcon, UserIcon, ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

const RatingForm = ({ onSubmit, onClose, isVisible }) => {
  const [formData, setFormData] = useState({ name: '', rating: 0, comment: '', location: '' });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) setErrors(prev => ({ ...prev, rating: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2)
      errs.name = 'Name must be at least 2 characters';
    if (formData.rating === 0)
      errs.rating = 'Please select a rating';
    if (formData.comment && formData.comment.length > 500)
      errs.comment = 'Comment must be under 500 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const { error } = await supabase.from('ratings').insert([{
      name:      formData.name.trim(),
      rating:    formData.rating,
      comment:   formData.comment.trim() || null,
      location:  formData.location.trim() || null,
      status:    'pending',
      created_at: new Date().toISOString(),
    }]);

    setIsSubmitting(false);

    if (error) {
      setErrors({ submit: 'Failed to submit. Please try again.' });
    } else {
      setFormData({ name: '', rating: 0, comment: '', location: '' });
      setErrors({});
      onSubmit({ success: true });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      role="dialog" aria-modal="true" aria-labelledby="rating-form-title">
      <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        style={{ background: '#fff' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4"
          style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 id="rating-form-title" className="font-merriweather font-bold text-xl" style={{ color: '#1B3A6B' }}>
              Share Your Experience
            </h3>
            <p className="text-xs mt-0.5" style={{ color: '#718096' }}>Help us improve our services</p>
          </div>
          <button onClick={onClose} aria-label="Close rating form"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <XMarkIcon style={{ width: '1.2rem', height: '1.2rem', color: '#718096' }} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Name */}
          <div>
            <label htmlFor="rf-name" className="flex items-center gap-1.5 text-sm font-medium mb-1.5" style={{ color: '#374151' }}>
              <UserIcon style={{ width: '0.9rem', height: '0.9rem', color: '#2E7D9C' }} aria-hidden="true" />
              Your Name *
            </label>
            <input id="rf-name" name="name" type="text" value={formData.name}
              onChange={handleInputChange} placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: errors.name ? '#C0392B' : '#D1D5DB', focusRingColor: '#2E7D9C' }}
              aria-required="true" aria-invalid={!!errors.name} />
            {errors.name && <p className="text-xs mt-1" style={{ color: '#C0392B' }}>{errors.name}</p>}
          </div>

          {/* Stars */}
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: '#374151' }}>Your Rating *</p>
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map(star => (
                <button key={star} type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  className="transition-transform hover:scale-125 focus:outline-none">
                  <StarIcon style={{
                    width: '2rem', height: '2rem',
                    color: star <= (hoveredRating || formData.rating) ? '#FBBF24' : '#D1D5DB',
                    fill:  star <= (hoveredRating || formData.rating) ? '#FBBF24' : 'none',
                    filter: star <= (hoveredRating || formData.rating) ? 'drop-shadow(0 0 4px rgba(251,191,36,0.5))' : 'none',
                    transition: 'all 0.15s',
                  }} aria-hidden="true" />
                </button>
              ))}
            </div>
            {formData.rating > 0 && (
              <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                {['','Poor','Below Average','Average','Good','Excellent'][formData.rating]} — {formData.rating}/5
              </p>
            )}
            {errors.rating && <p className="text-xs mt-1" style={{ color: '#C0392B' }}>{errors.rating}</p>}
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="rf-comment" className="flex items-center gap-1.5 text-sm font-medium mb-1.5" style={{ color: '#374151' }}>
              <ChatBubbleLeftIcon style={{ width: '0.9rem', height: '0.9rem', color: '#2E7D9C' }} aria-hidden="true" />
              Comment <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea id="rf-comment" name="comment" value={formData.comment}
              onChange={handleInputChange} rows={3} placeholder="Share your experience..."
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 resize-none"
              style={{ borderColor: errors.comment ? '#C0392B' : '#D1D5DB' }} />
            <p className="text-xs mt-0.5 text-right" style={{ color: formData.comment.length > 480 ? '#C0392B' : '#9CA3AF' }}>
              {formData.comment.length}/500
            </p>
            {errors.comment && <p className="text-xs" style={{ color: '#C0392B' }}>{errors.comment}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="rf-location" className="flex items-center gap-1.5 text-sm font-medium mb-1.5" style={{ color: '#374151' }}>
              <MapPinIcon style={{ width: '0.9rem', height: '0.9rem', color: '#2E7D9C' }} aria-hidden="true" />
              Location <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
            </label>
            <input id="rf-location" name="location" type="text" value={formData.location}
              onChange={handleInputChange} placeholder="City, State"
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: '#D1D5DB' }} />
          </div>

          {/* Submit error */}
          {errors.submit && (
            <p className="text-sm text-center px-3 py-2 rounded-lg" style={{ background: '#FEE2E2', color: '#991B1B' }}>
              {errors.submit}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-gray-50"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E7D9C)' }}>
              {isSubmitting
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                : 'Submit Rating'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;