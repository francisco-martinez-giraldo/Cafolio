import { supabase } from "../../config/supabase";
import { CoffeePreparation, CreateCoffeePreparationRequest, UpdateCoffeePreparationRequest } from "../../types";

export class CoffeePreparationsService {
  async getByUserId(userId: string, coffeeId?: string): Promise<CoffeePreparation[]> {
    let query = supabase
      .from("coffee_preparations")
      .select(
        `
        *,
        coffee:coffees(*),
        method:dictionary!method_dictionary_id(*),
        temperature:dictionary!temperature_dictionary_id(*),
        ratio:dictionary!ratio_dictionary_id(*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (coffeeId) {
      query = query.eq("coffee_id", coffeeId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getById(id: string, userId: string): Promise<CoffeePreparation | null> {
    const { data, error } = await supabase
      .from("coffee_preparations")
      .select(
        `
        *,
        coffee:coffees(*),
        method:dictionary!method_dictionary_id(*),
        temperature:dictionary!temperature_dictionary_id(*),
        ratio:dictionary!ratio_dictionary_id(*)
      `
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  }

  async create(preparation: CreateCoffeePreparationRequest): Promise<CoffeePreparation> {
    const { data, error } = await supabase
      .from("coffee_preparations")
      .insert([preparation])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, userId: string, updates: UpdateCoffeePreparationRequest): Promise<CoffeePreparation> {
    const { data, error } = await supabase
      .from("coffee_preparations")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("coffee_preparations")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
  }
}