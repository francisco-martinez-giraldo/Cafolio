import { Coffee } from "@/types/api";
import Image from "next/image";

interface CoffeeInfoProps {
  selectedCoffee?: Coffee;
}

export function CoffeeInfo({ selectedCoffee }: CoffeeInfoProps) {
  return (
    <div className="border rounded p-4">
      <div className="flex gap-4">
        <div className="w-32 h-32 bg-muted rounded-xl flex items-center justify-center relative flex-shrink-0">
          {selectedCoffee?.photo_path ? (
            <Image
              src={selectedCoffee.photo_path}
              alt={selectedCoffee.brand?.value ?? "Coffee Image"}
              loading="lazy"
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-xl absolute inset-0"
            />
          ) : (
            <span className="text-xs">
              {selectedCoffee?.brand?.value} {selectedCoffee?.variety?.value}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-2xl">{selectedCoffee?.brand?.value}</h3>
          <p className="text-muted-foreground text-lg">
            {" "}
            {selectedCoffee?.variety?.value} - {selectedCoffee?.process?.value}
          </p>

          <p className="text-sm text-muted-foreground">{selectedCoffee?.region}</p>
          <p className="text-sm text-muted-foreground">{selectedCoffee?.farm}</p>
        </div>
      </div>
    </div>
  );
}
