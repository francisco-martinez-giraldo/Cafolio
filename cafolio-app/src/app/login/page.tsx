"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email });
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
              />
            </div>
            <Button type="submit" className="w-full" disabled={!email}>
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
