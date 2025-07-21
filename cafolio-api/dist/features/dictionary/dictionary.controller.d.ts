import { Request, Response } from 'express';
export declare class DictionaryController {
    private dictionaryService;
    /**
     * @swagger
     * /api/dictionary:
     *   get:
     *     summary: Get dictionary items by type
     *     description: Retrieves all dictionary items of a specific type (e.g., varieties, methods)
     *     tags: [Dictionary]
     *     parameters:
     *       - in: query
     *         name: type
     *         required: true
     *         schema:
     *           type: string
     *           enum: [brand, variety, process, method, temperature, ratio, grind]
     *         description: Type of dictionary items to retrieve
     *     responses:
     *       200:
     *         description: A list of dictionary items
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     format: uuid
     *                   type:
     *                     type: string
     *                   value:
     *                     type: string
     *                   image_url:
     *                     type: string
     *                     nullable: true
     *                   order_index:
     *                     type: integer
     *                   created_at:
     *                     type: string
     *                     format: date-time
     *       400:
     *         description: Missing required type parameter
     *       500:
     *         description: Server error
     */
    getByType(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * @swagger
     * /api/dictionary/types:
     *   get:
     *     summary: Get all available dictionary types
     *     description: Retrieves a list of all unique dictionary types in the system
     *     tags: [Dictionary]
     *     responses:
     *       200:
     *         description: A list of unique dictionary types
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: string
     *               example: ["brand", "variety", "process", "method"]
     *       500:
     *         description: Server error
     */
    getAllTypes(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/dictionary:
     *   post:
     *     summary: Create a new dictionary item
     *     description: Adds a new item to the dictionary
     *     tags: [Dictionary]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - type
     *               - value
     *             properties:
     *               type:
     *                 type: string
     *                 description: Category of the dictionary item
     *                 example: "variety"
     *               value:
     *                 type: string
     *                 description: Display value of the item
     *                 example: "Bourbon"
     *               image_url:
     *                 type: string
     *                 description: Optional URL to an image representing the item
     *                 example: "https://example.com/images/bourbon.jpg"
     *               order_index:
     *                 type: integer
     *                 description: Optional sorting order for the item
     *                 example: 1
     *     responses:
     *       201:
     *         description: Dictionary item created successfully
     *       500:
     *         description: Server error
     */
    createItem(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/dictionary/{id}:
     *   put:
     *     summary: Update dictionary item
     *     description: Updates an existing dictionary item by its ID
     *     tags: [Dictionary]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID of the dictionary item to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               type:
     *                 type: string
     *                 description: Category of the dictionary item
     *                 example: "variety"
     *               value:
     *                 type: string
     *                 description: Display value of the item
     *                 example: "Bourbon"
     *               image_url:
     *                 type: string
     *                 description: URL to an image representing the item
     *                 example: "https://example.com/images/bourbon.jpg"
     *               order_index:
     *                 type: integer
     *                 description: Sorting order for the item
     *                 example: 1
     *           example:
     *             {
     *               "value": "Bourbon Pink",
     *               "image_url": "https://example.com/images/bourbon-pink.jpg"
     *             }
     *     responses:
     *       200:
     *         description: Dictionary item updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   format: uuid
     *                 type:
     *                   type: string
     *                 value:
     *                   type: string
     *                 image_url:
     *                   type: string
     *                   nullable: true
     *                 order_index:
     *                   type: integer
     *                 created_at:
     *                   type: string
     *                   format: date-time
     *       500:
     *         description: Server error
     */
    updateItem(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/dictionary/{id}:
     *   delete:
     *     summary: Delete dictionary item
     *     description: Removes a dictionary item from the database
     *     tags: [Dictionary]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: UUID of the dictionary item to delete
     *     responses:
     *       204:
     *         description: Dictionary item deleted successfully (no content)
     *       500:
     *         description: Server error
     */
    deleteItem(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=dictionary.controller.d.ts.map