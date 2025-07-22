import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface CoffeeCardProps {
  id?: string;
  brand: string;
  variety: string;
  overallRating: number;
  imageUrl?: string;
}

export function CoffeeCard({ id, brand, variety, overallRating, imageUrl }: CoffeeCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    if (id) {
      router.push(`/newProcess?coffeeId=${id}`);
    }
  };

  return (
    <Card className="p-3 cursor-pointer hover:bg-accent/50 transition-colors" onClick={handleClick}>
      <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center relative">
        {imageUrl ? (
          <>
            {imageLoading && <Skeleton className="w-full h-full absolute inset-0" />}
            <Image
              loading="lazy"
              src={imageUrl}
              alt={`${brand} ${variety}`}
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-md absolute inset-0"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </>
        ) : (
          <span className="text-xs text-muted-foreground">
            {brand} {variety}
          </span>
        )}
        {overallRating && overallRating > 0 && (
          <div className="absolute bottom-1 right-1 bg-gray-200 text-black text-sm px-2 py-1 rounded">
            ⭐{overallRating}
          </div>
        )}
      </div>
    </Card>
  );
}
