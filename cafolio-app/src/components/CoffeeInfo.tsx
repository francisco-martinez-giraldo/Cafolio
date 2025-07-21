import Image from "next/image";

interface CoffeeInfoProps {
  selectedCoffee?: any;
}

export function CoffeeInfo({ selectedCoffee }: CoffeeInfoProps) {
  return (
    <div className="border rounded p-4">
      <div className="flex gap-4">
        <div className="w-32 h-40 border rounded flex items-center justify-center overflow-hidden relative">
          {selectedCoffee?.image ? (
            <Image
              src={selectedCoffee.image}
              alt={selectedCoffee.brand}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-xs">
              {selectedCoffee?.brand} {selectedCoffee?.variety}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-2xl">{selectedCoffee?.brand}</h3>
          <p className="text-lm text-muted-foreground">
            {selectedCoffee?.variety} - {selectedCoffee?.process}
          </p>
          <p className="text-sm text-muted-foreground">{selectedCoffee?.region}</p>
          <p className="text-sm text-muted-foreground">{selectedCoffee?.notes}</p>
        </div>
      </div>
    </div>
  );
}