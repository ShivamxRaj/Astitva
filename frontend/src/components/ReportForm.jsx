import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapPinIcon, CameraIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const loadLeaflet = () => {
  return new Promise((resolve) => {
    if (window.L) {
      resolve(window.L);
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve(window.L);
    document.head.appendChild(script);
  });
};

const MapPickerModal = ({ isOpen, onClose, onConfirm, initialLat, initialLon }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState({ lat: initialLat || 20.5937, lon: initialLon || 78.9629 });
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerId = 'leaflet-map-picker-form';

  useEffect(() => {
    if (!isOpen) return;

    let map = null;
    let marker = null;

    loadLeaflet().then((L) => {
      const container = document.getElementById(mapContainerId);
      if (container) {
        container.innerHTML = '';
      }

      const defaultLat = parseFloat(initialLat) || 20.5937;
      const defaultLon = parseFloat(initialLon) || 78.9629;

      map = L.map(mapContainerId).setView([defaultLat, defaultLon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const pinIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      marker = L.marker([defaultLat, defaultLon], { draggable: true, icon: pinIcon }).addTo(map);
      markerRef.current = marker;
      mapRef.current = map;

      const updatePosition = async (lat, lon) => {
        setCoords({ lat, lon });
        setLoading(true);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          const data = await res.json();
          setAddress(data.display_name || `${lat.toFixed(6)}, ${lon.toFixed(6)}`);
        } catch (e) {
          setAddress(`${lat.toFixed(6)}, ${lon.toFixed(6)}`);
        } finally {
          setLoading(false);
        }
      };

      updatePosition(defaultLat, defaultLon);

      marker.on('dragend', () => {
        const position = marker.getLatLng();
        updatePosition(position.lat, position.lng);
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        updatePosition(e.latlng.lat, e.latlng.lng);
      });
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [isOpen]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const L = window.L;
        const { lat, lon } = data[0];
        const newLat = parseFloat(lat);
        const newLon = parseFloat(lon);
        setCoords({ lat: newLat, lon: newLon });
        setAddress(data[0].display_name);
        
        if (mapRef.current) {
          mapRef.current.setView([newLat, newLon], 15);
        }
        if (markerRef.current) {
          markerRef.current.setLatLng([newLat, newLon]);
        }
      } else {
        alert('Location not found. Please try another search term.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Select Sighting Location</h3>
            <p className="text-sm text-slate-500">Search for a place, click on the map, or drag the pin to set the location.</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            ✕
          </button>
        </div>

        <div className="p-4 bg-slate-50 border-b border-slate-100">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search city, town, landmark, street name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              Search
            </button>
          </form>
        </div>

        <div className="relative flex-1 min-h-[300px]">
          <div id={mapContainerId} className="w-full h-full" style={{ minHeight: '350px' }}></div>
          {loading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-[1000]">
              <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-4">
          <div className="text-sm">
            <span className="font-bold text-slate-700 block mb-1">📍 Selected Location Address:</span>
            <span className="text-slate-600 italic block min-h-[20px]">
              {address || 'Fetching address...'}
            </span>
            <span className="text-xs text-slate-400 block mt-1 font-mono">
              Coordinates: {coords.lat.toFixed(6)}, {coords.lon.toFixed(6)}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(address, coords.lat, coords.lon)}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleMapConfirm = (address, lat, lon) => {
    setForm(prev => ({
      ...prev,
      location: address,
      latitude: lat,
      longitude: lon
    }));
    setIsMapOpen(false);
  };

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
    
    // Validate for repeated character spam
    const hasSpam = (str) => /([a-zA-Z0-9])\1{5,}/.test(str || '');
    if (hasSpam(form.description) || hasSpam(form.location) || hasSpam(form.contact_info)) {
      alert('Spam or repeated placeholder characters (e.g. fffffff) are not permitted. Please enter genuine case details.');
      return;
    }
    if (form.description.trim().length < 10) {
      alert('Please provide a more detailed general description (at least 10 characters).');
      return;
    }

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
      const backendError = error.response?.data?.message || error.message;
      alert('Error submitting report: ' + backendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successId) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center">
        <CheckCircleIcon className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-[#1B3A6B] mb-4">Report Submitted Successfully</h2>
        <p className="text-slate-600 mb-4">
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
            <input
              required
              name="location"
              value={form.location}
              onChange={handleInputChange}
              placeholder="Where was the person seen?"
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={detectLocation}
                className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-all border border-emerald-100 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MapPinIcon className="w-4 h-4" /> Use Current GPS
              </button>
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                className="flex-1 py-2 px-3 bg-[#F0F7FF] hover:bg-blue-100 text-[#1B3A6B] rounded-xl text-xs font-bold transition-all border border-blue-100 flex items-center justify-center gap-1.5 shadow-sm"
              >
                🗺️ Pick on Map
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
      </form>
      <MapPickerModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onConfirm={handleMapConfirm}
        initialLat={form.latitude}
        initialLon={form.longitude}
      />
    </div>
  );
};

export default ReportForm;
