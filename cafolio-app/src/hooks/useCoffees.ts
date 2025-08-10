import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeesService } from "@/services";
import { UpdateCoffeeRequest, CoffeeWithRating, Coffee } from "@/types/api";

export const useRecentCoffees = (limit?: number) => {
  return useQuery<CoffeeWithRating[]>({
    queryKey: ["coffees", "recent", limit],
    queryFn: () => coffeesService.getRecent(limit),
  });
};

export const useCoffeeById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["coffees", id],
    queryFn: () => coffeesService.getById(id),
    enabled: !!id && enabled,
  });
};

export const useCoffeesByUserId = () => {
  return useQuery({
    queryKey: ["coffees"],
    queryFn: () => coffeesService.getByUserId(),
  });
};

export const useCreateCoffee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffees"] });
    },
  });
};

export const useUpdateCoffee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCoffeeRequest }) =>
      coffeesService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["coffees", data.id] });
      queryClient.invalidateQueries({ queryKey: ["coffees", "user", data.user_id] });
      queryClient.invalidateQueries({ queryKey: ["coffees", "recent"] });
    },
  });
};

export const useDeleteCoffee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeesService.delete,
    onMutate: async (coffeeId) => {
      // Cancelar queries en progreso
      await queryClient.cancelQueries({ queryKey: ["coffees", "recent"] });
      await queryClient.cancelQueries({ queryKey: ["coffees"] });
      
      // Guardar datos previos
      const previousRecent = queryClient.getQueryData(["coffees", "recent", 3]);
      const previousAll = queryClient.getQueryData(["coffees"]);
      
      // Eliminar optimisticamente del cache (con limit específico)
      queryClient.setQueryData(["coffees", "recent", 3], (old: CoffeeWithRating[]) => 
        old?.filter(coffee => coffee.id !== coffeeId) || []
      );
      queryClient.setQueryData(["coffees"], (old: Coffee[]) => 
        old?.filter(coffee => coffee.id !== coffeeId) || []
      );
      
      return { previousRecent, previousAll };
    },
    onError: (err, coffeeId, context) => {
      // Revertir cambios si falla
      if (context?.previousRecent) {
        queryClient.setQueryData(["coffees", "recent", 3], context.previousRecent);
      }
      if (context?.previousAll) {
        queryClient.setQueryData(["coffees"], context.previousAll);
      }
    },
    onSuccess: (_, coffeeId) => {
      // Remover el café específico del cache
      queryClient.removeQueries({ queryKey: ["coffees", coffeeId] });
      queryClient.invalidateQueries({ queryKey: ["coffees"] });
      queryClient.invalidateQueries({ queryKey: ["coffees", "recent"] });
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations"] });
    },
  });
};
