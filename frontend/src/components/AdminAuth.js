import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LockClosedIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';

/* ── Small reusable alert ── */
const Alert = ({ type, message }) => {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div
      className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
        isError ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'
      }`}
      role="alert"
      aria-live="polite"
    >
      {isError
        ? <ExclamationCircleIcon style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
        : <CheckCircleIcon style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
      }
      <span>{message}</span>
    </div>
  );
};

const AdminAuth = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login'); // 'login' | 'info'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const [formData, setFormData] = useState({ email: '', password: '' });

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin/ratings', { replace: true });
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  /* ── LOGIN ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: formData.email.trim(),
      password: formData.password,
    });

    setIsLoading(false);

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        setError('Incorrect email or password. Please try again.');
      } else if (authError.message.includes('Email not confirmed')) {
        setError('Please verify your email address first. Check your inbox.');
      } else {
        setError(authError.message);
      }
    } else {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/admin/ratings', { replace: true }), 800);
    }
  };

  /* ── FORGOT PASSWORD ── */
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) { setError('Enter your email address.'); return; }
    setIsLoading(true);
    setError('');

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      forgotEmail.trim(),
      { redirectTo: `${window.location.origin}/admin/login` }
    );

    setIsLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setForgotSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E7D9C 100%)' }}>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E7D9C)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)' }}>
            <ShieldCheckIcon style={{ width: '2rem', height: '2rem', color: '#fff' }} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-merriweather font-bold text-white mb-1">Avyakta Admin</h1>
          <p className="text-blue-100 text-sm">Secure administrative access portal</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => { setTab('login'); setError(''); setShowForgot(false); }}
            className={`flex-1 py-3 text-sm font-semibold transition-all ${tab === 'login' ? 'border-b-2 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
            style={{ borderBottomColor: tab === 'login' ? '#1B3A6B' : 'transparent' }}
            aria-selected={tab === 'login'}
          >
            🔐 Sign In
          </button>
          <button
            onClick={() => { setTab('info'); setError(''); setShowForgot(false); }}
            className={`flex-1 py-3 text-sm font-semibold transition-all ${tab === 'info' ? 'border-b-2 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
            style={{ borderBottomColor: tab === 'info' ? '#1B3A6B' : 'transparent' }}
            aria-selected={tab === 'info'}
          >
            ℹ️ Get Access
          </button>
        </div>

        <div className="px-8 py-7">

          {/* ══ LOGIN TAB ══ */}
          {tab === 'login' && !showForgot && (
            <form onSubmit={handleLogin} noValidate>
              <div className="space-y-5">
                <Alert type="error"   message={error} />
                <Alert type="success" message={success} />

                {/* Email */}
                <div>
                  <label htmlFor="admin-email" className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>
                    <span className="flex items-center gap-1.5">
                      <EnvelopeIcon style={{ width: '0.95rem', height: '0.95rem', color: '#1B3A6B' }} aria-hidden="true" />
                      Email address
                    </span>
                  </label>
                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@avyakta.org"
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#D1D5DB', focusBorderColor: '#1B3A6B' }}
                    aria-label="Email address"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>
                    <span className="flex items-center gap-1.5">
                      <LockClosedIcon style={{ width: '0.95rem', height: '0.95rem', color: '#1B3A6B' }} aria-hidden="true" />
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-11 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{ borderColor: '#D1D5DB' }}
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword
                        ? <EyeSlashIcon style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden="true" />
                        : <EyeIcon      style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden="true" />
                      }
                    </button>
                  </div>
                </div>

                {/* Forgot link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => { setShowForgot(true); setError(''); }}
                    className="text-sm hover:underline"
                    style={{ color: '#2E7D9C' }}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-lg font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E7D9C)' }}
                  aria-label="Sign in"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Signing in...
                    </>
                  ) : (
                    <><ShieldCheckIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" /> Sign In Securely</>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ══ FORGOT PASSWORD ══ */}
          {tab === 'login' && showForgot && (
            <div>
              <button
                onClick={() => { setShowForgot(false); setForgotSent(false); setError(''); }}
                className="flex items-center gap-1 text-sm mb-5 hover:underline"
                style={{ color: '#2E7D9C' }}
                aria-label="Back to login"
              >
                <ArrowLeftIcon style={{ width: '0.9rem', height: '0.9rem' }} aria-hidden="true" />
                Back to login
              </button>

              {forgotSent ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: '#D1FAE5' }}>
                    <CheckCircleIcon style={{ width: '2rem', height: '2rem', color: '#065F46' }} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#1B3A6B' }}>Email Sent!</h3>
                  <p className="text-sm text-gray-600">
                    A password reset link has been sent to <strong>{forgotEmail}</strong>. Check your inbox (and spam folder).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword}>
                  <h3 className="font-bold text-base mb-1" style={{ color: '#1B3A6B' }}>Reset Password</h3>
                  <p className="text-sm text-gray-500 mb-5">Enter your admin email and we'll send a reset link.</p>
                  <Alert type="error" message={error} />
                  <div className="mt-4 mb-5">
                    <label htmlFor="forgot-email" className="block text-sm font-medium mb-1.5 text-gray-700">
                      Email address
                    </label>
                    <input
                      id="forgot-email"
                      type="email"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      placeholder="you@avyakta.org"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2"
                      aria-label="Email for password reset"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-lg font-bold text-white text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: '#1B3A6B' }}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ══ GET ACCESS TAB (Invite-Only Info) ══ */}
          {tab === 'info' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(27,58,107,0.08)', border: '2px solid rgba(27,58,107,0.15)' }}>
                <ShieldCheckIcon style={{ width: '2rem', height: '2rem', color: '#1B3A6B' }} aria-hidden="true" />
              </div>
              <h2 className="font-merriweather font-bold text-xl mb-3" style={{ color: '#1B3A6B' }}>
                Invite-Only Access
              </h2>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                The Avyakta admin portal is restricted to authorized personnel only. New accounts are created exclusively by the system administrator.
              </p>
              <div className="rounded-xl p-4 mb-6 text-left" style={{ background: '#F0F7FF', border: '1px solid #BFDBFE' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#1B3A6B' }}>
                  To request access, contact:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <EnvelopeIcon style={{ width: '1rem', height: '1rem', color: '#2E7D9C', flexShrink: 0 }} aria-hidden="true" />
                    <a href="mailto:support@avyakta.org" className="hover:underline" style={{ color: '#2E7D9C' }}>
                      support@avyakta.org
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <LockClosedIcon style={{ width: '1rem', height: '1rem', color: '#2E7D9C', flexShrink: 0 }} aria-hidden="true" />
                    Provide your name, role, and organization
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setTab('login')}
                className="w-full py-3 rounded-lg font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E7D9C)' }}
              >
                ← Back to Sign In
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-8 pb-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs flex items-center justify-center gap-1 mx-auto hover:underline"
            style={{ color: '#94A3B8' }}
            aria-label="Go to home page"
          >
            <ArrowLeftIcon style={{ width: '0.75rem', height: '0.75rem' }} aria-hidden="true" />
            Return to main portal
          </button>
          <p className="text-xs mt-3" style={{ color: '#CBD5E0' }}>
            🔒 Secured by Supabase Auth · All access is logged
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;