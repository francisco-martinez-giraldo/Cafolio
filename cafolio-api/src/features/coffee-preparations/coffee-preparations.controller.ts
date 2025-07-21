import { Request, Response } from "express";
import { CoffeePreparationsService } from "./coffee-preparations.service";

export class CoffeePreparationsController {
  private coffeePreparationsService = new CoffeePreparationsService();

  /**
   * @swagger
   * /api/coffee-preparations:
   *   get:
   *     summary: Get user's coffee preparations
   *     tags: [Coffee Preparations]
   *     parameters:
   *       - in: query
   *         name: user_id
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: coffee_id
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of coffee preparations
   *       400:
   *         description: Missing user_id
   *       500:
   *         description: Server error
   */
  async getByUserId(req: Request, res: Response) {
    try {
      const { user_id, coffee_id } = req.query;
      if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
      }

      const preparations = await this.coffeePreparationsService.getByUserId(
        user_id as string,
        coffee_id as string
      );
      res.json(preparations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coffee preparations" });
    }
  }

  /**
   * @swagger
   * /api/coffee-preparations/{id}:
   *   get:
   *     summary: Get coffee preparation by ID
   *     tags: [Coffee Preparations]
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
   *         description: Coffee preparation details
   *       404:
   *         description: Preparation not found
   *       500:
   *         description: Server error
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
      }

      const preparation = await this.coffeePreparationsService.getById(id, user_id as string);
      if (!preparation) {
        return res.status(404).json({ error: "Coffee preparation not found" });
      }
      res.json(preparation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coffee preparation" });
    }
  }

  /**
   * @swagger
   * /api/coffee-preparations:
   *   post:
   *     summary: Create new coffee preparation
   *     tags: [Coffee Preparations]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - user_id
   *               - coffee_id
   *               - method_dictionary_id
   *               - temperature_dictionary_id
   *               - ratio_dictionary_id
   *               - ranking
   *             properties:
   *               user_id:
   *                 type: string
   *               coffee_id:
   *                 type: string
   *               method_dictionary_id:
   *                 type: string
   *               temperature_dictionary_id:
   *                 type: string
   *               ratio_dictionary_id:
   *                 type: string
   *               ranking:
   *                 type: number
   *                 minimum: 0
   *                 maximum: 5
   *               notes:
   *                 type: array
   *                 items:
   *                   type: string
   *               comments:
   *                 type: string
   *     responses:
   *       201:
   *         description: Coffee preparation created
   *       500:
   *         description: Server error
   */
  async create(req: Request, res: Response) {
    try {
      const preparation = await this.coffeePreparationsService.create(req.body);
      res.status(201).json(preparation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create coffee preparation" });
    }
  }

  /**
   * @swagger
   * /api/coffee-preparations/{id}:
   *   put:
   *     summary: Update coffee preparation
   *     tags: [Coffee Preparations]
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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               method_dictionary_id:
   *                 type: string
   *               temperature_dictionary_id:
   *                 type: string
   *               ratio_dictionary_id:
   *                 type: string
   *               ranking:
   *                 type: number
   *                 minimum: 0
   *                 maximum: 5
   *               notes:
   *                 type: array
   *                 items:
   *                   type: string
   *               comments:
   *                 type: string
   *     responses:
   *       200:
   *         description: Coffee preparation updated
   *       400:
   *         description: Missing user_id
   *       500:
   *         description: Server error
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
      }

      const preparation = await this.coffeePreparationsService.update(
        id,
        user_id as string,
        req.body
      );
      res.json(preparation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update coffee preparation" });
    }
  }

  /**
   * @swagger
   * /api/coffee-preparations/{id}:
   *   delete:
   *     summary: Delete coffee preparation
   *     tags: [Coffee Preparations]
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
   *       204:
   *         description: Coffee preparation deleted
   *       400:
   *         description: Missing user_id
   *       500:
   *         description: Server error
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
      }

      await this.coffeePreparationsService.delete(id, user_id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete coffee preparation" });
    }
  }
}
