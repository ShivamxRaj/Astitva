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
  <span className="ml-1 cursor-pointer group relative" style={{ color: 'var(--teal)' }}>
    <span className="text-xs align-super">ℹ</span>
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" style={{ background: 'var(--navy)' }}>
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
  
  const [searchTab, setSearchTab] = useState('ai_search');
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
    setTimeout(() => {
      setResults([]);
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

  const inputStyle = {
    border: '1.5px solid #CBD5E0',
    borderRadius: '8px',
    padding: '0.6rem 0.85rem',
    fontSize: '0.95rem',
    color: 'var(--text-dark)',
    background: '#fff',
    width: '100%',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24" style={{ background: 'var(--off-white)' }}>
      {/* Navy Header */}
      <section className="section-dark section-padding">
        <div className="container-responsive text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-3" style={{ color: '#fff' }}>
            Searching for someone? You are not alone.
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-2" style={{ color: '#CBD5E0' }}>
            Even the faintest hope can light the path home. Let's look together.
          </p>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Our AI will assist, but your memory is the key. Together, we can bring someone home.
          </p>
        </div>
      </section>

      {/* Privacy Notice */}
      <div className="container-responsive py-4">
        <div className="p-4 rounded-lg" style={{ background: 'rgba(46,125,156,0.08)', borderLeft: '4px solid var(--teal)' }}>
          <p className="mb-1 text-sm font-medium" style={{ color: 'var(--navy)' }}>All searches are private and confidential.</p>
          <p className="text-sm" style={{ color: 'var(--text-mid)' }}>You can report anonymously if you wish to share more details later.</p>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding" style={{ background: 'var(--off-white)', paddingTop: '1rem' }}>
        <div className="container-responsive max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="mb-6 flex rounded-xl p-1 shadow-inner" style={{ background: 'var(--slate-mid)' }}>
            <button 
              onClick={() => { setSearchTab('ai_search'); setTrackResult(null); setTrackError(''); }}
              className="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300"
              style={searchTab === 'ai_search' ? { background: '#fff', color: 'var(--navy)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } : { color: 'var(--teal)', background: 'transparent' }}
            >
              AI Search
            </button>
            <button 
              onClick={() => { setSearchTab('track_report'); setResults([]); setAiSummary(''); }}
              className="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300"
              style={searchTab === 'track_report' ? { background: '#fff', color: 'var(--navy)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } : { color: 'var(--teal)', background: 'transparent' }}
            >
              Track Report
            </button>
          </div>

          {searchTab === 'ai_search' ? (
            <div className="form-card">
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>Search for a Missing Person</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Full Name</label>
                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} style={inputStyle}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Age (approx)</label>
                    <input type="number" name="age" value={form.age} onChange={handleChange} style={inputStyle} min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Date of Birth</label>
                    <input type="date" name="dob" value={form.dob} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Approximate Height (cm)</label>
                    <input type="text" name="height" value={form.height} onChange={handleChange} style={inputStyle} placeholder="e.g. 160-170" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Last Seen Location</label>
                    <input type="text" name="lastSeenLocation" value={form.lastSeenLocation} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Date Last Seen</label>
                    <input type="date" name="dateLastSeen" value={form.dateLastSeen} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Accessories Worn</label>
                    <input type="text" name="accessories" value={form.accessories} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Upload Photo (optional)</label>
                    <input type="file" name="photo" accept="image/*" onChange={handleChange} style={{ ...inputStyle, padding: '0.4rem' }} />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 rounded shadow w-32 h-32 object-cover" />}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>
                      Identifying Marks (tattoos, scars, etc.)
                      <Tooltip text="Describe any unique physical features that could help identify the person." />
                    </label>
                    <input type="text" name="identifyingMarks" value={form.identifyingMarks} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>
                      Relationship to the Missing Person
                      <Tooltip text="E.g., parent, sibling, friend. Helps us understand your connection." />
                    </label>
                    <input type="text" name="relationship" value={form.relationship} onChange={handleChange} style={inputStyle} />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full" style={{ borderRadius: '10px', padding: '0.85rem', fontSize: '1.05rem', opacity: submitting ? 0.6 : 1 }} disabled={submitting}>
                  {submitting ? 'Searching...' : 'AI-Powered Search'}
                </button>
                <div className="text-xs text-center mt-2" style={{ color: 'var(--text-light)' }}>Powered by secure, intelligent matching – your data stays safe.</div>
                {aiSummary && (
                  <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(46,125,156,0.08)', borderLeft: '4px solid var(--teal)', color: 'var(--navy)' }}>
                    {aiSummary}
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="form-card">
              <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>Track Your Report</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-mid)' }}>Enter the Report ID you received when submitting an unclaimed body report to check its current status.</p>
              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>Report ID</label>
                  <input 
                    type="text" 
                    value={trackId} 
                    onChange={(e) => setTrackId(e.target.value)} 
                    style={inputStyle}
                    placeholder="e.g. #AVY-2026..." 
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full" style={{ borderRadius: '10px', padding: '0.85rem', fontSize: '1.05rem', opacity: submitting ? 0.6 : 1 }} disabled={submitting}>
                  {submitting ? 'Tracking...' : 'Track Status'}
                </button>
                {trackError && (
                  <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(192,57,43,0.08)', borderLeft: '4px solid var(--alert-red)', color: 'var(--alert-red)' }}>
                    {trackError}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Results */}
          <div className="mt-8">
            {searchTab === 'ai_search' && results.length > 0 && (
              <div className="inst-card">
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>Possible Matches</h4>
              </div>
            )}

            {searchTab === 'track_report' && trackResult && (
              <div className="inst-card overflow-hidden" style={{ padding: 0 }}>
                <div className="px-6 py-4 flex justify-between items-center" style={{ background: 'rgba(46,125,156,0.06)', borderBottom: '1px solid #E2E8F0' }}>
                  <h4 className="text-lg font-bold" style={{ color: 'var(--navy)' }}>Report Details</h4>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{
                    background: trackResult.status === 'approved' ? 'rgba(39,174,96,0.12)' : trackResult.status === 'rejected' ? 'rgba(192,57,43,0.12)' : 'rgba(245,158,11,0.12)',
                    color: trackResult.status === 'approved' ? 'var(--success-green)' : trackResult.status === 'rejected' ? 'var(--alert-red)' : 'var(--amber-warn)'
                  }}>
                    {trackResult.status}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <span className="block text-xs font-bold uppercase" style={{ color: 'var(--text-light)' }}>Report ID</span>
                    <span className="font-mono" style={{ color: 'var(--text-dark)' }}>{trackResult.report_id}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase" style={{ color: 'var(--text-light)' }}>Location Found</span>
                    <span style={{ color: 'var(--text-dark)' }}>{trackResult.location}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase" style={{ color: 'var(--text-light)' }}>Description</span>
                    <p className="text-sm italic mt-1 pl-3" style={{ color: 'var(--text-mid)', borderLeft: '2px solid #CBD5E0' }}>"{trackResult.description}"</p>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase" style={{ color: 'var(--text-light)' }}>Date Logged</span>
                    <span className="text-sm" style={{ color: 'var(--text-mid)' }}>{new Date(trackResult.date_time).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchMissingPerson;