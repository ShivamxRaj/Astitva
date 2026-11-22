import React, { useState, useRef } from "react";
import RatingForm from "./RatingForm";
import RecentFeedback from "./RecentFeedback";

const TESTIMONIALS = [
  {
    text: "I never thought reporting an unclaimed soul could be this simple. Avaykta gave me courage when I was afraid to step forward.",
    author: "Jaspreet Kaur",
    role: "Sister of Missing Person",
    location: "Punjab",
    badge: "Family",
    rating: 5,
  },
  {
    text: "I was scared of police and paperwork. But this platform made me feel safe. I could report anonymously and still make a difference.",
    author: "Shreya Singh",
    role: "Concerned Citizen",
    location: "Delhi",
    badge: "Volunteer",
    rating: 5,
  },
  {
    text: "When I saw someone lying unconscious, I didn't know what to do. This site guided me like a guardian angel. It saved a life that day.",
    author: "Arun Mehta",
    role: "Auto-rickshaw Driver",
    location: "Mumbai",
    badge: "Volunteer",
    rating: 5,
  },
  {
    text: "Our village never had such a system. Avaykta is not just a website. It's hope. It's dignity. It's voice for the voiceless.",
    author: "Rakesh Yadav",
    role: "Panchayat Member",
    location: "Bihar",
    badge: "Officer",
    rating: 5,
  },
  {
    text: "This is more than tech. This is humanity encoded into a platform. I wish every state had something like Avaykta.",
    author: "Nandini Patil",
    role: "Social Worker",
    location: "Maharashtra",
    badge: "Volunteer",
    rating: 5,
  },
  {
    text: "I could chat with a bot and get help instantly. I didn't feel alone. Avaykta made me feel heard.",
    author: "Shivam Raj",
    role: "Reporting Witness",
    location: "Kolkata",
    badge: "Family",
    rating: 5,
  },
  {
    text: "As a station officer, the dashboard makes case tracking effortless. Every unclaimed body now has a digital file within minutes.",
    author: "Inspector Sharma",
    role: "Police Officer",
    location: "Chandigarh",
    badge: "Officer",
    rating: 5,
  },
  {
    text: "We use Avaykta to coordinate between hospitals and morgues. It has reduced identification time by nearly 60% in our district.",
    author: "Dr. Meena Rao",
    role: "District Medical Officer",
    location: "Lucknow",
    badge: "Medical",
    rating: 5,
  },
];

/* ── Helper: extract initials from name ── */
function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ── Helper: badge color based on type ── */
function badgeLabel(badge) {
  const map = { Family: "Family", Officer: "Officer", Volunteer: "Volunteer", Medical: "Medical" };
  return map[badge] || badge;
}

/* ── Small star row (14px) ── */
const SmallStars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ fontSize: "14px", color: i < rating ? "#D97706" : "#E2E8F0" }}>★</span>
    ))}
  </div>
);

