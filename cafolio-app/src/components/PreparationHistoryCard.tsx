"use client";

import { CoffeePreparation } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Star, Calendar, Edit, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useDeleteCoffeePreparation } from "@/hooks/useCoffeePreparations";
import { motion } from "framer-motion";
import Image from "next/image";

interface PreparationHistoryCardProps {
  preparation: CoffeePreparation;
}

export function PreparationHistoryCard({ preparation }: PreparationHistoryCardProps) {
  const { resolvedTheme } = useTheme();
  const deletePreparation = useDeleteCoffeePreparation();
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
    <motion.div
      layout
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Card className="w-full">
        <CardContent className="p-6">
        {/* Rating and Action Icons */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">{renderStars(Math.floor(preparation.ranking))}</div>
            <span className="font-bold text-xl text-foreground">{preparation.ranking}</span>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{formatDate(preparation.created_at)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-50" disabled>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar preparación</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AlertDialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:text-destructive" 
                        disabled={deletePreparation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar preparación</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Eliminar preparación</AlertDialogTitle>
                  <AlertDialogDescription>
                    ¿Estás seguro de que quieres eliminar esta preparación? Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deletePreparation.mutate({
                        id: preparation.id,
                        coffeeId: preparation.coffee_id
                      });
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={deletePreparation.isPending}
                  >
                    {deletePreparation.isPending ? "Eliminando..." : "Eliminar"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Method, Temperature, Ratio, Grind */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {preparation.method?.image_url && (
              <Image
                width={100}
                height={100}
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
    </motion.div>
  );
}
