import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const COOKIE_CONSENT_KEY = 'avyakta_cookie_consent';

const CookiePolicy = () => {
  const [showEssential, setShowEssential] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [accepted, setAccepted] = useState(!!localStorage.getItem(COOKIE_CONSENT_KEY));
  const navigate = useNavigate();

  const handleCheck = (e) => {
    setChecked(e.target.checked);
    setConfirmed(e.target.checked);
  };

  const handleAccept = (e) => {
    e.preventDefault();
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ consent: true, timestamp: new Date().toISOString() })
    );
    setAccepted(true);
    setConfirmed(false);
    setTimeout(() => {
      navigate('/');
    }, 1500); // Show message for 1.5s then redirect
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-white text-gray-900 rounded-lg shadow">
      {/* Privacy-respecting banner */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 mb-6 flex items-center gap-2 shadow-sm">
        <span role="img" aria-label="shield">🛡️</span>
        <span className="font-medium text-blue-900">We use only privacy-respecting cookies to ensure your experience is safe and smooth. No trackers, ever.</span>
      </div>

      {/* Title and Last Updated */}
      <h2 className="text-2xl font-bold mb-1 flex items-center gap-2"><span role="img" aria-label="cookie">🍪</span> Cookie Policy for Avyakta</h2>
      <p className="text-sm text-gray-500 mb-4">Last updated: {getFormattedDate()} <span className="text-xs">(updated automatically)</span></p>

      {/* Empathetic intro */}
      <div className="bg-gray-50 border-l-4 border-blue-200 rounded-md p-4 mb-6">
        <p className="text-gray-800 text-base">
          At Avyakta, we believe that every soul deserves respect — including yours. That's why we use only the most essential cookies to keep your visit smooth, secure, and private. <strong>No ads. No hidden tracking. Just clarity and compassion.</strong>
        </p>
      </div>

      {/* What Are Cookies? */}
      <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="info">ℹ️</span> What Are Cookies?</h3>
        <p className="text-gray-700">Cookies are small text files stored on your device when you visit a website. They help us improve your experience, enhance security, and remember your preferences. We keep our use of cookies to the bare minimum needed to serve you better.</p>
      </section>

      {/* Why We Use Cookies */}
      <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="purpose">🔍</span> Why We Use Cookies</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>🔐 Ensure website security and protection</li>
          <li>🚀 Improve site speed and performance</li>
          <li>🌐 Remember your language or accessibility preferences</li>
          <li>🧠 Help prevent spam or misuse (e.g., via reCAPTCHA)</li>
          <li>📊 Track anonymous analytics data (non-personal, optional)</li>
        </ul>
      </section>

      {/* What We Do NOT Use */}
      <section className="mb-6 bg-white border border-red-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="no">❌</span> What We Do <u>NOT</u> Use</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>✘ Advertising cookies</li>
          <li>✘ Third-party marketing trackers</li>
          <li>✘ Any cookies that compromise your privacy</li>
        </ul>
      </section>

      {/* Types of Cookies Table */}
      <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="list">📋</span> Types of Cookies We Use</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3">Type <span className="sr-only">Info</span></th>
              <th className="py-2 px-3">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3 flex items-center gap-2">
                <span role="img" aria-label="essential">🔧</span> Essential
                <button
                  className="ml-1 text-blue-500 hover:underline text-xs"
                  onClick={() => setShowEssential((v) => !v)}
                  aria-label="Show info about Essential Cookies"
                  type="button"
                >ℹ</button>
              </td>
              <td className="py-2 px-3">Enable core site functionality, preferences, and security</td>
            </tr>
            {showEssential && (
              <tr className="bg-blue-50">
                <td colSpan={2} className="py-2 px-3 text-blue-900 text-sm">These cookies are necessary for the website to function and cannot be switched off. They include preferences, security, and basic site features.</td>
              </tr>
            )}
            <tr>
              <td className="py-2 px-3 flex items-center gap-2">
                <span role="img" aria-label="analytics">📊</span> Analytics (optional)
                <button
                  className="ml-1 text-blue-500 hover:underline text-xs"
                  onClick={() => setShowAnalytics((v) => !v)}
                  aria-label="Show info about Analytics Cookies"
                  type="button"
                >ℹ</button>
              </td>
              <td className="py-2 px-3">Understand how users interact (fully anonymous, only if enabled)</td>
            </tr>
            {showAnalytics && (
              <tr className="bg-blue-50">
                <td colSpan={2} className="py-2 px-3 text-blue-900 text-sm">These help us understand how visitors interact with our site, so we can improve it. All analytics are fully anonymous and optional.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Third-Party Tools */}
      <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="third-party">🔗</span> Third-Party Tools Used</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Google reCAPTCHA (to prevent spam)</li>
          <li>MongoDB Atlas (secured backend, doesn't use cookies)</li>
          <li>Optional: Google Analytics (only if you enable it)</li>
        </ul>
      </section>

      {/* Legal Compliance */}
      <section className="mb-6 bg-white border border-green-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="legal">📜</span> Legal & Privacy Commitment</h3>
        <p className="text-gray-700">We comply with privacy laws such as the GDPR, and are committed to protecting your dignity and data. We never sell or misuse your information. For more details, contact us at <a href="mailto:support@avyakta.org" className="text-blue-600 underline">support@avyakta.org</a>.</p>
      </section>

      {/* Changes to Policy */}
      <section className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="update">🔄</span> Changes to This Policy</h3>
        <p className="text-gray-700">We may update this Cookie Policy to reflect changes in legal or technical requirements. Updates will be posted here with the date above.</p>
      </section>

      {/* User Choices */}
      <section className="mb-6 bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><span role="img" aria-label="choices">🛠️</span> Your Choices</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>✅ Accept all cookies</li>
          <li>⚙ Adjust your browser settings to block or delete cookies</li>
          <li>🔒 Continue using the website without sharing personal info</li>
        </ul>
        <p className="text-gray-600 text-sm mt-2"><em>Note: Some essential features may not function properly if cookies are disabled.</em></p>
      </section>

      {/* Consent Checkbox and Accept Button */}
      {!accepted && (
        <div className="w-full max-w-xl mx-auto mt-8 mb-4 bg-amber-50 border border-amber-200 rounded-xl shadow p-6 flex flex-col items-center space-y-4">
          <form className="w-full flex flex-col items-center" onSubmit={handleAccept}>
            <label className="flex items-start gap-3 cursor-pointer select-none text-base font-medium mb-2" tabIndex={0} onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { setChecked(c => !c); setConfirmed(!checked); }}}>
              <input
                type="checkbox"
                className="accent-green-600 w-5 h-5 mt-1 rounded focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-200"
                checked={checked}
                onChange={handleCheck}
                aria-checked={checked}
                aria-label="Accept Cookie Policy"
              />
              <span className="leading-snug">
                <span role="img" aria-label="checkbox">☑</span> I understand and accept the use of cookies as outlined in the <a href="/cookie-policy" target="_blank" rel="noopener noreferrer" className="underline text-green-700 hover:text-green-900">Cookie Policy</a>, and I trust this data will be used ethically.
              </span>
            </label>
            {confirmed && (
              <div className="w-full text-green-800 bg-green-50 border border-green-200 rounded p-2 text-center text-base mt-2 animate-fade-in">
                <span role="img" aria-label="check">✔</span> Thank you for trusting us. Your preferences are respected. Redirecting to Home...
              </div>
            )}
            <button
              type="submit"
              className={`w-full mt-4 py-3 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                ${checked ? 'bg-green-700 hover:bg-green-800 text-white shadow-md hover:scale-105' : 'bg-amber-200 text-amber-400 cursor-not-allowed'}`}
              disabled={!checked}
              tabIndex={0}
            >
              Accept Cookies
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CookiePolicy; 