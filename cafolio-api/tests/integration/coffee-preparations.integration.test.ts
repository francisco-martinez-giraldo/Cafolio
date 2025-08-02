import { CoffeePreparationsService } from '../../src/features/coffee-preparations/coffee-preparations.service';
import { CoffeesService } from '../../src/features/coffees/coffees.service';
import { TestHelpers } from './test-helpers';

const TEST_USER_ID = 'test_user_prep_integration';

describe('Coffee Preparations Integration Tests', () => {
  let coffeesService: CoffeesService;
  let preparationsService: CoffeePreparationsService;
  let dictIds: any;

  beforeAll(async () => {
    coffeesService = new CoffeesService();
    preparationsService = new CoffeePreparationsService();
    dictIds = await TestHelpers.getDictionaryIds();
  });

  it('should create a new preparation', async () => {
    // Usar un café existente de la base de datos en lugar de crear uno nuevo
    const existingCoffees = await coffeesService.getByUserId('fram07@gmail');
    
    if (existingCoffees.length === 0) {
      // Si no hay cafés, crear uno
      const testCoffee = {
        user_id: 'fram07@gmail',
        brand_dictionary_id: dictIds.brand_id,
        variety_dictionary_id: dictIds.variety_id,
        process_dictionary_id: dictIds.process_id,
        photo_path: '/test/photo.jpg',
        region: 'Test Region',
        farm: 'Test Farm'
      };
      const coffee = await coffeesService.create(testCoffee);
      existingCoffees.push(coffee);
    }

    const testPreparation = {
      user_id: TEST_USER_ID,
      coffee_id: existingCoffees[0].id,
      method_dictionary_id: dictIds.method_id,
      temperature_dictionary_id: dictIds.temperature_id,
      ratio_dictionary_id: dictIds.ratio_id,
      grind_dictionary_id: dictIds.grind_id,
      ranking: 4.5,
      notes: ['Great extraction']
    };

    const result = await preparationsService.create(testPreparation);

    expect(result).toHaveProperty('id');
    expect(result.coffee_id).toBe(existingCoffees[0].id);
    expect(result.ranking).toBe(4.5);
    
    // Solo limpiar la preparación, no el café
    await preparationsService.delete(result.id, TEST_USER_ID);
  });

  it('should get preparations by coffee', async () => {
    // Crear café y preparación para esta prueba
    const testCoffee = {
      user_id: TEST_USER_ID,
      brand_dictionary_id: dictIds.brand_id,
      variety_dictionary_id: dictIds.variety_id,
      process_dictionary_id: dictIds.process_id,
      photo_path: '/test/photo2.jpg',
      region: 'Test Region 2'
    };
    const coffee = await coffeesService.create(testCoffee);

    const testPreparation = {
      user_id: TEST_USER_ID,
      coffee_id: coffee.id,
      method_dictionary_id: dictIds.method_id,
      temperature_dictionary_id: dictIds.temperature_id,
      ratio_dictionary_id: dictIds.ratio_id,
      grind_dictionary_id: dictIds.grind_id,
      ranking: 4.0,
      notes: ['Test preparation']
    };
    const preparation = await preparationsService.create(testPreparation);

    const result = await preparationsService.getByUserId(TEST_USER_ID, coffee.id);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].coffee_id).toBe(coffee.id);

    // Cleanup
    await preparationsService.delete(preparation.id, TEST_USER_ID);
    await coffeesService.delete(coffee.id, TEST_USER_ID);
  });

  it('should update preparation', async () => {
    // Crear café y preparación para esta prueba
    const testCoffee = {
      user_id: TEST_USER_ID,
      brand_dictionary_id: dictIds.brand_id,
      variety_dictionary_id: dictIds.variety_id,
      process_dictionary_id: dictIds.process_id,
      photo_path: '/test/photo3.jpg',
      region: 'Test Region 3'
    };
    const coffee = await coffeesService.create(testCoffee);

    const testPreparation = {
      user_id: TEST_USER_ID,
      coffee_id: coffee.id,
      method_dictionary_id: dictIds.method_id,
      temperature_dictionary_id: dictIds.temperature_id,
      ratio_dictionary_id: dictIds.ratio_id,
      grind_dictionary_id: dictIds.grind_id,
      ranking: 3.5,
      notes: ['Initial notes']
    };
    const preparation = await preparationsService.create(testPreparation);

    const updates = { ranking: 5.0, notes: ['Perfect extraction!'] };
    const result = await preparationsService.update(preparation.id, TEST_USER_ID, updates);

    expect(result.ranking).toBe(5.0);
    expect(result.notes).toEqual(['Perfect extraction!']);

    // Cleanup
    await preparationsService.delete(preparation.id, TEST_USER_ID);
    await coffeesService.delete(coffee.id, TEST_USER_ID);
  });

  it('should delete preparation', async () => {
    // Crear café y preparación para esta prueba
    const testCoffee = {
      user_id: TEST_USER_ID,
      brand_dictionary_id: dictIds.brand_id,
      variety_dictionary_id: dictIds.variety_id,
      process_dictionary_id: dictIds.process_id,
      photo_path: '/test/photo4.jpg',
      region: 'Test Region 4'
    };
    const coffee = await coffeesService.create(testCoffee);

    const testPreparation = {
      user_id: TEST_USER_ID,
      coffee_id: coffee.id,
      method_dictionary_id: dictIds.method_id,
      temperature_dictionary_id: dictIds.temperature_id,
      ratio_dictionary_id: dictIds.ratio_id,
      grind_dictionary_id: dictIds.grind_id,
      ranking: 4.5,
      notes: ['To be deleted']
    };
    const preparation = await preparationsService.create(testPreparation);

    await preparationsService.delete(preparation.id, TEST_USER_ID);
    
    // Verificar que fue eliminado
    const preparations = await preparationsService.getByUserId(TEST_USER_ID, coffee.id);
    expect(preparations.find((p: any) => p.id === preparation.id)).toBeUndefined();

    // Cleanup
    await coffeesService.delete(coffee.id, TEST_USER_ID);
  });
});