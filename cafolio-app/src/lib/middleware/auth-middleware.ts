import { NextRequest } from "next/server";
import { supabase } from "../supabase";

export async function authMiddleware(request: NextRequest) {
  // Intentar obtener token del header Authorization
  let token = request.headers.get("authorization")?.replace("Bearer ", "");

  // Si no hay token en header, intentar obtenerlo de cookies
  if (!token) {
    token = request.cookies.get("auth_token")?.value;
  }

  if (!token) {
    throw new Error("Token de autorización requerido");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new Error("Token inválido");
  }

  // Retornar user con email como id para compatibilidad
  return { ...user, id: user.email };
}
