"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coffeesRoutes = void 0;
const express_1 = require("express");
const coffees_controller_1 = require("./coffees.controller");
const router = (0, express_1.Router)();
exports.coffeesRoutes = router;
const coffeesController = new coffees_controller_1.CoffeesController();
router.get('/recent', coffeesController.getRecent.bind(coffeesController));
router.get('/:id', coffeesController.getById.bind(coffeesController));
router.get('/', coffeesController.getByUserId.bind(coffeesController));
router.post('/', coffeesController.create.bind(coffeesController));
router.put('/:id', coffeesController.update.bind(coffeesController));
router.delete('/:id', coffeesController.delete.bind(coffeesController));
//# sourceMappingURL=coffees.routes.js.map