import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  TrophyIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export const PrivacyPolicy = () => (
  <div className="prose max-w-none text-gray-800">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-3xl">🕊</span>
      <h2 className="!my-0 !text-2xl font-bold" style={{ color: 'var(--navy)' }}>Privacy Policy</h2>
    </div>
    <p className="italic text-lg font-medium mb-2" style={{ color: 'var(--teal)' }}>Because Every Voice Matters, Every Soul Deserves Dignity</p>
    <div className="p-4 rounded mb-6 shadow-sm" style={{ background: 'rgba(46,125,156,0.08)', borderLeft: '4px solid var(--teal)' }}>
      <p className="mb-0" style={{ color: 'var(--text-dark)' }}>At <span className="font-semibold" style={{ color: 'var(--navy)' }}>Avyakta</span>, we understand — some things are too painful to speak aloud.<br/>
      But silence shouldn't mean invisibility.<br/>
      This platform is created to serve those who have no name, no family, no final goodbye. And we honor that purpose by guarding your trust like a sacred duty.</p>
    </div>
    <div className="flex items-center gap-2 mt-8 mb-2">
      <span className="text-2xl">🤍</span>
      <h3 className="!my-0 !text-xl font-semibold" style={{ color: 'var(--navy)' }}>Your Privacy Is Sacred</h3>
    </div>
    <ul className="list-disc pl-6 text-base mb-4" style={{ color: 'var(--text-mid)' }}>
      <li>When you report anonymously, <span className="font-semibold" style={{ color: 'var(--navy)' }}>no name, location, or contact</span> is stored unless you choose.</li>
      <li>Any personal detail shared is held in <span className="font-semibold" style={{ color: 'var(--navy)' }}>strict confidence</span>, never revealed to anyone without your will.</li>
      <li>We do <span className="font-semibold" style={{ color: 'var(--navy)' }}>not track, sell, or analyze</span> your identity. We're here to listen, not exploit.</li>
    </ul>
    <div className="flex items-center gap-2 mt-8 mb-2">
      <span className="text-2xl">🛡</span>
      <h3 className="!my-0 !text-xl font-semibold" style={{ color: 'var(--success-green)' }}>Safety with Sensitivity</h3>
    </div>
    <ul className="list-disc pl-6 text-base mb-4" style={{ color: 'var(--text-mid)' }}>
      <li>All your data is <span className="font-semibold" style={{ color: 'var(--success-green)' }}>encrypted and protected</span> with top-level security.</li>
      <li>Whether you're a grieving stranger, a concerned citizen, or a silent witness — <span className="font-semibold" style={{ color: 'var(--success-green)' }}>your safety is non-negotiable</span>.</li>
      <li>You can reach out to us anytime to <span className="font-semibold" style={{ color: 'var(--success-green)' }}>edit, delete, or retract</span> your report. We respect your decision at every step.</li>
    </ul>
    <div className="flex items-center gap-2 mt-8 mb-2">
      <span className="text-2xl">🌱</span>
      <h3 className="!my-0 !text-xl font-semibold" style={{ color: 'var(--teal)' }}>Why This Matters</h3>
    </div>
    <div className="p-4 rounded mb-6 shadow-sm" style={{ background: 'rgba(39,174,96,0.08)', borderLeft: '4px solid var(--success-green)' }}>
      <p className="mb-0" style={{ color: 'var(--text-dark)' }}>Behind every report is a life once lived.<br/>
      Behind every submission is courage — and maybe pain.<br/>
      We don't see you as a user. We see you as a part of a quiet revolution of empathy, trying to give a name, a story, and a final farewell to the forgotten.</p>
    </div>
    <blockquote className="pl-4 italic rounded py-2 mb-6" style={{ borderLeft: '4px solid var(--teal)', background: 'rgba(46,125,156,0.05)', color: 'var(--teal)' }}>
      "You are not alone in this act of kindness. And they are not forgotten, because you cared enough to remember."
    </blockquote>
    <div className="flex items-center gap-2 mt-8 mb-2">
      <span className="text-2xl">✅</span>
      <span className="font-semibold" style={{ color: 'var(--navy)' }}>By using Avyakta, you agree to this promise — that your privacy is as important as your purpose.</span>
    </div>
  </div>
);

