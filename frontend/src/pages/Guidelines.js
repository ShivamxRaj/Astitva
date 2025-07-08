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

const TermsOfService = () => (
  <div className="max-w-2xl mx-auto my-8 p-4 bg-white text-gray-900 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">Terms &amp; Conditions Agreement</h2>
    <p className="text-sm text-gray-500 mb-4">Effective From: {getFormattedDate()}<br />Website: <span className="font-semibold">Avyakta.org</span></p>

    {/* Mutual Promise */}
    <section className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="promise">🌿</span> A Mutual Promise of Dignity and Trust</h3>
      <p>By accessing or using this platform, you and we (Team Avyakta) enter into a sacred agreement.<br />
      This is not just a legal formality — it is a bond of responsibility and humanity.</p>
      <p>We exist to bring light to those lost in silence, and in using this site, you agree to uphold the same spirit of dignity, privacy, and respect.</p>
    </section>

    {/* Data Privacy & Confidentiality */}
    <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="privacy">🔒</span> 1. Data Privacy &amp; Confidentiality</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>We do not collect unnecessary personal data.</li>
        <li>All reports are stored securely, and access is granted only to authorized personnel.</li>
        <li>Anonymous reporting is fully supported.</li>
        <li>We do not share your information with any third party without legal or ethical necessity.</li>
      </ul>
      <blockquote className="border-l-4 border-blue-400 pl-4 italic text-blue-800 mt-3">“Your identity is protected, your intention is respected.”</blockquote>
    </section>

    {/* Purpose of Platform */}
    <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="purpose">🧾</span> 2. Purpose of This Platform</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>This website is meant solely for humanitarian reporting of unclaimed or unidentified deceased individuals.</li>
        <li>Misuse of the platform for false reporting, defamation, or spam is strictly prohibited.</li>
        <li>Content submitted by users should be factual, ethical, and respectful.</li>
      </ul>
    </section>

    {/* User Responsibility */}
    <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="user">📜</span> 3. Your Responsibility as a User</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>The information you provide is true to your knowledge.</li>
        <li>You understand the sensitivity of this platform.</li>
        <li>You will not use this platform for political, promotional, or unlawful purposes.</li>
      </ul>
    </section>

    {/* Our Responsibility */}
    <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="shield">🛡</span> 4. Our Responsibility to You</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>We promise to review all reports with dignity and seriousness.</li>
        <li>To protect your digital privacy and emotional safety.</li>
        <li>To continue improving the platform based on trust, not transactions.</li>
      </ul>
    </section>

    {/* Legal Safeguards */}
    <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="legal">⚖</span> 5. Legal Safeguards</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>We comply with all relevant Indian laws related to digital privacy and data protection.</li>
        <li>Any misuse may lead to suspension of access and legal action.</li>
        <li>We reserve the right to update these terms when necessary, and we'll always inform you clearly.</li>
      </ul>
    </section>

    {/* Support & Final Note */}
    <section className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="support">💌</span> 6. Need Support or Have Doubts?</h3>
      <p>Reach out to us at:<br /><strong>📧 support@avyakta.org</strong><br />We are here to listen, not just to respond.</p>
    </section>

    {/* Terms Agreement Section */}
    <div className="mt-10">
      <TermsAgreement />
    </div>
  </div>
);

export default TermsOfService; 