import React from 'react';
import TermsAgreement from '../components/TermsAgreement';
import { 
  HeartIcon, 
  LockClosedIcon, 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon, 
  ShieldCheckIcon, 
  ScaleIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const SectionCard = ({ icon: Icon, title, children, highlight }) => (
  <section className="mb-6 rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md relative" style={{
    background: highlight ? 'rgba(46,125,156,0.04)' : 'var(--warm-white)',
    border: highlight ? '1px solid rgba(46,125,156,0.2)' : '1px solid #E2E8F0',
    borderLeft: highlight ? '4px solid var(--teal)' : '4px solid var(--navy)'
  }}>
    <h3 className="font-semibold text-xl mb-3 flex items-center gap-3" style={{ color: 'var(--navy)' }}>
      <Icon className="w-6 h-6" style={{ color: 'var(--teal)' }} /> {title}
    </h3>
    <div className="text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

const TermsOfService = () => (
  <div className="min-h-screen flex flex-col" style={{ background: 'var(--off-white)' }}>
    {/* Navy Header */}
    <section className="section-dark pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 shadow-md">
      <div className="container-responsive text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-merriweather font-bold mb-4 tracking-tight text-white">
          Platform Guidelines &amp; Terms
        </h1>
        <p className="text-base sm:text-lg opacity-90 font-light" style={{ color: '#E2E8F0' }}>
          Effective From: {getFormattedDate()} · Website: <span className="font-semibold text-white">avaykta.app</span>
        </p>
      </div>
    </section>

    <div className="container-responsive max-w-3xl mx-auto py-10 px-4 flex-grow">
      {/* Mutual Promise */}
      <SectionCard icon={HeartIcon} title="A Mutual Promise of Dignity and Trust" highlight>
        <p>
          By accessing or using this platform, you and we (Team Avyakta) enter into a sacred agreement.<br />
          This is not just a legal formality — it is a bond of responsibility and humanity.
        </p>
        <p className="mt-3">
          We exist to bring light to those lost in silence, and in using this site, you agree to uphold the same spirit of dignity, privacy, and respect.
        </p>
      </SectionCard>

      {/* Data Privacy */}
      <SectionCard icon={LockClosedIcon} title="1. Data Privacy & Confidentiality">
        <ul className="list-disc pl-5 space-y-2">
          <li>We do not collect unnecessary personal data.</li>
          <li>All reports are stored securely, and access is granted only to authorized personnel.</li>
          <li>Anonymous reporting is fully supported.</li>
          <li>We do not share your information with any third party without legal or ethical necessity.</li>
        </ul>
        <blockquote className="pl-4 italic mt-4 font-medium" style={{ borderLeft: '3px solid var(--teal)', color: 'var(--teal)' }}>
          "Your identity is protected, your intention is respected."
        </blockquote>
      </SectionCard>

      {/* Purpose */}
      <SectionCard icon={DocumentTextIcon} title="2. Purpose of This Platform">
        <ul className="list-disc pl-5 space-y-2">
          <li>This website is meant solely for humanitarian reporting of unclaimed or unidentified deceased individuals.</li>
          <li>Misuse of the platform for false reporting, defamation, or spam is strictly prohibited.</li>
          <li>Content submitted by users should be factual, ethical, and respectful.</li>
        </ul>
      </SectionCard>

      {/* User Responsibility */}
      <SectionCard icon={ClipboardDocumentCheckIcon} title="3. Your Responsibility as a User">
        <ul className="list-disc pl-5 space-y-2">
          <li>The information you provide is true to your knowledge.</li>
          <li>You understand the sensitivity of this platform.</li>
          <li>You will not use this platform for political, promotional, or unlawful purposes.</li>
        </ul>
      </SectionCard>

      {/* Our Responsibility */}
      <SectionCard icon={ShieldCheckIcon} title="4. Our Responsibility to You">
        <ul className="list-disc pl-5 space-y-2">
          <li>We promise to review all reports with dignity and seriousness.</li>
          <li>To protect your digital privacy and emotional safety.</li>
          <li>To continue improving the platform based on trust, not transactions.</li>
        </ul>
      </SectionCard>

      {/* Legal Safeguards */}
      <SectionCard icon={ScaleIcon} title="5. Legal Safeguards">
        <ul className="list-disc pl-5 space-y-2">
          <li>We comply with all relevant Indian laws related to digital privacy and data protection.</li>
          <li>Any misuse may lead to suspension of access and legal action.</li>
          <li>We reserve the right to update these terms when necessary, and we'll always inform you clearly.</li>
        </ul>
      </SectionCard>

      {/* Support */}
      <SectionCard icon={EnvelopeIcon} title="6. Need Support or Have Doubts?" highlight>
        <p>
          Reach out to us at:<br />
          <a href="mailto:support@avyakta.org" className="inline-block mt-2 font-semibold hover:underline" style={{ color: 'var(--teal)' }}>
            📧 support@avyakta.org
          </a>
        </p>
        <p className="mt-3 font-medium text-gray-800">
          We are here to listen, not just to respond.
        </p>
      </SectionCard>

      {/* Terms Agreement */}
      <div className="mt-10">
        <TermsAgreement />
      </div>
    </div>
  </div>
);

export default TermsOfService;