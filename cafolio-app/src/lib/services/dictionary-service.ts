import { supabase } from '../supabase';
import { DictionaryItem, CreateDictionaryRequest } from '../../types/api';

export class DictionaryService {
  async getByType(type: string): Promise<DictionaryItem[]> {
    const { data, error } = await supabase
      .from('dictionary')
      .select('*')
      .eq('type', type)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getAllTypes(): Promise<string[]> {
    const { data, error } = await supabase
      .from('dictionary')
      .select('type')
      .order('type');

    if (error) throw error;
    return [...new Set(data?.map(item => item.type) || [])];
  }

  async createItem(item: CreateDictionaryRequest): Promise<DictionaryItem> {
    const { data, error } = await supabase
      .from('dictionary')
      .insert([item])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateItem(id: string, updates: Partial<CreateDictionaryRequest>): Promise<DictionaryItem> {
    const { data, error } = await supabase
      .from('dictionary')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('dictionary')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}