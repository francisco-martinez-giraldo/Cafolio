'use client';

import { useRecentCoffees, useCreateCoffee } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CoffeeExample() {
  const { data: coffees, isLoading, error } = useRecentCoffees();
  const createCoffee = useCreateCoffee();

  const handleCreateCoffee = () => {
    createCoffee.mutate({
      user_id: 'user-123',
      brand_dictionary_id: 'brand-1',
      variety_dictionary_id: 'variety-1',
      process_dictionary_id: 'process-1',
      photo_path: '/photos/coffee.jpg',
      region: 'Colombia',
      farm: 'Finca El Paraíso',
      price: 25.99,
      notes: 'Notas de chocolate y caramelo'
    });
  };

  if (isLoading) return <div>Cargando cafés...</div>;
  if (error) return <div>Error al cargar cafés</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cafés Recientes</h2>
        <Button 
          onClick={handleCreateCoffee}
          disabled={createCoffee.isPending}
        >
          {createCoffee.isPending ? 'Creando...' : 'Agregar Café'}
        </Button>
      </div>
      
      <div className="grid gap-4">
        {coffees?.map((coffee) => (
          <Card key={coffee.id} className="p-4">
            <h3 className="font-semibold">{coffee.region}</h3>
            <p className="text-sm text-gray-600">{coffee.farm}</p>
            <p className="text-sm">{coffee.notes}</p>
            <p className="font-bold">${coffee.price}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}