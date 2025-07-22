import { useDictionaryByType } from "@/hooks/useDictionary";
import { DictionaryType } from "@/types/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import Image from "next/image";
import { Button } from "./ui/button";

interface ProcessSelectorProps {
  type: DictionaryType;
  label: string;
  value: string;
  isScrollable?: boolean;
  onValueChange: (value: string) => void;
}

export function DictionarySelector({
  type,
  label,
  value,
  onValueChange,
  isScrollable = false,
}: ProcessSelectorProps) {
  const { data: items, isLoading } = useDictionaryByType(type);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  if (isLoading) return <div className="text-xs">Cargando...</div>;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="relative">
        {isScrollable && (
          <Button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background border rounded p-1 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          className={`flex gap-2 ${isScrollable ? "overflow-x-auto scrollbar-hide px-8" : ""}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          ref={scrollRef}
        >
          {items?.map((item) => (
            <div key={item.id} className="flex-1">
              <RadioGroupItem value={item.id} id={item.id} className="sr-only" />
              <Label
                htmlFor={item.id}
                className={`cursor-pointer flex flex-col items-center justify-center gap-1 p-2 border rounded text-center w-full ${
                  item.image_url ? "h-16" : "h-auto"
                } ${
                  value === item.id
                    ? "bg-primary text-primary-foreground border-accent"
                    : "bg-background border-border hover:bg-accent"
                }`}
              >
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.value}
                    width={24}
                    height={24}
                    className={`rounded ${
                      resolvedTheme === "dark" || value === item.id ? "brightness-0 invert" : ""
                    }`}
                  />
                ) : null}
                <span className="text-xs">{item.value}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {isScrollable && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background border rounded p-1 shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
