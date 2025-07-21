"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, getSession, clearSession } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for session on mount
    const currentSession = getSession();
    setSessionState(currentSession);
    setUser(currentSession?.user || null);
    setLoading(false);

    // Check for auth callback (magic link)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    
    if (accessToken) {
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const email = payload.email || 'user@example.com';
        const userId = payload.sub || '1';
        
        const newSession: Session = {
          user: { id: userId, email },
          access_token: accessToken
        };
        
        setSessionState(newSession);
        setUser(newSession.user);
        
        // Usar la función setSession que maneja tanto localStorage como cookie
        localStorage.setItem('cafolio_session', JSON.stringify(newSession));
        document.cookie = `cafolio_session=${JSON.stringify(newSession)}; path=/; max-age=86400`;
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('Error parsing JWT token:', error);
      }
    }
  }, []);

  const logout = () => {
    clearSession();
    setSessionState(null);
    setUser(null);
    // Redirigir a login después del logout
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};