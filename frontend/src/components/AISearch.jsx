import React, { useState } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon, UserIcon, MapPinIcon, SparklesIcon, PhoneIcon } from '@heroicons/react/24/outline';

const AISearch = () => {
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

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      {/* Search Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <SparklesIcon className="w-10 h-10 text-amber-400" />
          AI-Powered Search
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Fill in the details of your missing loved one. Our AI will compare these with 
          reported unidentified cases across India to find the best possible matches.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 mb-12">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-white/70 text-sm font-medium ml-1">Full Name</label>
            <input name="name" value={search.name} onChange={handleInputChange} className="search-input" placeholder="Name" />
          </div>
          <div className="space-y-2">
            <label className="text-white/70 text-sm font-medium ml-1">Gender</label>
            <select name="gender" value={search.gender} onChange={handleInputChange} className="search-input">
              <option value="" className="bg-slate-900">Select</option>
              <option value="male" className="bg-slate-900">Male</option>
              <option value="female" className="bg-slate-900">Female</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-white/70 text-sm font-medium ml-1">Approx. Age</label>
            <input name="age" type="number" value={search.age} onChange={handleInputChange} className="search-input" placeholder="Age" />
          </div>
          <div className="space-y-2">
            <label className="text-white/70 text-sm font-medium ml-1">Last Seen Location</label>
            <input name="location" value={search.location} onChange={handleInputChange} className="search-input" placeholder="City/State" />
          </div>
          <div className="space-y-2">
            <label className="text-white/70 text-sm font-medium ml-1">Date Last Seen</label>
            <input name="date" type="date" value={search.date} onChange={handleInputChange} className="search-input" />
          </div>
          <div className="space-y-2">
            <label className="text-white/70 text-sm font-medium ml-1">Identifying Marks</label>
            <input name="marks" value={search.marks} onChange={handleInputChange} className="search-input" placeholder="Tattoos, scars, etc." />
          </div>
          <div className="md:col-span-3 space-y-2">
            <label className="text-white/70 text-sm font-medium ml-1">Other Description</label>
            <textarea name="description" value={search.description} onChange={handleInputChange} rows="2" className="search-input w-full" placeholder="Any other details..." />
          </div>
          <div className="md:col-span-3">
            <button 
              type="submit" 
              disabled={isSearching}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold text-xl hover:scale-[1.02] transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
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

      {/* Results Section */}
      <div className="space-y-8">
        {isSearching && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50 pointer-events-none">
            {[1, 2].map(i => <div key={i} className="h-[600px] bg-white/5 rounded-3xl animate-pulse"></div>)}
          </div>
        )}

        {hasSearched && !isSearching && matches.length === 0 && (
          <div className="text-center py-12 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <UserIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No matches found above 40%</h3>
            <p className="text-white/40">Try broadening your search criteria or checking back in a few days.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {matches.map((match) => (
            <CaseMatchCard key={match.id} caseData={match} />
          ))}
        </div>
      </div>
      
      <style jsx="true">{`
        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 0.75rem 1rem;
          color: white;
          transition: all 0.2s;
        }
        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }
      `}</style>
    </div>
  );
};

const CaseMatchCard = ({ caseData }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col shadow-2xl">
      {/* BIG PHOTO Section */}
      <div className="relative h-[350px] w-full bg-slate-900">
        {caseData.photo_url ? (
          <img 
            src={caseData.photo_url} 
            alt="Matched case" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
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
        <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-black/50 backdrop-blur-md text-white/90 text-xs font-bold rounded-lg border border-white/10 uppercase tracking-widest">
          {caseData.status}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-amber-400 font-mono text-xs mb-1 block">{caseData.case_id}</span>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-amber-500/50" />
              {caseData.location}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-white/30 text-xs block uppercase">Date Found</span>
            <span className="text-white font-medium">{new Date(caseData.date_of_sighting).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-white/30 text-[10px] uppercase block mb-1">Gender / Age</span>
            <span className="text-white font-semibold">{caseData.gender || 'Unknown'} • ~{caseData.approximate_age || '??'} years</span>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-white/30 text-[10px] uppercase block mb-1">Height / Clothing</span>
            <span className="text-white font-semibold">{caseData.height_cm || '??'}cm • {caseData.clothing || 'Unknown'}</span>
          </div>
        </div>

        {caseData.identifying_marks && (
          <div className="mb-6">
            <span className="text-white/30 text-[10px] uppercase block mb-2">Identifying Marks</span>
            <p className="text-white/80 text-sm leading-relaxed">{caseData.identifying_marks}</p>
          </div>
        )}

        <div className="mb-8">
          <span className="text-white/30 text-[10px] uppercase block mb-2">Description</span>
          <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{caseData.description}</p>
        </div>

        {/* AI Insight Section */}
        <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl mb-8">
          <div className="flex items-start gap-3">
            <SparklesIcon className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase block mb-1">🤖 AI Insight</span>
              <p className="text-amber-200/80 text-sm italic">"{caseData.matchReason}"</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-auto">
          <button className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all border border-white/10">
            View Details
          </button>
          <button className="flex-1 py-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-2xl font-bold transition-all border border-emerald-500/30 flex items-center justify-center gap-2">
            <PhoneIcon className="w-5 h-5" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISearch;
