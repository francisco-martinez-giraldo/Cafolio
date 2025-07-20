import { CoffeesService } from '../src/features/coffees/coffees.service';
import { Coffee, CreateCoffeeRequest } from '../src/types';

// Mock Supabase
jest.mock('../src/config/supabase', () => {
  const mockChain: any = {
    from: jest.fn(() => mockChain),
    select: jest.fn(() => mockChain),
    eq: jest.fn(() => mockChain),
    order: jest.fn(() => mockChain),
    limit: jest.fn(() => mockChain),
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

const { supabase: mockSupabase } = require('../src/config/supabase');

describe('CoffeesService', () => {
  let coffeesService: CoffeesService;
  const mockCoffee: Coffee = {
    id: '1',
    user_id: 'user123',
    brand_dictionary_id: 'brand1',
    variety_dictionary_id: 'variety1',
    process_dictionary_id: 'process1',
    photo_path: '/path/to/photo.jpg',
    region: 'Huila',
    farm: 'Finca Test',
    price: 50000,
    notes: 'Test notes',
    created_at: '2023-01-01'
  };

  beforeEach(() => {
    coffeesService = new CoffeesService();
    jest.clearAllMocks();
  });

  describe('getByUserId', () => {
    it('should return coffees by user ID', async () => {
      mockSupabase.data = [mockCoffee];
      mockSupabase.error = null;

      const result = await coffeesService.getByUserId('user123');

      expect(mockSupabase.from).toHaveBeenCalledWith('coffees');
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', 'user123');
      expect(mockSupabase.order).toHaveBeenCalledWith('created_at', { ascending: false });
      expect(result).toEqual([mockCoffee]);
    });

    it('should apply limit when provided', async () => {
      mockSupabase.data = [mockCoffee];
      mockSupabase.error = null;

      await coffeesService.getByUserId('user123', 5);

      expect(mockSupabase.limit).toHaveBeenCalledWith(5);
    });

    it('should throw error when database operation fails', async () => {
      mockSupabase.error = new Error('Database error');

      await expect(coffeesService.getByUserId('user123')).rejects.toThrow('Database error');
    });
  });

  describe('getById', () => {
    it('should return coffee by ID and user ID', async () => {
      mockSupabase.data = mockCoffee;
      mockSupabase.error = null;

      const result = await coffeesService.getById('1', 'user123');

      expect(mockSupabase.eq).toHaveBeenCalledWith('id', '1');
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', 'user123');
      expect(mockSupabase.single).toHaveBeenCalled();
      expect(result).toEqual(mockCoffee);
    });

    it('should throw error when not found', async () => {
      mockSupabase.error = new Error('Not found');

      await expect(coffeesService.getById('1', 'user123')).rejects.toThrow('Not found');
    });
  });

  describe('create', () => {
    const newCoffee: CreateCoffeeRequest = {
      user_id: 'user123',
      brand_dictionary_id: 'brand1',
      variety_dictionary_id: 'variety1',
      process_dictionary_id: 'process1',
      photo_path: '/path/to/photo.jpg',
      region: 'Huila',
      farm: 'Finca Test',
      price: 50000,
      notes: 'Test notes'
    };

    it('should create coffee successfully', async () => {
      mockSupabase.data = mockCoffee;
      mockSupabase.error = null;

      const result = await coffeesService.create(newCoffee);

      expect(mockSupabase.insert).toHaveBeenCalledWith([newCoffee]);
      expect(mockSupabase.select).toHaveBeenCalled();
      expect(mockSupabase.single).toHaveBeenCalled();
      expect(result).toEqual(mockCoffee);
    });

    it('should throw error when creation fails', async () => {
      mockSupabase.error = new Error('Creation failed');

      await expect(coffeesService.create(newCoffee)).rejects.toThrow('Creation failed');
    });
  });

  describe('update', () => {
    const updates = { notes: 'Updated notes', price: 60000 };

    it('should update coffee successfully', async () => {
      const updatedCoffee = { ...mockCoffee, ...updates };
      mockSupabase.data = updatedCoffee;
      mockSupabase.error = null;

      const result = await coffeesService.update('1', 'user123', updates);

      expect(mockSupabase.update).toHaveBeenCalledWith(updates);
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', '1');
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', 'user123');
      expect(result).toEqual(updatedCoffee);
    });

    it('should throw error when update fails', async () => {
      mockSupabase.error = new Error('Update failed');

      await expect(coffeesService.update('1', 'user123', updates)).rejects.toThrow('Update failed');
    });
  });

  describe('delete', () => {
    it('should delete coffee successfully', async () => {
      mockSupabase.error = null;

      await coffeesService.delete('1', 'user123');

      expect(mockSupabase.delete).toHaveBeenCalled();
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', '1');
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', 'user123');
    });

    it('should throw error when deletion fails', async () => {
      mockSupabase.error = new Error('Deletion failed');

      await expect(coffeesService.delete('1', 'user123')).rejects.toThrow('Deletion failed');
    });
  });

  describe('getRecent', () => {
    it('should return recent coffees with default limit', async () => {
      mockSupabase.data = [mockCoffee];
      mockSupabase.error = null;

      const result = await coffeesService.getRecent('user123');

      expect(mockSupabase.limit).toHaveBeenCalledWith(3);
      expect(result).toEqual([mockCoffee]);
    });

    it('should return recent coffees with custom limit', async () => {
      mockSupabase.data = [mockCoffee];
      mockSupabase.error = null;

      await coffeesService.getRecent('user123', 5);

      expect(mockSupabase.limit).toHaveBeenCalledWith(5);
    });
  });
});