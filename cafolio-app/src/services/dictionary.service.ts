import { apiClient } from '@/lib/api';
import { DictionaryItem, CreateDictionaryRequest, DictionaryType } from '@/types/api';

export const dictionaryService = {
  getByType: async (type: DictionaryType): Promise<DictionaryItem[]> => {
    const { data } = await apiClient.get(`/api/dictionary/${type}`);
    return data;
  },

  getAllTypes: async (): Promise<string[]> => {
    const { data } = await apiClient.get('/api/dictionary/types');
    return data;
  },

  create: async (item: CreateDictionaryRequest): Promise<DictionaryItem> => {
    const { data } = await apiClient.post('/api/dictionary', item);
    return data;
  },

  update: async (id: string, item: Partial<CreateDictionaryRequest>): Promise<DictionaryItem> => {
    const { data } = await apiClient.put(`/api/dictionary/${id}`, item);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/dictionary/${id}`);
  },
};