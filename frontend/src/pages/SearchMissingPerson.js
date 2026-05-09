import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const initialForm = {
  fullName: '',
  gender: '',
  age: '',
  dob: '',
  height: '',
  lastSeenLocation: '',
  dateLastSeen: '',
  accessories: '',
  photo: null,
  identifyingMarks: '',
  relationship: '',
};

const Tooltip = ({ text }) => (
  <span className="ml-1 text-blue-500 cursor-pointer group relative">
    <span className="text-xs align-super">ℹ</span>
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
      {text}
    </span>
  </span>
);

const SearchMissingPerson = () => {
  const [form, setForm] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [results, setResults] = useState([]);
  
  // Track Report State
  const [searchTab, setSearchTab] = useState('ai_search'); // 'ai_search' or 'track_report'
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm((f) => ({ ...f, [name]: files[0] }));
      if (files[0]) {
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target.result);
        reader.readAsDataURL(files[0]);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAiSummary("Based on the information provided, we're analyzing available records. Please stay connected. Every detail matters.");
    // TODO: Call backend API for AI-powered search
    setTimeout(() => {
      setResults([]); // Placeholder for AI results
      setSubmitting(false);
    }, 2000);
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    
    setSubmitting(true);
    setTrackError('');
    setTrackResult(null);

    try {
      const { data, error } = await supabase
        .from('cases')
        .select('report_id, location, description, date_time, status')
        .eq('report_id', trackId.trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setTrackError("No report found with this ID. Please check the ID and try again.");
        } else {
          setTrackError("Failed to fetch the report. Please try again later.");
        }
      } else if (data) {
        setTrackResult(data);
      }
    } catch (err) {
      setTrackError("An error occurred while tracking the report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Left Panel */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-white/80 border-r border-blue-100 shadow-lg relative">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Searching for someone? You are not alone.</h2>
        <p className="text-lg text-gray-700 mb-2">Even the faintest hope can light the path home. Let's look together.</p>
        <p className="text-base text-purple-700 mb-4">Our AI will assist, but your memory is the key. Together, we can bring someone home.</p>
        {/* Optional Help Video Placeholder */}
        <div className="w-full max-w-xs mb-4">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">Help Video Coming Soon</div>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4 text-blue-900 w-full max-w-md">
          <p className="mb-1">All searches are private and confidential.</p>
          <p>You can report anonymously if you wish to share more details later.</p>
        </div>
        {/* Soft divider for visual separation on small screens */}
        <div className="hidden md:block absolute top-0 right-0 h-full w-2 bg-gradient-to-r from-blue-100/60 to-transparent" />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-white/90 overflow-y-auto">
        <div className="w-full max-w-lg mb-6 flex bg-blue-100 rounded-xl p-1 shadow-inner">
          <button 
            onClick={() => { setSearchTab('ai_search'); setTrackResult(null); setTrackError(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${searchTab === 'ai_search' ? 'bg-white text-blue-800 shadow' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            AI Search
          </button>
          <button 
            onClick={() => { setSearchTab('track_report'); setResults([]); setAiSummary(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${searchTab === 'track_report' ? 'bg-white text-blue-800 shadow' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            Track Report
          </button>
        </div>

        {searchTab === 'ai_search' ? (
        <form className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">Search for a Missing Person</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded p-2">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Age (approx)</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} className="w-full border rounded p-2" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Approximate Height (in cm)</label>
              <input type="text" name="height" value={form.height} onChange={handleChange} className="w-full border rounded p-2" placeholder="e.g. 160-170" />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Seen Location</label>
              <input type="text" name="lastSeenLocation" value={form.lastSeenLocation} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Date Last Seen</label>
              <input type="date" name="dateLastSeen" value={form.dateLastSeen} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Accessories Worn (if any)</label>
              <input type="text" name="accessories" value={form.accessories} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Upload Photo (optional but recommended)</label>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 rounded shadow w-32 h-32 object-cover" />}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Identifying Marks (tattoos, scars, etc.)
                <Tooltip text="Describe any unique physical features that could help identify the person." />
              </label>
              <input type="text" name="identifyingMarks" value={form.identifyingMarks} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Relationship to the Missing Person (optional)
                <Tooltip text="E.g., parent, sibling, friend. Helps us understand your connection." />
              </label>
              <input type="text" name="relationship" value={form.relationship} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 rounded-lg font-semibold text-lg bg-blue-700 hover:bg-blue-800 text-white shadow-md transition-all duration-200" disabled={submitting}>
            {submitting ? 'Searching...' : 'AI-Powered Search'}
          </button>
          <div className="text-xs text-gray-500 text-center mt-2">Powered by secure, intelligent matching – your data stays safe.</div>
          {aiSummary && <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-900 rounded">{aiSummary}</div>}
        </form>
        ) : (
        <form className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-4" onSubmit={handleTrackSubmit}>
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">Track Your Report</h3>
          <p className="text-sm text-gray-600 mb-4">Enter the Report ID you received when submitting an unclaimed body report to check its current status.</p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report ID</label>
            <input 
              type="text" 
              value={trackId} 
              onChange={(e) => setTrackId(e.target.value)} 
              className="w-full border rounded-lg p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              placeholder="e.g. #AVY-2026..." 
              required
            />
          </div>

          <button type="submit" className="w-full py-3 rounded-lg font-semibold text-lg bg-blue-700 hover:bg-blue-800 text-white shadow-md transition-all duration-200" disabled={submitting}>
            {submitting ? 'Tracking...' : 'Track Status'}
          </button>

          {trackError && <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-900 rounded">{trackError}</div>}
        </form>
        )}

        {/* Results Section */}
        <div className="w-full max-w-lg mt-8">
          {searchTab === 'ai_search' && results.length > 0 ? (
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="text-lg font-semibold mb-2">Possible Matches</h4>
              {/* Map over results and display match info and images */}
            </div>
          ) : null}

          {searchTab === 'track_report' && trackResult && (
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                <h4 className="text-lg font-bold text-blue-900">Report Details</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  trackResult.status === 'approved' ? 'bg-green-100 text-green-700' :
                  trackResult.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {trackResult.status}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="block text-xs font-bold text-gray-500 uppercase">Report ID</span>
                  <span className="font-mono text-gray-800">{trackResult.report_id}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-500 uppercase">Location Found</span>
                  <span className="text-gray-800">{trackResult.location}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-500 uppercase">Description</span>
                  <p className="text-gray-700 text-sm italic border-l-2 border-gray-300 pl-3 mt-1">"{trackResult.description}"</p>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-500 uppercase">Date Logged</span>
                  <span className="text-gray-600 text-sm">{new Date(trackResult.date_time).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchMissingPerson; 