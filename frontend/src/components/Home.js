import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HeartIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import CaseStatusTracker from './CaseStatusTracker';

const Testimonials = lazy(() => import('./Testimonials'));

// ── Calmer Institutional Theme ──

const Home = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const features = [
    { icon: ShieldCheckIcon, title: 'Secure & Confidential',  description: 'All information is handled with utmost privacy and security under IT Act 2000.' },
    { icon: ClockIcon,       title: '24/7 Support',           description: 'Round-the-clock helpline assistance for emergency situations and guidance.' },
    { icon: MapPinIcon,      title: 'Nationwide Coverage',    description: 'Connected with 125+ police stations across India for comprehensive reach.' },
    { icon: StarIcon,        title: 'Verified Process',       description: 'Rigorous verification ensures accurate, dignified identification of every case.' },
  ];

  const stats = [
    { number: '1452+', label: 'Total Reports Handled',        icon: HeartIcon },
    { number: '38',    label: 'Lives Saved Through Alerts',   icon: ShieldCheckIcon },
    { number: '75+',   label: 'Volunteers Nationwide',        icon: UserGroupIcon },
    { number: '125+',  label: 'Police Stations Connected',    icon: GlobeAltIcon },
  ];

  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════════════
          HERO — Cosmic dark (preserved), improved CTAs
      ══════════════════════════════════════════════════ */}
      {/* ── Hero section: soft light blue-gray background with a calm, dignified institutional look ── */}
      <section className="relative min-h-[calc(100vh-100px)] flex flex-col justify-center overflow-hidden pt-8 sm:pt-12 pb-16 sm:pb-24" style={{ backgroundColor: '#F0F4F8' }}>
        
        {/* Soft Dignified Overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)'
        }} />

        {/* Smooth color grading transition into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
          style={{
            height: '160px',
            background: 'linear-gradient(to bottom, rgba(240,244,248,0) 0%, rgba(248,250,252,0.7) 60%, #F8FAFC 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 container-responsive text-center">

          {/* Trust Badge */}
          <div className={`flex justify-center mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold text-center whitespace-normal sm:whitespace-nowrap max-w-[90vw]"
              style={{
                background: 'rgba(27,58,107,0.06)',
                color: '#1B3A6B',
                border: '1px solid rgba(27,58,107,0.15)',
                borderRadius: '999px',
                backdropFilter: 'blur(8px)',
              }}>
              ✦ Officially registered humanitarian portal — Est. 2020
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-merriweather font-bold mb-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ color: '#1B3A6B' }}>
            {t('home.hero.title')}
          </h1>

          <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ color:'#2D3748' }}>
            {t('home.hero.description')}
          </p>
          <p className={`text-xs sm:text-sm max-w-2xl mx-auto mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ color:'#4A5568' }}>
            Connecting families with unclaimed bodies since 2020 · Punjab, India
          </p>


          {/* ── Case Status Tracker Preview ── */}
          <div className={`flex justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div style={{ width:'100%', maxWidth:'560px' }} className="px-2 sm:px-0">
              <p className="text-xs mb-2.5 font-medium" style={{ color:'#4A5568' }}>How a case progresses through our system:</p>
              <CaseStatusTracker currentStep={1} lang={['hi','pa'].includes(navigator.language?.slice(0,2)) ? navigator.language.slice(0,2) : 'en'} />
            </div>
          </div>

          {/* ── Subtle Elegant Divider Line (soft faded gradient) ── */}
          <div className={`mt-8 sm:mt-10 max-w-2xl mx-auto px-4 flex items-center justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURES — warm white cards
      ══════════════════════════════════════════════════ */}
      <section className="content-section-alt">
        <div className="container-responsive">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-3" style={{ color:'#1B3A6B' }}>
              Why Choose Avaykta
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color:'#4A5568' }}>
              Built on the principles of dignity, compassion, and technological innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="inst-card text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background:'rgba(46,125,156,0.1)', border:'1.5px solid rgba(46,125,156,0.2)' }}>
                  <f.icon style={{ width:'1.6rem', height:'1.6rem', color:'#2E7D9C' }} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color:'#1B3A6B' }}>{f.title}</h3>
                <p className="text-sm" style={{ color:'#4A5568' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GRIEF SUPPORT — warm off-white
      ══════════════════════════════════════════════════ */}
      <section className="content-section">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto">
            <div className="grief-support-banner">
              <HeartIcon className="grief-icon" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color:'#1B3A6B' }}>
                  Grief Support Resources
                </h3>
                <p className="text-sm mb-3" style={{ color:'#4A5568' }}>
                  Losing a loved one is deeply painful. If you need emotional support, please reach out to these organizations:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://icallhelpline.org" target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ background:'#DBEAFE', color:'#1E40AF' }}
                    title="Visit iCall free counselling helpline website">
                    iCall Helpline
                  </a>
                  <a href="https://www.vandrevalafoundation.com" target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ background:'#D1FAE5', color:'#065F46' }}
                    title="Visit Vandrevala Foundation mental health support">
                    Vandrevala Foundation
                  </a>
                  <a href="tel:9152987821"
                    className="text-sm font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ background:'#FEF3C7', color:'#92400E' }}
                    title="Call iCall counselling helpline">
                    iCall: 9152987821
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS — The Reality We Face (Positioned below Grief Support)
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container-responsive">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-3" style={{ color: '#1B3A6B' }}>
              The Reality We Face
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto" style={{ color: '#4A5568' }}>
              Every year, thousands of unclaimed bodies are found across India. These are not just statistics — they are human beings who deserve dignity and closure.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 text-center rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-sky-600" aria-hidden="true" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 font-merriweather" style={{ color: '#1B3A6B' }}>
                  {stat.number}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Suspense fallback={
        <div className="py-16 text-center" style={{ backgroundColor:'#F0F4F8' }}>
          <div className="w-8 h-8 mx-auto border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      }>
        <Testimonials />
      </Suspense>

      {/* ══════════════════════════════════════════════════
          CALL TO ACTION — Main page light background
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#F0F4F8' }}>
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#1B3A6B' }}>
              Join Our Mission
            </h2>
            <p className="text-base sm:text-lg mb-8" style={{ color: '#4A5568' }}>
              Together, we can bring dignity to the forgotten and make a lasting impact in our communities.
            </p>
            <div className="flex justify-center">
              <Link to="/contact" className="btn-secondary" style={{ borderColor: 'rgba(27,58,107,0.25)', color: '#1B3A6B', background: '#FFFFFF' }} title="Contact Avaykta support team">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
