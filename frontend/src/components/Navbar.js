import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const HELPLINE = '1800-XXX-XXXX';
const WHATSAPP_URL = 'https://wa.me/916299446452?text=Hello%20Avyakta%2C%20I%20need%20assistance.';

const LANG_OPTIONS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हि', full: 'हिंदी' },
  { code: 'pa', label: 'ਪੰ', full: 'ਪੰਜਾਬੀ' },
];

const Navbar = () => {
  const { i18n, t } = useTranslation();

  const switchLang = (code) => {
    if (code !== i18n.language) i18n.changeLanguage(code);
  };

  const navItems = [
    { key: 'home',    label: t('nav.home'),    path: '/' },
    { key: 'about',   label: t('nav.about'),   path: '/about' },
    { key: 'faq',     label: 'FAQ',            path: '/faq' },
    { key: 'contact', label: t('nav.contact'), path: '/contact' },
  ];

  const searchLabel  = t('nav.search');
  const reportLabel  = t('nav.report');
  const adminLabel   = t('nav.admin');

  return (
    <>
      {/* ── Utility Bar ── */}
      <div className="utility-bar" role="banner">
        <div className="hidden sm:flex items-center gap-3 text-xs md:text-sm">
          <ShieldCheckIcon style={{ width: '0.9rem', height: '0.9rem', color: '#90CDF4', flexShrink: 0 }} aria-hidden="true" />
          <span className="whitespace-nowrap">🏛️ Official Humanitarian Portal &nbsp;|&nbsp; Punjab, India &nbsp;|&nbsp; Est. 2020</span>
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          <a
            href={`tel:${HELPLINE}`}
            className="helpline-badge"
            aria-label={`Call helpline ${HELPLINE}`}
          >
            <span className="helpline-dot" aria-hidden="true" />
            <PhoneIcon style={{ width: '0.75rem', height: '0.75rem' }} aria-hidden="true" />
            {HELPLINE}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="helpline-badge"
            aria-label="Chat on WhatsApp"
          >
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
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center gap-2 md:hidden">
                  <Link
                    to="/report"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap"
                    style={{ background: '#C0392B' }}
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


    </>
  );
};

export default Navbar;