"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function CoffeeCardNew() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/newCoffee");
  };

  return (
    <Card className="p-6 cursor-pointer hover:bg-accent/50 transition-colors" onClick={handleClick}>
      <div className="h-32 border-2 border-dashed border-muted-foreground/30 rounded-xl flex flex-col items-center justify-center">
        <div className="text-3xl text-muted-foreground mb-3">+</div>
        <span className="text-sm text-muted-foreground text-center font-medium">Agregar café</span>
      </div>
    </Card>
  );
}
