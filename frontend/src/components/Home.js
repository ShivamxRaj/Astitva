import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient';
import {
  HeartIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Testimonials from './Testimonials';
import CaseStatusTracker from './CaseStatusTracker';

/* ── Cosmic Animation (hero-only, reduced to peaceful/gentle counts) ── */
const CosmicAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Falling stars: 80 → 20 */}
    {[...Array(20)].map((_, i) => (
      <div key={`fs-${i}`} className="absolute animate-falling-star"
        style={{ left: `${Math.random()*100}%`, animationDelay: `${Math.random()*15}s`, animationDuration: `${15+Math.random()*30}s`, animationIterationCount:'infinite' }}>
        <div className="w-1 h-1 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-full opacity-70 animate-twinkle"
          style={{ animationDelay:`${Math.random()*3}s`, animationDuration:`${2.5+Math.random()*3}s` }} />
      </div>
    ))}
    {/* Ascending souls: 25 → 8 */}
    {[...Array(8)].map((_, i) => (
      <div key={`as-${i}`} className="absolute animate-ascending-soul"
        style={{ left:`${Math.random()*100}%`, bottom:'-20px', animationDelay:`${Math.random()*20}s`, animationDuration:`${38+Math.random()*52}s`, animationIterationCount:'infinite' }}>
        <div className="relative">
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 rounded-full opacity-70 animate-soul-glow"
            style={{ animationDuration:`${4.5+Math.random()*6}s` }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-transparent via-cyan-200 to-transparent rounded-full opacity-30 animate-soul-trail" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full opacity-15 animate-soul-outer-glow" />
        </div>
      </div>
    ))}
    {/* Shooting stars: 12 → 4 */}
    {[...Array(4)].map((_, i) => (
      <div key={`ss-${i}`} className="absolute animate-shooting-star"
        style={{ top:`${Math.random()*60}%`, left:`${Math.random()*100}%`, animationDelay:`${Math.random()*25}s`, animationDuration:`${30+Math.random()*45}s`, animationIterationCount:'infinite' }}>
        <div className="relative">
          <div className="w-1 h-1 bg-white rounded-full opacity-80" />
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 origin-right opacity-50" />
        </div>
      </div>
    ))}
    {/* Constellation dots: 40 → 15 */}
    {[...Array(15)].map((_, i) => (
      <div key={`c-${i}`} className="absolute animate-constellation"
        style={{ top:`${Math.random()*100}%`, left:`${Math.random()*100}%`, animationDelay:`${Math.random()*10}s`, animationDuration:`${12+Math.random()*18}s`, animationIterationCount:'infinite' }}>
        <div className="w-0.5 h-0.5 bg-blue-200 rounded-full opacity-50 animate-constellation-glow"
          style={{ animationDuration:`${3+Math.random()*4.5}s` }} />
      </div>
    ))}
    {/* Floating particles: 60 → 15 */}
    {[...Array(15)].map((_, i) => (
      <div key={`p-${i}`} className="absolute animate-floating-particle"
        style={{ top:`${Math.random()*100}%`, left:`${Math.random()*100}%`, animationDelay:`${Math.random()*18}s`, animationDuration:`${22+Math.random()*38}s`, animationIterationCount:'infinite' }}>
        <div className="w-0.5 h-0.5 bg-gradient-to-r from-white to-cyan-200 rounded-full opacity-40 animate-particle-glow"
          style={{ animationDuration:`${3+Math.random()*6}s` }} />
      </div>
    ))}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-transparent via-cyan-500/10 to-transparent rounded-full animate-universe-glow" />
  </div>
);

