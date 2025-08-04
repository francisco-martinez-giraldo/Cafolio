"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const publicPaths = ['/login', '/', '/auth/callback'];
  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicPath) {
        router.push('/login');
      }
    }
  }, [user, loading, isPublicPath, router]);

  // Mostrar loading mientras verifica la sesión
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si no hay usuario y no es ruta pública, no mostrar nada (se redirigirá)
  if (!user && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
}