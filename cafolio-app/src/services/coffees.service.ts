import { apiClient } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { Coffee, CreateCoffeeRequest, UpdateCoffeeRequest, CoffeeWithRating } from "@/types/api";

export const coffeesService = {
  getRecent: async (limit?: number): Promise<CoffeeWithRating[]> => {
    const user = getUser();
    const userEmail = user?.email || "";
    const limitParam = limit ? `&limit=${limit}` : "";
    const { data } = await apiClient.get(`/api/coffees/recent?user_id=${userEmail}${limitParam}`);
    return data;
  },

  getById: async (id: string): Promise<Coffee> => {
    const user = getUser();
    const userEmail = user?.email || "";
    const { data } = await apiClient.get(`/api/coffees/${id}?user_id=${userEmail}`);
    return data;
  },

  getByUserId: async (userId: string): Promise<Coffee[]> => {
    const { data } = await apiClient.get(`/api/coffees?user_id=${userId}`);
    return data;
  },

  create: async (coffee: CreateCoffeeRequest): Promise<Coffee> => {
    const { data } = await apiClient.post("/api/coffees", coffee);
    return data;
  },

  update: async (id: string, coffee: UpdateCoffeeRequest): Promise<Coffee> => {
    const user = getUser();
    const userEmail = user?.email || "";
    const { data } = await apiClient.put(`/api/coffees/${id}?user_id=${userEmail}`, coffee);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/coffees/${id}`);
  },
};
