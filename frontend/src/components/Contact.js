import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    category: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'mobile':
        if (!value.trim()) return 'Mobile number is required';
        if (!/^[6-9]\d{9}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid 10-digit mobile number';
        return '';
      
      case 'category':
        if (!value) return 'Please select a category';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 500) return 'Message must be less than 500 characters';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        category: '',
        message: ''
      });
      setErrors({});
      
      setTimeout(() => setShowToast(false), 5000);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Background with Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div className="container-responsive">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6">
              We're Here to Listen
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
              Let us know how we can help you. We believe every message matters.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form - Left Side */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-white/20">
                {/* Form Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                    Talk to Us
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300">
                    We are just a few words away
                  </p>
                  <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-2 sm:mt-3 rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="form-label block text-sm sm:text-base font-medium text-gray-200">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input shadow-sm focus:ring-2 focus:ring-purple-400 transition-all duration-300 bg-white/20 backdrop-blur-sm border text-white placeholder-gray-300 ${
                        errors.name 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-white/30 focus:border-purple-400'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-300 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="form-label block text-sm sm:text-base font-medium text-gray-200">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input shadow-sm focus:ring-2 focus:ring-purple-400 transition-all duration-300 bg-white/20 backdrop-blur-sm border text-white placeholder-gray-300 ${
                        errors.email 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-white/30 focus:border-purple-400'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-300 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Field */}
                  <div>
                    <label htmlFor="mobile" className="form-label block text-sm sm:text-base font-medium text-gray-200">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      id="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`form-input shadow-sm focus:ring-2 focus:ring-purple-400 transition-all duration-300 bg-white/20 backdrop-blur-sm border text-white placeholder-gray-300 ${
                        errors.mobile 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-white/30 focus:border-purple-400'
                      }`}
                      placeholder="Enter your 10-digit mobile number (e.g., 9876543210)"
                    />
                    {errors.mobile && (
                      <p className="mt-2 text-sm text-red-300 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Category Field */}
                  <div>
                    <label htmlFor="category" className="form-label block text-sm sm:text-base font-medium text-gray-200">
                      Category *
                    </label>
                    <select
                      name="category"
                      id="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className={`form-input shadow-sm focus:ring-2 focus:ring-purple-400 transition-all duration-300 bg-white/20 backdrop-blur-sm border text-white ${
                        errors.category 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-white/30 focus:border-purple-400'
                      }`}
                    >
                      <option value="" className="text-gray-900">Select a category</option>
                      <option value="general" className="text-gray-900">General Query</option>
                      <option value="report" className="text-gray-900">Report Issue</option>
                      <option value="feedback" className="text-gray-900">Feedback</option>
                      <option value="emergency" className="text-gray-900">Emergency Support</option>
                    </select>
                    {errors.category && (
                      <p className="mt-2 text-sm text-red-300 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="form-label block text-sm sm:text-base font-medium text-gray-200">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-input shadow-sm focus:ring-2 focus:ring-purple-400 transition-all duration-300 bg-white/20 backdrop-blur-sm border text-white placeholder-gray-300 resize-none ${
                        errors.message 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-white/30 focus:border-purple-400'
                      }`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-300 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-responsive rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information - Right Side */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              {/* Contact Information */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
                  Get in Touch
                </h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-purple-500/20 p-2 sm:p-3 rounded-full group-hover:bg-purple-500/30 transition-colors duration-300">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 mb-1">
                        Helpline
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 font-medium">
                        +91 1800-XXX-XXXX
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Available 24x7
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-purple-500/20 p-2 sm:p-3 rounded-full group-hover:bg-purple-500/30 transition-colors duration-300">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 mb-1">
                        Email
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 font-medium">
                        support@avyakta.org
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-purple-500/20 p-2 sm:p-3 rounded-full group-hover:bg-purple-500/30 transition-colors duration-300">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 mb-1">
                        Location
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 font-medium">
                        New Delhi, India
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Serving nationwide
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 text-center">
                    Find Us
                  </h3>
                  <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden border border-white/20">
                    <iframe
                      src="https://www.google.com/maps?q=25.7011,85.1832&z=17&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Avyakta Office Location - Sabalpur Hasti Tola (Bihar)"
                      className="rounded-xl"
                    ></iframe>
                  </div>
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <p className="text-xs sm:text-sm text-purple-300 font-medium">
                        Avyakta Office - Sabalpur Hasti Tola, Sonepur, Saran, Bihar
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-center">
                      Sabalpur Hasti Tola, Sonepur, Saran, Bihar<br />Pin Code - 841101
                    </p>
                    <div className="mt-2 text-center">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=25.7011,85.1832"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2 text-center">
                    Click to view directions and get detailed location information
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 text-center">
                    Follow Us
                  </h3>
                  <div className="flex justify-center space-x-3 sm:space-x-4">
                    {/* Facebook */}
                    <a href="#" className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>

                    {/* Twitter/X */}
                    <a href="#" className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a href="#" className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.315.315.49.753.49 1.243 0 .49-.175.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a href="#" className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Info Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                  Why Choose Us?
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-base text-gray-300">
                      24/7 Support Available
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-base text-gray-300">
                      Quick Response Time
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-base text-gray-300">
                      Confidential & Secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg z-50 animate-slide-up">
          <div className="flex items-center">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm sm:text-base font-medium">Message sent successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact; 