import { apiClient } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { CoffeePreparation, CreateCoffeePreparationRequest, UpdateCoffeePreparationRequest } from "@/types/api";

export const coffeePreparationsService = {
  getByUserId: async (coffeeId?: string): Promise<CoffeePreparation[]> => {
    const user = getUser();
    const userEmail = user?.email || "";
    const coffeeParam = coffeeId ? `&coffee_id=${coffeeId}` : "";
    const { data } = await apiClient.get(`/api/coffee-preparations?user_id=${userEmail}${coffeeParam}`);
    return data;
  },

  getById: async (id: string): Promise<CoffeePreparation> => {
    const user = getUser();
    const userEmail = user?.email || "";
    const { data } = await apiClient.get(`/api/coffee-preparations/${id}?user_id=${userEmail}`);
    return data;
  },

  create: async (preparation: CreateCoffeePreparationRequest): Promise<CoffeePreparation> => {
    const { data } = await apiClient.post("/api/coffee-preparations", preparation);
    return data;
  },

  update: async (id: string, preparation: UpdateCoffeePreparationRequest): Promise<CoffeePreparation> => {
    const user = getUser();
    const userEmail = user?.email || "";
    const { data } = await apiClient.put(`/api/coffee-preparations/${id}?user_id=${userEmail}`, preparation);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    const user = getUser();
    const userEmail = user?.email || "";
    await apiClient.delete(`/api/coffee-preparations/${id}?user_id=${userEmail}`);
  },

  getHistoryByCoffeeId: async (coffeeId: string, userId: string): Promise<CoffeePreparation[]> => {
    const { data } = await apiClient.get(`/api/coffee-preparations/history/${coffeeId}?user_id=${userId}`);
    return data;
  },
};