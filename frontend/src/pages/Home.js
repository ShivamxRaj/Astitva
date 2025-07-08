import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  UserGroupIcon, 
  CheckCircleIcon, 
  ChartBarIcon, 
  HeartIcon,
  PhoneIcon,
  ShieldExclamationIcon,
  StarIcon,
  ArrowRightIcon,
  PlayIcon,
  PauseIcon,
  VolumeUpIcon,
  VolumeOffIcon
} from '@heroicons/react/24/outline';
import StarryBackground from '../components/StarryBackground';

const stats = [
  { label: t('home.stats.casesReported'), value: 1243, icon: '📋', color: 'from-blue-500 to-cyan-500' },
  { label: t('home.stats.casesResolved'), value: 1107, icon: '✅', color: 'from-green-500 to-emerald-500' },
  { label: t('home.stats.ngosOnboard'), value: 27, icon: '🤝', color: 'from-purple-500 to-pink-500' },
  { label: t('home.stats.livesTouched'), value: 5000, icon: '💙', color: 'from-red-500 to-orange-500' },
];

const testimonials = [
  {
    quote: t('home.testimonials.0.quote'),
    name: t('home.testimonials.0.name'),
    role: t('home.testimonials.0.role'),
    avatar: '👮‍♂️',
    rating: 5
  },
  {
    quote: t('home.testimonials.1.quote'),
    name: t('home.testimonials.1.name'),
    role: t('home.testimonials.1.role'),
    avatar: '👩‍💼',
    rating: 5
  },
  {
    quote: t('home.testimonials.2.quote'),
    name: t('home.testimonials.2.name'),
    role: t('home.testimonials.2.role'),
    avatar: '👨‍💻',
    rating: 5
  },
];

const steps = [
  {
    icon: <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />,
    title: t('home.steps.0.title'),
    desc: t('home.steps.0.desc'),
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <PlusIcon className="h-8 w-8 text-green-600" />,
    title: t('home.steps.1.title'),
    desc: t('home.steps.1.desc'),
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <CheckCircleIcon className="h-8 w-8 text-purple-600" />,
    title: t('home.steps.2.title'),
    desc: t('home.steps.2.desc'),
    color: 'from-purple-500 to-pink-500'
  },
];

const features = [
  {
    title: t('home.features.0.title'),
    description: t('home.features.0.description'),
    icon: '🚨',
    color: 'from-red-500 to-pink-500'
  },
  {
    title: t('home.features.1.title'),
    description: t('home.features.1.description'),
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: t('home.features.2.title'),
    description: t('home.features.2.description'),
    icon: '🔒',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: t('home.features.3.title'),
    description: t('home.features.3.description'),
    icon: '📱',
    color: 'from-purple-500 to-pink-500'
  }
];

const Home = () => {
  const { t } = useTranslation();
  const [currentStat, setCurrentStat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('hero-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyClick = () => {
    window.location.href = 'tel:100';
  };

  const handleReportClick = () => {
    // Add smooth scroll to report section or navigate
    const reportSection = document.getElementById('report-section');
    if (reportSection) {
      reportSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-poppins overflow-x-hidden">
      {/* Cosmic Background */}
      <StarryBackground />
      
      {/* Hero Section */}
      <section id="hero-section" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20"></div>
        <div className="relative container-responsive text-center z-10">
          {/* Animated Title */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight animate-pulse">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('home.hero.title')}
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-400 mx-auto mb-6 rounded-full animate-pulse"></div>
          </div>

          {/* Subtitle */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
          </div>

          {/* Interactive Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={handleEmergencyClick}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse"
            >
              <ShieldExclamationIcon className="w-6 h-6 mr-2 group-hover:animate-bounce" />
              {t('home.hero.emergencyHelp')}
            </button>
            <button
              onClick={handleReportClick}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <PlusIcon className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              {t('home.hero.reportCase')}
            </button>
            <Link
              to="/about"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Learn More
              <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-bounce">
            <div className="w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
            <div className="w-3 h-3 bg-purple-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '2s' }}>
            <div className="w-5 h-5 bg-pink-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose Avyakta?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive support for every situation
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              How it Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple steps to make a difference in someone's life
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                     style={{ background: `linear-gradient(to bottom right, ${step.color})` }}></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Statistics */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Making a real difference in communities across India
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 border border-white/20 ${
                  idx === currentStat ? 'ring-2 ring-white/50' : ''
                }`}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xl font-semibold text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Testimonials */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              What People Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real stories from those who have experienced our services
            </p>
          </div>
          
          {/* Testimonial Controls */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
            >
              {isPlaying ? <PauseIcon className="w-6 h-6 text-white" /> : <PlayIcon className="w-6 h-6 text-white" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
            >
              {isMuted ? <VolumeOffIcon className="w-6 h-6 text-white" /> : <VolumeUpIcon className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Testimonial Display */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl mb-6">{testimonials[activeTestimonial].avatar}</div>
                <p className="text-gray-200 italic mb-6 text-xl leading-relaxed">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="font-bold text-white text-lg">{testimonials[activeTestimonial].name}</div>
                <div className="text-blue-300 font-medium">{testimonials[activeTestimonial].role}</div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm">
        <div className="container-responsive text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Together, we can bring dignity to the forgotten and make a lasting impact in our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <PhoneIcon className="w-6 h-6 mr-2 group-hover:animate-pulse" />
              Get Involved
            </Link>
            <Link
              to="/admin/login?tab=register"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <UserGroupIcon className="w-6 h-6 mr-2 group-hover:animate-pulse" />
              Become a Volunteer
            </Link>
            <Link
              to="/about"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105"
            >
              Learn More
              <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Report Section */}
      <section id="report-section" className="py-20 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
        <div className="container-responsive text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Report?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your report can make a difference. Every piece of information helps bring closure to families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEmergencyClick}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse"
            >
              <ShieldExclamationIcon className="w-6 h-6 mr-2 group-hover:animate-bounce" />
              Emergency Report
            </button>
            <Link
              to="/report"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <PlusIcon className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Regular Report
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 