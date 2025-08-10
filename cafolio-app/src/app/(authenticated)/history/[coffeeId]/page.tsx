"use client";

import { useParams } from "next/navigation";
import { useCoffeeById } from "@/hooks/useCoffees";
import { usePreparationHistory } from "@/hooks/usePreparationHistory";
import { PreparationHistoryCard } from "@/components/PreparationHistoryCard";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function HistoryPage() {
  const params = useParams();
  const coffeeId = params.coffeeId as string;

  const { data: coffee, isLoading: coffeeLoading } = useCoffeeById(coffeeId);
  const { data: preparations, isLoading: preparationsLoading } = usePreparationHistory(coffeeId);

  if (coffeeLoading || preparationsLoading) {
    return <div className="p-4">Cargando...</div>;
  }

  if (!coffee) {
    return <div className="p-4">Café no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="px-6 py-6">
          {/* Coffee Info Header */}
          <div className="flex items-center gap-4">
            {coffee.public_url && (
              <Image
                src={coffee.public_url}
                width={100}
                height={100}
                alt={`${coffee.brand?.value} ${coffee.variety?.value}`}
                className="w-20 h-20 rounded-xl object-cover"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">
                {coffee.brand?.value} - {coffee.variety?.value}
              </h1>
              {coffee.region && (
                <p className="text-muted-foreground mt-1">
                  {coffee.region}
                  {coffee.farm && `, ${coffee.farm}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preparations List */}
      <div className="py-4 space-y-4">
        <AnimatePresence>
          {preparations && preparations.length > 0 ? (
            preparations.map((preparation) => (
              <PreparationHistoryCard key={preparation.id} preparation={preparation} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No hay preparaciones registradas para este café
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
