import Image from "next/image";

interface CoffeeInfoProps {
  selectedCoffee?: any;
}

export function CoffeeInfo({ selectedCoffee }: CoffeeInfoProps) {
  return (
    <div className="border rounded p-4">
      <div className="flex gap-4">
        <div className="w-32 h-32 bg-muted rounded-xl flex items-center justify-center relative flex-shrink-0">
          {selectedCoffee?.image ? (
            <Image
              src={selectedCoffee.image}
              alt={selectedCoffee.brand}
              loading="lazy"
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-xl absolute inset-0"
            />
          ) : (
            <span className="text-xs">
              {selectedCoffee?.brand} {selectedCoffee?.variety}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-2xl">{selectedCoffee?.brand}</h3>
          <p className="text-muted-foreground text-lg">
            {" "}
            {selectedCoffee?.variety} - {selectedCoffee?.process}
          </p>

          <p className="text-sm text-muted-foreground">{selectedCoffee?.region}</p>
          <p className="text-sm text-muted-foreground">{selectedCoffee?.notes}</p>
        </div>
      </div>
    </div>
  );
}
