import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  PlayIcon, 
  PauseIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowRightIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import Testimonials from './Testimonials';

// Emotional Cosmic Animation Component
const CosmicAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Falling Stars - Representing the souls that have passed */}
      {[...Array(80)].map((_, index) => (
        <div
          key={`falling-star-${index}`}
          className="absolute animate-falling-star"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationIterationCount: 'infinite'
          }}
        >
          <div 
            className="w-1 h-1 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-full opacity-90 animate-twinkle"
            style={{
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`
            }}
          />
        </div>
      ))}
      
      {/* Ascending Souls - Representing souls finding peace and salvation */}
      {[...Array(25)].map((_, index) => (
        <div
          key={`ascending-soul-${index}`}
          className="absolute animate-ascending-soul"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-20px',
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${25 + Math.random() * 35}s`,
            animationIterationCount: 'infinite'
          }}
        >
          <div className="relative">
            {/* Soul light */}
            <div 
              className="w-3 h-3 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 rounded-full opacity-80 animate-soul-glow"
              style={{
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
            {/* Soul trail */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-transparent via-cyan-200 to-transparent rounded-full opacity-40 animate-soul-trail" />
            {/* Outer glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full opacity-20 animate-soul-outer-glow" />
          </div>
        </div>
      ))}
      
      {/* Shooting Stars - Representing moments of hope and connection */}
      {[...Array(12)].map((_, index) => (
        <div
          key={`shooting-star-${index}`}
          className="absolute animate-shooting-star"
          style={{
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 25}s`,
            animationDuration: `${20 + Math.random() * 30}s`,
            animationIterationCount: 'infinite'
          }}
        >
          <div className="relative">
            <div className="w-1 h-1 bg-white rounded-full opacity-90" />
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 origin-right opacity-70" />
          </div>
        </div>
      ))}
      
      {/* Constellation Points - Representing the eternal connection */}
      {[...Array(40)].map((_, index) => (
        <div
          key={`constellation-${index}`}
          className="absolute animate-constellation"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationIterationCount: 'infinite'
          }}
        >
          <div 
            className="w-0.5 h-0.5 bg-blue-200 rounded-full opacity-60 animate-constellation-glow"
            style={{
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        </div>
      ))}
      
      {/* Ethereal Light Rays - Representing divine light and hope */}
      {[...Array(6)].map((_, index) => (
        <div
          key={`light-ray-${index}`}
          className="absolute animate-light-ray"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 30}s`,
            animationDuration: `${40 + Math.random() * 50}s`,
            animationIterationCount: 'infinite'
          }}
        >
          <div className="w-1 h-32 bg-gradient-to-b from-transparent via-cyan-200 to-transparent opacity-30 transform rotate-45" />
        </div>
      ))}
      
      {/* Floating Particles - Representing memories and love */}
      {[...Array(60)].map((_, index) => (
        <div
          key={`particle-${index}`}
          className="absolute animate-floating-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 18}s`,
            animationDuration: `${15 + Math.random() * 25}s`,
            animationIterationCount: 'infinite'
          }}
        >
          <div 
            className="w-0.5 h-0.5 bg-gradient-to-r from-white to-cyan-200 rounded-full opacity-50 animate-particle-glow"
            style={{
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        </div>
      ))}
      
      {/* Central Light Source - Representing the universe's embrace */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-transparent via-cyan-500/10 to-transparent rounded-full animate-universe-glow" />
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      quote: "After 3 years of searching for my brother, we had almost given up hope. Then Avyakta's platform helped us identify him through a hospital report. The closure we found was beyond words. We could finally give him a proper farewell with dignity.",
      author: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      role: "Sister of Missing Person",
      caseDetails: "Found after 3 years through hospital records"
    },
    {
      quote: "As a police inspector, I've seen countless unclaimed bodies. Avyakta's technology helped us identify a missing elderly woman within 24 hours. Her family was devastated but grateful for the closure. This platform is a game-changer.",
      author: "Inspector Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      role: "Senior Police Officer",
      caseDetails: "24-hour identification success"
    },
    {
      quote: "My father went missing during a business trip. For 8 months, we searched everywhere. Avyakta's nationwide network helped us find him in a different state. The compassion shown by their team was incredible.",
      author: "Amit Patel",
      location: "Ahmedabad",
      rating: 5,
      role: "Son of Missing Person",
      caseDetails: "Cross-state identification in 8 months"
    },
    {
      quote: "I volunteer with Avyakta and have witnessed families reuniting with their loved ones. The tears of relief, the gratitude in their eyes - it's more than just identification. It's restoring dignity to those who can't speak for themselves.",
      author: "Dr. Meera Joshi",
      location: "Bangalore",
      rating: 5,
      role: "Volunteer Coordinator",
      caseDetails: "Witnessed 50+ successful identifications"
    },
    {
      quote: "Our hospital used to struggle with unclaimed bodies. Since partnering with Avyakta, we've helped 12 families find closure. The platform's efficiency and the team's dedication are remarkable.",
      author: "Dr. Sanjay Verma",
      location: "Chennai",
      rating: 5,
      role: "Hospital Administrator",
      caseDetails: "12 successful hospital identifications"
    },
    {
      quote: "My daughter went missing when she was 16. After 2 years of searching, Avyakta helped us find her. Though the outcome was heartbreaking, we finally had answers. The platform gave us the closure we desperately needed.",
      author: "Sunita Devi",
      location: "Kolkata",
      rating: 5,
      role: "Mother of Missing Teen",
      caseDetails: "Teenager identified after 2 years"
    },
    {
      quote: "As a social worker, I've seen the emotional toll on families of missing persons. Avyakta's approach is different - they treat every case with the dignity it deserves. The technology is impressive, but their humanity is what sets them apart.",
      author: "Rahul Gupta",
      location: "Hyderabad",
      rating: 5,
      role: "Social Worker",
      caseDetails: "Advocates for 100+ families"
    },
    {
      quote: "My uncle was found unconscious and unidentified. Thanks to Avyakta's rapid response system, we were contacted within hours. He's now recovering, and we're forever grateful for their timely intervention.",
      author: "Kavya Reddy",
      location: "Pune",
      rating: 5,
      role: "Niece of Rescued Person",
      caseDetails: "Life saved through rapid identification"
    }
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Secure & Confidential",
      description: "All information is handled with utmost privacy and security protocols."
    },
    {
      icon: ClockIcon,
      title: "24/7 Support",
      description: "Round-the-clock assistance for emergency situations and support."
    },
    {
      icon: MapPinIcon,
      title: "Nationwide Coverage",
      description: "Connected with police stations across India for comprehensive reach."
    },
    {
      icon: StarIcon,
      title: "Verified Process",
      description: "Rigorous verification process ensures accurate identification."
    }
  ];

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden" style={{ backgroundColor: 'rgb(16, 8, 50)' }}>
        {/* Cosmic Animation */}
        <CosmicAnimation />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center container-responsive text-center z-10">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-merriweather font-bold mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ 
            backgroundImage: 'linear-gradient(91deg, #fff, #7e55ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Avyakta
          </h1>
          <p className={`text-lg sm:text-xl lg:text-2xl max-w-3xl sm:max-w-4xl mx-auto mb-6 sm:mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#f1f1f1' }}>
            Bringing dignity to the unclaimed, one soul at a time
          </p>
          <p className={`text-base sm:text-lg lg:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#f1f1f1' }}>
            We are a compassionate platform dedicated to helping identify and honor unclaimed bodies with dignity, compassion, and purpose.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/report"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 font-bold text-white shadow-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 px-6 py-3"
            >
              Report Unclaimed Body
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 font-bold text-slate-900 shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 px-6 py-3"
            >
              Search Missing Person
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4 animate-fade-in" style={{ color: '#00ffff' }}>
              The Reality We Face
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto animate-fade-in" style={{ color: '#f1f1f1' }}>
              Every year, thousands of unclaimed bodies are found across India. These are not just statistics - they are human beings who deserve dignity and closure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { number: '1452+', label: 'Total Unclaimed Reports Handled', icon: HeartIcon },
              { number: '38', label: 'Lives Saved Through Timely Alerts', icon: ShieldCheckIcon },
              { number: '75+', label: 'Volunteers', icon: UserGroupIcon },
              { number: '125+', label: 'Police Stations Connected', icon: GlobeAltIcon }
            ].map((stat, index) => (
              <div 
                key={index}
                className="p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/20 animate-fade-in"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#00ffff' }}>{stat.number}</h3>
                <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4 animate-fade-in" style={{ color: '#00ffff' }}>
              Why Choose Avyakta
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto animate-fade-in" style={{ color: '#f1f1f1' }}>
              Our platform is built on the principles of dignity, compassion, and technological innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 text-center border border-white/20 animate-fade-in hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: '#00ffff' }}>
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base" style={{ color: '#f1f1f1' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4 sm:mb-6 animate-fade-in" style={{ color: '#00ffff' }}>
              Join Our Mission
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 animate-fade-in" style={{ color: '#f1f1f1' }}>
              Together, we can bring dignity to the forgotten and make a lasting impact in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link
                to="/volunteer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 font-bold text-white shadow-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 px-6 py-3"
              >
                Become a Volunteer
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 font-bold text-slate-900 shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 px-6 py-3"
              >
                Contact Us
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
