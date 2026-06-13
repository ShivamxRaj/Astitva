import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import DonationModal from './DonationModal';
import { supabase } from '../lib/supabaseClient';

const HELPLINE = '+91 62994 46452';
const WHATSAPP_URL = 'https://wa.me/916299446452?text=Hello%20Avyakta%2C%20I%20need%20assistance.';

const LANG_OPTIONS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हि', full: 'हिंदी' },
  { code: 'pa', label: 'ਪੰ', full: 'ਪੰਜਾਬੀ' },
];

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [donationOpen, setDonationOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const switchLang = (code) => {
    if (code !== i18n.language) i18n.changeLanguage(code);
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(!!session);
    };
    checkAdmin();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAdmin(!!session);
    });
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const { count, error } = await supabase
          .from('orphan_cases')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'unidentified');
        if (!error && count !== null) {
          setPendingCount(count);
        }
      } catch (err) {
        // Silent fallback
      }
    };
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 30000);
    return () => clearInterval(interval);
  }, []);

  /* Listen for 'open-donation-modal' event from AvyaktaBot & check URL query params */
  useEffect(() => {
    const handler = () => setDonationOpen(true);
    window.addEventListener('open-donation-modal', handler);
    
    // Auto-open modal if donation success redirect is detected in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('donation') === 'success') {
      setDonationOpen(true);
    }
    
    return () => window.removeEventListener('open-donation-modal', handler);
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

  return (
    <>
      {/* ── Utility Bar ── */}
      <div className="utility-bar" role="banner">
        <div className="hidden sm:flex items-center gap-3 text-xs md:text-sm">
          <ShieldCheckIcon style={{ width: '0.9rem', height: '0.9rem', color: '#90CDF4', flexShrink: 0 }} aria-hidden="true" />
          <span className="whitespace-nowrap">🏛️ Official Humanitarian Portal &nbsp;|&nbsp; Punjab, India &nbsp;|&nbsp; Est. 2020</span>
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          <a href={`tel:${HELPLINE}`} className="helpline-badge" aria-label={`Call helpline ${HELPLINE}`} title="Call Avyakta 24/7 emergency helpline">
            <span className="helpline-dot" aria-hidden="true" />
            <PhoneIcon style={{ width: '0.75rem', height: '0.75rem' }} aria-hidden="true" />
            {HELPLINE}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="helpline-badge" aria-label="Chat on WhatsApp" title="Chat with Avyakta support on WhatsApp">
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
                <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Avyakta Home" title="Go to Avyakta homepage">
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
                      title={`Navigate to ${item.label} page`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-2">
                  {/* Language Switcher Dropdown */}
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-100 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 focus:outline-none"
                      title="Select Language / भाषा चुनें"
                    >
                      <GlobeAltIcon className="w-3.5 h-3.5 text-blue-300" />
                      <span className="uppercase tracking-wider">{i18n.language || 'en'}</span>
                      <ChevronDownIcon className="w-3 h-3 opacity-70" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden border border-blue-50">
                        <div className="py-1">
                          {LANG_OPTIONS.map((lang) => (
                            <Menu.Item key={lang.code}>
                              {({ active }) => (
                                <button
                                  onClick={() => switchLang(lang.code)}
                                  className={`w-full flex items-center justify-between px-4 py-2 text-xs font-semibold transition-colors ${
                                    active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'
                                  } ${i18n.language === lang.code ? 'bg-blue-50/50 text-blue-950 font-bold' : ''}`}
                                >
                                  <span>{lang.full}</span>
                                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">{lang.label}</span>
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* Search Missing Person */}
                  <Link
                    to="/search"
                    className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #2E7D9C, #1B5E7A)' }}
                    aria-label="Search for missing person"
                    title="Search the missing persons database"
                  >
                    🔍 {searchLabel}
                  </Link>

                  {/* Report Case — urgent red */}
                  <Link
                    to="/report"
                    className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #C0392B, #962D22)' }}
                    aria-label="Report an unclaimed body"
                    title="Report an unclaimed or unidentified body"
                  >
                    🚨 {reportLabel}
                  </Link>

                  {/* Admin Login — highly subtle/minimalist to prioritize Report Case / Donate CTA focus */}
                  <div className="relative inline-block ml-1">
                    <Link
                      to="/admin/login"
                      className="px-2 py-1.5 rounded text-[11px] font-medium text-blue-300/70 hover:text-blue-200 hover:bg-white/5 transition-all duration-200 flex items-center gap-1"
                      aria-label="Admin Login"
                      title="Login to Avyakta admin portal"
                    >
                      <span className="opacity-60">🛡️</span> {adminLabel}
                      {isAdmin && pendingCount > 0 && (
                        <span className="flex h-2 w-2 relative ml-0.5" title="New unverified report arrived">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Support Us Button — Desktop */}
                  <div className="relative group flex items-center">
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-gray-900 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Help us bring dignity to the forgotten
                    </div>
                    <button
                      onClick={() => setDonationOpen(true)}
                      className="font-bold text-white transition-all duration-200"
                      style={{
                        background: '#2E7D9C',
                        borderRadius: '999px',
                        padding: '8px 18px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1B5E7A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#2E7D9C';
                      }}
                      aria-label="Support Us"
                    >
                      💛 Donate
                    </button>
                  </div>
                </div>

                {/* Mobile header buttons */}
                <div className="flex items-center gap-2 md:hidden">
                  <Link
                    to="/report"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap"
                    style={{ background: '#2E7D9C' }}
                    aria-label="Report a case"
                    title="Report an unclaimed body"
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
                {/* Support Us — first item in mobile menu */}
                <Disclosure.Button
                  as="button"
                  onClick={() => setDonationOpen(true)}
                  className="w-full text-left px-4 py-3 rounded-md text-base font-bold text-white"
                  style={{ background: '#2E7D9C' }}
                >
                  💛 Donate to Avyakta
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

                <div className="pt-3 border-t border-white/10 flex items-center justify-between px-4">
                  <Link
                    to="/admin/login"
                    className="py-3 rounded-md text-sm font-semibold text-blue-200 hover:text-white flex items-center gap-2"
                    title="Login to Avyakta admin portal"
                  >
                    🔐 Admin Login
                    {isAdmin && pendingCount > 0 && (
                      <span className="flex h-2.5 w-2.5 relative" title="New unverified report arrived">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <DonationModal isOpen={donationOpen} onClose={() => setDonationOpen(false)} />
    </>
  );
};

export default Navbar;