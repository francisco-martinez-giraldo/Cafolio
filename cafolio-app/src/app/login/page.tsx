"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    loginMutation.mutate(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {/* < className="text-2xl">Cafolio</> */}
          <div className="">
            <img
              src="/Cafolio/Cafolio-Fondo.png"
              alt="Cafolio Logo"
              className="mx-auto h-64 w-auto rounded-md"
            />
          </div>
          {/* <CardDescription>Ingresa a tu cuenta</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loginMutation.isPending}
              />
            </div>
            
            {loginMutation.isSuccess && (
              <div className="text-sm text-green-600 text-center p-3 bg-green-50 rounded">
                <div className="font-medium mb-1">¡Magic link enviado!</div>
                <div>Revisa tu email y haz clic en el enlace para ingresar.</div>
              </div>
            )}
            
            {loginMutation.isError && (
              <div className="text-sm text-red-600 text-center p-2 bg-red-50 rounded">
                {loginMutation.error?.message || 'Error al enviar magic link'}
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={!email || loginMutation.isPending}>
              {loginMutation.isPending ? "Enviando..." : "Ingresar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
