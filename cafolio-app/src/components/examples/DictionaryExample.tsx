'use client';

import { useDictionaryByType, useCreateDictionary } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function DictionaryExample() {
  const { data: brands, isLoading } = useDictionaryByType('brand');
  const createDictionary = useCreateDictionary();

  const handleCreateBrand = () => {
    createDictionary.mutate({
      type: 'brand',
      value: 'Nueva Marca',
      order_index: 1
    });
  };

  if (isLoading) return <div>Cargando marcas...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marcas</h2>
        <Button 
          onClick={handleCreateBrand}
          disabled={createDictionary.isPending}
        >
          {createDictionary.isPending ? 'Creando...' : 'Agregar Marca'}
        </Button>
      </div>
      
      <div className="grid gap-2">
        {brands?.map((brand) => (
          <Card key={brand.id} className="p-3">
            <span>{brand.value}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}