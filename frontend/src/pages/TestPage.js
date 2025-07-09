import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container-responsive">
        <div className="text-center py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Test Page
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            If you can see this page, React is working correctly!
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Status Check</h2>
            <div className="space-y-2 text-left">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-green-300">React Components ✓</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-green-300">Tailwind CSS ✓</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-green-300">Responsive Design ✓</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-green-300">Custom CSS Classes ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 