import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AdminAuth from './components/AdminAuth';
import AdminRatings from './components/AdminRatings';
import AdminCases from './components/AdminCases';
import AdminContacts from './components/AdminContacts';
import About from './pages/About';

import AvyaktaBot from './components/AvyaktaBot';
import Contact from './components/Contact';
import LoadingPage from './components/LoadingPage';
import FAQPage from './components/FAQPage';
import Testimonials from './components/Testimonials';
import Guidelines from './pages/Guidelines';
import CookiePolicy from './pages/CookiePolicy';
import SplashLoader from './components/SplashLoader';
import ReportUnclaimedBody from './components/ReportUnclaimedBody';
import SearchMissingPerson from './pages/SearchMissingPerson';
import CaseDetails from './components/CaseDetails';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import SEOMetadata from './components/SEOMetadata';
import NotFound from './pages/NotFound';
import './i18n';

// API base URL (kept for future backend calls)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // eslint-disable-line no-unused-vars

function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isServerDown, setIsServerDown] = useState(false);

  useEffect(() => {
    // Check if the user agent is a search bot/crawler to bypass loading delay for SEO
    const isBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent);
    if (isBot) {
      setIsLoading(false);
      return;
    }

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set document language
    document.documentElement.lang = i18n.language;
    
    // Add responsive meta tags
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      document.head.appendChild(viewport);
    }

    // Add theme color for mobile browsers — institutional navy
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      const theme = document.createElement('meta');
      theme.name = 'theme-color';
      theme.content = '#1B3A6B';
      document.head.appendChild(theme);
    }

    // Add mobile web app capable meta tag
    const mobileWebApp = document.querySelector('meta[name="mobile-web-app-capable"]');
    if (!mobileWebApp) {
      const webApp = document.createElement('meta');
      webApp.name = 'mobile-web-app-capable';
      webApp.content = 'yes';
      document.head.appendChild(webApp);
    }

    // Add apple mobile web app capable meta tag
    const appleMobileWebApp = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (!appleMobileWebApp) {
      const appleWebApp = document.createElement('meta');
      appleWebApp.name = 'apple-mobile-web-app-capable';
      appleWebApp.content = 'yes';
      document.head.appendChild(appleWebApp);
    }

    // Add apple mobile web app status bar style
    const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!appleStatusBar) {
      const statusBar = document.createElement('meta');
      statusBar.name = 'apple-mobile-web-app-status-bar-style';
      statusBar.content = 'default';
      document.head.appendChild(statusBar);
    }

    // Add apple touch icon
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleTouchIcon) {
      const touchIcon = document.createElement('link');
      touchIcon.rel = 'apple-touch-icon';
      touchIcon.href = '/logo192.png';
      document.head.appendChild(touchIcon);
    }

    // Add apple touch icon for different sizes
    const appleTouchIconSizes = document.querySelectorAll('link[rel="apple-touch-icon"]');
    if (appleTouchIconSizes.length === 1) {
      const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
      sizes.forEach(size => {
        const touchIcon = document.createElement('link');
        touchIcon.rel = 'apple-touch-icon';
        touchIcon.sizes = `${size}x${size}`;
        touchIcon.href = `/logo${size}.png`;
        document.head.appendChild(touchIcon);
      });
    }

    // Add manifest link
    const manifest = document.querySelector('link[rel="manifest"]');
    if (!manifest) {
      const manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = '/manifest.json';
      document.head.appendChild(manifestLink);
    }

    // Add preconnect for performance
    const preconnectGoogleFonts = document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]');
    if (!preconnectGoogleFonts) {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect);
    }

    const preconnectGoogleFontsGstatic = document.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]');
    if (!preconnectGoogleFontsGstatic) {
      const preconnectGstatic = document.createElement('link');
      preconnectGstatic.rel = 'preconnect';
      preconnectGstatic.href = 'https://fonts.gstatic.com';
      preconnectGstatic.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectGstatic);
    }

  }, [i18n.language]);

  // Server health check removed as the app now relies directly on Supabase.

  return (
    <Router>
      <SEOMetadata />
      <div className="min-h-screen flex flex-col">
        {isLoading && <SplashLoader />}
        {!isLoading && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />

            <Route exact path="/admin/login" element={<AdminAuth />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/admin/ratings" element={<ProtectedRoute><AdminRatings /></ProtectedRoute>} />
            <Route exact path="/admin/cases" element={<ProtectedRoute><AdminCases /></ProtectedRoute>} />
            <Route exact path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/faq" element={<FAQPage />} />
            <Route exact path="/testimonials" element={<Testimonials />} />
            <Route exact path="/guidelines" element={<Guidelines />} />
            <Route exact path="/cookies" element={<CookiePolicy />} />
            <Route exact path="/report" element={<ReportUnclaimedBody />} />
            <Route exact path="/search" element={<SearchMissingPerson />} />
            <Route exact path="/case/:caseId" element={<CaseDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {!isLoading && <AvyaktaBot />}
      </div>
      {isServerDown && <LoadingPage type="server" />}
    </Router>
  );
}

export default App; 