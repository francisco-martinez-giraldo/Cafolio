"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cafolio API',
            version: '1.0.0',
            description: 'Coffee portfolio management API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/features/**/*.controller.ts', './src/features/**/*.routes.ts'],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map