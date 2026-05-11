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
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col items-center space-y-6 border border-gray-100 border-t-4" style={{ borderTopColor: 'var(--teal)' }}>
      <form className="w-full flex flex-col items-center" onSubmit={e => { e.preventDefault(); if (checked) handleContinue(); }}>
        <label 
          className="group relative flex items-start gap-4 cursor-pointer select-none text-gray-800 hover:bg-gray-50 p-4 rounded-xl transition-colors border border-transparent hover:border-gray-200 w-full"
          tabIndex={0} 
          onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { setChecked(c => !c); setShowConfirm(!checked); }}}
        >
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={checked}
              onChange={handleCheck}
              aria-checked={checked}
              aria-label="Agree to Terms & Conditions"
            />
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${checked ? 'bg-teal-600 border-teal-600' : 'bg-white border-gray-300 group-hover:border-teal-400'}`} style={checked ? {backgroundColor: 'var(--teal)', borderColor: 'var(--teal)'} : {}}>
              <svg className={`w-4 h-4 text-white pointer-events-none transition-transform duration-200 ${checked ? 'scale-100' : 'scale-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <span className="leading-relaxed text-base sm:text-lg">
            I agree to the <a href="/guidelines" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4 decoration-2 hover:text-teal-700 transition-colors" style={{ color: 'var(--navy)', textDecorationColor: 'var(--teal)' }}>Terms & Conditions</a> and pledge to use this platform with honesty, integrity, and empathy for the unseen and unheard.
          </span>
        </label>
        
        {/* Animated Confirmation Message */}
        <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${showConfirm ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="bg-teal-50 border border-teal-100 text-teal-800 rounded-lg p-3 text-center text-sm font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Thank you for acknowledging. Your compassion matters.
          </div>
        </div>

        <button
          type="submit"
          className={`w-full mt-6 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 relative overflow-hidden group
            ${checked ? 'text-white shadow-lg transform hover:-translate-y-0.5 hover:shadow-xl' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          style={checked ? { backgroundColor: 'var(--navy)' } : {}}
          disabled={!checked || loading}
          tabIndex={0}
        >
          {checked && !loading && (
            <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          )}
          
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                Securing your agreement...
              </>
            ) : (
              <>
                Continue Forward
                <svg className={`w-5 h-5 transition-transform duration-300 ${checked ? 'group-hover:translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default TermsAgreement; 