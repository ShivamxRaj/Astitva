import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

/**
 * ProtectedRoute — wraps any route that requires an authenticated Supabase session.
 * Unauthenticated users are redirected to /admin/login.
 */
const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(undefined); // undefined = still loading

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen for auth changes (login / logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Still loading session
  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-9 h-9 text-[#1B3A6B]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-15" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-xs font-medium text-slate-500">Checking session...</p>
        </div>
      </div>
    );
  }

  // Not logged in → redirect
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
