import React, { useState } from 'react';
import axios from 'axios';
import { MapPinIcon, CameraIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ReportForm = () => {
  const [form, setForm] = useState({
    location: '',
    latitude: '',
    longitude: '',
    date_of_sighting: '',
    description: '',
    gender: '',
    approximate_age: '',
    height_cm: '',
    clothing: '',
    identifying_marks: '',
    contact_info: '',
    additional_info: ''
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setForm({
          ...form,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location: `GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        });
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (photo) formData.append('photo', photo);

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const res = await axios.post(`${apiUrl}/api/cases/report`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setSuccessId(res.data.case_id);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      alert('Error submitting report: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successId) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center">
        <CheckCircleIcon className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-[#1B3A6B] mb-4">Report Submitted Successfully</h2>
        <p className="text-slate-600 mb-8">
          Thank you for your humanity. Your report has been registered with ID:
          <span className="block text-emerald-600 font-mono text-2xl mt-2 font-bold">{successId}</span>
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
          <CameraIcon className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#1B3A6B]">Report Unidentified Case</h1>
          <p className="text-slate-500 text-sm font-medium">Every detail helps restore dignity to a soul.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="text-slate-700 text-sm font-bold ml-1">Location Details *</label>
            <div className="relative">
              <input
                required
                name="location"
                value={form.location}
                onChange={handleInputChange}
                placeholder="Where was the person seen?"
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
              />
              <button 
                type="button"
                onClick={detectLocation}
                className="absolute right-2 top-2 p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all border border-emerald-100"
                title="Detect GPS"
              >
                <MapPinIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-slate-700 text-sm font-bold ml-1">Date of Sighting *</label>
            <input
              required
              type="datetime-local"
              name="date_of_sighting"
              value={form.date_of_sighting}
              onChange={handleInputChange}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="text-slate-700 text-sm font-bold ml-1">Photo of the Person (Critical) *</label>
          <div className="relative group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all group-hover:border-emerald-400 ${preview ? 'bg-slate-100 border-slate-300' : 'bg-[#f8fafc] border-slate-200'}`}>
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-2xl p-2" />
              ) : (
                <>
                  <CameraIcon className="w-10 h-10 text-slate-300 mb-2 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-slate-500 text-sm font-bold">Click to upload or drag & drop</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-slate-700 text-sm font-bold ml-1">Gender</label>
            <select 
              name="gender" 
              value={form.gender} 
              onChange={handleInputChange}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-slate-700 text-sm font-bold ml-1">Approx. Age</label>
            <input
              type="number"
              name="approximate_age"
              placeholder="e.g. 35"
              value={form.approximate_age}
              onChange={handleInputChange}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-700 text-sm font-bold ml-1">Height (cm)</label>
            <input
              name="height_cm"
              placeholder="e.g. 170"
              value={form.height_cm}
              onChange={handleInputChange}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-slate-700 text-sm font-bold ml-1">Clothing Details</label>
          <input
            name="clothing"
            placeholder="e.g. Blue shirt, black trousers"
            value={form.clothing}
            onChange={handleInputChange}
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-700 text-sm font-bold ml-1">Identifying Marks (Tattoos, Scars)</label>
          <input
            name="identifying_marks"
            placeholder="e.g. Scar on left arm, tattoo of 'A' on chest"
            value={form.identifying_marks}
            onChange={handleInputChange}
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-700 text-sm font-bold ml-1">General Description *</label>
          <textarea
            required
            name="description"
            rows="4"
            placeholder="Any other details..."
            value={form.description}
            onChange={handleInputChange}
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 mt-6 border-t border-slate-200">
          <div className="space-y-2">
            <label className="text-slate-700 text-sm font-bold ml-1">Reporter Contact Info *</label>
            <input
              required
              name="contact_info"
              placeholder="Your Phone or Email"
              value={form.contact_info}
              onChange={handleInputChange}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
            />
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-3 text-slate-600 text-sm cursor-pointer hover:text-slate-800 transition-all font-medium">
              <input type="checkbox" required className="w-5 h-5 rounded-lg border-slate-300 text-emerald-500 focus:ring-emerald-500" />
              I confirm this report is genuine and accurate.
            </label>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 mt-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            'Submit Case Report'
          )}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
