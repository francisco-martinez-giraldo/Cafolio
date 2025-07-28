"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CoffeeInfo } from "@/components/CoffeeInfo";
import { Coffee } from "@/types/api";

interface ProcessStep2Data {
  rating: number;
  notes: string[];
  generalNotes: string;
}

interface ProcessStep2Props {
  onComplete: (data: ProcessStep2Data) => void;
  selectedCoffee?: Coffee;
  isLoading?: boolean;
  initialData?: Partial<ProcessStep2Data>;
  onChange?: (data: Partial<ProcessStep2Data>) => void;
}

const noteOptions = [
  "Dulce",
  "Ácido",
  "Amargo",
  "Frutal",
  "Floral",
  "Chocolate",
  "Caramelo",
  "Nuez",
  "Especias",
  "Cítrico",
  "Vainilla",
  "Tostado",
];

export function ProcessStep2({
  onComplete,
  selectedCoffee,
  isLoading,
  initialData,
  onChange,
}: ProcessStep2Props) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [selectedNotes, setSelectedNotes] = useState<string[]>(initialData?.notes || []);
  const [generalNotes, setGeneralNotes] = useState(initialData?.generalNotes || "");

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating || 0);
      setSelectedNotes(initialData.notes || []);
      setGeneralNotes(initialData.generalNotes || "");
    }
  }, [initialData]);

  const handleNoteToggle = (note: string) => {
    const newNotes = selectedNotes.includes(note)
      ? selectedNotes.filter((n) => n !== note)
      : [...selectedNotes, note];
    setSelectedNotes(newNotes);
    onChange?.({ rating, notes: newNotes, generalNotes });
  };

  const handleSubmit = () => {
    onComplete({
      rating,
      notes: selectedNotes,
      generalNotes,
    });
  };

  return (
    <div className="space-y-4">
      <CoffeeInfo selectedCoffee={selectedCoffee} />

      {/* Preparación (Calificación) */}
      <div>
        <h3 className="text-sm font-medium mb-3">Calificación</h3>
        <div className="text-center mb-2">
          <span className="text-2xl font-bold">{rating}</span>
        </div>
        <div className="flex gap-1 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="relative">
              <button
                onClick={() => {
                  const newRating = star - 0.5;
                  setRating(newRating);
                  onChange?.({ rating: newRating, notes: selectedNotes, generalNotes });
                }}
                className="absolute left-0 w-1/2 h-full z-10"
              />
              <button
                onClick={() => {
                  setRating(star);
                  onChange?.({ rating: star, notes: selectedNotes, generalNotes });
                }}
                className="absolute right-0 w-1/2 h-full z-10"
              />
              <Star
                className={cn(
                  "w-8 h-8 transition-colors pointer-events-none",
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : star - 0.5 <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                )}
                style={{
                  background:
                    star - 0.5 <= rating && star > rating
                      ? "linear-gradient(90deg, #facc15 50%, transparent 50%)"
                      : undefined,
                  WebkitBackgroundClip: star - 0.5 <= rating && star > rating ? "text" : undefined,
                  WebkitTextFillColor:
                    star - 0.5 <= rating && star > rating ? "transparent" : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notas tipo chips */}
      <div>
        <h3 className="text-sm font-medium mb-3">Notas:</h3>
        <div className="flex flex-wrap gap-2">
          {noteOptions.map((note) => (
            <Badge
              key={note}
              variant={selectedNotes.includes(note) ? "default" : "outline"}
              className="cursor-pointer text-xs px-2 py-1"
              onClick={() => handleNoteToggle(note)}
            >
              {note}
            </Badge>
          ))}
        </div>
      </div>

      {/* Notas generales */}
      <div>
        <h3 className="text-sm font-medium mb-3">Comentarios:</h3>
        <Textarea
          placeholder="Escribe tus notas generales aquí..."
          value={generalNotes}
          onChange={(e) => {
            const newValue = e.target.value;
            setGeneralNotes(newValue);
            onChange?.({ rating, notes: selectedNotes, generalNotes: newValue });
          }}
          rows={4}
          className="text-sm"
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full cursor-pointer"
        disabled={rating === 0 || isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </Button>
    </div>
  );
}
