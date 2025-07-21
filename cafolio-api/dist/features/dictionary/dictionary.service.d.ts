import { DictionaryItem, CreateDictionaryRequest } from '../../types';
/**
 * Service class for dictionary operations
 * Handles CRUD operations for the dictionary table in Supabase
 */
export declare class DictionaryService {
    /**
     * Retrieves dictionary items by their type
     *
     * @param type - The type of dictionary items to retrieve (e.g., 'variety', 'method')
     * @returns A promise that resolves to an array of dictionary items
     * @throws Will throw an error if the database operation fails
     */
    getByType(type: string): Promise<DictionaryItem[]>;
    /**
     * Retrieves all unique dictionary types available in the database
     *
     * @returns A promise that resolves to an array of unique type strings
     * @throws Will throw an error if the database operation fails
     */
    getAllTypes(): Promise<string[]>;
    /**
     * Creates a new dictionary item
     *
     * @param item - The dictionary item data to create
     * @returns A promise that resolves to the created dictionary item with its ID
     * @throws Will throw an error if the database operation fails
     */
    createItem(item: CreateDictionaryRequest): Promise<DictionaryItem>;
    /**
     * Updates an existing dictionary item
     *
     * @param id - The UUID of the dictionary item to update
     * @param updates - Partial object containing only the fields to update
     * @returns A promise that resolves to the updated dictionary item
     * @throws Will throw an error if the item doesn't exist or the operation fails
     */
    updateItem(id: string, updates: Partial<CreateDictionaryRequest>): Promise<DictionaryItem>;
    /**
     * Deletes a dictionary item by its ID
     *
     * @param id - The UUID of the dictionary item to delete
     * @returns A promise that resolves when the item is deleted
     * @throws Will throw an error if the item doesn't exist or the operation fails
     */
    deleteItem(id: string): Promise<void>;
}
//# sourceMappingURL=dictionary.service.d.ts.map