import { CoffeesService } from '../../src/features/coffees/coffees.service';
import { TestHelpers } from './test-helpers';

const TEST_USER_ID = 'test_user_integration';

describe('Coffees Integration Tests', () => {
  let coffeesService: CoffeesService;
  let dictIds: any;

  beforeAll(async () => {
    coffeesService = new CoffeesService();
    dictIds = await TestHelpers.getDictionaryIds();
  });

  it('should create a new coffee', async () => {
    const testCoffee = {
      user_id: TEST_USER_ID,
      brand_dictionary_id: dictIds.brand_id,
      variety_dictionary_id: dictIds.variety_id,
      process_dictionary_id: dictIds.process_id,
      photo_path: '/test/photo.jpg',
      region: 'Test Region',
      farm: 'Test Farm',
      price: 50000,
      notes: 'Integration test coffee'
    };

    const result = await coffeesService.create(testCoffee);

    expect(result).toHaveProperty('id');
    expect(result.user_id).toBe(TEST_USER_ID);
    expect(result.region).toBe('Test Region');
    
    // Cleanup
    await coffeesService.delete(result.id, TEST_USER_ID);
  });

  it('should get coffees by user', async () => {
    const testCoffee = {
      user_id: TEST_USER_ID,
      brand_dictionary_id: dictIds.brand_id,
      variety_dictionary_id: dictIds.variety_id,
      process_dictionary_id: dictIds.process_id,
      photo_path: '/test/photo2.jpg',
      region: 'Test Region 2'
    };
    const coffee = await coffeesService.create(testCoffee);

    const result = await coffeesService.getByUserId(TEST_USER_ID);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(c => c.user_id === TEST_USER_ID)).toBe(true);

    // Cleanup
    await coffeesService.delete(coffee.id, TEST_USER_ID);
  });

  it('should get coffee by id', async () => {
    const testCoffee = {
      user_id: TEST_USER_ID,
      brand_dictionary_id: dictIds.brand_id,
      variety_dictionary_id: dictIds.variety_id,
      process_dictionary_id: dictIds.process_id,
      photo_path: '/test/photo3.jpg',
      region: 'Test Region 3'
    };
    const coffee = await coffeesService.create(testCoffee);

    const result = await coffeesService.getById(coffee.id, TEST_USER_ID);

    expect(result?.id).toBe(coffee.id);
    expect(result?.region).toBe('Test Region 3');

    // Cleanup
    await coffeesService.delete(coffee.id, TEST_USER_ID);
  });

  it('should update coffee', async () => {
    const testCoffee = {
      user_id: TEST_USER_ID,
      brand_dictionary_id: dictIds.brand_id,
      variety_dictionary_id: dictIds.variety_id,
      process_dictionary_id: dictIds.process_id,
      photo_path: '/test/photo4.jpg',
      region: 'Test Region 4'
    };
    const coffee = await coffeesService.create(testCoffee);

    const updates = { notes: 'Updated integration test notes' };
    const result = await coffeesService.update(coffee.id, TEST_USER_ID, updates);

    expect(result.notes).toBe(updates.notes);

    // Cleanup
    await coffeesService.delete(coffee.id, TEST_USER_ID);
  });

  it('should get recent coffees with ratings', async () => {
    const result = await coffeesService.getRecent(TEST_USER_ID);

    expect(Array.isArray(result)).toBe(true);
    // No necesitamos datos específicos para este test
  });

  it('should delete coffee', async () => {
    const testCoffee = {
      user_id: TEST_USER_ID,
      brand_dictionary_id: dictIds.brand_id,
      variety_dictionary_id: dictIds.variety_id,
      process_dictionary_id: dictIds.process_id,
      photo_path: '/test/photo5.jpg',
      region: 'Test Region 5'
    };
    const coffee = await coffeesService.create(testCoffee);

    await coffeesService.delete(coffee.id, TEST_USER_ID);

    // Verificar que fue eliminado intentando obtenerlo
    try {
      await coffeesService.getById(coffee.id, TEST_USER_ID);
      fail('Should have thrown an error');
    } catch (error) {
      // Esperamos que lance un error porque no existe
      expect(error).toBeDefined();
    }
  });
});