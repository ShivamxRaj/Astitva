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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F0E8' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Checking session...</p>
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
