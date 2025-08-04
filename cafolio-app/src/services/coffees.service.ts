import { apiClient } from "@/lib/api";
import { Coffee, CreateCoffeeRequest, UpdateCoffeeRequest, CoffeeWithRating } from "@/types/api";

export const coffeesService = {
  getRecent: async (limit?: number): Promise<CoffeeWithRating[]> => {
    const params = limit ? `?limit=${limit}` : "";
    const { data } = await apiClient.get(`/api/coffees/recent${params}`);
    return data;
  },

  getById: async (id: string): Promise<Coffee> => {
    const { data } = await apiClient.get(`/api/coffees/${id}`);
    return data;
  },

  getByUserId: async (): Promise<Coffee[]> => {
    const { data } = await apiClient.get(`/api/coffees`);
    return data;
  },

  create: async (coffee: CreateCoffeeRequest | FormData): Promise<Coffee> => {
    try {
      const config = coffee instanceof FormData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : {};
      
      const { data } = await apiClient.post("/api/coffees", coffee, config);
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Coffee creation error:', errorMessage);
      throw error;
    }
  },

  update: async (id: string, coffee: UpdateCoffeeRequest): Promise<Coffee> => {
    const { data } = await apiClient.put(`/api/coffees/${id}`, coffee);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/coffees/${id}`);
  },
};
