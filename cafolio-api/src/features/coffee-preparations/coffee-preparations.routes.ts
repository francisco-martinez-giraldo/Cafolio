import { Router } from 'express';
import { CoffeePreparationsController } from './coffee-preparations.controller';

const router = Router();
const coffeePreparationsController = new CoffeePreparationsController();

router.get('/:id', coffeePreparationsController.getById.bind(coffeePreparationsController));
router.get('/', coffeePreparationsController.getByUserId.bind(coffeePreparationsController));
router.post('/', coffeePreparationsController.create.bind(coffeePreparationsController));
router.put('/:id', coffeePreparationsController.update.bind(coffeePreparationsController));
router.delete('/:id', coffeePreparationsController.delete.bind(coffeePreparationsController));
router.get('/history/:coffeeId', coffeePreparationsController.getHistoryByCoffeeId.bind(coffeePreparationsController));

export { router as coffeePreparationsRoutes };