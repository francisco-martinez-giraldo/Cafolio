"use client";

import { Button } from "@/components/ui/button";
import { CoffeeCard } from "@/components/CoffeeCard";
import { CoffeeCardNew } from "@/components/CoffeeCardNew";
import { useRecentCoffees } from "@/hooks/useCoffees";

export default function HomePage() {
  const MAX_INITIAL_COFFEES = 3; // Limite inicial de cafés a mostrar
  const { data: coffees, isLoading, error } = useRecentCoffees(MAX_INITIAL_COFFEES);

  if (isLoading) {
    return (
      <>
        <h1 className="text-2xl font-bold mb-6">Mis Cafés</h1>
        <div className="text-center">Cargando...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1 className="text-2xl font-bold mb-6">Mis Cafés</h1>
        <div className="text-center text-destructive">Error cargando cafés</div>
      </>
    );
  }

  return (
    <>
      {/* Título */}
      <h1 className="text-2xl font-bold mb-6">Mis Cafés</h1>

      {/* Grid de cafés */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {coffees?.map((coffee) => (
          <CoffeeCard
            key={coffee.id}
            id={coffee.id}
            brand={coffee.brand?.value || "Sin marca"}
            variety={coffee.variety?.value || "Sin variedad"}
            overallRating={coffee.overall_rating || 0}
            imageUrl={coffee.photo_path || ""}
          />
        ))}
        <CoffeeCardNew />
      </div>

      {/* Botón Ver más */}
      <div className="text-center">
        <Button className="cursor-pointer ">Ver más</Button>
      </div>
    </>
  );
}
