import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeePreparationsService } from "@/services/coffee-preparations.service";
import { UpdateCoffeePreparationRequest } from "@/types/api";

export const useCoffeePreparationsByUserId = (coffeeId?: string) => {
  return useQuery({
    queryKey: ["coffee-preparations", "user", coffeeId],
    queryFn: () => coffeePreparationsService.getByUserId(coffeeId),
  });
};

export const useCoffeePreparationById = (id: string) => {
  return useQuery({
    queryKey: ["coffee-preparations", id],
    queryFn: () => coffeePreparationsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCoffeePreparation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeePreparationsService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations"] });
      queryClient.invalidateQueries({ queryKey: ["preparation-history", data.coffee_id] });
      queryClient.invalidateQueries({ queryKey: ["coffees", "recent"] });
    },
  });
};

export const useUpdateCoffeePreparation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, coffeeId }: { id: string; data: UpdateCoffeePreparationRequest; coffeeId: string }) =>
      coffeePreparationsService.update(id, data, coffeeId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations", data.id] });
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations", "user"] });
      queryClient.invalidateQueries({ queryKey: ["preparation-history", data.coffee_id] });
    },
  });
};

export const useDeleteCoffeePreparation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, coffeeId }: { id: string; coffeeId: string }) =>
      coffeePreparationsService.delete(id, coffeeId),
    onSuccess: (_, { coffeeId }) => {
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations"] });
      queryClient.invalidateQueries({ queryKey: ["preparation-history", coffeeId] });
    },
  });
};

// Export object for compatibility
export const useCoffeePreparations = {
  getByUserId: useCoffeePreparationsByUserId,
  getById: useCoffeePreparationById,
  create: useCreateCoffeePreparation,
  update: useUpdateCoffeePreparation,
  delete: useDeleteCoffeePreparation,
};