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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations"] });
      queryClient.invalidateQueries({ queryKey: ["coffees", "recent"] });
    },
  });
};

export const useUpdateCoffeePreparation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCoffeePreparationRequest }) =>
      coffeePreparationsService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations", data.id] });
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations", "user"] });
    },
  });
};

export const useDeleteCoffeePreparation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeePreparationsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffee-preparations"] });
    },
  });
};