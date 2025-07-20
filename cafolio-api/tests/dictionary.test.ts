import { DictionaryService } from '../src/features/dictionary/dictionary.service';

// Mock Supabase
jest.mock('../src/config/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => ({
            data: [
              { id: '1', type: 'variety', value: 'Bourbon', image_url: null, order_index: 0, created_at: '2023-01-01' }
            ],
            error: null
          }))
        }))
      }))
    }))
  }
}));

describe('DictionaryService', () => {
  let dictionaryService: DictionaryService;

  beforeEach(() => {
    dictionaryService = new DictionaryService();
  });

  test('should get items by type', async () => {
    const items = await dictionaryService.getByType('variety');
    expect(items).toHaveLength(1);
    expect(items[0].value).toBe('Bourbon');
  });
});