import React, { useState } from 'react';
import axios from 'axios';
import { UserIcon, MapPinIcon, SparklesIcon, PhoneIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';

const AISearch = () => {
  const [activeTab, setActiveTab] = useState('ai_search'); // 'ai_search' or 'track_report'

  // AI Search State
  const [search, setSearch] = useState({
    name: '',
    gender: '',
    age: '',
    location: '',
    date: '',
    marks: '',
    description: ''
  });
  const [matches, setMatches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Track Report State
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleInputChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const res = await axios.post(`${apiUrl}/api/cases/search`, search);
      if (res.data.success) {
        setMatches(res.data.matches);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('AI Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    
    setIsTracking(true);
    setTrackError('');
    setTrackResult(null);

    try {
      const { data, error } = await supabase
        .from('orphan_cases')
        .select('*')
        .eq('case_id', trackId.trim())
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
      setIsTracking(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#1B3A6B] mb-4 flex items-center justify-center gap-3">
          {activeTab === 'ai_search' ? <SparklesIcon className="w-10 h-10 text-amber-500" /> : <DocumentMagnifyingGlassIcon className="w-10 h-10 text-teal-600" />}
          {activeTab === 'ai_search' ? 'AI-Powered Search' : 'Track Case Report'}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {activeTab === 'ai_search' 
            ? "Fill in the details of your missing loved one. Our AI will compare these with reported cases across India to find matches."
            : "Enter the Case ID you received when submitting a report to check its current status."}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('ai_search')}
            className={`px-8 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'ai_search' ? 'bg-white text-[#1B3A6B] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Find Matches (AI Search)
          </button>
          <button 
            onClick={() => setActiveTab('track_report')}
            className={`px-8 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'track_report' ? 'bg-white text-[#1B3A6B] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Track ID Status
          </button>
        </div>
      </div>

      {/* AI Search Tab Content */}
      {activeTab === 'ai_search' && (
        <>
          <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-12 shadow-xl shadow-slate-200/50">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Full Name</label>
                <input name="name" value={search.name} onChange={handleInputChange} className="search-input" placeholder="Name" />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Gender</label>
                <select name="gender" value={search.gender} onChange={handleInputChange} className="search-input">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Approx. Age</label>
                <input name="age" type="number" value={search.age} onChange={handleInputChange} className="search-input" placeholder="Age" />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Last Seen Location</label>
                <input name="location" value={search.location} onChange={handleInputChange} className="search-input" placeholder="City/State" />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Date Last Seen</label>
                <input name="date" type="date" value={search.date} onChange={handleInputChange} className="search-input" />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Identifying Marks</label>
                <input name="marks" value={search.marks} onChange={handleInputChange} className="search-input" placeholder="Tattoos, scars, etc." />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Other Description</label>
                <textarea name="description" value={search.description} onChange={handleInputChange} rows="2" className="search-input w-full" placeholder="Any other details..." />
              </div>
              <div className="md:col-span-3">
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold text-xl hover:scale-[1.02] transition-all shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSearching ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      AI Analyzing Database...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-6 h-6" />
                      Run AI Match Search
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            {isSearching && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50 pointer-events-none">
                {[1, 2].map(i => <div key={i} className="h-[600px] bg-slate-200 rounded-3xl animate-pulse"></div>)}
              </div>
            )}

            {hasSearched && !isSearching && matches.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                <UserIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">No matches found above 40%</h3>
                <p className="text-slate-500">Try broadening your search criteria or checking back in a few days.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {matches.map((match) => (
                <CaseMatchCard key={match.id} caseData={match} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Track Report Tab Content */}
      {activeTab === 'track_report' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50">
            <form onSubmit={handleTrackSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-slate-700 text-sm font-bold ml-1">Enter Report ID / Case ID</label>
                <input 
                  type="text" 
                  value={trackId} 
                  onChange={(e) => setTrackId(e.target.value)} 
                  className="search-input" 
                  placeholder="e.g. AVY-17210..." 
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isTracking}
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-600/30 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isTracking ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Tracking...
                  </>
                ) : 'Track Status'}
              </button>
            </form>

            {trackError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium text-sm">
                {trackError}
              </div>
            )}
          </div>

          {/* Track Result Card */}
          {trackResult && !isTracking && (
            <div className="mt-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <h4 className="text-lg font-bold text-[#1B3A6B]">Report Details</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  trackResult.status === 'identified' ? 'bg-emerald-100 text-emerald-700' : 
                  trackResult.status === 'unidentified' ? 'bg-amber-100 text-amber-700' : 
                  'bg-slate-200 text-slate-700'
                }`}>
                  {trackResult.status}
                </span>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex gap-6 items-start">
                  {trackResult.photo_url && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      <img src={trackResult.photo_url} alt="Case" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="block text-xs font-bold uppercase text-slate-400">Case ID</span>
                      <span className="font-mono text-slate-800 font-bold">{trackResult.case_id}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-slate-400">Location Found</span>
                      <span className="text-slate-800 font-medium">{trackResult.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase text-slate-400">Description</span>
                  <p className="text-sm mt-1 pl-3 border-l-2 border-slate-200 text-slate-600 font-medium italic">"{trackResult.description}"</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-bold uppercase text-slate-400">Date Logged</span>
                    <span className="text-sm text-slate-700 font-medium">{new Date(trackResult.created_at || trackResult.date_of_sighting).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-slate-400">Contact Added</span>
                    <span className="text-sm text-slate-700 font-medium">{trackResult.contact_info || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <style jsx="true">{`
        .search-input {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 0.75rem 1rem;
          color: #1e293b;
          transition: all 0.2s;
        }
        .search-input:focus {
          outline: none;
          background: #ffffff;
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }
      `}</style>
    </div>
  );
};

const CaseMatchCard = ({ caseData }) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden group hover:border-amber-500/50 transition-all flex flex-col shadow-2xl shadow-slate-200/50">
      {/* BIG PHOTO Section */}
      <div className="relative h-[350px] w-full bg-slate-100">
        {caseData.photo_url ? (
          <img 
            src={caseData.photo_url} 
            alt="Matched case" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
            <UserIcon className="w-20 h-20" />
            <span className="text-sm font-medium mt-2">No Photo Available</span>
          </div>
        )}
        
        {/* Match Score Badge */}
        <div className="absolute top-6 right-6 px-4 py-2 bg-amber-500 text-white rounded-full font-bold shadow-xl shadow-amber-500/40 flex items-center gap-2">
          <SparklesIcon className="w-4 h-4" />
          {caseData.matchScore}% Match
        </div>

        {/* Status Tag */}
        <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold rounded-lg border border-white/50 uppercase tracking-widest shadow-sm">
          {caseData.status}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-amber-600 font-mono text-xs mb-1 block font-bold">{caseData.case_id}</span>
            <h3 className="text-2xl font-bold text-[#1B3A6B] flex items-center gap-2">
              <MapPinIcon className="w-6 h-6 text-amber-500" />
              {caseData.location}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-slate-500 text-xs block uppercase font-bold">Date Found</span>
            <span className="text-slate-800 font-bold">{new Date(caseData.date_of_sighting).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-500 text-[10px] uppercase block mb-1 font-bold">Gender / Age</span>
            <span className="text-slate-800 font-bold">{caseData.gender || 'Unknown'} • ~{caseData.approximate_age || '??'} years</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-slate-500 text-[10px] uppercase block mb-1 font-bold">Height / Clothing</span>
            <span className="text-slate-800 font-bold">{caseData.height_cm || '??'}cm • {caseData.clothing || 'Unknown'}</span>
          </div>
        </div>

        {caseData.identifying_marks && (
          <div className="mb-6">
            <span className="text-slate-500 text-[10px] uppercase block mb-2 font-bold">Identifying Marks</span>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">{caseData.identifying_marks}</p>
          </div>
        )}

        <div className="mb-8">
          <span className="text-slate-500 text-[10px] uppercase block mb-2 font-bold">Description</span>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{caseData.description}</p>
        </div>

        {/* AI Insight Section */}
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-3xl mb-8">
          <div className="flex items-start gap-3">
            <SparklesIcon className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-amber-800 font-bold text-xs uppercase block mb-1">🤖 AI Insight</span>
              <p className="text-amber-900/80 text-sm italic font-medium">"{caseData.matchReason}"</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-auto">
          <button className="flex-1 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition-all border border-slate-200 shadow-sm">
            View Details
          </button>
          <button className="flex-1 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl font-bold transition-all border border-emerald-200 flex items-center justify-center gap-2 shadow-sm">
            <PhoneIcon className="w-5 h-5" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISearch;
