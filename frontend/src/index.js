import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n'; // Import i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for offline support (disabled on localhost to prevent caching issues)
if ('serviceWorker' in navigator) {
  if (window.location.hostname === 'localhost') {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister().then(() => {
          console.log('[Service Worker] Unregistered on localhost');
        });
      }
    });
    if (window.caches) {
      caches.keys().then(names => {
        for (let name of names) {
          caches.delete(name);
        }
      });
    }
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('ServiceWorker registered: ', reg))
        .catch(err => console.error('ServiceWorker registration failed: ', err));
    });
  }
} 