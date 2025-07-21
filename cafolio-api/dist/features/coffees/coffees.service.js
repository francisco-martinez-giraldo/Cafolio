"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const supabase_1 = require("../../config/supabase");
class CoffeesService {
    async getByUserId(userId, limit) {
        let query = supabase_1.supabase
            .from("coffees")
            .select(`
        id,
        brand:dictionary!brand_dictionary_id(id, , value, image_url,order_index),
        variety:dictionary!variety_dictionary_id(id, value, image_url,order_index),
        process:dictionary!process_dictionary_id(id,  value, image_url,order_index)
      `)
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
        if (limit) {
            query = query.limit(limit);
        }
        const { data, error } = await query;
        if (error)
            throw error;
        return data || [];
    }
    async getById(id, userId) {
        const { data, error } = await supabase_1.supabase
            .from("coffees")
            .select(`
         *,
        brand:dictionary!brand_dictionary_id(id, , value, image_url,order_index),
        variety:dictionary!variety_dictionary_id(id, value, image_url,order_index),
        process:dictionary!process_dictionary_id(id,  value, image_url,order_index)
      `)
            .eq("id", id)
            .eq("user_id", userId)
            .single();
        if (error)
            throw error;
        return data;
    }
    async create(coffee) {
        const { data, error } = await supabase_1.supabase.from("coffees").insert([coffee]).select().single();
        if (error)
            throw error;
        return data;
    }
    async update(id, userId, updates) {
        const { data, error } = await supabase_1.supabase
            .from("coffees")
            .update(updates)
            .eq("id", id)
            .eq("user_id", userId)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async delete(id, userId) {
        const { error } = await supabase_1.supabase.from("coffees").delete().eq("id", id).eq("user_id", userId);
        if (error)
            throw error;
    }
    async getRecent(userId, limit = 3) {
        return this.getByUserId(userId, limit);
    }
}
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map