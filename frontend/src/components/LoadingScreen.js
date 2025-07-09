import React from 'react';

// Assuming the logo is in src/assets/loading_logo.png
import loadingLogo from '../assets/loading_logo.png';

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <img src={loadingLogo} alt="Loading Logo" className="w-32 h-32 mb-8 animate-pulse"/>
      <h1 className="text-2xl font-bold mb-2">Verifying Portal Integrity</h1>
      <p className="text-slate-300 text-lg">One step closer to giving a name to the nameless</p>
    </div>
  );
}

export default LoadingScreen; 