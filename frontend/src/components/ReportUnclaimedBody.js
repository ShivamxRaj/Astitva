import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getRandomUsername() {
  const animals = ['Lion', 'Tiger', 'Eagle', 'Wolf', 'Falcon', 'Panther', 'Dove', 'Fox', 'Bear', 'Hawk'];
  return 'User_' + animals[Math.floor(Math.random() * animals.length)] + Math.floor(1000 + Math.random() * 9000);
}

// Helper to get local datetime string for datetime-local input
function getLocalDateTimeString() {
  const now = new Date();
  now.setSeconds(0, 0); // Remove seconds and ms for input compatibility
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

// Helper to format local datetime for display
function formatLocalDateTime(dtString) {
  if (!dtString) return '';
  const dt = new Date(dtString);
  if (isNaN(dt)) return dtString;
  return dt.toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Helper to generate a report ID
function generateReportId() {
  const now = new Date();
  return `#AVY-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${Math.floor(1000 + Math.random() * 9000)}`;
}

const initialPublic = {
  location: '',
  manualLocation: false,
  dateTime: '',
  image: null,
  description: '',
  contact: '',
  otp: '',
  otpSent: false,
  otpVerified: false,
  message: '',
  terms: false,
};
const initialAnon = {
  username: getRandomUsername(),
  dateTime: '',
  location: '',
  terms: false,
};

const ReportUnclaimedBody = () => {
  const [tab, setTab] = useState('public');
  const [publicForm, setPublicForm] = useState(initialPublic);
  const [anonForm, setAnonForm] = useState(initialAnon);
  const [publicErrors, setPublicErrors] = useState({});
  const [anonErrors, setAnonErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAnon, setSubmittedAnon] = useState(false);
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [reportId, setReportId] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!publicForm.manualLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPublicForm((f) => ({ ...f, location: `${pos.coords.latitude}, ${pos.coords.longitude}` }));
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
    if (!publicForm.dateTime) {
      setPublicForm((f) => ({ ...f, dateTime: getLocalDateTimeString() }));
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setAnonForm((f) => ({ ...f, location: `${pos.coords.latitude}, ${pos.coords.longitude}` }));
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
    if (!anonForm.dateTime) {
      setAnonForm((f) => ({ ...f, dateTime: getLocalDateTimeString() }));
    }
  }, [publicForm.manualLocation]);

  // --- Public Form Logic ---
  const validatePublic = () => {
    const e = {};
    if (!publicForm.location) e.location = 'Location is required.';
    if (!publicForm.dateTime) e.dateTime = 'Date & Time is required.';
    if (!publicForm.description?.trim()) e.description = 'Description is required.';
    if (publicForm.image && publicForm.image.size > 5 * 1024 * 1024) e.image = 'Max file size is 5MB.';
    if (publicForm.image && !['image/jpeg', 'image/png'].includes(publicForm.image.type)) e.image = 'Only JPEG/PNG allowed.';
    if (!publicForm.contact) e.contact = 'Contact is required for public report.';
    if (!publicForm.otpVerified) e.otp = 'Please verify your contact with OTP.';
    if (!publicForm.terms) e.terms = 'You must confirm the report is genuine.';
    return e;
  };
  const handlePublicChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setPublicForm((f) => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setPublicForm((f) => ({ ...f, image: files[0] }));
      if (files[0]) {
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target.result);
        reader.readAsDataURL(files[0]);
      } else {
        setImagePreview(null);
      }
    } else {
      setPublicForm((f) => ({ ...f, [name]: value }));
    }
  };
  const handleSendOtp = () => {
    setPublicForm((f) => ({ ...f, otpSent: true }));
  };
  const handleVerifyOtp = () => {
    setPublicForm((f) => ({ ...f, otpVerified: true }));
  };
  const handlePublicSubmit = (e) => {
    e.preventDefault();
    const eObj = validatePublic();
    setPublicErrors(eObj);
    if (Object.keys(eObj).length > 0) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setReportId(generateReportId());
      setPublicForm(initialPublic);
      setImagePreview(null);
      setStep(1);
    }, 2000);
  };

  // --- Anonymous Form Logic ---
  const validateAnon = () => {
    const e = {};
    if (!anonForm.username) e.username = 'Username is required.';
    if (!anonForm.terms) e.terms = 'You must accept the terms.';
    return e;
  };
  const handleAnonChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setAnonForm((f) => ({ ...f, [name]: checked }));
    } else {
      setAnonForm((f) => ({ ...f, [name]: value }));
    }
  };
  const handleAnonSubmit = (e) => {
    e.preventDefault();
    const eObj = validateAnon();
    setAnonErrors(eObj);
    if (Object.keys(eObj).length > 0) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedAnon(true);
      setAnonForm({ ...initialAnon, username: getRandomUsername() });
    }, 2000);
  };

  const handleCopyReportId = () => {
    if (reportId) {
      navigator.clipboard.writeText(reportId);
    }
  };

  // --- UI ---
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 animate-fade-in">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center animate-fade-in-up border border-blue-100">
          <div className="flex flex-col items-center mb-6">
            <span className="block w-16 h-16 mb-2 animate-glow">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="20" rx="5" ry="2" fill="#ffe066" opacity="0.3" />
                <path className="animate-flicker" d="M12 20c3-4.5 3-9 0-13-3 4.5-3 9 0 13z" fill="#ffe066" />
                <path className="animate-flicker" d="M12 16c1.5-2.5 1.5-5 0-7.5-1.5 2.5-1.5 5 0 7.5z" fill="#ffb700" />
              </svg>
            </span>
            <h2 className="text-2xl font-bold mb-2 text-green-700">Thank you for your courage and compassion.</h2>
            <p className="text-lg text-gray-700 mb-2">Your report has been received with heartfelt respect and will be reviewed by our team.<br/>You've taken a step toward giving someone their identity, and their dignity.</p>
            <div className="italic text-gray-400 text-sm mb-2">“In silent departures, we find our greatest humanity.”</div>
            {reportId && (
              <div className="flex flex-col items-center gap-2 mt-2">
                <div className="flex items-center gap-2 text-blue-800 font-mono text-sm">
                  Report ID: <span className="font-bold">{reportId}</span>
                  <button onClick={handleCopyReportId} title="Copy Report ID" className="ml-1 p-1 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" fill="#2563eb" opacity="0.15"/><rect x="3" y="3" width="13" height="13" rx="2" stroke="#2563eb" strokeWidth="2" fill="none"/></svg>
                  </button>
                </div>
                <span className="text-xs text-gray-500">Tap to copy your Report ID</span>
              </div>
            )}
          </div>
          <div className="mt-6 text-blue-900 text-base font-medium flex flex-col items-center gap-2">
            <span>💙 If you ever need guidance, reassurance, or further support...</span>
            <button
              className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-green-600 flex items-center gap-2 text-lg"
              onClick={() => navigate('/faq')}
            >
              <span role="img" aria-label="back">🔙</span> Back to Support &amp; Safety
            </button>
          </div>
        </div>
        <style>{`
          @keyframes flicker { 0%{opacity:1;} 50%{opacity:0.7;} 100%{opacity:1;} }
          .animate-flicker { animation: flicker 1.2s infinite alternate; }
          .animate-glow { filter: drop-shadow(0 0 12px #ffe066) drop-shadow(0 0 24px #ffe06688); }
          .animate-fade-in { animation: fadeIn 0.7s ease; }
          .animate-fade-in-up { animation: fadeInUp 0.7s ease; }
          @keyframes fadeIn { from { opacity: 0;} to { opacity: 1;} }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(32px);} to { opacity: 1; transform: none; } }
        `}</style>
      </div>
    );
  }
  if (submittedAnon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 animate-fade-in">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center animate-fade-in-up border border-purple-100">
          <div className="flex flex-col items-center mb-6">
            <span className="block w-16 h-16 mb-2 animate-glow">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="20" rx="5" ry="2" fill="#ffe066" opacity="0.3" />
                <path className="animate-flicker" d="M12 20c3-4.5 3-9 0-13-3 4.5-3 9 0 13z" fill="#ffe066" />
                <path className="animate-flicker" d="M12 16c1.5-2.5 1.5-5 0-7.5-1.5 2.5-1.5 5 0 7.5z" fill="#ffb700" />
              </svg>
            </span>
            <h2 className="text-2xl font-bold mb-2 text-purple-700">Thank you for reporting anonymously.</h2>
            <p className="text-lg text-gray-700 mb-2">Your anonymous report has been securely submitted and will be reviewed. You've helped bring dignity and closure.</p>
            <div className="italic text-gray-400 text-sm mb-2">“Every voice matters, even in silence.”</div>
            <div className="mt-4 text-green-700 text-base font-medium">💚 Thank you for your silent act of humanity. Your report is now part of a greater mission to bring truth, peace, and identity to those who can't speak for themselves.</div>
          </div>
          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold shadow hover:from-purple-700 hover:to-pink-600" onClick={() => setSubmittedAnon(false)}>Submit Another Anonymous Report</button>
        </div>
        <style>{`
          @keyframes flicker { 0%{opacity:1;} 50%{opacity:0.7;} 100%{opacity:1;} }
          .animate-flicker { animation: flicker 1.2s infinite alternate; }
          .animate-glow { filter: drop-shadow(0 0 12px #ffe066) drop-shadow(0 0 24px #ffe06688); }
          .animate-fade-in { animation: fadeIn 0.7s ease; }
          .animate-fade-in-up { animation: fadeInUp 0.7s ease; }
          @keyframes fadeIn { from { opacity: 0;} to { opacity: 1;} }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(32px);} to { opacity: 1; transform: none; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      {/* Hero Section */}
      <div className="w-full max-w-3xl mx-auto text-center pt-12 pb-6 px-4">
        <div className="flex flex-col items-center mb-4">
          <span className="block w-20 h-20 mb-2 animate-glow">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <ellipse cx="12" cy="20" rx="7" ry="3" fill="#ffe066" opacity="0.18" />
              <path className="animate-flicker" d="M12 20c3-4.5 3-9 0-13-3 4.5-3 9 0 13z" fill="#ffe066" />
              <path className="animate-flicker" d="M12 16c1.5-2.5 1.5-5 0-7.5-1.5 2.5-1.5 5 0 7.5z" fill="#ffb700" />
            </svg>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-2">“A step toward giving the forgotten a name, a voice, and the respect they deserve.”</h1>
          <div className="text-lg sm:text-xl text-blue-700 font-medium mb-2">Your report can be anonymous, safe, and confidential.</div>
          <div className="italic text-gray-500 text-base mb-2">“Every report is a step toward justice and humanity.”</div>
        </div>
      </div>
      {/* Why this matters section */}
      <div className="w-full max-w-2xl mx-auto mb-6 px-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 shadow">
          <h3 className="font-bold text-yellow-800 mb-1">Why this matters</h3>
          <p className="text-yellow-900 text-base">Every year, thousands of unclaimed and unidentified bodies are found in India. Many are never identified, and families never get closure. For example, <b>30,000 honour killings</b> occur annually, but only 25–35 are reported. Your report can help bring dignity, justice, and peace to the unknown and their families.</p>
        </div>
      </div>
      {/* Glassmorphism Card with Tabs */}
      <div className="flex-1 flex items-center justify-center pb-10">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col md:flex-row gap-8 border border-blue-100 animate-fade-in-up">
          {/* Pill Tabs */}
          <div className="flex flex-col md:w-1/3 gap-4 items-center md:items-stretch">
            <button onClick={() => { setTab('public'); setStep(1); }} className={`rounded-full px-6 py-3 font-bold text-lg shadow transition-all duration-300 ${tab==='public' ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white scale-105' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'}`}>Report Publicly</button>
            <button onClick={() => { setTab('anon'); setStep(1); }} className={`rounded-full px-6 py-3 font-bold text-lg shadow transition-all duration-300 ${tab==='anon' ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white scale-105' : 'bg-purple-100 text-purple-900 hover:bg-purple-200'}`}>Report Anonymously</button>
          </div>
          {/* Form Section */}
          <div className="flex-1">
            {/* Step Indicator */}
            <div className="mb-4 flex items-center gap-2">
              <div className="text-sm font-semibold text-blue-700 bg-blue-100 rounded-full px-3 py-1">Step 1 of 2</div>
              <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-green-500 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            {tab === 'public' ? (
              <form onSubmit={handlePublicSubmit} className="space-y-6">
                <div className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2"><span role="img" aria-label="public">🧾</span> Public Report</div>
                <div className="text-blue-700 mb-4 text-sm">Your report will be reviewed and you will be contacted for verification.</div>
                {/* Location */}
                <div className="relative">
                  <label className="block font-semibold mb-1 text-blue-900">📍 Location of body found *</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      name="manualLocation"
                      checked={publicForm.manualLocation}
                      onChange={handlePublicChange}
                      className="form-checkbox"
                      id="manualLocation"
                    />
                    <label htmlFor="manualLocation" className="text-sm">Enter location manually</label>
                  </div>
                  {publicForm.manualLocation ? (
                    <input
                      type="text"
                      name="location"
                      value={publicForm.location}
                      onChange={handlePublicChange}
                      className="form-input w-full"
                      placeholder="Enter location (address, landmark, etc.)"
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      name="location"
                      value={publicForm.location}
                      readOnly
                      className="form-input w-full bg-gray-100 cursor-not-allowed"
                      placeholder="Fetching location..."
                      required
                    />
                  )}
                  {publicErrors.location && <p className="text-red-500 text-sm mt-1">{publicErrors.location}</p>}
                  {/* Map View */}
                  {publicForm.location && !publicForm.manualLocation && publicForm.location.includes(',') && (
                    <div className="mt-2">
                      <iframe
                        title="Location Map"
                        width="100%"
                        height="180"
                        frameBorder="0"
                        style={{ border: 0, borderRadius: '12px' }}
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(publicForm.location.split(',')[1])-0.01}%2C${parseFloat(publicForm.location.split(',')[0])-0.01}%2C${parseFloat(publicForm.location.split(',')[1])+0.01}%2C${parseFloat(publicForm.location.split(',')[0])+0.01}&layer=mapnik&marker=${publicForm.location}`}
                        allowFullScreen
                      ></iframe>
                      <div className="text-xs text-gray-500 mt-1">Map view (approximate)</div>
                    </div>
                  )}
                </div>
                {/* Date & Time */}
                <div className="relative">
                  <label className="block font-semibold mb-1 text-blue-900">📅 Date & Time of sighting *</label>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={publicForm.dateTime}
                    onChange={handlePublicChange}
                    className="form-input w-full"
                    required
                  />
                  {publicErrors.dateTime && <p className="text-red-500 text-sm mt-1">{publicErrors.dateTime}</p>}
                </div>
                {/* Image Upload */}
                <div className="relative">
                  <label className="block font-semibold mb-1 text-blue-900">📸 Upload Image (if any)</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg,image/png"
                    onChange={handlePublicChange}
                    className="form-input w-full"
                  />
                  {imagePreview && (
                    <div className="mt-2 flex flex-col items-center">
                      <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg border border-gray-200 shadow" />
                      <span className="text-xs text-gray-500 mt-1">Image preview</span>
                    </div>
                  )}
                  {publicErrors.image && <p className="text-red-500 text-sm mt-1">{publicErrors.image}</p>}
                </div>
                {/* Description */}
                <div className="relative">
                  <label className="block font-semibold mb-1 text-blue-900">🧍 Description of the deceased *</label>
                  <textarea
                    name="description"
                    value={publicForm.description}
                    onChange={handlePublicChange}
                    className="form-input w-full min-h-[80px]"
                    placeholder="Visible features, clothes, tattoos, etc."
                    required
                  />
                  {publicErrors.description && <p className="text-red-500 text-sm mt-1">{publicErrors.description}</p>}
                </div>
                {/* Contact */}
                <div className="relative">
                  <label className="block font-semibold mb-1 text-blue-900">📞 Contact number or Email *</label>
                  <input
                    type="text"
                    name="contact"
                    value={publicForm.contact}
                    onChange={handlePublicChange}
                    className="form-input w-full"
                    placeholder="Phone or email (required)"
                    required
                  />
                  {publicForm.contact && !publicForm.otpSent && (
                    <button type="button" className="mt-2 px-4 py-1 bg-blue-600 text-white rounded" onClick={handleSendOtp}>Send OTP</button>
                  )}
                  {publicForm.otpSent && !publicForm.otpVerified && (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        name="otp"
                        value={publicForm.otp}
                        onChange={handlePublicChange}
                        className="form-input w-32"
                        placeholder="Enter OTP"
                      />
                      <button type="button" className="px-3 py-1 bg-green-600 text-white rounded" onClick={handleVerifyOtp}>Verify</button>
                    </div>
                  )}
                  {publicForm.otpVerified && <span className="ml-2 text-green-600 font-semibold">Verified</span>}
                  {publicErrors.contact && <p className="text-red-500 text-sm mt-1">{publicErrors.contact}</p>}
                  {publicErrors.otp && <p className="text-red-500 text-sm mt-1">{publicErrors.otp}</p>}
                </div>
                {/* Any other message */}
                <div className="relative">
                  <label className="block font-semibold mb-1 text-blue-900">📄 Any other message?</label>
                  <textarea
                    name="message"
                    value={publicForm.message}
                    onChange={handlePublicChange}
                    className="form-input w-full min-h-[60px]"
                    placeholder="Free form notes (optional)"
                  />
                </div>
                {/* Terms disclaimer */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={publicForm.terms}
                    onChange={handlePublicChange}
                    className="form-checkbox"
                    id="terms-public"
                    required
                  />
                  <label htmlFor="terms-public" className="text-sm">I confirm this report is genuine, and I understand its impact. I submit it with honesty and compassion for the unknown.</label>
                </div>
                {publicErrors.terms && <p className="text-red-500 text-sm mt-1">{publicErrors.terms}</p>}
                {/* Motivational line */}
                <div className="text-green-700 text-sm font-semibold italic text-center mb-2">“Your courage can give closure to someone's family.”</div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold shadow-lg hover:from-blue-700 hover:to-green-600 transition-all text-lg"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Public Report'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleAnonSubmit} className="space-y-6">
                <div className="text-xl font-bold text-purple-900 mb-2 flex items-center gap-2"><span role="img" aria-label="anon">🕵️‍♂️</span> Anonymous Report</div>
                {/* Emotional intro */}
                <div className="mb-3 text-purple-700 text-sm italic flex items-center gap-2">
                  <span role="img" aria-label="prayer">🙏</span> “Every anonymous report is a silent prayer for justice, a small step toward giving identity to someone forgotten. Your courage matters.”
                </div>
                <div className="text-purple-700 mb-4 text-sm">Your report will be stored anonymously. No personal details are collected.</div>
                {/* Username */}
                <div className="relative mb-1">
                  <label className="block font-semibold mb-1 text-purple-900">🆔 Anonymous Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={anonForm.username}
                    onChange={handleAnonChange}
                    className="form-input w-full bg-purple-50"
                    required
                  />
                  <div className="text-xs text-gray-500 mt-1">This is your auto-generated name. You remain completely untraceable unless you choose to share your contact.</div>
                  {anonErrors.username && <p className="text-red-500 text-sm mt-1">{anonErrors.username}</p>}
                </div>
                {/* Date & Time (auto) */}
                <div className="relative">
                  <label className="block font-semibold mb-1 text-purple-900">📅 Date & Time (auto)</label>
                  <input
                    type="text"
                    value={formatLocalDateTime(anonForm.dateTime)}
                    readOnly
                    className="form-input w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>
                {/* Location (auto) */}
                <div className="relative">
                  <label className="block font-semibold mb-1 text-purple-900">📍 Location (auto)</label>
                  <input
                    type="text"
                    value={anonForm.location}
                    readOnly
                    className="form-input w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>
                {/* Spam/Fake Detection Warning Note */}
                <div className="mb-2 text-red-600 text-sm font-semibold flex items-center gap-2">
                  <span role="img" aria-label="warning">🚨</span> Submitting a false or fake report not only wastes police time, but can also delay justice for someone in need. Please report with honesty and compassion.
                </div>
                {/* Terms disclaimer */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={anonForm.terms}
                    onChange={handleAnonChange}
                    className="form-checkbox"
                    id="terms-anon"
                    required
                  />
                  <label htmlFor="terms-anon" className="text-sm">I confirm this report is genuine, and I understand its impact. I submit it with honesty and compassion for the unknown.</label>
                </div>
                {anonErrors.terms && <p className="text-red-500 text-sm mt-1">{anonErrors.terms}</p>}
                {/* Motivational line */}
                <div className="text-gray-500 text-sm font-semibold italic text-center mb-2">“Your courage can give closure to someone's family.”</div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all text-lg"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : '🙌 Deliver with Compassion'}
                </button>
                {/* Emotional Reminder at the End */}
                <div className="mt-3 text-green-700 text-sm text-center font-semibold">“Your genuine report could help a mother find her son, or a sister find her brother. This is not just a report—it's a human responsibility.”</div>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes flicker { 0%{opacity:1;} 50%{opacity:0.7;} 100%{opacity:1;} }
        .animate-flicker { animation: flicker 1.2s infinite alternate; }
        .animate-glow { filter: drop-shadow(0 0 12px #ffe066) drop-shadow(0 0 24px #ffe06688); }
        .animate-fade-in { animation: fadeIn 0.7s ease; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease; }
        @keyframes fadeIn { from { opacity: 0;} to { opacity: 1;} }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(32px);} to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default ReportUnclaimedBody; 