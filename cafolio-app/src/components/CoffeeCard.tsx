import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Clock, Edit, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coffee } from "@/types/api";

export interface CoffeeCardProps {
  coffee: Coffee;
  overallRating: number;
}

export function CoffeeCard({ coffee, overallRating }: CoffeeCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const handleNewPreparation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coffee.id) {
      router.push(`/newProcess?coffeeId=${coffee.id}`);
    }
  };

  const handleViewHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coffee.id) {
      router.push(`/history/${coffee.id}`);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coffee.id) {
      router.push(`/newCoffee?edit=${coffee.id}`);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    // const totalStars = 5;

    // Estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    // Media estrella
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    // Estrellas vacías
    // const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    // for (let i = 0; i < emptyStars; i++) {
    //   stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    // }

    return stars;
  };

  return (
    <Card className="p-4 space-y-0">
      <div className="flex gap-6">
        <div className="w-32 h-32 bg-muted rounded-xl flex items-center justify-center relative flex-shrink-0">
          {coffee.photo_path && !imageError ? (
            <>
              {imageLoading && <Skeleton className="w-full h-full absolute inset-0 rounded-xl" />}
              <Image
                loading="lazy"
                src={coffee.photo_path}
                alt={`${coffee.brand?.value} ${coffee.variety?.value}`}
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-xl absolute inset-0"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
            </>
          ) : (
            <span className="text-sm text-muted-foreground text-center">
              {coffee.brand?.value} {coffee.variety?.value}
            </span>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-bold text-2xl">{coffee.brand?.value}</h3>
            <p className="text-muted-foreground text-lg">
              {coffee.variety?.value} {coffee.process?.value}
            </p>
          </div>
          <div className="flex gap-1">{overallRating > 0 && renderStars(overallRating)}</div>{" "}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="flex flex-col items-center gap-3 h-auto py-6  cursor-pointer rounded-2xl hover:bg-accent"
          onClick={handleNewPreparation}
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm font-medium">Agregar prep.</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center gap-3 h-auto py-6 cursor-pointer rounded-2xl bg-background hover:bg-accent"
          onClick={handleViewHistory}
        >
          <Clock className="w-6 h-6" />
          <span className="text-sm font-medium">Ver hist.</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center gap-3 h-auto py-6 cursor-pointer rounded-2xl bg-background hover:bg-accent"
          onClick={handleEdit}
        >
          <Edit className="w-6 h-6" />
          <span className="text-sm font-medium">Editar</span>
        </Button>
      </div>
    </Card>
  );
}
