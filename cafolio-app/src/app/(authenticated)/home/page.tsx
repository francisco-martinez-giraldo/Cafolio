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
    <>
      {/* Título */}
      <h1 className="text-2xl font-bold mb-6">Mis Cafés</h1>

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
    </>
  );
}
