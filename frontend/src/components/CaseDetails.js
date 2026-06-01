import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import CaseStatusTracker from './CaseStatusTracker';

const CaseDetails = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCaseDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const cleanedId = caseId.trim().replace(/[^\w#-]/g, '');

        // 1. Fetch from Supabase directly
        const { data, error: dbError } = await supabase
          .from('orphan_cases')
          .select('*')
          .eq('case_id', cleanedId)
          .single();

        if (dbError || !data) {
          // 2. Fallback to local offline cache
          const cachedCases = JSON.parse(localStorage.getItem('avyakta_offline_cases_cache') || '[]');
          const matchedCache = cachedCases.find(c => c.case_id === cleanedId);
          
          if (matchedCache) {
            setCaseData(matchedCache);
          } else {
            // 3. Fallback to citizen's own offline reports
            const offlineReports = JSON.parse(localStorage.getItem('citizen_offline_reports') || '[]');
            const matchedOffline = offlineReports.find(c => c.case_id === cleanedId);
            if (matchedOffline) {
              setCaseData(matchedOffline);
            } else {
              throw new Error('Case not found');
            }
          }
        } else {
          setCaseData(data);
        }
      } catch (err) {
        console.error('Error fetching case:', err);
        setError('We could not find a case matching this ID. Please verify the ID or check your connection.');
      } finally {
        setLoading(false);
      }
    };

    if (caseId) {
      fetchCaseDetails();
    }
  }, [caseId]);

  const getStatusStepIndex = (status) => {
    if (!status) return 0;
    const s = status.toLowerCase();
    if (s.includes('unidentified') || s === 'submitted') return 0;
    if (s.includes('review') || s.includes('investigating')) return 1;
    if (s.includes('matched') || s.includes('match')) return 2;
    if (s.includes('identified') || s.includes('resolved') || s.includes('approved')) return 3;
    return 0;
  };

  const shareCase = () => {
    if (navigator.share) {
      navigator.share({
        title: `Unidentified Body Sighting Case - Avyakta`,
        text: `Please help identify this case found at ${caseData?.location}. Sighted on ${caseData ? new Date(caseData.date_of_sighting).toLocaleDateString() : ''}.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Case link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 section-light flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-semibold">Retrieving case information safely...</p>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen pt-24 pb-12 section-light flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-slate-100">
          <span className="block text-4xl mb-4">⚠️</span>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Case Not Found</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">{error || 'Case records could not be retrieved.'}</p>
          <div className="flex flex-col gap-2">
            <button onClick={() => navigate('/search')} className="btn-primary w-full py-2.5 rounded-xl font-bold text-sm">
              Search Missing Persons Directory
            </button>
            <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800 mt-2 block">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stepIndex = getStatusStepIndex(caseData.status);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 section-light pb-12">
      {/* Header Banner */}
      <section className="section-dark section-padding text-center px-4">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 mb-3 uppercase tracking-wider">
              {caseData.status} Sighting Record
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mb-3 text-white">
              Unidentified Sighting Details
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-mono tracking-wide">
              Case ID: {caseData.case_id}
            </p>
          </div>
        </div>
      </section>

      {/* Main Info Card */}
      <div className="container-responsive mt-6 sm:mt-10">
        <div className="w-full max-w-3xl mx-auto">
          
          {/* Back & Share Buttons */}
          <div className="flex justify-between items-center mb-6 px-1">
            <button onClick={() => navigate(-1)} className="text-sm font-bold flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors">
              ← Go Back
            </button>
            <button onClick={shareCase} className="py-2 px-4 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all shadow-sm">
              🔗 Share Sighting
            </button>
          </div>

          {/* Status Tracker */}
          <CaseStatusTracker currentStep={stepIndex} lang={['hi','pa'].includes(navigator.language?.slice(0,2)) ? navigator.language.slice(0,2) : 'en'} />

          {/* Sighting Details Panel */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            
            {/* Visual Preview / Image */}
            <div className="w-full md:w-[280px] bg-slate-50 border-r border-slate-100 flex-shrink-0 flex flex-col items-center justify-center p-6 text-center">
              {caseData.photo_url ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img 
                    src={caseData.photo_url} 
                    alt={`Sighting at ${caseData.location}`} 
                    className="w-full rounded-2xl shadow-md max-h-[300px] object-cover" 
                  />
                  <span className="text-[10px] text-slate-400 block mt-2 italic">Sighting Photograph Provided</span>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-3xl mb-3">
                    📷
                  </div>
                  <span className="text-sm font-semibold text-slate-400">No Image Uploaded</span>
                  <span className="text-xs text-slate-300 block mt-1">Reported with physical details only</span>
                </div>
              )}
            </div>

            {/* Form Fields Text Content */}
            <div className="flex-1 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Sighting Location</h3>
                <p className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                  📍 {caseData.location || 'Location Not Specified'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Date & Time of Sighting</h3>
                  <p className="text-sm sm:text-base font-semibold text-slate-700">
                    📅 {caseData.date_of_sighting ? new Date(caseData.date_of_sighting).toLocaleString() : 'Date Not Specified'}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Record Created At</h3>
                  <p className="text-sm sm:text-base font-semibold text-slate-700">
                    ⏳ {caseData.created_at ? new Date(caseData.created_at).toLocaleString() : 'Date Not Specified'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">Physical Characteristics & Description</h3>
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans" style={{ whiteSpace: 'pre-line' }}>
                    {caseData.description}
                  </p>
                </div>
              </div>

              {caseData.additional_info && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Additional Sightings Notes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{caseData.additional_info}"
                  </p>
                </div>
              )}

              {/* Verified Contact Disclaimer / Safety Warning */}
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex flex-col sm:flex-row items-start gap-3">
                  <span className="text-2xl mt-0.5" role="img" aria-label="info">ℹ️</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">Do you know this person?</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      If you recognize these details, or have matching information about a missing relative, please contact the Avyakta Foundation Helpline immediately or speak directly with local coordination officers.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+916299446452" className="flex-1 py-3 bg-[#1B3A6B] hover:bg-[#152d52] text-white rounded-xl text-center text-sm font-bold transition-all shadow-sm">
                    📞 Call Helpline (+91 62994 46452)
                  </a>
                  <a href={`https://wa.me/916299446452?text=Inquiry%20regarding%20Case%20ID%20${caseData.case_id}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center text-sm font-bold transition-all shadow-sm">
                    💬 WhatsApp Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
