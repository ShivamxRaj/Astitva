import React from 'react';
import { useTranslation } from 'react-i18next';

function LoadingPage({ type = 'default' }) {
  const { t } = useTranslation();

  const getLoadingMessage = () => {
    switch (type) {
      case 'registration':
        return t('loading.registration');
      case 'profile':
        return t('loading.profile');
      case 'server':
        return t('loading.server');
      default:
        return t('loading.default');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-sky-500 rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-2 border-4 border-sky-400 rounded-full animate-spin border-t-transparent" style={{ animationDelay: '-0.2s' }}></div>
          <div className="absolute inset-4 border-4 border-sky-300 rounded-full animate-spin border-t-transparent" style={{ animationDelay: '-0.4s' }}></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {getLoadingMessage()}
        </h2>
        <p className="text-slate-300">
          {t('loading.pleaseWait')}
        </p>

        {/* Additional Message for Server Down */}
        {type === 'server' && (
          <div className="mt-4 p-4 bg-red-500/20 rounded-lg">
            <p className="text-red-300">
              {t('loading.serverDownMessage')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadingPage; 