const About = () => {
  const [counters, setCounters] = useState({
    reports: 0,
    lives: 0,
    volunteers: 0,
    stations: 0
  });

  useEffect(() => {
    const targetValues = {
      reports: 1452,
      lives: 38,
      volunteers: 75,
      stations: 125
    };

    const duration = 2000;
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
      color: 'var(--amber-warn)'
    },
    {
      year: '2019',
      title: 'Conceptualization',
      description: 'Avyakta was conceptualized as a platform to bring dignity to the voiceless. The name "Avyakta" (meaning "unexpressed" in Sanskrit) was chosen to represent those who cannot speak for themselves.',
      icon: CalendarIcon,
      color: 'var(--teal)'
    },
    {
      year: '2020',
      title: 'Initial Launch',
      description: 'The platform was launched in partnership with 5 police stations in Delhi. The first month saw 12 successful identifications, proving the concept\'s viability.',
      icon: RocketLaunchIcon,
      color: 'var(--success-green)'
    },
    {
      year: '2022',
      title: 'Expansion Milestone',
      description: 'Reached 50+ cities across India with 100+ police stations connected. The platform helped identify over 500 unclaimed bodies.',
      icon: TrophyIcon,
      color: 'var(--teal-light)'
    },
    {
      year: '2024',
      title: 'Current Impact',
      description: 'Now serving 125+ police stations across India, with over 1450 cases handled and 38 lives saved through timely interventions.',
      icon: StarIcon,
      color: 'var(--alert-red)'
    }
  ];

  const teamData = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      bio: '20+ years of experience in humanitarian work and technology innovation. Former medical officer who witnessed the plight of unclaimed bodies firsthand.',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      bio: 'Expert in NGO management and community development. Passionate about creating systemic change through technology.',
    },
    {
      name: 'Amit Patel',
      role: 'Technical Lead',
      bio: 'Passionate about using technology for social impact. Leads the development of our AI-powered identification system.',
    },
    {
      name: 'Dr. Meera Singh',
      role: 'Medical Director',
      bio: 'Forensic expert who ensures medical accuracy in our identification processes. Works closely with police and hospitals.',
    },
    {
      name: 'Kavita Reddy',
      role: 'Community Outreach',
      bio: 'Builds partnerships with communities, NGOs, and government agencies. Ensures our platform reaches those who need it most.',
    },
    {
      name: 'Rahul Gupta',
      role: 'Data Analyst',
      bio: 'Analyzes patterns and trends to improve our identification algorithms. Creates reports that help policymakers understand the crisis.',
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
    <div className="min-h-screen section-light">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden section-dark flex items-center justify-center">
        {/* Background Gradient & Animated Blobs */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E36] to-[#1B3A6B]"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative w-full flex flex-col justify-center items-center container-responsive text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-merriweather font-bold mb-4 sm:mb-6 animate-fade-in-up" style={{ color: '#fff' }}>
            About Avyakta
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl sm:max-w-4xl mx-auto mb-6 sm:mb-8 animate-fade-in-up animation-delay-200" style={{ color: '#CBD5E0' }}>
            Bringing dignity to the unclaimed, one soul at a time
          </p>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300" style={{ color: 'rgba(255,255,255,0.8)' }}>
            We are a compassionate platform dedicated to helping identify and honor unclaimed bodies with dignity, compassion, and purpose.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-padding section-cream">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: 'var(--navy)' }}>
              The Reality We Face
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-mid)' }}>
              Every year, thousands of unclaimed bodies are found across India. These are not just statistics - they are human beings who deserve dignity and closure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="inst-card text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: 'var(--teal)' }}>{counters.reports}+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--navy)' }}>Total Unclaimed Reports Handled</p>
            </div>
            <div className="inst-card text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: 'var(--teal)' }}>{counters.lives}</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--navy)' }}>Lives Saved Through Timely Alerts</p>
            </div>
            <div className="inst-card text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: 'var(--teal)' }}>{counters.volunteers}+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--navy)' }}>Volunteers Active</p>
            </div>
            <div className="inst-card text-center transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: 'var(--teal)' }}>{counters.stations}+</h3>
              <p className="text-sm sm:text-base lg:text-lg" style={{ color: 'var(--navy)' }}>Police Stations Connected</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Growing Crisis */}
      <section className="section-padding section-light">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: 'var(--navy)' }}>
              The Growing Crisis
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-mid)' }}>
              A visual representation of the unclaimed bodies found in the last 5 years across India.
            </p>
          </div>
          
          <div className="inst-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>2019</h3>
                <p className="text-lg" style={{ color: 'var(--text-dark)' }}>1,200 bodies</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--success-green)' }}>🟢 Low Severity</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>2022</h3>
                <p className="text-lg" style={{ color: 'var(--text-dark)' }}>1,650 bodies</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--amber-warn)' }}>🟡 Medium Severity</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>2024</h3>
                <p className="text-lg" style={{ color: 'var(--text-dark)' }}>1,950 bodies</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--alert-red)' }}>🔴 High Severity</p>
              </div>
            </div>
            <div className="mt-6 text-center pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--teal)' }}>
                Year-over-Year Change: +62.5% increase since 2019
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding section-cream">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: 'var(--navy)' }}>
              Our Story
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-mid)' }}>
              From a simple idea to a nationwide movement - here's how Avyakta came to be and the milestones we've achieved.
            </p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {timelineData.map((item, index) => (
              <div key={index} className="flex items-start gap-4 inst-card" style={{ padding: '1.5rem' }}>
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(46,125,156,0.1)' }}>
                  <item.icon className="text-lg sm:text-2xl" style={{ color: 'var(--teal)' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold" style={{ color: 'var(--teal)' }}>{item.year}</span>
                    <span className="text-sm" style={{ color: 'var(--text-light)' }}>•</span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: 'var(--navy)' }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base" style={{ color: 'var(--text-dark)' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="section-padding section-dark">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="p-6 sm:p-8 lg:p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#fff' }}>Our Mission</h3>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#CBD5E0' }}>
                To provide a dignified platform for identifying and honoring unclaimed bodies, ensuring that every individual receives the respect and closure they deserve, while supporting families in their search for missing loved ones.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 rounded-2xl" style={{ background: 'var(--warm-white)', border: '1px solid #E2E8F0' }}>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--navy)' }}>Our Vision</h3>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-dark)' }}>
                To create a world where no life goes unnoticed, where every individual receives the dignity they deserve,
                and where technology serves as a bridge between the lost and their loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding section-light">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: 'var(--navy)' }}>
              Our Team
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-mid)' }}>
              Meet the dedicated individuals working tirelessly to make a difference and bring dignity to the unclaimed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamData.map((member, index) => (
              <div key={index} className="inst-card overflow-hidden" style={{ padding: 0 }}>
                <div className="h-32 sm:h-40 w-full flex items-center justify-center" style={{ background: 'var(--navy)' }}>
                  <span className="text-white text-4xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'var(--navy)' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: 'var(--teal)' }}>
                    {member.role}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-dark)' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding section-cream">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: 'var(--navy)' }}>
              What People Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-mid)' }}>
              Real stories from families who found closure through our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="inst-card">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-4 w-4 sm:h-5 sm:w-5 text-yellow-400`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm italic mb-4" style={{ color: 'var(--text-dark)' }}>
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center pt-3 border-t border-gray-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3" style={{ background: 'var(--teal)' }}>
                    <span className="text-white font-bold text-sm">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                      {testimonial.author}
                    </h4>
                    <p className="text-xs" style={{ color: 'var(--text-mid)' }}>
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
      <section className="section-padding section-dark text-center">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4 sm:mb-6" style={{ color: '#fff' }}>
              Join Our Mission
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8" style={{ color: '#CBD5E0' }}>
              Together, we can bring dignity to the forgotten and make a lasting impact in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/how-it-works" className="btn-primary" style={{ background: '#fff', color: 'var(--navy)', border: '1px solid #fff' }}>
                Know How it Works
              </Link>
              <Link to="/contact" className="btn-secondary" style={{ color: '#fff', borderColor: '#fff' }}>
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