"use client";

import { Button } from "@/components/ui/button";
import { CoffeeCard } from "@/components/CoffeeCard";
import { CoffeeCardNew } from "@/components/CoffeeCardNew";
import { useRecentCoffees } from "@/hooks/useCoffees";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Título */}
      <motion.h1 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        Mis Cafés
      </motion.h1>

      {/* Grid de cafés */}
      <motion.div 
        className="grid grid-cols-1 gap-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {coffees?.map((coffee, index) => (
          <motion.div
            key={coffee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
          >
            <CoffeeCard coffee={coffee} overallRating={coffee.overall_rating || 0} />
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + (coffees?.length || 0) * 0.1, duration: 0.3 }}
        >
          <CoffeeCardNew />
        </motion.div>
      </motion.div>

      {/* Botón Ver más */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <Button className="cursor-pointer ">Ver más</Button>
      </motion.div>
    </motion.div>
  );
}
