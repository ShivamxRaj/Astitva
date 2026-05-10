import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  HeartIcon,
  FireIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const HELPLINE = '1800-XXX-XXXX';
const WHATSAPP_URL = 'https://wa.me/916299446452?text=Hello%20Avyakta%2C%20I%20need%20assistance.';

const LANG_OPTIONS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हि', full: 'हिंदी' },
  { code: 'pa', label: 'ਪੰ', full: 'ਪੰਜਾਬੀ' },
];

/* ── Emergency numbers data ── */
const emergencyNumbers = [
  { number: '112', label: 'All-in-one Emergency Services', icon: <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6" />, description: 'National emergency number for all services', priority: 1, color: 'bg-red-600' },
  { number: '1091', label: "Women's Helpline", icon: <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />, description: '24/7 support for women in distress', priority: 2, color: 'bg-pink-600' },
  { number: '1098', label: 'Child Helpline', icon: <UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6" />, description: 'Emergency support for children', priority: 2, color: 'bg-blue-600' },
  { number: '100', label: 'Police', icon: <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6" />, description: 'Police emergency services', priority: 3, color: 'bg-indigo-600' },
  { number: '101', label: 'Fire', icon: <FireIcon className="h-5 w-5 sm:h-6 sm:w-6" />, description: 'Fire and rescue services', priority: 3, color: 'bg-orange-600' },
  { number: '102', label: 'Ambulance', icon: <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />, description: 'Medical emergency services', priority: 3, color: 'bg-green-600' },
  { number: '181', label: "Women's Help (State-specific)", icon: <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />, description: 'State-specific women helpline', priority: 4, color: 'bg-purple-600' },
];

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const switchLang = (code) => {
    if (code !== i18n.language) i18n.changeLanguage(code);
  };

  /* Listen for 'open-emergency-modal' event from AvyaktaBot */
  useEffect(() => {
    const handler = () => setEmergencyOpen(true);
    window.addEventListener('open-emergency-modal', handler);
    return () => window.removeEventListener('open-emergency-modal', handler);
  }, []);

  const navItems = [
    { key: 'home', label: t('nav.home'), path: '/' },
    { key: 'about', label: t('nav.about'), path: '/about' },
    { key: 'faq', label: 'FAQ', path: '/faq' },
    { key: 'contact', label: t('nav.contact'), path: '/contact' },
  ];

  const searchLabel = t('nav.search');
  const reportLabel = t('nav.report');
  const adminLabel = t('nav.admin');

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      {/* ── Utility Bar ── */}
      <div className="utility-bar" role="banner">
        <div className="hidden sm:flex items-center gap-3 text-xs md:text-sm">
          <ShieldCheckIcon style={{ width: '0.9rem', height: '0.9rem', color: '#90CDF4', flexShrink: 0 }} aria-hidden="true" />
          <span className="whitespace-nowrap">🏛️ Official Humanitarian Portal &nbsp;|&nbsp; Punjab, India &nbsp;|&nbsp; Est. 2020</span>
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          <a href={`tel:${HELPLINE}`} className="helpline-badge" aria-label={`Call helpline ${HELPLINE}`}>
            <span className="helpline-dot" aria-hidden="true" />
            <PhoneIcon style={{ width: '0.75rem', height: '0.75rem' }} aria-hidden="true" />
            {HELPLINE}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="helpline-badge" aria-label="Chat on WhatsApp">
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <Disclosure
        as="nav"
        className="shadow-lg font-poppins sticky top-0 left-0 right-0 z-50"
        style={{ backgroundColor: '#1B3A6B' }}
        aria-label="Main navigation"
      >
        {({ open }) => (
          <>
            <div className="container-responsive">
              <div className="flex h-16 sm:h-18 items-center justify-between gap-4">

                {/* Logo + Brand */}
                <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Avyakta Home">
                  <img
                    className="h-10 w-10 object-contain filter brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    src={logo}
                    alt="Avyakta Logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="hidden sm:flex flex-col leading-tight">
                    <span className="text-white font-bold text-base tracking-wide">Avyakta</span>
                    <span className="text-blue-200 text-xs font-medium" style={{ fontSize: '0.68rem' }}>
                      Restoring dignity, one soul at a time
                    </span>
                  </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      to={item.path}
                      className="px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-2">
                  {/* Language Switcher */}
                  <div className="flex items-center rounded-full overflow-hidden border border-white/20">
                    {LANG_OPTIONS.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLang(lang.code)}
                        className={`px-2 py-1 text-xs font-semibold transition-all duration-200 ${
                          i18n.language === lang.code
                            ? 'bg-white text-blue-900'
                            : 'text-blue-100 hover:bg-white/15'
                        }`}
                        aria-label={`Switch to ${lang.full}`}
                        aria-pressed={i18n.language === lang.code}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Missing Person */}
                  <Link
                    to="/search"
                    className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #2E7D9C, #1B5E7A)' }}
                    aria-label="Search for missing person"
                  >
                    🔍 {searchLabel}
                  </Link>

                  {/* Report Case — urgent red */}
                  <Link
                    to="/report"
                    className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #C0392B, #962D22)' }}
                    aria-label="Report an unclaimed body"
                  >
                    🚨 {reportLabel}
                  </Link>

                  {/* Admin Login — discrete */}
                  <Link
                    to="/admin/login"
                    className="px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                    style={{ color: '#93C5FD', border: '1px solid rgba(147,197,253,0.3)' }}
                    aria-label="Admin Login"
                  >
                    🔐 {adminLabel}
                  </Link>

                  {/* Emergency Help Button — Desktop */}
                  <button
                    onClick={() => setEmergencyOpen(true)}
                    className="emergency-nav-btn flex items-center gap-2 font-bold text-white transition-all duration-200"
                    style={{
                      background: '#C0392B',
                      borderRadius: '999px',
                      padding: '8px 18px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#E04535';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(192,57,43,0.4)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#C0392B';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    aria-label="Emergency Help"
                  >
                    <span className="emergency-ping-dot" aria-hidden="true" />
                    <ExclamationTriangleIcon style={{ width: '1rem', height: '1rem' }} />
                    Emergency
                  </button>
                </div>

                {/* Mobile header buttons */}
                <div className="flex items-center gap-2 md:hidden">
                  {/* Emergency pill on mobile header */}
                  <button
                    onClick={() => setEmergencyOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                    style={{ background: '#C0392B' }}
                    aria-label="Emergency Help"
                  >
                    <span className="emergency-ping-dot" aria-hidden="true" />
                    SOS
                  </button>

                  <Link
                    to="/report"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap"
                    style={{ background: '#2E7D9C' }}
                    aria-label="Report a case"
                  >
                    🚨 Report
                  </Link>
                  <Disclosure.Button
                    className="inline-flex items-center justify-center rounded-md p-2 text-blue-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-label="Open main menu"
                  >
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile Nav Panel */}
            <Disclosure.Panel className="md:hidden border-t border-white/10">
              <div className="px-3 pt-2 pb-3 space-y-1" style={{ backgroundColor: '#152d52' }}>
                {/* Emergency Help — first item in mobile menu */}
                <Disclosure.Button
                  as="button"
                  onClick={() => setEmergencyOpen(true)}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-md text-base font-bold text-white"
                  style={{ background: '#C0392B' }}
                >
                  <span className="emergency-ping-dot" aria-hidden="true" />
                  <ExclamationTriangleIcon style={{ width: '1.1rem', height: '1.1rem' }} />
                  Emergency Help
                </Disclosure.Button>

                {navItems.map((item) => (
                  <Disclosure.Button
                    key={item.key}
                    as={Link}
                    to={item.path}
                    className="block px-4 py-3 rounded-md text-base font-medium text-blue-100 hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Disclosure.Button>
                ))}

                <Disclosure.Button
                  as={Link}
                  to="/search"
                  className="block px-4 py-3 rounded-md text-base font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #2E7D9C, #1B5E7A)' }}
                >
                  🔍 Search Missing Person
                </Disclosure.Button>

                {/* Mobile Language Switcher */}
                <div className="pt-3 border-t border-white/10">
                  <p className="px-4 text-xs text-blue-300 mb-2 font-medium uppercase tracking-wider">Language</p>
                  <div className="flex gap-2 px-4">
                    {LANG_OPTIONS.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLang(lang.code)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                          i18n.language === lang.code
                            ? 'bg-white text-blue-900'
                            : 'border border-white/30 text-blue-100 hover:bg-white/15'
                        }`}
                        aria-label={`Switch to ${lang.full}`}
                        aria-pressed={i18n.language === lang.code}
                      >
                        {lang.full}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <Link
                    to="/admin/login"
                    className="block px-4 py-3 rounded-md text-sm font-semibold text-blue-200 hover:bg-white/10"
                  >
                    🔐 Admin Login
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* ═══════════════════════════════════
          Emergency Modal (navy-themed)
          ═══════════════════════════════════ */}
      {emergencyOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && setEmergencyOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
            style={{
              borderRadius: '16px',
              background: '#fff',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              animation: 'emergencyModalIn 200ms ease-out',
            }}
          >
            {/* Header — navy themed */}
            <div style={{ background: '#1B3A6B', padding: '20px 24px' }}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    <ExclamationTriangleIcon style={{ width: '1.4rem', height: '1.4rem', color: '#FF6B6B' }} />
                    Emergency Help
                  </h2>
                  <p style={{ color: '#8BAFD4', fontSize: '0.9rem' }}>
                    If you or someone is in danger, call these helplines immediately.
                  </p>
                </div>
                <button
                  onClick={() => setEmergencyOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close Emergency Help"
                >
                  <XMarkIcon style={{ width: '1.5rem', height: '1.5rem', color: '#fff' }} />
                </button>
              </div>
            </div>

            {/* Emergency Numbers */}
            <div className="p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              <div className="space-y-3">
                {emergencyNumbers
                  .sort((a, b) => a.priority - b.priority)
                  .map((item) => (
                    <button
                      key={item.number}
                      onClick={() => handleCall(item.number)}
                      className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-200 group hover:scale-[1.01] hover:shadow-md border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                      aria-label={`Call ${item.label} at ${item.number}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 sm:p-3 rounded-full ${item.color} shadow-sm`}>
                          <div className="text-white">{item.icon}</div>
                        </div>
                        <div className="text-left">
                          <p className={`font-bold text-lg sm:text-xl ${item.color.replace('bg', 'text')}`}>{item.number}</p>
                          <p className="text-gray-800 font-semibold text-sm sm:text-base">{item.label}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                      <div className={`p-2 rounded-full ${item.color} bg-opacity-20`}>
                        <PhoneIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color.replace('bg', 'text')}`} />
                      </div>
                    </button>
                  ))}
              </div>

              {/* WhatsApp */}
              <div className="mt-6 flex flex-col items-center">
                <a
                  href="https://wa.me/916299446452?text=Hello%20Avyakta%20Support%2C%20I%20need%20emergency%20help."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-lg text-base sm:text-lg transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.13 12.13 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zM12 22c-1.7 0-3.37-.44-4.83-1.28l-.35-.2-3.69.97.99-3.59-.22-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3s.99 2.67 1.13 2.85c.14.18 1.95 2.98 4.74 4.06.66.23 1.18.37 1.58.47.66.17 1.26.15 1.73.09.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/></svg>
                  WhatsApp: Chat Now
                </a>
                <span className="text-xs text-gray-500 mt-2 text-center">Chat with Avyakta Support for emergency help.</span>
              </div>

              {/* Info section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <InformationCircleIcon className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Need more information?</span>
                  </div>
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {showInfo ? 'Hide' : 'Show'} Details
                  </button>
                </div>
                {showInfo && (
                  <div className="mt-3 p-4 rounded-lg" style={{ background: 'rgba(46,125,156,0.08)' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#1B3A6B' }}>Emergency Guidelines:</h4>
                    <ul className="text-sm space-y-1" style={{ color: '#2E4057' }}>
                      <li>• Stay calm and assess the situation</li>
                      <li>• Call emergency services immediately if needed</li>
                      <li>• Provide clear location and situation details</li>
                      <li>• Follow instructions from emergency responders</li>
                      <li>• Stay on the line until help arrives</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CSS for ping dot + modal animation ── */}
      <style>{`
        .emergency-ping-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FF6B6B;
          animation: emergencyPing 2s cubic-bezier(0,0,0.2,1) infinite;
          flex-shrink: 0;
        }
        @keyframes emergencyPing {
          0%   { box-shadow: 0 0 0 0 rgba(255,107,107,0.7); }
          70%  { box-shadow: 0 0 0 8px rgba(255,107,107,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,107,107,0); }
        }
        @keyframes emergencyModalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;