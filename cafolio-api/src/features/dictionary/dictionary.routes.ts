import { Router } from 'express';
import { DictionaryController } from './dictionary.controller';

const router = Router();
const dictionaryController = new DictionaryController();

router.get('/', dictionaryController.getByType.bind(dictionaryController));
router.get('/types', dictionaryController.getAllTypes.bind(dictionaryController));
router.post('/', dictionaryController.createItem.bind(dictionaryController));
router.put('/:id', dictionaryController.updateItem.bind(dictionaryController));
router.delete('/:id', dictionaryController.deleteItem.bind(dictionaryController));

export { router as dictionaryRoutes };