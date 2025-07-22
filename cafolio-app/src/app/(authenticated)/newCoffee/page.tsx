"use client";

import { CoffeeForm } from "@/components/CoffeeForm";
import { useSearchParams } from "next/navigation";

export default function NewCoffeePage() {
  const searchParams = useSearchParams();
  const isEditing = !!searchParams.get('edit');
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Editar Café' : 'Nuevo Café'}</h1>
      <CoffeeForm />
    </>
  );
}