import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PhoneIcon, HeartIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import CookiePolicy from '../pages/CookiePolicy';
import TermsOfService from '../pages/Guidelines';
import { PrivacyPolicy } from '../pages/About';

const HELPLINE     = '+91 62994 46452';
const WHATSAPP_URL = 'https://wa.me/916299446452?text=Hello%20Avyakta%2C%20I%20need%20assistance.';

const Footer = () => {
  const { i18n } = useTranslation();
  const year = 2025;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (type) => {
    if (type === 'privacy')  { setModalContent(<PrivacyPolicy />);  setModalTitle('Privacy Policy'); }
    else if (type === 'cookies') { setModalContent(<CookiePolicy />); setModalTitle('Cookie Policy'); }
    else if (type === 'terms')   { setModalContent(<TermsOfService />); setModalTitle('Terms of Service'); }
    setModalOpen(true);
  };

  const LANG_OPTIONS = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <footer
      style={{ background: '#1B3A6B', color: '#E2E8F0', fontFamily: "'Inter', 'Poppins', sans-serif" }}
      aria-label="Site footer"
    >
      {/* ── Emergency Banner ── */}
      <div style={{ background: '#C0392B', padding: '0.75rem 1rem' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <PhoneIcon style={{ width: '1.1rem', height: '1.1rem', color: '#FEE2E2', flexShrink: 0 }} aria-hidden="true" />
          <span className="font-bold text-white text-sm">
            24/7 Emergency Helpline:&nbsp;
            <a href={`tel:${HELPLINE}`} className="underline underline-offset-2 hover:text-red-100 transition-colors" aria-label={`Call ${HELPLINE}`}>
              {HELPLINE}
            </a>
          </span>
          <span className="hidden sm:inline text-red-200">|</span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-white text-sm hover:text-red-100 transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <ChatBubbleLeftRightIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
            WhatsApp Support
          </a>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheckIcon style={{ width: '1.4rem', height: '1.4rem', color: '#63B3ED' }} aria-hidden="true" />
            <span className="font-bold text-white text-lg">Avyakta</span>
          </div>
          <p className="text-sm mb-4" style={{ color: '#A0C4E8', lineHeight: '1.6' }}>
            Official humanitarian portal connecting families with unclaimed bodies since 2020. Every soul remembered, every life respected.
          </p>
          <div className="trust-badge" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#90CDF4' }}>
            <ShieldCheckIcon style={{ width: '0.85rem', height: '0.85rem' }} aria-hidden="true" />
            Registered NGO · Punjab, India
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase" style={{ fontSize: '0.78rem', letterSpacing: '0.08em' }}>Navigate</h3>
          <ul className="space-y-2.5">
            {[
              { label: 'Home',           path: '/' },
              { label: 'About Us',       path: '/about' },
              { label: 'Report a Case',  path: '/report' },
              { label: 'Search Records', path: '/search' },
              { label: 'FAQ',            path: '/faq' },
              { label: 'Contact Us',     path: '/contact' },
            ].map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="footer-link text-sm">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Legal */}
        <div>
          <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase" style={{ fontSize: '0.78rem', letterSpacing: '0.08em' }}>Support & Legal</h3>
          <ul className="space-y-2.5">
            <li>
              <button type="button" className="footer-link bg-transparent border-none p-0 text-sm" onClick={() => openModal('privacy')}>
                Privacy Policy
              </button>
            </li>
            <li>
              <button type="button" className="footer-link bg-transparent border-none p-0 text-sm" onClick={() => openModal('cookies')}>
                Cookie Policy
              </button>
            </li>
            <li>
              <button type="button" className="footer-link bg-transparent border-none p-0 text-sm" onClick={() => openModal('terms')}>
                Terms of Service
              </button>
            </li>
            <li>
              <Link to="/guidelines" className="footer-link text-sm">Guidelines</Link>
            </li>
          </ul>
        </div>

        {/* Grief Support */}
        <div>
          <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase" style={{ fontSize: '0.78rem', letterSpacing: '0.08em' }}>
            Grief Support
          </h3>
          <p className="text-xs mb-3" style={{ color: '#A0C4E8', lineHeight: '1.5' }}>
            Need emotional support? Reach these free helplines:
          </p>
          <ul className="space-y-2.5">
            <li>
              <a href="https://icallhelpline.org" target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                iCall (Free counselling)
              </a>
            </li>
            <li>
              <a href="tel:9152987821" className="footer-link text-sm">
                iCall: 9152987821
              </a>
            </li>
            <li>
              <a href="https://www.vandrevalafoundation.com" target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                Vandrevala Foundation
              </a>
            </li>
            <li>
              <a href="tel:18602662345" className="footer-link text-sm">
                Vandrevala: 1860-2662-345
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Privacy Notice */}
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 justify-center text-center">
          <ShieldCheckIcon style={{ width: '0.9rem', height: '0.9rem', color: '#63B3ED', flexShrink: 0 }} aria-hidden="true" />
          <p className="text-xs" style={{ color: '#90CDF4' }}>
            Your data is protected under India's Information Technology Act 2000 and our strict privacy policy.
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="max-w-3xl mx-auto text-center py-6 px-4 italic" style={{ color: '#90CDF4', fontSize: '0.95rem', fontFamily: 'Georgia, serif' }}>
        "In silent departures, we find our greatest humanity." — Avyakta Team
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1rem' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Language Toggle */}
          <div className="flex items-center gap-1">
            <span className="text-xs mr-2" style={{ color: '#718096' }}>Language:</span>
            {LANG_OPTIONS.map((lang, i) => (
              <React.Fragment key={lang.code}>
                <button
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`text-xs px-2 py-1 rounded transition-all ${i18n.language === lang.code ? 'bg-white/15 text-white font-bold' : 'text-blue-200 hover:text-white'}`}
                  aria-label={`Switch to ${lang.label}`}
                  aria-pressed={i18n.language === lang.code}
                >
                  {lang.label}
                </button>
                {i < LANG_OPTIONS.length - 1 && <span style={{ color: '#4A5568' }}>|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-center" style={{ color: '#718096' }}>
            © {year} Avyakta. Every soul remembered, every life respected. &nbsp;|&nbsp; Built with{' '}
            <HeartIcon style={{ width: '0.75rem', height: '0.75rem', display: 'inline', color: '#FC8181' }} aria-hidden="true" />
            {' '}by Shivam Raj
          </div>
        </div>
      </div>

      {/* Modal for Legal Policies */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        {modalContent}
      </Modal>

      {/* Footer link styles */}
      <style>{`
        .footer-link {
          color: #90CDF4;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          font-family: inherit;
          background: none;
          border: none;
        }
        .footer-link:hover, .footer-link:focus {
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;