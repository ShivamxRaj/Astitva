import React, { useState, useEffect } from 'react';

const SplashLoader = () => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out slightly before the 2-second mark when App.js unmounts it
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1600);

    return () => clearTimeout(fadeTimer);
  }, []);

  // Subtle starfield (static faint white dots)
  const stars = [
    { top: '15%', left: '20%', size: '3px', opacity: 0.4 },
    { top: '25%', left: '75%', size: '2px', opacity: 0.6 },
    { top: '65%', left: '15%', size: '2px', opacity: 0.3 },
    { top: '75%', left: '85%', size: '4px', opacity: 0.5 },
    { top: '45%', left: '8%', size: '2px', opacity: 0.7 },
    { top: '35%', left: '90%', size: '3px', opacity: 0.4 },
    { top: '85%', left: '40%', size: '2px', opacity: 0.6 },
    { top: '10%', left: '50%', size: '3px', opacity: 0.5 },
  ];

  return (
    <>
      <style>{`
        .soul-ascend {
          animation: soulAscend 2s ease-in-out infinite;
        }
        @keyframes soulAscend {
          0% {
            transform: translateY(15px) scale(0.8);
            opacity: 0;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            opacity: 0.85;
            box-shadow: 0 0 25px rgba(126, 85, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.4);
          }
          100% {
            transform: translateY(-35px) scale(1.3);
            opacity: 0;
            box-shadow: 0 0 10px rgba(126, 85, 255, 0);
          }
        }
      `}</style>

      <div 
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-400 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: '#1B3A6B' }}
      >
        {/* Starfield */}
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity
            }}
          />
        ))}

        {/* Glowing Orb Animation (Option B) */}
        <div className="relative w-16 h-16 flex items-center justify-center mb-6">
          <div className="absolute w-6 h-6 bg-white rounded-full soul-ascend" />
        </div>

        {/* Brand Name */}
        <h1 
          className="text-5xl md:text-6xl font-bold tracking-wider mb-4"
          style={{
            background: 'linear-gradient(91deg, #ffffff, #7e55ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Avyakta
        </h1>

        {/* Tagline */}
        <p className="text-blue-100 text-sm md:text-base tracking-widest font-light opacity-80">
          Bringing dignity to the forgotten...
        </p>
      </div>
    </>
  );
};

export default SplashLoader; 