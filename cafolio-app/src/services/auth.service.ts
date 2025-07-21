import { apiClient } from '@/lib/api';

export interface LoginResponse {
  message: string;
  data: {
    user: {
      email: string;
      id: string;
    };
  };
}

export const authService = {
  login: async (email: string): Promise<LoginResponse> => {
    const { data } = await apiClient.post('/api/auth/login', { email });
    return data;
  },
};