import { supabase } from '../../config/supabase';
import { Coffee, CreateCoffeeRequest, UpdateCoffeeRequest } from '../../types';

export class CoffeesService {
  async getByUserId(userId: string, limit?: number): Promise<Coffee[]> {
    let query = supabase
      .from('coffees')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getById(id: string, userId: string): Promise<Coffee | null> {
    const { data, error } = await supabase
      .from('coffees')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async create(coffee: CreateCoffeeRequest): Promise<Coffee> {
    const { data, error } = await supabase
      .from('coffees')
      .insert([coffee])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, userId: string, updates: UpdateCoffeeRequest): Promise<Coffee> {
    const { data, error } = await supabase
      .from('coffees')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('coffees')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }

  async getRecent(userId: string, limit: number = 3): Promise<Coffee[]> {
    return this.getByUserId(userId, limit);
  }
}