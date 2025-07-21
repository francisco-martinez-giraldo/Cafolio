import { Router } from 'express';
import { uploadImage, upload } from './storage.controller';

const router = Router();

router.post('/upload', upload.single('image'), uploadImage);

export default router;