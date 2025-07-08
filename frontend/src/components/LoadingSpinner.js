import React from 'react';

const LoadingSpinner = ({ size = 'sm', color = 'blue' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white',
    purple: 'text-purple-600'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-${color}-600 ${sizeClasses[size]} ${colorClasses[color]}`}>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner; 