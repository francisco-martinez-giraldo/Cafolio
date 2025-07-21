"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  
  // Redirigir según el estado de autenticación
  if (user) {
    window.location.href = '/home';
    return null;
  }
  
  // Si no hay usuario, redirigir a login
  window.location.href = '/login';
  return null;
}