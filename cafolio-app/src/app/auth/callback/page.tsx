'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data?.session) {
        const token = data.session.access_token;
        document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        localStorage.setItem('auth_token', token);
        window.location.href = '/';
      } else {
        window.location.href = '/login';
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Autenticando...</p>
      </div>
    </div>
  );
}