import { DictionaryService } from '../../src/features/dictionary/dictionary.service';

describe('Dictionary Integration Tests', () => {
  let dictionaryService: DictionaryService;

  beforeAll(() => {
    dictionaryService = new DictionaryService();
  });

  describe('getByType', () => {
    it('should get method dictionary items', async () => {
      const result = await dictionaryService.getByType('method');

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('value');
        expect(result[0]).toHaveProperty('type');
        expect(result[0].type).toBe('method');
      }
    });

    it('should get temperature dictionary items', async () => {
      const result = await dictionaryService.getByType('temperature');
      expect(Array.isArray(result)).toBe(true);
    });

    it('should get ratio dictionary items', async () => {
      const result = await dictionaryService.getByType('ratio');
      expect(Array.isArray(result)).toBe(true);
    });

    it('should get grind dictionary items', async () => {
      const result = await dictionaryService.getByType('grind');
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return empty array for invalid dictionary type', async () => {
      const result = await dictionaryService.getByType('invalid_type' as any);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('getAllTypes', () => {
    it('should get all dictionary types', async () => {
      const result = await dictionaryService.getAllTypes();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});