/* ── Single testimonial card ── */
const TestimonialCard = ({ item }) => {
  return (
    <div
      className="flex flex-col justify-between w-[320px] sm:w-[380px] flex-shrink-0"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "22px 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#93C5FD";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(27,58,107,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E2E8F0";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
      }}
    >
      {/* Top row: open-quote + stars */}
      <div className="flex items-center justify-between mb-3">
        <span
          style={{
            color: "#2E7D9C",
            fontSize: "2.8rem",
            lineHeight: "0.8",
            fontFamily: "Georgia, serif",
            opacity: 0.6,
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <SmallStars rating={item.rating || 5} />
      </div>

      {/* Quote text */}
      <blockquote
        className="flex-1 mb-4 text-xs sm:text-sm text-slate-600 italic leading-relaxed"
        style={{ minHeight: "68px" }}
      >
        "{item.text}"
      </blockquote>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
        {/* Avatar circle with initials */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
          style={{
            width: "38px",
            height: "38px",
            background: "linear-gradient(135deg, #1E3A8A, #0284C7)",
            border: "1.5px solid rgba(255,255,255,0.8)",
          }}
        >
          {getInitials(item.author)}
        </div>

        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <div
            className="truncate text-slate-800 font-semibold text-xs sm:text-sm"
          >
            {item.author}
          </div>
          <div
            className="truncate text-slate-500 text-[11px] sm:text-xs"
          >
            {item.role} · {item.location}
          </div>
        </div>

        {/* Badge pill */}
        <span
          className="flex-shrink-0 text-[10px] px-2.5 py-0.5 rounded-full font-medium"
          style={{
            background: "#E0F2FE",
            border: "1px solid #BAE6FD",
            color: "#0369A1",
          }}
        >
          {badgeLabel(item.badge)}
        </span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   Main Testimonials Component
   ═══════════════════════════════════════ */
const Testimonials = () => {
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showRecentFeedback, setShowRecentFeedback] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const sectionRef = useRef(null);

  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4, 8);
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];

  const handleRatingSubmit = () => {
    setSubmissionSuccess("Thank you! Your feedback has been submitted for review.");
    setShowRatingForm(false);
    setTimeout(() => setSubmissionSuccess(null), 4000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{
        backgroundColor: "#F0F4F8",
      }}
    >
      <div className="relative z-10 w-full">
        {/* ── Section Header ── */}
        <div className="text-center mb-10 sm:mb-14 px-4">
          <h2
            className="font-merriweather font-bold mb-2"
            style={{
              color: "#1B3A6B",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            }}
          >
            Voices of Those We Served
          </h2>
          {/* Teal underline accent */}
          <div
            className="mx-auto"
            style={{
              width: "48px",
              height: "3px",
              background: "#2E7D9C",
              marginTop: "8px",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* ── Sliding Marquee Showcase ── */}
        <div className="relative w-full overflow-hidden marquee-container py-2">
          {/* Edge Fade Gradients */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-20"
            style={{
              background: "linear-gradient(to right, #F0F4F8 0%, rgba(240,244,248,0) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-20"
            style={{
              background: "linear-gradient(to left, #F0F4F8 0%, rgba(240,244,248,0) 100%)",
            }}
          />

          {/* Row 1 — Continuous Slide Left */}
          <div className="marquee-track-left mb-6">
            {marqueeRow1.map((item, idx) => (
              <TestimonialCard key={`r1-${idx}`} item={item} />
            ))}
          </div>

          {/* Row 2 — Continuous Slide Right */}
          <div className="marquee-track-right">
            {marqueeRow2.map((item, idx) => (
              <TestimonialCard key={`r2-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* ── Success Message ── */}
        {submissionSuccess && (
          <div className="max-w-md mx-auto mt-8 rounded-lg p-4 text-center" style={{ background: "rgba(39,174,96,0.12)", border: "1px solid rgba(39,174,96,0.25)" }}>
            <p style={{ color: "#27AE60", fontWeight: 500, fontSize: "0.9rem" }}>{submissionSuccess}</p>
          </div>
        )}

        {/* ── Recent Feedback ── */}
        {showRecentFeedback && (
          <div className="max-w-6xl mx-auto mt-10 px-4">
            <RecentFeedback />
          </div>
        )}

        {/* ── Action Buttons ── */}
        <div className="flex flex-wrap gap-3 justify-center items-center mt-10 sm:mt-14 px-4">
          <button
            onClick={() => setShowRatingForm(true)}
            className="inline-flex items-center gap-2 font-semibold transition-all duration-200"
            style={{
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              color: "#1B3A6B",
              borderRadius: "999px",
              padding: "9px 22px",
              fontSize: "0.85rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F8FAFC";
              e.currentTarget.style.borderColor = "#94A3B8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.borderColor = "#CBD5E1";
            }}
          >
            Rate Your Experience
          </button>
          <button
            onClick={() => setShowRecentFeedback(!showRecentFeedback)}
            className="inline-flex items-center gap-2 font-semibold transition-all duration-200"
            style={{
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              color: "#1B3A6B",
              borderRadius: "999px",
              padding: "9px 22px",
              fontSize: "0.85rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F8FAFC";
              e.currentTarget.style.borderColor = "#94A3B8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.borderColor = "#CBD5E1";
            }}
            title="View recent user feedback and ratings"
          >
            {showRecentFeedback ? "Hide Recent Feedback" : "View Community Feedback"}
          </button>
        </div>
      </div>

      {/* Rating Form Modal */}
      <RatingForm
        isVisible={showRatingForm}
        onClose={() => setShowRatingForm(false)}
        onSubmit={handleRatingSubmit}
      />

      {/* Marquee Animation Styles */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marqueeLeft 38s linear infinite;
          will-change: transform;
        }
        .marquee-track-right {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marqueeRight 42s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover .marquee-track-left,
        .marquee-container:hover .marquee-track-right {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;