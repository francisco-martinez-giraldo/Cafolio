"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header con logo */}
        <div className="flex items-center mb-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user?.email || "Usuario"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div 
            onClick={() => router.push('/home')}
            className="flex-1 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/cafolio/Isologo.png" alt="Cafolio" className="h-8 w-8" />
            <h1 className="text-xl font-semibold">Cafolio</h1>
          </div>

          <Button
            onClick={logout}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Contenido de las páginas autenticadas */}
        {children}
      </div>
    </div>
  );
}
