import React, { useState, useEffect, useRef } from "react";
import RatingForm from "./RatingForm";
import RecentFeedback from "./RecentFeedback";

const TESTIMONIALS = [
  {
    text: "I never thought reporting an unclaimed soul could be this simple. Avyakta gave me courage when I was afraid to step forward.",
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
    text: "Our village never had such a system. Avyakta is not just a website. It's hope. It's dignity. It's voice for the voiceless.",
    author: "Rakesh Yadav",
    role: "Panchayat Member",
    location: "Bihar",
    badge: "Officer",
    rating: 5,
  },
  {
    text: "This is more than tech. This is humanity encoded into a platform. I wish every state had something like Avyakta.",
    author: "Nandini Patil",
    role: "Social Worker",
    location: "Maharashtra",
    badge: "Volunteer",
    rating: 5,
  },
  {
    text: "I could chat with a bot and get help instantly. I didn't feel alone. Avyakta made me feel heard.",
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
    text: "We use Avyakta to coordinate between hospitals and morgues. It has reduced identification time by nearly 60% in our district.",
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
      <span key={i} style={{ fontSize: "14px", color: i < rating ? "#D4870A" : "rgba(255,255,255,0.15)" }}>★</span>
    ))}
  </div>
);

/* ── Single testimonial card ── */
const TestimonialCard = ({ item, style, visible }) => {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = item.text.length > 180;

  return (
    <div
      className="testimonial-card flex flex-col h-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "12px",
        padding: "28px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
        cursor: "default",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(46,125,156,0.4)";
        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top row: open-quote + stars */}
      <div className="flex items-start justify-between mb-3">
        <span
          style={{
            color: "#2E7D9C",
            fontSize: "4rem",
            lineHeight: "0.8",
            fontFamily: "Georgia, serif",
            opacity: 0.6,
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        {item.rating === 5 && <SmallStars rating={5} />}
      </div>

      {/* Quote text */}
      <blockquote
        className="flex-1"
        style={{
          fontSize: "0.95rem",
          lineHeight: "1.7",
          color: "#D6E8FF",
          fontStyle: "italic",
        }}
      >
        {needsTruncate && !expanded ? (
          <>
            {item.text.slice(0, 180).trim()}…{" "}
            <button
              onClick={() => setExpanded(true)}
              style={{
                color: "#4BA3C3",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "0.85rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Read more
            </button>
          </>
        ) : (
          item.text
        )}
      </blockquote>

      {/* Separator */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "16px 0" }} />

      {/* Author row */}
      <div className="flex items-center gap-3">
        {/* Avatar circle with initials */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #1B3A6B, #2E7D9C)",
            border: "2px solid rgba(46,125,156,0.4)",
            color: "#fff",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          {getInitials(item.author)}
        </div>

        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <div
            className="truncate"
            style={{ color: "#F0F6FF", fontWeight: 600, fontSize: "0.9rem" }}
          >
            {item.author}
          </div>
          <div
            className="truncate"
            style={{ color: "#8BAFD4", fontSize: "0.8rem" }}
          >
            {item.role} · {item.location}
          </div>
        </div>

        {/* Badge pill */}
        <span
          className="flex-shrink-0"
          style={{
            background: "rgba(46,125,156,0.15)",
            border: "1px solid rgba(46,125,156,0.3)",
            color: "#7EB5D6",
            fontSize: "0.7rem",
            padding: "2px 10px",
            borderRadius: "999px",
            fontWeight: 500,
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
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef(null);

  /* IntersectionObserver — trigger card fade-in once */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleRatingSubmit = () => {
    setSubmissionSuccess("✅ Thank you! Your feedback has been submitted for review.");
    setShowRatingForm(false);
    setTimeout(() => setSubmissionSuccess(null), 4000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{
        backgroundColor: "#1B3A6B",
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(46,125,156,0.08) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(46,125,156,0.05) 0%, transparent 50%)
        `,
      }}
    >
      <div className="container-responsive relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="font-merriweather font-bold mb-2"
            style={{
              color: "#F0F6FF",
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
          <p
            style={{
              color: "#8BAFD4",
              fontSize: "1rem",
              marginTop: "12px",
            }}
          >
            Real stories from families, officers, and volunteers
          </p>
        </div>

        {/* ── Desktop Grid (hidden on mobile) ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((item, idx) => (
            <TestimonialCard
              key={idx}
              item={item}
              visible={cardsVisible}
              style={{ transitionDelay: `${idx * 100}ms` }}
            />
          ))}
        </div>

        {/* ── Mobile Horizontal Scroll (visible on mobile only) ── */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto pb-4 px-1"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{
                width: "85vw",
                maxWidth: "360px",
                scrollSnapAlign: "start",
              }}
            >
              <TestimonialCard
                item={item}
                visible={cardsVisible}
                style={{ transitionDelay: `${idx * 80}ms` }}
              />
            </div>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="md:hidden flex justify-center mt-4 gap-1.5">
          {TESTIMONIALS.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: idx === 0 ? "#4BA3C3" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* ── Success Message ── */}
        {submissionSuccess && (
          <div className="max-w-md mx-auto mt-8 rounded-lg p-4 text-center" style={{ background: "rgba(39,174,96,0.12)", border: "1px solid rgba(39,174,96,0.25)" }}>
            <p style={{ color: "#6FCF97", fontWeight: 500, fontSize: "0.9rem" }}>{submissionSuccess}</p>
          </div>
        )}

        {/* ── Recent Feedback ── */}
        {showRecentFeedback && (
          <div className="max-w-6xl mx-auto mt-10">
            <RecentFeedback />
          </div>
        )}

        {/* ── Action Buttons (below grid) ── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 sm:mt-16">
          <button
            onClick={() => setShowRatingForm(true)}
            className="flex items-center gap-2 font-semibold transition-all duration-200"
            style={{
              background: "transparent",
              border: "1.5px solid rgba(46,125,156,0.5)",
              color: "#7EB5D6",
              borderRadius: "8px",
              padding: "10px 24px",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(46,125,156,0.1)";
              e.currentTarget.style.borderColor = "#2E7D9C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(46,125,156,0.5)";
            }}
          >
            ⭐ Rate Your Experience
          </button>
          <button
            onClick={() => setShowRecentFeedback(!showRecentFeedback)}
            className="flex items-center gap-2 font-semibold transition-all duration-200"
            style={{
              background: "transparent",
              border: "1.5px solid rgba(46,125,156,0.5)",
              color: "#7EB5D6",
              borderRadius: "8px",
              padding: "10px 24px",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(46,125,156,0.1)";
              e.currentTarget.style.borderColor = "#2E7D9C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(46,125,156,0.5)";
            }}
            title="View recent user feedback and ratings"
          >
            💬 {showRecentFeedback ? "Hide Recent Feedback" : "View Recent Feedback"}
          </button>
        </div>
      </div>

      {/* Rating Form Modal */}
      <RatingForm
        isVisible={showRatingForm}
        onClose={() => setShowRatingForm(false)}
        onSubmit={handleRatingSubmit}
      />

      {/* Hide scrollbar on mobile scroller */}
      <style>{`
        .md\\:hidden::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Testimonials;