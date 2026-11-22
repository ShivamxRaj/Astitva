import React from 'react';
import { useTranslation } from 'react-i18next';

function LoadingPage({ type = 'default' }) {
  const { t } = useTranslation();

  const getLoadingMessage = () => {
    switch (type) {
      case 'registration':
        return t('loading.registration') || 'Loading Registration...';
      case 'profile':
        return t('loading.profile') || 'Loading Profile...';
      case 'server':
        return t('loading.server') || 'Connecting to Server...';
      default:
        return t('loading.default') || 'Loading...';
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50/90 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <div className="text-center p-6 max-w-sm mx-auto">
        {/* Modern Crisp Institutional Spinner */}
        <div className="relative w-12 h-12 mx-auto mb-4 flex items-center justify-center">
          <svg className="animate-spin w-10 h-10 text-[#1B3A6B]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-15" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>

        {/* Loading Text */}
        <h2 className="text-lg font-semibold text-[#1B3A6B] mb-1 font-merriweather">
          {getLoadingMessage()}
        </h2>
        <p className="text-xs text-slate-500">
          {t('loading.pleaseWait') || 'Please wait a moment...'}
        </p>

        {/* Additional Message for Server Down */}
        {type === 'server' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600 font-medium">
              {t('loading.serverDownMessage') || 'The server is currently unreachable. Please check back shortly.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadingPage; 