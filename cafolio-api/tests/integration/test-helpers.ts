import { DictionaryService } from '../../src/features/dictionary/dictionary.service';

export class TestHelpers {
  private static dictionaryService = new DictionaryService();
  private static dictionaryCache: any = {};

  static async getDictionaryIds() {
    if (Object.keys(this.dictionaryCache).length === 0) {
      const brands = await this.dictionaryService.getByType('brand');
      const varieties = await this.dictionaryService.getByType('variety');
      const processes = await this.dictionaryService.getByType('process');
      const methods = await this.dictionaryService.getByType('method');
      const temperatures = await this.dictionaryService.getByType('temperature');
      const ratios = await this.dictionaryService.getByType('ratio');
      const grinds = await this.dictionaryService.getByType('grind');

      this.dictionaryCache = {
        brand_id: brands[0]?.id || 'no-brand',
        variety_id: varieties[0]?.id || 'no-variety',
        process_id: processes[0]?.id || 'no-process',
        method_id: methods[0]?.id || 'no-method',
        temperature_id: temperatures[0]?.id || 'no-temperature',
        ratio_id: ratios[0]?.id || 'no-ratio',
        grind_id: grinds[0]?.id || 'no-grind'
      };
    }
    return this.dictionaryCache;
  }
}