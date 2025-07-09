import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, UserGroupIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/solid';

const trustBadges = [
  { icon: <ShieldCheckIcon className="w-6 h-6 text-blue-600" />, label: "Data Encrypted & Secure" },
  { icon: <UserGroupIcon className="w-6 h-6 text-yellow-500" />, label: "Verified Reports" },
  { icon: <EyeIcon className="w-6 h-6 text-green-600" />, label: "Anonymous or Public Reporting" },
  { icon: <HeartIcon className="w-6 h-6 text-pink-500" />, label: "Built with Empathy" },
];

const stats = [
  { label: "Reports Received", value: "1,285" },
  { label: "Families Reunited", value: "743" },
  { label: "States Reached", value: "22" },
  { label: "Built with ❤ by Team Astitva", value: "" },
];

const stories = [
  {
    name: "Ravi Kumar",
    story: "After months of searching, Avyakta helped us find closure for our missing brother. Their support was compassionate and professional.",
    relation: "Family Member"
  },
  {
    name: "Inspector Sharma",
    story: "Avyakta's platform made it easier for us to connect unclaimed cases with families. It truly brings dignity to every life.",
    relation: "Police Officer"
  },
  {
    name: "Priya Singh",
    story: "I was able to report anonymously and still get updates. I felt safe and empowered throughout the process.",
    relation: "Concerned Citizen"
  }
];

const faqs = [
  {
    q: "How do I report an unclaimed body or missing person?",
    a: "Click on 'Report Unclaimed Body' or 'Search Missing Person' above, or contact our helpline. We guide you through every step with care and confidentiality."
  },
  {
    q: "Can I report anonymously?",
    a: "Yes, you can choose to report anonymously. Your privacy and safety are our top priorities."
  },
  {
    q: "What happens after I submit a report?",
    a: "Our team verifies the information, coordinates with authorities, and keeps you updated. We support you until closure is found."
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. All data is encrypted and handled with the utmost care and respect." 
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-poppins overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center">
        <div className="max-w-3xl text-center py-16 px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Avyakta: Honoring Every Life, Even in Absence
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Every soul deserves dignity, even in silence.<br />
            We help families find closure, justice, and peace by reporting and identifying unclaimed lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/report" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200">
              Report Unclaimed Body
            </Link>
            <Link to="/search" className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-200 animate-pulse">
              Search Missing Person
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all duration-200">
              🔔 Need Urgent Assistance?
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow">
                {badge.icon}
                <span className="text-sm font-medium text-gray-700">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white/60">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-700">{stat.value}</span>
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-700 italic mb-4">"{story.story}"</p>
                <div className="font-bold text-blue-700">{story.name}</div>
                <div className="text-gray-500 text-sm">{story.relation}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/80">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold text-blue-700 mb-2">Q: {faq.q}</div>
                <div className="text-gray-700">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-200 to-purple-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Together, we can bring dignity to the forgotten and make a lasting impact in our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Involved
            </Link>
            <Link
              to="/admin/login?tab=register"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/about"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 