const Home = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentCases, setRecentCases] = useState([]);
  const [casesLoading, setCasesLoading] = useState(true);

  useEffect(() => { setIsVisible(true); }, []);

  useEffect(() => {
    const fetchRecentCases = async () => {
      setCasesLoading(true);
      try {
        const { data, error } = await supabase
          .from('orphan_cases')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (!error && data) {
          // Map Supabase fields to the UI format
          const mapped = data.map(c => ({
            id: c.case_id,
            location: c.location,
            date: new Date(c.created_at).toLocaleDateString(),
            status: c.status.charAt(0).toUpperCase() + c.status.slice(1),
            statusColor: c.status === 'identified' ? '#27AE60' : 
                         c.status === 'investigating' ? '#8B5CF6' : 
                         c.status === 'unidentified' ? '#F59E0B' : '#2E7D9C'
          }));
          setRecentCases(mapped);
        }
      } catch (err) {
        console.error('Error fetching recent cases:', err);
      } finally {
        setCasesLoading(false);
      }
    };
    fetchRecentCases();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

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
      <section className="relative min-h-screen overflow-hidden flex flex-col justify-center" style={{ backgroundColor: 'rgb(16, 8, 50)' }}>
        <CosmicAnimation />

        {/* Radial gradient overlay — darkens edges, keeps centre readable */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,8,50,0.0) 0%, rgba(16,8,50,0.4) 50%, rgba(16,8,50,0.85) 100%)'
        }} />

        <div className="relative z-10 container-responsive text-center py-16">

          {/* Trust Badge */}
          <div className={`flex justify-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#A8C8FF',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '999px',
                backdropFilter: 'blur(8px)',
                fontSize: '0.8rem',
                padding: '6px 16px',
              }}>
              ✦ Officially registered humanitarian portal — Est. 2020
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-merriweather font-bold mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ backgroundImage:'linear-gradient(91deg, #fff, #7e55ff)', backgroundClip:'text', WebkitBackgroundClip:'text', color:'transparent' }}>
            {t('home.hero.title')}
          </h1>

          <p className={`text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ color:'#E2E8F0' }}>
            {t('home.hero.description')}
          </p>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ color:'#8BAFD4', marginTop:'8px' }}>
            Connecting families with unclaimed bodies since 2020 · Punjab, India
          </p>


          {/* ── Case Status Tracker Preview ── */}
          <div className={`flex justify-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div style={{ width:'100%', maxWidth:'560px' }}>
              <p className="text-xs mb-3" style={{ color:'#718096' }}>How a case progresses through our system:</p>
              <CaseStatusTracker currentStep={1} lang={['hi','pa'].includes(navigator.language?.slice(0,2)) ? navigator.language.slice(0,2) : 'en'} />
            </div>
          </div>
        </div>

        {/* Scroll indicator — mouse icon with gentle bounce */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
          <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor:'rgba(255,255,255,0.4)' }}>
            <div className="w-1 h-3 rounded-full animate-pulse" style={{ background:'rgba(255,255,255,0.4)' }} />
          </div>
        </div>

        {/* Bottom fade — hero bleeds smoothly into next section */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, rgb(16,8,50))'
        }} />
      </section>

      {/* ══════════════════════════════════════════════════
          RECENT CASES — warm off-white
      ══════════════════════════════════════════════════ */}
      <section className="content-section">
        <div className="container-responsive">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-merriweather font-bold mb-2" style={{ color:'#1B3A6B' }}>
              Recent Cases
            </h2>
            <p className="text-base" style={{ color:'#4A5568' }}>
              Our portal is actively maintained. Here are the latest cases:
            </p>
          </div>
          
          {casesLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          ) : recentCases.length === 0 ? (
            <div className="text-center py-12 px-6 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="text-gray-500 italic">No recent cases reported yet. Your help can change this.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentCases.map((c) => (
                <div key={c.id} className="inst-card">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ background:`${c.statusColor}18`, color:c.statusColor, border:`1px solid ${c.statusColor}40` }}>
                      {c.status}
                    </span>
                    <span className="text-xs" style={{ color:'#94A3B8' }}>{c.date}</span>
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color:'#1B3A6B' }}>{c.id}</p>
                  <p className="text-sm flex items-center gap-1" style={{ color:'#4A5568' }}>
                    <MapPinIcon style={{ width:'0.85rem', height:'0.85rem', flexShrink:0 }} aria-hidden="true" />
                    {c.location}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-6">
            <Link to="/search" className="btn-secondary" style={{ fontSize:'0.9rem', padding:'0.6rem 1.5rem' }}>
              View All Cases <ArrowRightIcon style={{ width:'1rem', height:'1rem' }} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════════════════════════════════════════════
          STATS — navy section
      ══════════════════════════════════════════════════ */}
      <section className="content-section-navy">
        <div className="container-responsive">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-3 text-white">
              The Reality We Face
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color:'#BEE3F8' }}>
              Every year, thousands of unclaimed bodies are found across India. These are not just statistics — they are human beings who deserve dignity and closure.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="p-5 sm:p-6 text-center rounded-xl border border-white/15 hover:scale-105 transition-all duration-300"
                style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(10px)' }}>
                <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color:'#63B3ED' }} aria-hidden="true" />
                <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-white">{stat.number}</h3>
                <p className="text-xs sm:text-sm" style={{ color:'#BEE3F8' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════════════════════════════════════════════
          FEATURES — warm white cards
      ══════════════════════════════════════════════════ */}
      <section className="content-section-alt">
        <div className="container-responsive">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-3" style={{ color:'#1B3A6B' }}>
              Why Choose Avyakta
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

      <hr className="section-divider" />

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
                    style={{ background:'#DBEAFE', color:'#1E40AF' }}>
                    iCall Helpline →
                  </a>
                  <a href="https://www.vandrevalafoundation.com" target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ background:'#D1FAE5', color:'#065F46' }}>
                    Vandrevala Foundation →
                  </a>
                  <a href="tel:9152987821"
                    className="text-sm font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ background:'#FEF3C7', color:'#92400E' }}>
                    iCall: 9152987821
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      <hr className="section-divider" />

      {/* ══════════════════════════════════════════════════
          CALL TO ACTION — navy
      ══════════════════════════════════════════════════ */}
      <section className="content-section-navy">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4 text-white">
              Join Our Mission
            </h2>
            <p className="text-base sm:text-lg mb-8" style={{ color:'#BEE3F8' }}>
              Together, we can bring dignity to the forgotten and make a lasting impact in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report" className="btn-urgent">
                <ExclamationTriangleIcon style={{ width:'1.1rem', height:'1.1rem' }} aria-hidden="true" />
                Report a Case
                <ArrowRightIcon style={{ width:'1rem', height:'1rem' }} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn-secondary" style={{ borderColor:'rgba(255,255,255,0.5)', color:'#fff' }}>
                Contact Us
                <ArrowRightIcon style={{ width:'1rem', height:'1rem' }} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
