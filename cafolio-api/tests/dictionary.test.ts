import { DictionaryService } from '../src/features/dictionary/dictionary.service';
import { DictionaryItem, CreateDictionaryRequest } from '../src/types';

// Mock Supabase
jest.mock('../src/config/supabase', () => {
  const mockChain: any = {
    from: jest.fn(() => mockChain),
    select: jest.fn(() => mockChain),
    eq: jest.fn(() => mockChain),
    order: jest.fn(() => mockChain),
    insert: jest.fn(() => mockChain),
    update: jest.fn(() => mockChain),
    delete: jest.fn(() => mockChain),
    single: jest.fn(() => mockChain),
    data: null,
    error: null
  };
  
  return {
    supabase: mockChain
  };
});

// Get the mocked supabase instance
const { supabase: mockSupabase } = require('../src/config/supabase');

describe('DictionaryService', () => {
  let dictionaryService: DictionaryService;
  const mockItems: DictionaryItem[] = [
    { id: '1', type: 'variety', value: 'Bourbon', order_index: 0, created_at: '2023-01-01' },
    { id: '2', type: 'variety', value: 'Caturra', order_index: 1, created_at: '2023-01-02' }
  ];

  beforeEach(() => {
    dictionaryService = new DictionaryService();
    jest.clearAllMocks();
  });

  describe('getByType', () => {
    it('should return items by type successfully', async () => {
      mockSupabase.data = mockItems;
      mockSupabase.error = null;

      const result = await dictionaryService.getByType('variety');

      expect(mockSupabase.from).toHaveBeenCalledWith('dictionary');
      expect(mockSupabase.select).toHaveBeenCalledWith('*');
      expect(mockSupabase.eq).toHaveBeenCalledWith('type', 'variety');
      expect(mockSupabase.order).toHaveBeenCalledWith('order_index', { ascending: true });
      expect(result).toEqual(mockItems);
    });

    it('should return empty array when no data', async () => {
      mockSupabase.data = null;
      mockSupabase.error = null;

      const result = await dictionaryService.getByType('variety');

      expect(result).toEqual([]);
    });

    it('should throw error when database operation fails', async () => {
      mockSupabase.error = new Error('Database error');

      await expect(dictionaryService.getByType('variety')).rejects.toThrow('Database error');
    });
  });

  describe('getAllTypes', () => {
    it('should return unique types successfully', async () => {
      mockSupabase.data = [
        { type: 'variety' },
        { type: 'method' },
        { type: 'variety' },
        { type: 'process' }
      ];
      mockSupabase.error = null;

      const result = await dictionaryService.getAllTypes();

      expect(mockSupabase.from).toHaveBeenCalledWith('dictionary');
      expect(mockSupabase.select).toHaveBeenCalledWith('type');
      expect(mockSupabase.order).toHaveBeenCalledWith('type');
      expect(result).toEqual(['variety', 'method', 'process']);
    });

    it('should return empty array when no data', async () => {
      mockSupabase.data = null;
      mockSupabase.error = null;

      const result = await dictionaryService.getAllTypes();

      expect(result).toEqual([]);
    });

    it('should throw error when database operation fails', async () => {
      mockSupabase.error = new Error('Database error');

      await expect(dictionaryService.getAllTypes()).rejects.toThrow('Database error');
    });
  });

  describe('createItem', () => {
    const newItem: CreateDictionaryRequest = {
      type: 'variety',
      value: 'Geisha',
      image_url: 'https://example.com/geisha.jpg',
      order_index: 2
    };

    const createdItem: DictionaryItem = {
      id: '3',
      type: newItem.type,
      value: newItem.value,
      image_url: newItem.image_url,
      order_index: newItem.order_index || 0,
      created_at: '2023-01-03'
    };

    it('should create item successfully', async () => {
      mockSupabase.data = createdItem;
      mockSupabase.error = null;

      const result = await dictionaryService.createItem(newItem);

      expect(mockSupabase.from).toHaveBeenCalledWith('dictionary');
      expect(mockSupabase.insert).toHaveBeenCalledWith([newItem]);
      expect(mockSupabase.select).toHaveBeenCalled();
      expect(mockSupabase.single).toHaveBeenCalled();
      expect(result).toEqual(createdItem);
    });

    it('should throw error when creation fails', async () => {
      mockSupabase.error = new Error('Creation failed');

      await expect(dictionaryService.createItem(newItem)).rejects.toThrow('Creation failed');
    });
  });

  describe('updateItem', () => {
    const updates = { value: 'Updated Bourbon', order_index: 5 };
    const updatedItem: DictionaryItem = {
      id: '1',
      type: 'variety',
      value: 'Updated Bourbon',
      order_index: 5,
      created_at: '2023-01-01'
    };

    it('should update item successfully', async () => {
      mockSupabase.data = updatedItem;
      mockSupabase.error = null;

      const result = await dictionaryService.updateItem('1', updates);

      expect(mockSupabase.from).toHaveBeenCalledWith('dictionary');
      expect(mockSupabase.update).toHaveBeenCalledWith(updates);
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', '1');
      expect(mockSupabase.select).toHaveBeenCalled();
      expect(mockSupabase.single).toHaveBeenCalled();
      expect(result).toEqual(updatedItem);
    });

    it('should throw error when update fails', async () => {
      mockSupabase.error = new Error('Update failed');

      await expect(dictionaryService.updateItem('1', updates)).rejects.toThrow('Update failed');
    });
  });

  describe('deleteItem', () => {
    it('should delete item successfully', async () => {
      mockSupabase.error = null;

      await dictionaryService.deleteItem('1');

      expect(mockSupabase.from).toHaveBeenCalledWith('dictionary');
      expect(mockSupabase.delete).toHaveBeenCalled();
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', '1');
    });

    it('should throw error when deletion fails', async () => {
      mockSupabase.error = new Error('Deletion failed');

      await expect(dictionaryService.deleteItem('1')).rejects.toThrow('Deletion failed');
    });
  });
});