import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import CookiePolicy from '../pages/CookiePolicy';
import TermsOfService from '../pages/Guidelines';
import { PrivacyPolicy } from '../pages/About';

const Footer = () => {
  const { i18n } = useTranslation();
  const year = 2025;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (type) => {
    if (type === 'privacy') {
      setModalContent(<PrivacyPolicy />);
      setModalTitle('Privacy Policy');
    } else if (type === 'cookies') {
      setModalContent(<CookiePolicy />);
      setModalTitle('Cookie Policy');
    } else if (type === 'terms') {
      setModalContent(<TermsOfService />);
      setModalTitle('Terms of Service');
    }
    setModalOpen(true);
  };

  return (
    <footer
      className="pt-12 pb-6 px-4 sm:px-8"
      style={{
        background: '#0D0B28',
        color: '#fff',
        fontFamily: 'Poppins, Inter, sans-serif',
        letterSpacing: '0.01em',
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
        {/* About */}
        <div>
          <h3 className="font-semibold text-base mb-3 tracking-wide">About</h3>
          <ul className="space-y-2">
            <li><Link to="/about#mission" className="footer-link">Our Mission</Link></li>
            <li><Link to="/about#team" className="footer-link">Our Team</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
          </ul>
      </div>
        {/* Help & Support */}
        <div>
          <h3 className="font-semibold text-base mb-3 tracking-wide">Help & Support</h3>
          <ul className="space-y-2">
            <li><Link to="/report" className="footer-link">Report a Case</Link></li>
            <li><Link to="/guidelines" className="footer-link">Guidelines</Link></li>
            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
          </ul>
              </div>
        {/* Legal */}
        <div>
          <h3 className="font-semibold text-base mb-3 tracking-wide">Legal</h3>
          <ul className="space-y-2">
            <li><button type="button" className="footer-link bg-transparent border-none p-0 m-0" onClick={() => openModal('privacy')}>Privacy Policy</button></li>
            <li><button type="button" className="footer-link bg-transparent border-none p-0 m-0" onClick={() => openModal('cookies')}>Cookie Policy</button></li>
            <li><button type="button" className="footer-link bg-transparent border-none p-0 m-0" onClick={() => openModal('terms')}>Terms of Service</button></li>
          </ul>
        </div>
        {/* Emergency Contact */}
        <div>
          <h3 className="font-semibold text-base mb-3 tracking-wide">Emergency Contact</h3>
          <ul className="space-y-2">
            <li><span className="font-medium">24/7 Helpline:</span> <a href="tel:1800XXXXXXX" className="footer-link">1800-XXX-XXXX</a></li>
            <li><span className="font-medium">Email:</span> <a href="mailto:support@avyakta.org" className="footer-link">support@avyakta.org</a></li>
            <li><span className="font-medium">WhatsApp:</span> <a href="https://wa.me/916299446452?text=Hello%20Sir%2FMadam%2C%20%F0%9F%99%8F%20%0AThis%20is%20Avyakta%2C%20your%20support%20companion.%20%0AI%27m%20here%20to%20help%20you%20with%20compassion%20and%20care.%20%0APlease%20share%20how%20I%20may%20assist%20you%20today%20%E2%80%94%20your%20concern%20matters%20deeply%20to%20us." className="footer-link">Chat Now</a></li>
          </ul>
              </div>
            </div>
      {/* Optional Quote */}
      <div className="max-w-3xl mx-auto text-center mt-8 mb-4 italic text-gray-300" style={{fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.08rem'}}>
        "In silent departures, we find our greatest humanity." — Avyakta Team
          </div>
      {/* Divider */}
      <div className="border-t border-white/10 my-4" />
      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 pt-2 text-sm">
        {/* Language Toggle */}
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="text-gray-400">Language:</span>
          <button
            onClick={() => i18n.changeLanguage('en')}
            className={`footer-link px-2 py-0.5 rounded ${i18n.language === 'en' ? 'underline underline-offset-4' : ''}`}
            style={{fontSize: '0.98em'}}>
            English
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => i18n.changeLanguage('hi')}
            className={`footer-link px-2 py-0.5 rounded ${i18n.language === 'hi' ? 'underline underline-offset-4' : ''}`}
            style={{fontSize: '0.98em'}}>
            हिंदी
          </button>
              </div>
        {/* Copyright */}
        <div className="text-gray-400 text-center md:text-right">
          © {year} Avyakta. Every soul remembered, every life respected. | Built with <span style={{color:'#fff'}}>🤍</span> by Shivam Raj
        </div>
      </div>
      {/* Modal for Legal Policies */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        {modalContent}
      </Modal>
      {/* Footer link styles */}
      <style>{`
        .footer-link {
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .footer-link:hover, .footer-link:focus {
          border-bottom: 1.5px solid #fff;
          color: #b3b3ff;
          box-shadow: 0 1px 8px 0 #fff2;
        }
        button.footer-link {
          background: none;
          border: none;
          cursor: pointer;
          font: inherit;
        }
      `}</style>
    </footer>
  );
};

export default Footer; 