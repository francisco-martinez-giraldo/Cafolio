import { apiClient } from "@/lib/api";
import { CoffeePreparation, CreateCoffeePreparationRequest, UpdateCoffeePreparationRequest } from "@/types/api";

export const coffeePreparationsService = {
  getByUserId: async (coffeeId?: string): Promise<CoffeePreparation[]> => {
    const endpoint = coffeeId ? `/api/coffees/${coffeeId}/preparations` : `/api/coffee-preparations`;
    const { data } = await apiClient.get(endpoint);
    return data;
  },

  getById: async (id: string): Promise<CoffeePreparation> => {
    const { data } = await apiClient.get(`/api/coffee-preparations/${id}`);
    return data;
  },

  create: async (preparation: CreateCoffeePreparationRequest): Promise<CoffeePreparation> => {
    const { data } = await apiClient.post(`/api/coffees/${preparation.coffee_id}/preparations`, preparation);
    return data;
  },

  update: async (id: string, preparation: UpdateCoffeePreparationRequest, coffeeId: string): Promise<CoffeePreparation> => {
    const { data } = await apiClient.put(`/api/coffees/${coffeeId}/preparations/${id}`, preparation);
    return data;
  },

  delete: async (id: string, coffeeId: string): Promise<void> => {
    await apiClient.delete(`/api/coffees/${coffeeId}/preparations/${id}`);
  },

  getHistoryByCoffeeId: async (coffeeId: string): Promise<CoffeePreparation[]> => {
    const { data } = await apiClient.get(`/api/coffee-preparations/history/${coffeeId}`);
    return data;
  },
};