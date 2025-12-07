import express from 'express';
import {
  uploadPrescription,
  getMyPrescriptions,
  getAllPrescriptions,
  reviewPrescription,
  upload,
} from '../controllers/prescription.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.post('/', upload.single('file'), uploadPrescription);
router.get('/', getMyPrescriptions);
router.get('/all', authorize('pharmacist', 'admin'), getAllPrescriptions);
router.put('/:id/review', authorize('pharmacist', 'admin'), reviewPrescription);

export default router;





