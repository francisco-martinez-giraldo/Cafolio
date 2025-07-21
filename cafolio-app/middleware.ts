import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/'];
  
  // Si es una ruta pública, permitir acceso
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Verificar si hay sesión en las cookies
  const sessionCookie = request.cookies.get('cafolio_session');
  
  // Si no hay sesión y está intentando acceder a ruta protegida
  if (!sessionCookie?.value && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Si hay sesión, verificar que sea válida
  if (sessionCookie?.value) {
    try {
      JSON.parse(sessionCookie.value);
    } catch {
      // Cookie corrupta, redirigir a login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};