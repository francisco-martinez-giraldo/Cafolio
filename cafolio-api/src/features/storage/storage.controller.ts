import { Request, Response } from "express";
import { StorageService } from "./storage.service";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"));
    }
  },
});

const storageService = new StorageService();

/**
 * @swagger
 * /api/storage/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (max 5MB)
 *               folder:
 *                 type: string
 *                 description: Optional folder path to store the image
 *             required:
 *               - image
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 fileName:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: No file provided
 *       500:
 *         description: Upload failed
 */
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const folder = req.body.folder || '';
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const result = await storageService.uploadImage(req.file.buffer, fileName, req.file.mimetype, folder);

    // Generate public URL directly
    const path = folder ? `${folder}/${fileName}` : `storage/${fileName}`;
    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${
      process.env.SUPABASE_STORAGE_BUCKET || "cafolio"
    }/${path}`;

    res.json({
      message: "Image uploaded successfully",
      fileName: result.path,
      url: publicUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Upload failed" });
  }
};
