"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { DictionarySelect } from "@/components/ui/DictionarySelect";
import { Camera } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  brand: z.string().min(1, "La marca es obligatoria"),
  variety: z.string().min(1, "La variedad es obligatoria"),
  process: z.string().min(1, "El proceso es obligatorio"),
  price: z.string().min(1, "El precio es obligatorio"),
  image: z.string().min(1, "La foto es obligatoria"),
  region: z.string().optional(),
  finca: z.string().optional(),
  notes: z.string().optional(),
});

export function CoffeeForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brand: "",
      variety: "",
      process: "",
      price: "",
      image: "",
      region: "",
      finca: "",
      notes: "",
    },
  });

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    return "$" + numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (value: string, onChange: (value: string) => void) => {
    const rawValue = value.replace(/[^\d]/g, "");
    const formattedValue = formatPrice(rawValue);
    onChange(formattedValue);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        form.setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Coffee data:", data);
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Sección de foto */}
        <FormField
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <FormItem>
              <Card>
                <CardContent className="p-6">
                  <div
                    onClick={handleImageClick}
                    className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      fieldState.error
                        ? "border-destructive hover:border-destructive/70"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50"
                    }`}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Agregar Foto</p>
                      </>
                    )}
                  </div>
                  <FormControl>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </FormControl>
                </CardContent>
              </Card>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Formulario */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <DictionarySelect
                    type="brand"
                    label=""
                    placeholder="Selecciona una marca"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="variety"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variedad</FormLabel>
                <FormControl>
                  <DictionarySelect
                    type="variety"
                    label=""
                    placeholder="Selecciona una variedad"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="process"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proceso</FormLabel>
                <FormControl>
                  <DictionarySelect
                    type="process"
                    label=""
                    placeholder="Selecciona un proceso"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="$0"
                    value={field.value}
                    onChange={(e) => handlePriceChange(e.target.value, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Región</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="finca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finca / Productor</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas</FormLabel>
                <FormControl>
                  <Textarea placeholder="Perfil, Tostión, Notas, etc." rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-6 cursor-pointer">
            Guardar Café
          </Button>
        </form>
      </div>
    </Form>
  );
}
