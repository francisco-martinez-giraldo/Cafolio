import { StorageService } from '../src/features/storage/storage.service';

// Mock Supabase
jest.mock('../src/config/supabase', () => {
  const mockChain: any = {
    from: jest.fn(() => mockChain),
    upload: jest.fn(() => mockChain),
    remove: jest.fn(() => mockChain),
    listBuckets: jest.fn(() => mockChain),
    createBucket: jest.fn(() => mockChain),
    data: null,
    error: null
  };
  
  return {
    supabase: {
      storage: mockChain
    }
  };
});

const { supabase: mockSupabase } = require('../src/config/supabase');

describe('StorageService', () => {
  let storageService: StorageService;
  const mockFile = Buffer.from('test image content');
  const fileName = 'test-image.jpg';
  const contentType = 'image/jpeg';

  beforeEach(() => {
    storageService = new StorageService();
    jest.clearAllMocks();
  });

  describe('uploadImage', () => {
    it('should upload image successfully', async () => {
      const mockUploadResult = { path: 'cafolio/test-image.jpg' };
      mockSupabase.storage.data = mockUploadResult;
      mockSupabase.storage.error = null;

      const result = await storageService.uploadImage(mockFile, fileName, contentType);

      expect(mockSupabase.storage.from).toHaveBeenCalledWith('cafolio');
      expect(mockSupabase.storage.upload).toHaveBeenCalledWith(fileName, mockFile, {
        contentType,
        upsert: true
      });
      expect(result).toEqual(mockUploadResult);
    });

    it('should throw error when upload fails', async () => {
      mockSupabase.storage.error = new Error('Upload failed');

      await expect(storageService.uploadImage(mockFile, fileName, contentType))
        .rejects.toThrow('Upload failed');
    });
  });

  describe('deleteImage', () => {
    it('should delete image successfully', async () => {
      mockSupabase.storage.error = null;

      await storageService.deleteImage(fileName);

      expect(mockSupabase.storage.from).toHaveBeenCalledWith('cafolio');
      expect(mockSupabase.storage.remove).toHaveBeenCalledWith([fileName]);
    });

    it('should throw error when deletion fails', async () => {
      mockSupabase.storage.error = new Error('Deletion failed');

      await expect(storageService.deleteImage(fileName))
        .rejects.toThrow('Deletion failed');
    });
  });
});