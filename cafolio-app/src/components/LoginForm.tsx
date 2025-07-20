import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase auth logic
    console.log("Login attempt with email:", email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      {/* Logo placeholder */}
      <div className="mb-4">
        <div className="w-64 h-48 flex items-center justify-center">
          <img
            src="/cafolio/Cafolio-Fondo.png"
            alt="Logo"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </div>

      {/* Login form */}
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={!email} variant="outline" className="w-full">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
}
