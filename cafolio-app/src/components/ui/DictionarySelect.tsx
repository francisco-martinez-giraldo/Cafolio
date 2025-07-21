"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useDictionaryByType } from "@/hooks/useDictionary";
import { DictionaryType } from "@/types/api";

interface DictionarySelectProps {
  type: DictionaryType;
  label: string;
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

export function DictionarySelect({
  type,
  label,
  value,
  onValueChange,
  placeholder = "",
  error = false,
}: DictionarySelectProps) {
  const { data: items, isLoading } = useDictionaryByType(type);

  return (
    <div>
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <Select value={value} onValueChange={onValueChange} disabled={isLoading}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={isLoading ? "Cargando..." : placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
