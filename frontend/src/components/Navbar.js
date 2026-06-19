import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
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

  return (
    <>
      {/* ── Sleek Announcement / Utility Bar ── */}
      <div className="hidden sm:flex bg-slate-950 text-slate-400 py-2.5 px-4 sm:px-6 lg:px-8 text-[11px] font-semibold tracking-wider uppercase border-b border-white/5 items-center justify-between gap-2.5" role="banner">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>🏛️ Official Humanitarian Portal &nbsp;|&nbsp; Punjab, India &nbsp;|&nbsp; Est. 2020</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={`tel:${HELPLINE}`} className="hover:text-white transition-colors" aria-label={`Call helpline ${HELPLINE}`} title="Call Avyakta 24/7 helpline">
            📞 Helpline: {HELPLINE}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Chat on WhatsApp" title="Chat with support on WhatsApp">
            💬 WhatsApp Support
          </a>
        </div>
      </div>

      {/* ── Main Floating Capsule Navbar ── */}
      <Disclosure
        as="header"
        className="sticky top-0 z-50 w-full pt-4 transition-all duration-300"
      >
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 gap-4">

                {/* Logo + Brand */}
                <Link to="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="Avyakta Home" title="Go to Avyakta homepage">
                  <img
                    className="h-9 w-9 object-contain filter brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform"
                    src={logo}
                    alt="Avyakta Logo"
                    width="36"
                    height="36"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="text-white font-bold text-lg tracking-wider font-poppins">Avyakta</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      to={item.path}
                      className="px-3.5 py-2 text-xs lg:text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-all duration-200 relative group"
                      title={`Navigate to ${item.label} page`}
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                    </Link>
                  ))}
                </div>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-4">
                  {/* Language Switcher Dropdown */}
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 focus:outline-none"
                      title="Select Language / भाषा चुनें"
                    >
                      <GlobeAltIcon className="w-3.5 h-3.5 text-slate-400" />
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

                  {/* Search Link */}
                  <Link
                    to="/search"
                    className="text-xs lg:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    aria-label="Search for missing person"
                    title="Search the missing persons database"
                  >
                    🔍 {searchLabel}
                  </Link>

                  {/* Report Case — rose capsule */}
                  <Link
                    to="/report"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-full text-xs lg:text-sm font-bold shadow-lg shadow-rose-900/20 hover:shadow-rose-500/35 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                    aria-label="Report an unclaimed body"
                    title="Report an unclaimed or unidentified body"
                  >
                    🚨 {reportLabel}
                  </Link>

                  {/* Support Us Button — Desktop */}
                  <button
                    onClick={() => setDonationOpen(true)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full text-xs lg:text-sm font-bold shadow-lg shadow-amber-500/10 hover:shadow-amber-400/25 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                    aria-label="Support Us"
                  >
                    💛 Donate
                  </button>

                  {/* Admin Login Icon */}
                  <Link
                    to="/admin/login"
                    className="p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 relative flex items-center justify-center"
                    aria-label="Admin Login"
                    title="Login to Avyakta admin portal"
                  >
                    🛡️
                    {isAdmin && pendingCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5" title="New unverified report arrived">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                    )}
                  </Link>
                </div>

                {/* Mobile header buttons */}
                <div className="flex items-center gap-3 md:hidden">
                  <Link
                    to="/report"
                    className="px-3.5 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-full shadow-lg shadow-rose-950/20"
                    aria-label="Report a case"
                  >
                    🚨 Report
                  </Link>
                  <Disclosure.Button
                    className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
                    aria-label="Open main menu"
                  >
                    {open ? (
                      <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>

              {/* Mobile Nav Panel */}
              <Disclosure.Panel className="md:hidden border-t border-white/5 px-4 py-4 space-y-3 bg-slate-950/95 rounded-b-2xl max-h-[calc(100vh-100px)] overflow-y-auto">
                {/* Navigation Items */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Disclosure.Button
                      key={item.key}
                      as={Link}
                      to={item.path}
                      className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      {item.label}
                    </Disclosure.Button>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="pt-3 border-t border-white/5 space-y-2">
                  <Disclosure.Button
                    as={Link}
                    to="/search"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 border border-white/10 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    🔍 Search Missing Person
                  </Disclosure.Button>
                  
                  <Disclosure.Button
                    as="button"
                    onClick={() => setDonationOpen(true)}
                    className="w-full py-2.5 px-4 bg-amber-500 text-slate-950 rounded-xl text-sm font-bold hover:bg-amber-400 transition-all"
                  >
                    💛 Donate to Avyakta
                  </Disclosure.Button>
                </div>

                {/* Mobile Language Switcher */}
                <div className="pt-3 border-t border-white/5">
                  <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Language</p>
                  <div className="flex gap-2 px-1">
                    {LANG_OPTIONS.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLang(lang.code)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          i18n.language === lang.code
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                        aria-label={`Switch to ${lang.full}`}
                        aria-pressed={i18n.language === lang.code}
                      >
                        {lang.full}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Help & Support */}
                <div className="pt-3 border-t border-white/5">
                  <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Help & Support</p>
                  <div className="grid grid-cols-2 gap-2 px-1">
                    <a
                      href={`tel:${HELPLINE}`}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 border border-white/10 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      📞 Call Helpline
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 border border-white/10 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>


                {/* Admin login Link */}
                <div className="pt-3 border-t border-white/5">
                  <Disclosure.Button
                    as={Link}
                    to="/admin/login"
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    🔐 Admin Login
                    {isAdmin && pendingCount > 0 && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </Disclosure.Button>
                </div>
              </Disclosure.Panel>

            </div>
          </div>
        )}
      </Disclosure>

      <DonationModal isOpen={donationOpen} onClose={() => setDonationOpen(false)} />
    </>
  );
};

export default Navbar;