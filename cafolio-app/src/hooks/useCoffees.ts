import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeesService } from "@/services";
import { CreateCoffeeRequest, UpdateCoffeeRequest } from "@/types/api";

export const useRecentCoffees = (limit?: number) => {
  return useQuery({
    queryKey: ["coffees", "recent", limit],
    queryFn: () => coffeesService.getRecent(limit),
  });
};

export const useCoffeeById = (id: string) => {
  return useQuery({
    queryKey: ["coffees", id],
    queryFn: () => coffeesService.getById(id),
    enabled: !!id,
  });
};

export const useCoffeesByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["coffees", "user", userId],
    queryFn: () => coffeesService.getByUserId(userId),
    enabled: !!userId,
  });
};

export const useCreateCoffee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeesService.create,
    onSuccess: (data) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffees"] });
    },
  });
};
