import { Button } from "@/components/ui/button";
import { CoffeeCard, CoffeeCardProps } from "@/components/CoffeeCard";
import { CoffeeCardNew } from "@/components/CoffeeCardNew";

const coffees: CoffeeCardProps[] = [
  {
    brand: "MARCA",
    variety: "VARIEDAD",
    overallRating: 5,
    imageUrl: "https://puristcafe.co/cdn/shop/files/IMG-0084.heic?v=1752784565",
  },
  {
    brand: "MARCA",
    variety: "VARIEDAD",
    overallRating: 4,
    imageUrl: "https://differentecoffee.com/wp-content/uploads/2025/05/FRUTTI-TUTTI-300x300.jpeg",
  },
  {
    brand: "MARCA",
    variety: "VARIEDAD",
    overallRating: 4,
    imageUrl:
      "https://differentecoffee.com/wp-content/uploads/2025/02/banner-producto-combo-differente-coffee-x2-600x600.webp",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header con logo */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs">Cafolio</span>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xs">⚙️</span>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold mb-6">Tus Cafés</h1>

        {/* Grid de cafés */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {coffees.map((coffee, index) => (
            <CoffeeCard
              key={index}
              brand={coffee.brand}
              variety={coffee.variety}
              overallRating={coffee.overallRating}
              imageUrl={coffee.imageUrl}
            />
          ))}
          <CoffeeCardNew />
        </div>

        {/* Botón Ver más */}
        <div className="text-center">
          <Button>Ver más</Button>
        </div>
      </div>
    </div>
  );
}
