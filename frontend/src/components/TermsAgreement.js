import React, { useState } from 'react';

const TermsAgreement = ({ onContinue }) => {
  const [checked, setChecked] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
    setShowConfirm(e.target.checked);
    if (e.target.checked) {
      // Log consent with timestamp (and optionally IP/fingerprint)
      console.log('Terms accepted at', new Date().toISOString());
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    setShowConfirm(false);
    // Simulate loader
    setTimeout(() => {
      setLoading(false);
      // Redirect to home page after agreement
      window.location.href = '/';
      if (onContinue) onContinue();
    }, 1800);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white text-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center space-y-6 border border-gray-200">
      <form className="w-full flex flex-col items-center" onSubmit={e => { e.preventDefault(); if (checked) handleContinue(); }}>
        <label className="flex items-start gap-3 cursor-pointer select-none text-lg font-medium mb-2" tabIndex={0} onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { setChecked(c => !c); setShowConfirm(!checked); }}}>
          <input
            type="checkbox"
            className="accent-blue-600 w-5 h-5 mt-1 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            checked={checked}
            onChange={handleCheck}
            aria-checked={checked}
            aria-label="Agree to Terms & Conditions"
          />
          <span className="leading-snug">
            I agree to the <a href="/guidelines" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-900">Terms & Conditions</a> and pledge to use this platform with honesty, integrity, and empathy for the unseen and unheard.
          </span>
        </label>
        {showConfirm && (
          <div className="w-full text-green-700 bg-green-50 border border-green-200 rounded p-2 text-center text-base mt-2 animate-fade-in">
            <span role="img" aria-label="check">✔</span> Thank you for acknowledging. Your compassion matters.
          </div>
        )}
        <button
          type="submit"
          className={`w-full mt-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
            ${checked ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-md hover:scale-105' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
          disabled={!checked || loading}
          tabIndex={0}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              Securing your agreement... Taking you forward with care.
            </span>
          ) : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default TermsAgreement; 