"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CoffeeInfo } from "@/components/CoffeeInfo";
import { DictionarySelector } from "../DictionarySelector";
import { Coffee } from "@/types/api";

interface ProcessStep1Data {
  method: string;
  temperature: string;
  ratio: string;
  grind: string;
}

interface ProcessStep1Props {
  onComplete: (data: ProcessStep1Data) => void;
  selectedCoffee?: Coffee;
  initialData?: Partial<ProcessStep1Data>;
}

export function ProcessStep1({ onComplete, selectedCoffee, initialData }: ProcessStep1Props) {
  const [formData, setFormData] = useState({
    method: initialData?.method || "",
    temperature: initialData?.temperature || "",
    ratio: initialData?.ratio || "",
    grind: initialData?.grind || "",
  });

  const handleSubmit = () => {
    if (formData.method && formData.temperature && formData.ratio && formData.grind) {
      onComplete(formData);
    }
  };

  const isComplete = formData.method && formData.temperature && formData.ratio && formData.grind;

  return (
    <div className="space-y-4">
      <CoffeeInfo selectedCoffee={selectedCoffee} />

      <DictionarySelector
        type="method"
        label="Método"
        value={formData.method}
        onValueChange={(value) => setFormData((prev) => ({ ...prev, method: value }))}
      />

      <DictionarySelector
        type="temperature"
        label="Temperatura"
        value={formData.temperature}
        onValueChange={(value) => setFormData((prev) => ({ ...prev, temperature: value }))}
      />

      <DictionarySelector
        type="ratio"
        label="Ratio"
        value={formData.ratio}
        onValueChange={(value) => setFormData((prev) => ({ ...prev, ratio: value }))}
      />

      <DictionarySelector
        type="grind"
        label="Molienda"
        value={formData.grind}
        onValueChange={(value) => setFormData((prev) => ({ ...prev, grind: value }))}
      />

      <div className="border-t pt-4">
        <Button onClick={handleSubmit} className="w-full cursor-pointer" disabled={!isComplete}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
