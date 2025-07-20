import { Card } from "@/components/ui/card";

export interface CoffeeCardProps {
  brand: string;
  variety: string;
  overallRating: number;
  imageUrl?: string;
}

export function CoffeeCard({ brand, variety, overallRating, imageUrl }: CoffeeCardProps) {
  return (
    <Card className="p-3 cursor-pointer hover:bg-accent/50 transition-colors">
      <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${brand} ${variety}`}
            className="w-full h-full object-cover rounded-md absolute inset-0"
          />
        ) : (
          <span className="text-xs text-muted-foreground">
            {brand} {variety}
          </span>
        )}
        <div className="absolute bottom-1 right-1 bg-gray-200 text-black text-sm px-2 py-1 rounded">
          ⭐{overallRating}
        </div>
      </div>
    </Card>
  );
}
