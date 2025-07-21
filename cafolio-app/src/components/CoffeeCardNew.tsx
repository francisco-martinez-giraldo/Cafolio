"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function CoffeeCardNew() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/newCoffee');
  };

  return (
    <Card className="p-3 cursor-pointer hover:bg-accent/50 transition-colors" onClick={handleClick}>
      <div className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-md mb-2 flex flex-col items-center justify-center">
        <div className="text-2xl text-muted-foreground mb-2">+</div>
        <span className="text-xs text-muted-foreground text-center">Agregar café</span>
      </div>
    </Card>
  );
}