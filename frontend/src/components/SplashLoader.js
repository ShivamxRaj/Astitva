import React from 'react';

const SplashLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#22313a] transition-all duration-700">
      {/* Spinner with logo */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Animated outer lines - all softly glowing */}
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 160 160">
          {[...Array(12)].map((_, i) => (
            <rect
              key={i}
              x="78"
              y="18"
              width="4"
              height="24"
              rx="2"
              fill="#b8e0ff"
              opacity={0.7}
              style={{
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: '80px 80px',
                filter: 'drop-shadow(0 0 10px #b8e0ff88)',
                transition: 'opacity 0.5s',
              }}
            />
          ))}
        </svg>
        {/* Center logo placeholder (replace with your real logo if needed) */}
        <svg width="80" height="80" viewBox="0 0 80 80" className="relative z-10">
          <g fill="none" stroke="#b8e0ff" strokeWidth="4" strokeLinecap="round">
            <polyline points="40,60 50,50 40,40 30,50 40,60" />
            <polyline points="40,48 46,42 40,36 34,42 40,48" />
            <polyline points="40,38 43,35 40,32 37,35 40,38" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SplashLoader;

// CSS (add to your global CSS or Tailwind config):
// .animate-spin-slow { animation: spin 2.5s linear infinite; }
// @keyframes spin { 100% { transform: rotate(360deg); } } 