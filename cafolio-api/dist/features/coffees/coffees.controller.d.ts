import { Request, Response } from "express";
export declare class CoffeesController {
    private coffeesService;
    /**
     * @swagger
     * /api/coffees:
     *   get:
     *     summary: Get user's coffees
     *     tags: [Coffees]
     *     parameters:
     *       - in: query
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: List of coffees
     *       400:
     *         description: Missing user_id
     *       500:
     *         description: Server error
     */
    getByUserId(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * @swagger
     * /api/coffees/{id}:
     *   get:
     *     summary: Get coffee by ID
     *     tags: [Coffees]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *       - in: query
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Coffee details
     *       404:
     *         description: Coffee not found
     *       500:
     *         description: Server error
     */
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * @swagger
     * /api/coffees:
     *   post:
     *     summary: Create new coffee
     *     tags: [Coffees]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - user_id
     *               - brand_dictionary_id
     *               - variety_dictionary_id
     *               - process_dictionary_id
     *               - photo_path
     *             properties:
     *               user_id:
     *                 type: string
     *               brand_dictionary_id:
     *                 type: string
     *               variety_dictionary_id:
     *                 type: string
     *               process_dictionary_id:
     *                 type: string
     *               photo_path:
     *                 type: string
     *               region:
     *                 type: string
     *               farm:
     *                 type: string
     *               price:
     *                 type: number
     *               notes:
     *                 type: string
     *     responses:
     *       201:
     *         description: Coffee created
     *       500:
     *         description: Server error
     */
    create(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/coffees/{id}:
     *   put:
     *     summary: Update coffee
     *     tags: [Coffees]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Coffee ID to update
     *       - in: query
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user who owns the coffee
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               brand_dictionary_id:
     *                 type: string
     *                 description: ID of the coffee brand from dictionary
     *               variety_dictionary_id:
     *                 type: string
     *                 description: ID of the coffee variety from dictionary
     *               process_dictionary_id:
     *                 type: string
     *                 description: ID of the coffee process from dictionary
     *               photo_path:
     *                 type: string
     *                 description: Path to the coffee photo stored locally
     *               region:
     *                 type: string
     *                 description: Region where the coffee is from
     *               farm:
     *                 type: string
     *                 description: Farm where the coffee is produced
     *               price:
     *                 type: number
     *                 description: Price of the coffee
     *               notes:
     *                 type: string
     *                 description: Additional notes about the coffee
     *     responses:
     *       200:
     *         description: Coffee updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                 user_id:
     *                   type: string
     *                 brand_dictionary_id:
     *                   type: string
     *                 variety_dictionary_id:
     *                   type: string
     *                 process_dictionary_id:
     *                   type: string
     *                 photo_path:
     *                   type: string
     *                 region:
     *                   type: string
     *                 farm:
     *                   type: string
     *                 price:
     *                   type: number
     *                 notes:
     *                   type: string
     *                 created_at:
     *                   type: string
     *                   format: date-time
     *                 updated_at:
     *                   type: string
     *                   format: date-time
     *       400:
     *         description: Missing user_id or invalid request body
     *       404:
     *         description: Coffee not found
     *       500:
     *         description: Server error
     */
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * @swagger
     * /api/coffees/{id}:
     *   delete:
     *     summary: Delete coffee
     *     description: Delete a coffee by its ID. Only the owner can delete their coffee.
     *     tags: [Coffees]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Coffee ID to delete
     *       - in: query
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user who owns the coffee
     *     responses:
     *       204:
     *         description: Coffee deleted successfully (no content returned)
     *       400:
     *         description: Missing user_id parameter
     *       401:
     *         description: Unauthorized - user does not own this coffee
     *       404:
     *         description: Coffee not found
     *       500:
     *         description: Server error
     */
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * @swagger
     * /api/coffees/recent:
     *   get:
     *     summary: Get recent coffees
     *     tags: [Coffees]
     *     parameters:
     *       - in: query
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 3
     *     responses:
     *       200:
     *         description: Recent coffees
     *       500:
     *         description: Server error
     */
    getRecent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=coffees.controller.d.ts.map