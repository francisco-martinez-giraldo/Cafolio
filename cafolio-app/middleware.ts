import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/auth/callback'];
  
  // Si es una ruta pública, permitir acceso
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Verificar si hay token de auth en las cookies
  const authToken = request.cookies.get('auth_token');
  
  // Si no hay token y está intentando acceder a ruta protegida
  if (!authToken?.value && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
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