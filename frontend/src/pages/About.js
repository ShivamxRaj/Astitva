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
      <p className="mb-0" style={{ color: 'var(--text-dark)' }}>At <span className="font-semibold" style={{ color: 'var(--navy)' }}>Avaykta</span>, we understand — some things are too painful to speak aloud.<br/>
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
      <span className="font-semibold" style={{ color: 'var(--navy)' }}>By using Avaykta, you agree to this promise — that your privacy is as important as your purpose.</span>
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
      description: 'Avaykta was conceptualized as a platform to bring dignity to the voiceless. The name "Avaykta" (meaning "unexpressed" in Sanskrit) was chosen to represent those who cannot speak for themselves.',
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
      name: 'Shivam Raj',
      role: 'Founder & Lead Developer',
      bio: 'Driven by empathy and technology, Shivam Raj built Avaykta to bridge the gap between missing persons and unidentified sightings, bringing closure and dignity to families across India.',
    }
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24" style={{ background: 'var(--off-white)' }}>
      {/* Navy Header Banner (Identical to Contact Page) */}
      <section className="section-dark section-padding">
        <div className="container-responsive text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-merriweather font-bold mb-4 sm:mb-6" style={{ color: '#fff' }}>
            About Avaykta
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8" style={{ color: '#CBD5E0' }}>
            Bringing dignity to the unclaimed, one soul at a time. Dedicated to helping identify and honor the forgotten.
          </p>
          <div className="w-16 sm:w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, var(--teal), var(--teal-light))' }}></div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4">
                <RocketLaunchIcon className="w-6 h-6 text-sky-700" aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-merriweather font-bold mb-3" style={{ color: '#1B3A6B' }}>Our Mission</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To provide a dignified platform for identifying and honoring unclaimed bodies, ensuring that every individual receives the respect and closure they deserve, while supporting families in their search for missing loved ones.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4">
                <LightBulbIcon className="w-6 h-6 text-teal-700" aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-merriweather font-bold mb-3" style={{ color: '#1B3A6B' }}>Our Vision</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To create a world where no life goes unnoticed, where every individual receives the dignity they deserve,
                and where technology serves as a bridge between the lost and their loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-merriweather font-bold mb-3" style={{ color: '#1B3A6B' }}>
              The Reality We Face
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Every year, thousands of unclaimed bodies are found across India. These are human beings who deserve dignity and closure.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1" style={{ color: '#1B3A6B' }}>{counters.reports}+</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Unclaimed Reports Handled</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1" style={{ color: '#1B3A6B' }}>{counters.lives}</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Lives Saved Through Alerts</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1" style={{ color: '#1B3A6B' }}>{counters.volunteers}+</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Volunteers Active</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1" style={{ color: '#1B3A6B' }}>{counters.stations}+</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Connected Stations</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Growing Crisis */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#1B3A6B' }}>
              The Growing Crisis
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: '#4A5568' }}>
              A visual representation of the unclaimed bodies found in the last 5 years across India.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#1B3A6B' }}>2019</h3>
                <p className="text-base text-slate-700 font-semibold">1,200 bodies</p>
                <span className="inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Low Severity
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#1B3A6B' }}>2022</h3>
                <p className="text-base text-slate-700 font-semibold">1,650 bodies</p>
                <span className="inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  Medium Severity
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#1B3A6B' }}>2024</h3>
                <p className="text-base text-slate-700 font-semibold">1,950 bodies</p>
                <span className="inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-rose-50 text-rose-700 border border-rose-200">
                  High Severity
                </span>
              </div>
            </div>
            <div className="mt-6 text-center pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
              <p className="text-sm font-semibold" style={{ color: '#2E7D9C' }}>
                Year-over-Year Change: +62.5% increase since 2019
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#1B3A6B' }}>
              Our Story
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: '#4A5568' }}>
              From a simple idea to a nationwide movement - here's how Avaykta came to be and the milestones we've achieved.
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
            {timelineData.map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-sky-50 border border-sky-100">
                  <item.icon className="w-5 h-5 text-sky-700" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">{item.year}</span>
                    <h3 className="text-base sm:text-lg font-bold" style={{ color: '#1B3A6B' }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding" style={{ background: 'var(--off-white)' }}>
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-4" style={{ color: '#1B3A6B' }}>
              Leadership
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: '#4A5568' }}>
              Meet the individuals working tirelessly to bring dignity and closure to families.
            </p>
          </div>
          <div className="flex justify-center w-full">
            {teamData.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden max-w-md w-full">
                <div className="h-28 sm:h-32 w-full flex items-center justify-center bg-gradient-to-r from-[#1B3A6B] to-[#2E7D9C]">
                  <span className="text-white text-3xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div className="p-5 sm:p-6 text-center">
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#1B3A6B' }}>
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-sky-700">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 text-center" style={{ backgroundColor: '#F0F4F8' }}>
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
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

export default About;