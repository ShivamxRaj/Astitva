import React, { useState, useEffect } from "react";
import RatingForm from "./RatingForm";
import RecentFeedback from "./RecentFeedback";

const TESTIMONIALS = [
  {
    icon: "🌟",
    text: "I never thought reporting an unclaimed soul could be this simple. Avyakta gave me courage when I was afraid to step forward.",
    author: "jaspreet kaur",
    location: "punjab",
    rating: 5,
  },
  {
    icon: "💡",
    text: "I was scared of police and paperwork. But this platform made me feel safe. I could report anonymously and still make a difference.",
    author: "Shreya Singh",
    location: "Delhi",
    rating: 5,
  },
  {
    icon: "🕯",
    text: "When I saw someone lying unconscious, I didn't know what to do. This site guided me like a guardian angel. It saved a life that day.",
    author: "A Common Man with a Big Heart",
    location: "Mumbai",
    rating: 5,
  },
  {
    icon: "🙏",
    text: "Our village never had such a system. Avyakta is not just a website. It's hope. It's dignity. It's voice for the voiceless.",
    author: "Panchayat Member",
    location: "Bihar",
    rating: 5,
  },
  {
    icon: "👁‍🗨",
    text: "This is more than tech. This is humanity encoded into a platform. I wish every state had something like Avyakta.",
    author: "Social Worker",
    location: "Maharashtra",
    rating: 5,
  },
  {
    icon: "💬",
    text: "I could chat with a bot and get help instantly. I didn't feel alone. Avyakta made me feel heard.",
    author: "Shivam Raj",
    location: "Kolkata",
    rating: 5,
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center gap-1 mb-4">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-xl transition-all duration-300 ${
            index < rating
              ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.6)]"
              : "text-gray-500"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showRecentFeedback, setShowRecentFeedback] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      next();
    }, 2500); // 2.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    // Resume auto-play after 5 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleRatingSubmit = (result) => {
    setSubmissionSuccess(result.message);
    setShowRatingForm(false);
    // Show success message for 3 seconds
    setTimeout(() => setSubmissionSuccess(null), 3000);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Real stories from families who found closure through our platform.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowRatingForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                Rate Your Experience
              </span>
            </button>
            <button
              onClick={() => setShowRecentFeedback(!showRecentFeedback)}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">💬</span>
                {showRecentFeedback ? 'Hide Recent Feedback' : 'View Recent Feedback'}
              </span>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {submissionSuccess && (
          <div className="max-w-md mx-auto mb-8 bg-green-500/10 border border-green-400/20 rounded-2xl p-4 text-center">
            <p className="text-green-400 font-medium">{submissionSuccess}</p>
          </div>
        )}

        {/* Recent Feedback Section */}
        {showRecentFeedback && (
          <div className="max-w-6xl mx-auto mb-16">
            <RecentFeedback />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div
            className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl px-8 py-12 text-center transition-all duration-700 animate-fade-in-up"
            style={{
              boxShadow: "0 4px 32px 0 rgba(147, 51, 234, 0.1), 0 0 0 2px rgba(255,255,255,0.04)",
              minHeight: 380,
            }}
          >
            {/* Remove the emoji/icon from the testimonial card */}
            {/* <div className="flex justify-center mb-6">
              <span
                className="text-5xl md:text-6xl drop-shadow-[0_0_12px_rgba(147,51,234,0.5)] animate-pulse"
                aria-hidden
              >
                {TESTIMONIALS[current].icon}
              </span>
            </div> */}
            
            {/* Star Rating */}
            <StarRating rating={TESTIMONIALS[current].rating} />
            
            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8 transition-all duration-500 max-w-3xl mx-auto">
              "{TESTIMONIALS[current].text}"
            </blockquote>
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-semibold text-purple-300 drop-shadow-[0_0_6px_rgba(147,51,234,0.7)]">
                — {TESTIMONIALS[current].author}
              </span>
              {TESTIMONIALS[current].location && (
                <span className="text-sm text-gray-400">
                  {TESTIMONIALS[current].location}
                </span>
              )}
            </div>

            {/* Auto-play indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <span className="text-xs text-gray-300">
                  {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                aria-label="Previous testimonial"
                onClick={() => {
                  prev();
                  handleUserInteraction();
                }}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 shadow-lg backdrop-blur-sm"
              >
                <span className="text-2xl">‹</span>
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => {
                  next();
                  handleUserInteraction();
                }}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 shadow-lg backdrop-blur-sm"
              >
                <span className="text-2xl">›</span>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrent(idx);
                    handleUserInteraction();
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === current
                      ? "bg-purple-400 shadow shadow-purple-400/50 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-purple-400">💙</span>
            <span className="text-gray-300 text-sm">
              <span className="text-purple-400 font-semibold">{TESTIMONIALS.length}</span> real stories of hope and closure
            </span>
          </div>
          
          {/* Average Rating Display */}
          <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
            <span className="text-gray-300 text-sm">
              <span className="text-purple-400 font-semibold">5.0</span> average rating
            </span>
          </div>
        </div>
      </div>

      {/* Rating Form Modal */}
      <RatingForm
        isVisible={showRatingForm}
        onClose={() => setShowRatingForm(false)}
        onSubmit={handleRatingSubmit}
      />
    </section>
  );
};

export default Testimonials; 