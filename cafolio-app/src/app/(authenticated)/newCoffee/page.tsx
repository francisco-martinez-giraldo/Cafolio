"use client";

import { CoffeeForm } from "@/components/CoffeeForm";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function NewCoffeePage() {
  const searchParams = useSearchParams();
  const isEditing = !!searchParams.get('edit');
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {isEditing ? 'Editar Café' : 'Nuevo Café'}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <CoffeeForm />
      </motion.div>
    </motion.div>
  );
}