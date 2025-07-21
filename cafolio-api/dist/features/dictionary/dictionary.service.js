"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryService = void 0;
const supabase_1 = require("../../config/supabase");
/**
 * Service class for dictionary operations
 * Handles CRUD operations for the dictionary table in Supabase
 */
class DictionaryService {
    /**
     * Retrieves dictionary items by their type
     *
     * @param type - The type of dictionary items to retrieve (e.g., 'variety', 'method')
     * @returns A promise that resolves to an array of dictionary items
     * @throws Will throw an error if the database operation fails
     */
    async getByType(type) {
        const { data, error } = await supabase_1.supabase
            .from('dictionary')
            .select('*')
            .eq('type', type)
            .order('order_index', { ascending: true });
        if (error)
            throw error;
        return data || [];
    }
    /**
     * Retrieves all unique dictionary types available in the database
     *
     * @returns A promise that resolves to an array of unique type strings
     * @throws Will throw an error if the database operation fails
     */
    async getAllTypes() {
        const { data, error } = await supabase_1.supabase
            .from('dictionary')
            .select('type')
            .order('type');
        if (error)
            throw error;
        return [...new Set(data?.map(item => item.type) || [])];
    }
    /**
     * Creates a new dictionary item
     *
     * @param item - The dictionary item data to create
     * @returns A promise that resolves to the created dictionary item with its ID
     * @throws Will throw an error if the database operation fails
     */
    async createItem(item) {
        const { data, error } = await supabase_1.supabase
            .from('dictionary')
            .insert([item])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    /**
     * Updates an existing dictionary item
     *
     * @param id - The UUID of the dictionary item to update
     * @param updates - Partial object containing only the fields to update
     * @returns A promise that resolves to the updated dictionary item
     * @throws Will throw an error if the item doesn't exist or the operation fails
     */
    async updateItem(id, updates) {
        const { data, error } = await supabase_1.supabase
            .from('dictionary')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    /**
     * Deletes a dictionary item by its ID
     *
     * @param id - The UUID of the dictionary item to delete
     * @returns A promise that resolves when the item is deleted
     * @throws Will throw an error if the item doesn't exist or the operation fails
     */
    async deleteItem(id) {
        const { error } = await supabase_1.supabase
            .from('dictionary')
            .delete()
            .eq('id', id);
        if (error)
            throw error;
    }
}
exports.DictionaryService = DictionaryService;
//# sourceMappingURL=dictionary.service.js.map