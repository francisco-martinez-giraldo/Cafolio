import { supabase } from "../supabase";
import {
  Coffee,
  CreateCoffeeRequest,
  UpdateCoffeeRequest,
  CoffeeWithRating,
} from "../../types/api";

export class CoffeeService {
  async getByUserId(userId: string, limit?: number): Promise<Coffee[]> {
    let query = supabase
      .from("coffees")
      .select(
        `
        *,
        brand:dictionary!brand_dictionary_id(*),
        variety:dictionary!variety_dictionary_id(*),
        process:dictionary!process_dictionary_id(*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getById(id: string, userId: string): Promise<Coffee | null> {
    const { data, error } = await supabase
      .from("coffees")
      .select(
        `
        *,
        brand:dictionary!brand_dictionary_id(*),
        variety:dictionary!variety_dictionary_id(*),
        process:dictionary!process_dictionary_id(*)
      `
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  }

  async create(coffee: CreateCoffeeRequest): Promise<Coffee> {
    const { data, error } = await supabase.from("coffees").insert([coffee]).select().single();

    if (error) throw error;
    return data;
  }

  async update(id: string, userId: string, updates: UpdateCoffeeRequest): Promise<Coffee> {
    const { data, error } = await supabase
      .from("coffees")
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
      .from("coffees")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
  }

  async getRecent(userId: string, limit: number = 3): Promise<CoffeeWithRating[]> {
    const { data, error } = await supabase
      .from("coffees")
      .select(
        `
        *,
        brand:dictionary!brand_dictionary_id(*),
        variety:dictionary!variety_dictionary_id(*),
        process:dictionary!process_dictionary_id(*),
        coffee_preparations(ranking)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Calculate overall_rating for each coffee
    const coffeesWithRating = (data || []).map((coffee) => {
      const preparations = coffee.coffee_preparations || [];
      const overall_rating =
        preparations.length > 0
          ? preparations.reduce((sum: number, prep: { ranking: number }) => sum + prep.ranking, 0) /
            preparations.length
          : 0;

      return { ...coffee, overall_rating, coffee_preparations: undefined };
    });

    return coffeesWithRating;
  }
}
