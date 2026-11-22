import React from 'react';

const LoadingSpinner = ({ size = 'sm', color = 'navy', className = '' }) => {
  const sizeMap = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const colorMap = {
    navy: 'text-[#1B3A6B]',
    blue: 'text-sky-600',
    gray: 'text-slate-500',
    white: 'text-white',
    purple: 'text-purple-600',
    emerald: 'text-emerald-600',
  };

  const sz = sizeMap[size] || sizeMap.sm;
  const clr = colorMap[color] || colorMap.navy;

  return (
    <svg className={`animate-spin ${sz} ${clr} ${className}`} viewBox="0 0 24 24" fill="none" role="status" aria-label="Loading">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
};

export default LoadingSpinner; 