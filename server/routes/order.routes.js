import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/order.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/all', authorize('admin'), getAllOrders);
router.get('/:id', getOrder);
router.put('/:id/status', authorize('admin'), updateOrderStatus);

export default router;





