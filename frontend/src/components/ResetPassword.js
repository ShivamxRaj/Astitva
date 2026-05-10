import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LockClosedIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from Supabase
    // When user clicks the reset link in email, Supabase triggers this event
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsReady(true);
      } else if (event === 'SIGNED_IN' && !isReady && !success) {
        // If we get a SIGNED_IN event (from recovery token), also allow reset
        setIsReady(true);
      }
    });

    // Also check if there's already a session (user may have landed here with valid recovery session)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsReady(true);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [isReady, success]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setIsLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      // Sign out so user can log in fresh with new password
      await supabase.auth.signOut();
      setTimeout(() => navigate('/admin/login', { replace: true }), 3000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E7D9C 100%)' }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div
          className="px-8 pt-8 pb-6 text-center"
          style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E7D9C)' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)' }}
          >
            <LockClosedIcon style={{ width: '2rem', height: '2rem', color: '#fff' }} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Merriweather', serif" }}>
            Reset Your Password
          </h1>
          <p className="text-blue-100 text-sm">Set a new secure password for your admin account</p>
        </div>

        <div className="px-8 py-7">
          {/* Success State */}
          {success && (
            <div className="text-center py-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#D1FAE5' }}
              >
                <CheckCircleIcon style={{ width: '2.5rem', height: '2.5rem', color: '#065F46' }} aria-hidden="true" />
              </div>
              <h2 className="font-bold text-xl mb-2" style={{ color: '#1B3A6B' }}>
                Password Updated! 🎉
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Your password has been successfully reset.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to login page in a moment...
              </p>
            </div>
          )}

          {/* Not Ready / Invalid Token */}
          {!isReady && !success && (
            <div className="text-center py-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#FEF3C7' }}
              >
                <ExclamationCircleIcon style={{ width: '2rem', height: '2rem', color: '#92400E' }} aria-hidden="true" />
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#1B3A6B' }}>
                Validating Reset Link...
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Please wait while we verify your password reset link. If this takes too long, the link may have expired.
              </p>
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin mx-auto mb-4" />
              <button
                onClick={() => navigate('/admin/login')}
                className="text-sm hover:underline"
                style={{ color: '#2E7D9C' }}
              >
                ← Back to login & request a new link
              </button>
            </div>
          )}

          {/* Reset Form */}
          {isReady && !success && (
            <form onSubmit={handleResetPassword} noValidate>
              <div className="space-y-5">
                {/* Error Alert */}
                {error && (
                  <div
                    className="flex items-start gap-2 p-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-700"
                    role="alert"
                    aria-live="polite"
                  >
                    <ExclamationCircleIcon
                      style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}
                      aria-hidden="true"
                    />
                    <span>{error}</span>
                  </div>
                )}

                {/* New Password */}
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>
                    <span className="flex items-center gap-1.5">
                      <LockClosedIcon style={{ width: '0.95rem', height: '0.95rem', color: '#1B3A6B' }} aria-hidden="true" />
                      New Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 6 chars)"
                      required
                      minLength={6}
                      className="w-full px-4 py-3 pr-11 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{ borderColor: '#D1D5DB' }}
                      aria-label="New password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeSlashIcon style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden="true" />
                      ) : (
                        <EyeIcon style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>
                    <span className="flex items-center gap-1.5">
                      <LockClosedIcon style={{ width: '0.95rem', height: '0.95rem', color: '#1B3A6B' }} aria-hidden="true" />
                      Confirm Password
                    </span>
                  </label>
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#D1D5DB' }}
                    aria-label="Confirm new password"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-lg font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E7D9C)' }}
                  aria-label="Update password"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <ShieldCheckIcon style={{ width: '1rem', height: '1rem' }} aria-hidden="true" />
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 text-center">
          <p className="text-xs" style={{ color: '#CBD5E0' }}>
            🔒 Secured by Supabase Auth · All access is logged
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
