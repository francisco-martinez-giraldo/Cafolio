import { Router } from 'express';
import { CoffeesController } from './coffees.controller';

const router = Router();
const coffeesController = new CoffeesController();

router.get('/recent', coffeesController.getRecent.bind(coffeesController));
router.get('/:id', coffeesController.getById.bind(coffeesController));
router.get('/', coffeesController.getByUserId.bind(coffeesController));
router.post('/', coffeesController.create.bind(coffeesController));
router.put('/:id', coffeesController.update.bind(coffeesController));
router.delete('/:id', coffeesController.delete.bind(coffeesController));

export { router as coffeesRoutes };