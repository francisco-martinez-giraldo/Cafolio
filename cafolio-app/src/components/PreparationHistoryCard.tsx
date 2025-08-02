"use client";

import { CoffeePreparation } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar } from "lucide-react";
import { useTheme } from "next-themes";

interface PreparationHistoryCardProps {
  preparation: CoffeePreparation;
}

export function PreparationHistoryCard({ preparation }: PreparationHistoryCardProps) {
  const { resolvedTheme } = useTheme();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderNotes = (notes: string[] | null) => {
    if (!notes || notes.length === 0) {
      return <span className="text-sm text-muted-foreground">Sin notas</span>;
    }
    return (
      <div className="flex flex-wrap gap-2">
        {notes.map((note, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {note}
          </Badge>
        ))}
      </div>
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Rating and Date */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">{renderStars(Math.floor(preparation.ranking))}</div>
            <span className="font-bold text-xl text-foreground">{preparation.ranking}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(preparation.created_at)}
          </div>
        </div>

        {/* Method, Temperature, Ratio, Grind */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {preparation.method?.image_url && (
              <img
                src={preparation.method.image_url}
                alt={preparation.method.value}
                className={` w-8 h-8 rounded-lg object-cover ${
                  resolvedTheme === "dark" ? "brightness-0 invert" : ""
                }`}
              />
            )}
            <span className="font-semibold text-foreground">{preparation.method?.value}</span>
          </div>
          <span className="text-foreground font-medium">{preparation.temperature?.value}°C</span>
          <span className="text-foreground font-medium">{preparation.ratio?.value}</span>
          {preparation.grind?.value && (
            <span className="text-foreground font-medium">{preparation.grind.value}</span>
          )}
        </div>

        {/* Notes */}
        {preparation.notes && (
          <div className=" mb-3">
            <span className="text-sm text-muted-foreground">
              {renderNotes(preparation.notes as string[])}
            </span>
          </div>
        )}

        {/* Comments */}
        {preparation.comments && (
          <div>
            <span className="text-sm font-semibold text-foreground">Comentarios: </span>
            <span className="text-sm text-muted-foreground">{preparation.comments}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
