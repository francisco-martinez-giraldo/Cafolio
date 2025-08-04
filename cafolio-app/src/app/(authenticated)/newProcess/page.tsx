"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCoffeeById } from "@/hooks/useCoffees";
import { useCreateCoffeePreparation } from "@/hooks/useCoffeePreparations";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcessStep1 } from "@/components/ProcessSteps/ProcessStep1";
import { ProcessStep2 } from "@/components/ProcessSteps/ProcessStep2";
import { Coffee } from "@/types/api";

interface ProcessStepData {
  method?: string;
  temperature?: string;
  ratio?: string;
  grind?: string;
  rating?: number;
  notes?: string[];
  generalNotes?: string;
}

export default function NewProcessPage() {
  const [activeTab, setActiveTab] = useState("step1");
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [processData, setProcessData] = useState({
    method: "",
    temperature: "",
    ratio: "",
    grind: "",
    rating: 0,
    notes: [] as string[],
    generalNotes: "",
  });
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const coffeeId = searchParams.get("coffeeId");
  const { data: coffeeData } = useCoffeeById(coffeeId || "");

  useEffect(() => {
    if (coffeeData) {
      setSelectedCoffee(coffeeData);
    }
  }, [coffeeData]);

  const handleStep1Complete = (data: ProcessStepData) => {
    setProcessData((prev) => ({ ...prev, ...data }));
    setActiveTab("step2");
  };

  const router = useRouter();
  const createPreparation = useCreateCoffeePreparation();

  const handleStep2Change = (data: ProcessStepData) => {
    setProcessData((prev) => ({ ...prev, ...data }));
  };

  const handleStep2Complete = async (data: ProcessStepData) => {
    const finalData = { ...processData, ...data };

    if (!user?.email || !coffeeId) return;

    try {
      await createPreparation.mutateAsync({
        user_id: user.email,
        coffee_id: coffeeId,
        method_dictionary_id: finalData.method,
        temperature_dictionary_id: finalData.temperature,
        ratio_dictionary_id: finalData.ratio,
        grind_dictionary_id: finalData.grind,
        ranking: finalData.rating,
        notes: finalData.notes,
        comments: finalData.generalNotes,
      });

      router.push("/home");
    } catch (error) {
      console.error("Error saving preparation:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Nueva Preparación</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="step1">Preparación</TabsTrigger>
          <TabsTrigger value="step2" disabled={!processData.method}>
            Calificación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="step1" className="mt-6">
          <ProcessStep1
            onComplete={handleStep1Complete}
            selectedCoffee={selectedCoffee || undefined}
            initialData={processData}
          />
        </TabsContent>

        <TabsContent value="step2" className="mt-6">
          <ProcessStep2
            onComplete={handleStep2Complete}
            selectedCoffee={selectedCoffee || undefined}
            isLoading={createPreparation.isPending}
            initialData={processData}
            onChange={handleStep2Change}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
