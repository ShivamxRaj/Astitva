import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    setNewLanguage(newLang);
    setShowLanguageModal(true);
  };

  const confirmLanguageChange = () => {
    i18n.changeLanguage(newLanguage);
    setShowLanguageModal(false);
  };

  const cancelLanguageChange = () => {
    setShowLanguageModal(false);
  };

  const navItems = [
    { key: 'home', label: 'Home', path: '/' },
    { key: 'report', label: 'Report Case', path: '/report' },
    { key: 'team', label: 'Team', path: '/team' },
    { key: 'contact', label: 'Contact Us', path: '/contact' },
    { key: 'about', label: 'About Us', path: '/about' },
    { key: 'faq', label: 'FAQ', path: '/faq' }
  ];

  return (
    <>
      <Disclosure as="nav" className="shadow-lg font-poppins fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#0F0A2D' }}>
        {({ open }) => (
          <>
            <div className="container-responsive">
              <div className="flex h-16 sm:h-20 lg:h-24 items-center justify-between">
                {/* Logo and Brand */}
                <div className="flex items-center flex-1 min-w-0">
                  <Link to="/" className="flex items-center mr-2 sm:mr-4 lg:mr-6">
                    <img
                      className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18 xl:h-20 xl:w-20 object-contain filter brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] contrast-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300"
                      src={logo}
                      alt="Avyakta Logo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  </Link>
                  
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex flex-1 justify-center items-center space-x-2 lg:space-x-4 xl:space-x-6 ml-4 lg:ml-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.key}
                        to={item.path}
                        className="relative inline-flex items-center px-2 sm:px-3 lg:px-4 font-medium text-white rounded-md"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  <button
                    onClick={handleLanguageChange}
                    className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-sky-600 to-cyan-600 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
                    aria-label="Switch Language"
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      {i18n.language === 'en' ? 'हिंदी' : 'English'}
                    </span>
                  </button>
                  <Link
                    to="/admin/login"
                    className="btn-responsive rounded-full bg-gradient-to-br from-amber-500 to-orange-600 font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500"
                  >
                    <span className="hidden sm:inline">Admin Login</span>
                    <span className="sm:hidden">Admin</span>
                  </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 sm:p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Panel */}
            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-dark border-t border-white/10">
                {navItems.map((item) => (
                  <Disclosure.Button
                    key={item.key}
                    as={Link}
                    to={item.path}
                    className="block px-3 py-3 sm:py-4 rounded-md text-base sm:text-lg font-medium text-white"
                  >
                    {item.label}
                  </Disclosure.Button>
                ))}
                
                {/* Mobile Actions */}
                <div className="pt-4 pb-3 border-t border-white/20 space-y-3">
                  <div className="px-3">
                    <button
                      onClick={handleLanguageChange}
                      className="w-full flex justify-center items-center px-4 py-3 rounded-full bg-gradient-primary text-secondary-dark shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-dark focus:ring-primary"
                    >
                      <span className="text-sm sm:text-base font-medium">
                        {i18n.language === 'en' ? 'हिंदी' : 'English'}
                      </span>
                    </button>
                  </div>
                  <div className="px-3">
                    <Link
                      to="/admin/login"
                      className="block w-full text-center px-4 py-3 rounded-full bg-gradient-dark text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-dark focus:ring-primary"
                    >
                      <span className="text-sm sm:text-base font-semibold">Admin Login</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Language Change Modal */}
      {showLanguageModal && (
        <div className="modal-responsive bg-black/60 backdrop-blur-sm">
          <div className="modal-content-responsive bg-slate-50 shadow-2xl">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">Change Language</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-6">
              Are you sure you want to change the language to {newLanguage === 'en' ? 'English' : 'हिंदी'}?
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={cancelLanguageChange}
                className="px-4 py-2 sm:px-5 sm:py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLanguageChange}
                className="px-4 py-2 sm:px-5 sm:py-2 text-sm font-medium text-white bg-sky-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 