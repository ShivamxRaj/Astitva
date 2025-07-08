import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  PlayIcon, 
  PauseIcon,
  CalendarIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  TrophyIcon,
  StarIcon,
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

export const PrivacyPolicy = () => (
  <div className="prose max-w-none text-gray-800">
    <h3>Privacy Policy</h3>
    <p>Your privacy policy content here...</p>
    {/* Add your actual privacy policy content here */}
  </div>
);

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [counters, setCounters] = useState({
    reports: 0,
    lives: 0,
    volunteers: 0,
    stations: 0
  });

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const targetValues = {
      reports: 1452,
      lives: 38,
      volunteers: 75,
      stations: 125
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounters({
        reports: Math.floor((targetValues.reports * currentStep) / steps),
        lives: Math.floor((targetValues.lives * currentStep) / steps),
        volunteers: Math.floor((targetValues.volunteers * currentStep) / steps),
        stations: Math.floor((targetValues.stations * currentStep) / steps)
      });

      if (currentStep === steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const timelineData = [
    {
      year: '2018',
      title: 'The Inspiration',
      description: 'A chance encounter with an unclaimed body in a local hospital sparked the idea. The founder realized that technology could bridge the gap between the unidentified and their families.',
      icon: LightBulbIcon,
      color: 'text-yellow-400'
    },
    {
      year: '2019',
      title: 'Conceptualization',
      description: 'Avyakta was conceptualized as a platform to bring dignity to the voiceless. The name "Avyakta" (meaning "unexpressed" in Sanskrit) was chosen to represent those who cannot speak for themselves.',
      icon: CalendarIcon,
      color: 'text-blue-400'
    },
    {
      year: '2020',
      title: 'Initial Launch',
      description: 'The platform was launched in partnership with 5 police stations in Delhi. The first month saw 12 successful identifications, proving the concept\'s viability.',
      icon: RocketLaunchIcon,
      color: 'text-green-400'
    },
    {
      year: '2022',
      title: 'Expansion Milestone',
      description: 'Reached 50+ cities across India with 100+ police stations connected. The platform helped identify over 500 unclaimed bodies.',
      icon: TrophyIcon,
      color: 'text-purple-400'
    },
    {
      year: '2024',
      title: 'Current Impact',
      description: 'Now serving 125+ police stations across India, with over 1450 cases handled and 38 lives saved through timely interventions.',
      icon: StarIcon,
      color: 'text-red-400'
    }
  ];

  const teamData = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      image: '/images/team/ceo.jpg',
      bio: '20+ years of experience in humanitarian work and technology innovation. Former medical officer who witnessed the plight of unclaimed bodies firsthand.',
      education: 'MBBS, MD - Community Medicine',
      experience: 'Ex-Government Medical Officer'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: '/images/team/operations.jpg',
      bio: 'Expert in NGO management and community development. Passionate about creating systemic change through technology.',
      education: 'Masters in Social Work',
      experience: '15+ years in NGO sector'
    },
    {
      name: 'Amit Patel',
      role: 'Technical Lead',
      image: '/images/team/tech.jpg',
      bio: 'Passionate about using technology for social impact. Leads the development of our AI-powered identification system.',
      education: 'B.Tech Computer Science',
      experience: '10+ years in software development'
    },
    {
      name: 'Dr. Meera Singh',
      role: 'Medical Director',
      image: '/images/team/medical.jpg',
      bio: 'Forensic expert who ensures medical accuracy in our identification processes. Works closely with police and hospitals.',
      education: 'MBBS, MD - Forensic Medicine',
      experience: 'Ex-Forensic Expert, Delhi Police'
    },
    {
      name: 'Kavita Reddy',
      role: 'Community Outreach',
      image: '/images/team/outreach.jpg',
      bio: 'Builds partnerships with communities, NGOs, and government agencies. Ensures our platform reaches those who need it most.',
      education: 'Masters in Public Policy',
      experience: '12+ years in community development'
    },
    {
      name: 'Rahul Gupta',
      role: 'Data Analyst',
      image: '/images/team/analyst.jpg',
      bio: 'Analyzes patterns and trends to improve our identification algorithms. Creates reports that help policymakers understand the crisis.',
      education: 'Masters in Data Science',
      experience: '8+ years in data analytics'
    }
  ];

  const testimonials = [
    {
      quote: "Avyakta helped us find closure we never thought possible. After 3 years of searching, we finally found our brother.",
      author: "Anonymous Family Member",
      location: "Delhi",
      rating: 5
    },
    {
      quote: "The platform's efficiency is remarkable. We identified a missing person within 24 hours of the report.",
      author: "Police Inspector",
      location: "Mumbai",
      rating: 5
    },
    {
      quote: "As a volunteer, I've seen firsthand how this technology brings hope to families. It's more than just identification - it's dignity.",
      author: "Volunteer Coordinator",
      location: "Bangalore",
      rating: 5
    },
    {
      quote: "The compassion and respect shown by the Avyakta team is exemplary. They treat every case with the dignity it deserves.",
      author: "Hospital Administrator",
      location: "Chennai",
      rating: 5
    },
    {
      quote: "This platform has revolutionized how we handle unclaimed bodies. It's a game-changer for law enforcement.",
      author: "Senior Police Officer",
      location: "Hyderabad",
      rating: 5
    },
    {
      quote: "We found our missing daughter after 2 years. Avyakta gave us the closure we desperately needed.",
      author: "Anonymous Family",
      location: "Kolkata",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/about-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex flex-col justify-center items-center container-responsive text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-merriweather font-bold mb-4 sm:mb-6" style={{ color: '#00ffff' }}>
            About Avyakta
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl sm:max-w-4xl mx-auto mb-6 sm:mb-8" style={{ color: '#f1f1f1' }}>
            Bringing dignity to the unclaimed, one soul at a time
          </p>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed" style={{ color: '#f1f1f1' }}>
            We are a compassionate platform dedicated to helping identify and honor unclaimed bodies with dignity, compassion, and purpose.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#00ffff' }}>
              The Reality We Face
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: '#f1f1f1' }}>
              Every year, thousands of unclaimed bodies are found across India. These are not just statistics - they are human beings who deserve dignity and closure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div 
              className="p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#00ffff' }}>{counters.reports}+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>Total Unclaimed Reports Handled</p>
              <p className="text-xs sm:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00ffff' }}>Click to learn more</p>
            </div>
            <div 
              className="p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#00ffff' }}>{counters.lives}</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>Lives Saved Through Timely Alerts</p>
              <p className="text-xs sm:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00ffff' }}>See success stories</p>
            </div>
            <div 
              className="p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#00ffff' }}>{counters.volunteers}+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>Volunteers</p>
              <p className="text-xs sm:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00ffff' }}>Read testimonials</p>
            </div>
            <div 
              className="p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#00ffff' }}>{counters.stations}+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>Police Stations Connected</p>
              <p className="text-xs sm:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00ffff' }}>View coverage map</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Chart Section - Replaced with simple stats */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#00ffff' }}>
              The Growing Crisis
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: '#f1f1f1' }}>
              A visual representation of the unclaimed bodies found in the last 5 years across India.
            </p>
          </div>
          
          <div 
            className="p-4 sm:p-6 lg:p-8 border border-white/20"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#00ffff' }}>2019</h3>
                <p className="text-lg" style={{ color: '#f1f1f1' }}>1,200 bodies</p>
                <p className="text-sm" style={{ color: '#00ffff' }}>🟢 Low Severity</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#00ffff' }}>2022</h3>
                <p className="text-lg" style={{ color: '#f1f1f1' }}>1,650 bodies</p>
                <p className="text-sm" style={{ color: '#00ffff' }}>🟡 Medium Severity</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#00ffff' }}>2024</h3>
                <p className="text-lg" style={{ color: '#f1f1f1' }}>1,950 bodies</p>
                <p className="text-sm" style={{ color: '#00ffff' }}>🔴 High Severity</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: '#f1f1f1' }}>
                Year-over-Year Change: +62.5% increase since 2019
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#00ffff' }}>
              Our Story
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: '#f1f1f1' }}>
              From a simple idea to a nationwide movement - here's how Avyakta came to be and the milestones we've achieved.
            </p>
          </div>
          
          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 sm:p-6 lg:p-8 border border-white/20 rounded-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-cyan-500 rounded-full flex items-center justify-center">
                  <item.icon className="text-white text-lg sm:text-2xl" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold" style={{ color: '#00ffff' }}>{item.year}</span>
                    <span className="text-sm" style={{ color: '#f1f1f1' }}>•</span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: '#00ffff' }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(to right, #1f1c2c, #928DAB)' }}>
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div 
              className="p-6 sm:p-8 lg:p-10 border border-white/20"
              style={{
                background: '#1f1c2c',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#00ffff' }}>Our Mission</h3>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: '#f1f1f1' }}>
                To provide a dignified platform for identifying and honoring unclaimed bodies, ensuring that every individual receives the respect and closure they deserve, while supporting families in their search for missing loved ones.
              </p>
            </div>
            <div 
              className="p-6 sm:p-8 lg:p-10 border border-white/20"
              style={{
                background: '#928DAB',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#1f1c2c' }}>Our Vision</h3>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: '#1f1c2c' }}>
                To create a world where no life goes unnoticed, where every individual receives the dignity they deserve,
                and where technology serves as a bridge between the lost and their loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#00ffff' }}>
              Our Impact
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: '#f1f1f1' }}>
              Through our dedicated efforts, we have helped bring dignity to countless lives and provided closure to families across the nation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div 
              className="p-4 sm:p-6 lg:p-8 text-center transform hover:scale-105 transition-all duration-300 border border-white/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#00ffff' }}>1000+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>Cases Resolved</p>
            </div>
            <div 
              className="p-4 sm:p-6 lg:p-8 text-center transform hover:scale-105 transition-all duration-300 border border-white/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#00ffff' }}>500+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>Families Helped</p>
            </div>
            <div 
              className="p-4 sm:p-6 lg:p-8 text-center transform hover:scale-105 transition-all duration-300 border border-white/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#00ffff' }}>50+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: '#f1f1f1' }}>Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#00ffff' }}>
              Our Team
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: '#f1f1f1' }}>
              Meet the dedicated individuals working tirelessly to make a difference and bring dignity to the unclaimed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamData.map((member, index) => (
              <div
                key={index}
                className="rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group border border-white/20"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2" style={{ color: '#00ffff' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg font-semibold mb-2" style={{ color: '#f1f1f1' }}>
                    {member.role}
                  </p>
                  <p className="text-sm sm:text-base" style={{ color: '#f1f1f1' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#00ffff' }}>
              What People Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: '#f1f1f1' }}>
              Real stories from families who found closure through our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 lg:p-8 border border-white/20"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base lg:text-lg mb-4" style={{ color: '#f1f1f1' }}>
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <span className="text-white font-bold text-sm sm:text-base">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold" style={{ color: '#00ffff' }}>
                      {testimonial.author}
                    </h4>
                    <p className="text-xs sm:text-sm" style={{ color: '#f1f1f1' }}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4 sm:mb-6" style={{ color: '#00ffff' }}>
              Join Our Mission
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8" style={{ color: '#f1f1f1' }}>
              Together, we can bring dignity to the forgotten and make a lasting impact in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 font-bold text-white shadow-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 px-6 py-3"
              >
                Know How it Works
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 font-bold text-slate-900 shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 px-6 py-3"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;