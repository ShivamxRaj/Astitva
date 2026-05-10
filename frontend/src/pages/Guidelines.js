import React from 'react';
import TermsAgreement from '../components/TermsAgreement';

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const SectionCard = ({ icon, title, children, highlight }) => (
  <section className="mb-6 rounded-xl p-5 shadow-sm" style={{
    background: highlight ? 'rgba(46,125,156,0.06)' : 'var(--warm-white)',
    border: highlight ? '1.5px solid rgba(46,125,156,0.2)' : '1px solid #E2E8F0'
  }}>
    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2" style={{ color: 'var(--navy)' }}>
      <span role="img" aria-label="icon">{icon}</span> {title}
    </h3>
    {children}
  </section>
);

const TermsOfService = () => (
  <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24" style={{ background: 'var(--off-white)' }}>
    {/* Navy Header */}
    <section className="section-dark section-padding" style={{ paddingBottom: '2rem' }}>
      <div className="container-responsive text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-2" style={{ color: '#fff' }}>
          Terms &amp; Conditions
        </h1>
        <p className="text-sm" style={{ color: '#CBD5E0' }}>
          Effective From: {getFormattedDate()} · Website: <span className="font-semibold">Avyakta.org</span>
        </p>
      </div>
    </section>

    <div className="container-responsive max-w-2xl mx-auto py-8">
      {/* Mutual Promise */}
      <SectionCard icon="🌿" title="A Mutual Promise of Dignity and Trust" highlight>
        <p style={{ color: 'var(--text-dark)' }}>
          By accessing or using this platform, you and we (Team Avyakta) enter into a sacred agreement.<br />
          This is not just a legal formality — it is a bond of responsibility and humanity.
        </p>
        <p className="mt-2" style={{ color: 'var(--text-dark)' }}>
          We exist to bring light to those lost in silence, and in using this site, you agree to uphold the same spirit of dignity, privacy, and respect.
        </p>
      </SectionCard>

      {/* Data Privacy */}
      <SectionCard icon="🔒" title="1. Data Privacy & Confidentiality">
        <ul className="list-disc pl-5 space-y-1" style={{ color: 'var(--text-mid)' }}>
          <li>We do not collect unnecessary personal data.</li>
          <li>All reports are stored securely, and access is granted only to authorized personnel.</li>
          <li>Anonymous reporting is fully supported.</li>
          <li>We do not share your information with any third party without legal or ethical necessity.</li>
        </ul>
        <blockquote className="pl-4 italic mt-3" style={{ borderLeft: '4px solid var(--teal)', color: 'var(--teal)' }}>
          "Your identity is protected, your intention is respected."
        </blockquote>
      </SectionCard>

      {/* Purpose */}
      <SectionCard icon="🧾" title="2. Purpose of This Platform">
        <ul className="list-disc pl-5 space-y-1" style={{ color: 'var(--text-mid)' }}>
          <li>This website is meant solely for humanitarian reporting of unclaimed or unidentified deceased individuals.</li>
          <li>Misuse of the platform for false reporting, defamation, or spam is strictly prohibited.</li>
          <li>Content submitted by users should be factual, ethical, and respectful.</li>
        </ul>
      </SectionCard>

      {/* User Responsibility */}
      <SectionCard icon="📜" title="3. Your Responsibility as a User">
        <ul className="list-disc pl-5 space-y-1" style={{ color: 'var(--text-mid)' }}>
          <li>The information you provide is true to your knowledge.</li>
          <li>You understand the sensitivity of this platform.</li>
          <li>You will not use this platform for political, promotional, or unlawful purposes.</li>
        </ul>
      </SectionCard>

      {/* Our Responsibility */}
      <SectionCard icon="🛡" title="4. Our Responsibility to You">
        <ul className="list-disc pl-5 space-y-1" style={{ color: 'var(--text-mid)' }}>
          <li>We promise to review all reports with dignity and seriousness.</li>
          <li>To protect your digital privacy and emotional safety.</li>
          <li>To continue improving the platform based on trust, not transactions.</li>
        </ul>
      </SectionCard>

      {/* Legal Safeguards */}
      <SectionCard icon="⚖" title="5. Legal Safeguards">
        <ul className="list-disc pl-5 space-y-1" style={{ color: 'var(--text-mid)' }}>
          <li>We comply with all relevant Indian laws related to digital privacy and data protection.</li>
          <li>Any misuse may lead to suspension of access and legal action.</li>
          <li>We reserve the right to update these terms when necessary, and we'll always inform you clearly.</li>
        </ul>
      </SectionCard>

      {/* Support */}
      <SectionCard icon="💌" title="6. Need Support or Have Doubts?" highlight>
        <p style={{ color: 'var(--text-dark)' }}>
          Reach out to us at:<br /><strong style={{ color: 'var(--navy)' }}>📧 support@avyakta.org</strong><br />
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