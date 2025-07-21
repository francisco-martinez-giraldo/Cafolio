export interface User {
  id: string;
  email: string;
}

export interface Session {
  user: User;
  access_token: string;
}

export const getSession = (): Session | null => {
  if (typeof window === 'undefined') return null;
  
  const sessionData = localStorage.getItem('cafolio_session');
  if (!sessionData) return null;
  
  try {
    return JSON.parse(sessionData);
  } catch {
    return null;
  }
};

export const setSession = (session: Session): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cafolio_session', JSON.stringify(session));
  // También guardar en cookie para el middleware
  document.cookie = `cafolio_session=${JSON.stringify(session)}; path=/; max-age=86400`;
};

export const clearSession = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cafolio_session');
  // También limpiar cookie
  document.cookie = 'cafolio_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const getUser = (): User | null => {
  const session = getSession();
  return session?.user || null;
};