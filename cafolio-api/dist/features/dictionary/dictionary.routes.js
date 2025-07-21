"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dictionaryRoutes = void 0;
const express_1 = require("express");
const dictionary_controller_1 = require("./dictionary.controller");
const router = (0, express_1.Router)();
exports.dictionaryRoutes = router;
const dictionaryController = new dictionary_controller_1.DictionaryController();
router.get('/', dictionaryController.getByType.bind(dictionaryController));
router.get('/types', dictionaryController.getAllTypes.bind(dictionaryController));
router.post('/', dictionaryController.createItem.bind(dictionaryController));
router.put('/:id', dictionaryController.updateItem.bind(dictionaryController));
router.delete('/:id', dictionaryController.deleteItem.bind(dictionaryController));
//# sourceMappingURL=dictionary.routes.js.map